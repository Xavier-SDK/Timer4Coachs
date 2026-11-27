/* Page d'autorisation OAuth de Timer4Coachs (Supabase Auth y envoie le navigateur avec authorization_id).
   Le coach accepte ou refuse dans l'app de son iPhone, qui dépose la réponse (supabase/autorisations-ia.sql) ;
   la page la relit toutes les deux secondes et renvoie le navigateur vers l'IA. */
(function () {
  "use strict";
  var API = "https://uyykwnzvwwaerzpgsqsp.supabase.co/rest/v1/rpc/lire_autorisation_ia";
  var CLE = "sb_publishable_aVIcrblTbubwlgXsXMuLsw_D9gQUqPy";
  var DUREE_MAX = 15 * 60 * 1000;

  var TEXTES = {
    fr: {
      titre: "Connecter ton IA",
      intro: "Ton IA demande à envoyer des séances dans Timer4Coachs. Tu acceptes ou refuses dans l'app de ton iPhone.",
      etape1: "Ouvre l'appareil photo de ton iPhone et vise ce code.",
      etape2: "Touche « Ouvrir dans Timer4Coachs ».",
      etape3: "Accepte la connexion : cette page te renvoie vers ton IA.",
      ouvrir: "Ouvrir Timer4Coachs",
      retour: "Accepte dans l'app, puis reviens ici : la connexion se termine toute seule.",
      attente: "En attente de ta réponse dans l'app…",
      fait: "C'est fait. Retour vers ton IA…",
      expire: "La demande a expiré. Relance la connexion depuis ton IA.",
      manque: "Adresse incomplète. Relance la connexion depuis ton IA.",
      note: "L'IA pourra seulement envoyer des séances dans ton app. Tu peux la déconnecter à tout moment dans les Réglages."
    },
    en: {
      titre: "Connect your AI",
      intro: "Your AI asks to send sessions to Timer4Coachs. Accept or decline in the app on your iPhone.",
      etape1: "Open your iPhone's camera and point it at this code.",
      etape2: "Tap \"Open in Timer4Coachs\".",
      etape3: "Accept the connection: this page takes you back to your AI.",
      ouvrir: "Open Timer4Coachs",
      retour: "Accept in the app, then come back here: the connection finishes by itself.",
      attente: "Waiting for your answer in the app…",
      fait: "Done. Back to your AI…",
      expire: "The request has expired. Start the connection again from your AI.",
      manque: "Incomplete address. Start the connection again from your AI.",
      note: "The AI can only send sessions to your app. You can disconnect it at any time in Settings."
    }
  };
  var langue = /^fr\b/i.test(navigator.language || "") ? "fr" : "en";
  var t = TEXTES[langue];
  document.documentElement.lang = langue;

  function $(id) { return document.getElementById(id); }
  function texte(id, s) { $(id).textContent = s; }
  function montrer(id, oui) { $(id).className = $(id).className.replace(/\s*\bcache\b/, "") + (oui ? "" : " cache"); }

  texte("titre", t.titre);
  texte("intro", t.intro);
  texte("note", t.note);

  var id = new URLSearchParams(location.search).get("authorization_id") || "";
  if (!/^[A-Za-z0-9_-]{16,128}$/.test(id)) {
    texte("message", t.manque); montrer("message", true);
    return;
  }

  var lien = "timer4coachs://autoriser?id=" + encodeURIComponent(id);
  var surIPhone = /iPhone|iPod/.test(navigator.userAgent) ||
    (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1 && /iPad/.test(navigator.userAgent));
  if (surIPhone) {
    $("ouvrir").href = lien;
    texte("ouvrir", t.ouvrir);
    texte("retour", t.retour);
    montrer("mobile", true);
  } else {
    $("qr").innerHTML = QR.svg(lien, 240);
    texte("etape1", t.etape1); texte("etape2", t.etape2); texte("etape3", t.etape3);
    montrer("ordinateur", true);
  }
  texte("texteAttente", t.attente);
  montrer("attente", true);

  var debut = Date.now(), fini = false;
  function finir(message) {
    fini = true;
    montrer("attente", false); montrer("ordinateur", false); montrer("mobile", false);
    texte("message", message); montrer("message", true);
  }
  function relire() {
    if (fini) return;
    if (Date.now() - debut > DUREE_MAX) { finir(t.expire); return; }
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: CLE },
      body: JSON.stringify({ p_id: id })
    }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (url) {
        if (typeof url === "string" && /^https?:\/\//.test(url)) {
          finir(t.fait);
          location.replace(url);
        } else {
          setTimeout(relire, 2000);
        }
      })
      .catch(function () { setTimeout(relire, 4000); });
  }
  relire();
})();
