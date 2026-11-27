/* QR code minimal (ISO/IEC 18004) : mode octet, correction M, versions 1 à 6 (jusqu'à 106 octets).
   Écrit pour le site, qui ne charge aucun code d'ailleurs. Usage : QR.svg(texte, taillePx) -> chaîne SVG. */
var QR = (function () {
  "use strict";
  // Version : [codewords de correction par bloc, nombre de blocs, codewords de données par bloc] (niveau M).
  var BLOCS = [null, [10, 1, 16], [16, 1, 28], [26, 1, 44], [18, 2, 32], [24, 2, 43], [16, 4, 27]];
  var ALIGN = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34]];

  // Corps de Galois GF(256), polynôme 0x11D.
  var EXP = new Array(512), LOG = new Array(256);
  (function () {
    var x = 1;
    for (var i = 0; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 256) x ^= 0x11D; }
    for (i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
  })();
  function mul(a, b) { return a && b ? EXP[LOG[a] + LOG[b]] : 0; }

  function correction(donnees, n) {
    var gen = [1];
    for (var i = 0; i < n; i++) {
      var g = new Array(gen.length + 1);
      for (var k = 0; k < g.length; k++) g[k] = 0;
      for (var j = 0; j < gen.length; j++) { g[j] ^= gen[j]; g[j + 1] ^= mul(gen[j], EXP[i]); }
      gen = g;
    }
    var reste = new Array(n);
    for (i = 0; i < n; i++) reste[i] = 0;
    for (i = 0; i < donnees.length; i++) {
      var f = donnees[i] ^ reste[0];
      reste.shift(); reste.push(0);
      for (j = 0; j < n; j++) reste[j] ^= mul(gen[j + 1], f);
    }
    return reste;
  }

  function utf8(s) {
    var o = [], b = unescape(encodeURIComponent(s));
    for (var i = 0; i < b.length; i++) o.push(b.charCodeAt(i));
    return o;
  }

  function encoder(texte) {
    var octets = utf8(texte), v;
    for (v = 1; v <= 6; v++) if (BLOCS[v][1] * BLOCS[v][2] >= octets.length + 2) break;
    if (v > 6) throw new Error("texte trop long pour le QR code");
    var b = BLOCS[v], capacite = b[1] * b[2];
    // Flux de bits : mode octet (0100), longueur sur 8 bits, données, terminateur, bourrage.
    var bits = [];
    function ajouter(val, n) { for (var i = n - 1; i >= 0; i--) bits.push((val >>> i) & 1); }
    ajouter(4, 4); ajouter(octets.length, 8);
    for (var i = 0; i < octets.length; i++) ajouter(octets[i], 8);
    ajouter(0, Math.min(4, capacite * 8 - bits.length));
    while (bits.length % 8) bits.push(0);
    var donnees = [];
    for (i = 0; i < bits.length; i += 8) {
      var o = 0;
      for (var j = 0; j < 8; j++) o = (o << 1) | bits[i + j];
      donnees.push(o);
    }
    for (var p = 0; donnees.length < capacite; p++) donnees.push(p % 2 ? 0x11 : 0xEC);
    // Blocs, correction, entrelacement.
    var blocs = [], corr = [];
    for (i = 0; i < b[1]; i++) {
      var bl = donnees.slice(i * b[2], (i + 1) * b[2]);
      blocs.push(bl); corr.push(correction(bl, b[0]));
    }
    var mots = [];
    for (i = 0; i < b[2]; i++) for (j = 0; j < b[1]; j++) mots.push(blocs[j][i]);
    for (i = 0; i < b[0]; i++) for (j = 0; j < b[1]; j++) mots.push(corr[j][i]);
    return { version: v, mots: mots };
  }

  function matrice(texte) {
    var e = encoder(texte), v = e.version, n = 17 + 4 * v;
    var m = [], fn = [], x, y, i, j;
    for (y = 0; y < n; y++) { m.push([]); fn.push([]); for (x = 0; x < n; x++) { m[y].push(false); fn[y].push(false); } }
    function poser(x, y, sombre) { m[y][x] = sombre; fn[y][x] = true; }
    // Motifs de repérage (avec séparateurs), synchronisation, alignement.
    function reperage(cx, cy) {
      for (var dy = -4; dy <= 4; dy++) for (var dx = -4; dx <= 4; dx++) {
        var xx = cx + dx, yy = cy + dy;
        if (xx < 0 || yy < 0 || xx >= n || yy >= n) continue;
        var d = Math.max(Math.abs(dx), Math.abs(dy));
        poser(xx, yy, d !== 2 && d !== 4);
      }
    }
    for (i = 0; i < n; i++) { poser(6, i, i % 2 === 0); poser(i, 6, i % 2 === 0); }
    reperage(3, 3); reperage(n - 4, 3); reperage(3, n - 4);
    var al = ALIGN[v];
    for (i = 0; i < al.length; i++) for (j = 0; j < al.length; j++) {
      if ((i === 0 && j === 0) || (i === 0 && j === al.length - 1) || (i === al.length - 1 && j === 0)) continue;
      for (var dy = -2; dy <= 2; dy++) for (var dx = -2; dx <= 2; dx++)
        poser(al[i] + dx, al[j] + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    }
    // Zones du format réservées (remplies plus bas), module sombre fixe.
    function format(masque) {
      var d = (0 << 3) | masque, r = d; // niveau M : bits 00
      for (var k = 0; k < 10; k++) r = (r << 1) ^ ((r >>> 9) * 0x537);
      var f = ((d << 10) | r) ^ 0x5412;
      function bit(k) { return ((f >>> k) & 1) === 1; }
      for (k = 0; k <= 5; k++) poser(8, k, bit(k));
      poser(8, 7, bit(6)); poser(8, 8, bit(7)); poser(7, 8, bit(8));
      for (k = 9; k < 15; k++) poser(14 - k, 8, bit(k));
      for (k = 0; k < 8; k++) poser(n - 1 - k, 8, bit(k));
      for (k = 8; k < 15; k++) poser(8, n - 15 + k, bit(k));
      poser(8, n - 8, true);
    }
    format(0);
    // Données en zigzag, de bas en haut puis de haut en bas, par colonnes de deux.
    var k = 0, total = e.mots.length * 8;
    for (var droite = n - 1; droite >= 1; droite -= 2) {
      if (droite === 6) droite = 5;
      for (var vert = 0; vert < n; vert++) for (j = 0; j < 2; j++) {
        x = droite - j;
        y = ((droite + 1) & 2) === 0 ? n - 1 - vert : vert;
        if (!fn[y][x] && k < total) { m[y][x] = ((e.mots[k >>> 3] >>> (7 - (k & 7))) & 1) === 1; k++; }
      }
    }
    // Masque : le moins pénalisé.
    function appliquer(masque) {
      for (var yy = 0; yy < n; yy++) for (var xx = 0; xx < n; xx++) {
        if (fn[yy][xx]) continue;
        var inv;
        switch (masque) {
          case 0: inv = (xx + yy) % 2 === 0; break;
          case 1: inv = yy % 2 === 0; break;
          case 2: inv = xx % 3 === 0; break;
          case 3: inv = (xx + yy) % 3 === 0; break;
          case 4: inv = (Math.floor(xx / 3) + Math.floor(yy / 2)) % 2 === 0; break;
          case 5: inv = (xx * yy) % 2 + (xx * yy) % 3 === 0; break;
          case 6: inv = ((xx * yy) % 2 + (xx * yy) % 3) % 2 === 0; break;
          default: inv = ((xx + yy) % 2 + (xx * yy) % 3) % 2 === 0;
        }
        if (inv) m[yy][xx] = !m[yy][xx];
      }
    }
    function penalite() {
      var p = 0, sombres = 0, a, b2, c, suite;
      for (a = 0; a < n; a++) {
        for (var sens = 0; sens < 2; sens++) {
          suite = 1;
          for (b2 = 1; b2 < n; b2++) {
            var cur = sens ? m[b2][a] : m[a][b2], prec = sens ? m[b2 - 1][a] : m[a][b2 - 1];
            if (cur === prec) { suite++; if (suite === 5) p += 3; else if (suite > 5) p++; } else suite = 1;
          }
        }
      }
      for (a = 0; a < n - 1; a++) for (b2 = 0; b2 < n - 1; b2++) {
        c = m[a][b2];
        if (c === m[a][b2 + 1] && c === m[a + 1][b2] && c === m[a + 1][b2 + 1]) p += 3;
      }
      for (a = 0; a < n; a++) for (b2 = 0; b2 < n; b2++) if (m[a][b2]) sombres++;
      p += Math.floor(Math.abs(sombres * 20 - n * n * 10) / (n * n)) * 10;
      return p;
    }
    var meilleur = 0, min = Infinity;
    for (var mq = 0; mq < 8; mq++) {
      appliquer(mq); format(mq);
      var pe = penalite();
      if (pe < min) { min = pe; meilleur = mq; }
      appliquer(mq);
    }
    appliquer(meilleur); format(meilleur);
    return m;
  }

  function svg(texte, taille) {
    var m = matrice(texte), n = m.length, q = 4, t = n + 2 * q, d = "";
    for (var y = 0; y < n; y++) for (var x = 0; x < n; x++) if (m[y][x]) d += "M" + (x + q) + "," + (y + q) + "h1v1h-1z";
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + t + " " + t + '" width="' + taille + '" height="' + taille +
      '" shape-rendering="crispEdges" role="img"><rect width="100%" height="100%" fill="#fff"/><path fill="#000" d="' + d + '"/></svg>';
  }

  return { svg: svg, matrice: matrice };
})();
