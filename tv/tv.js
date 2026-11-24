(function () {
  var URL_WS = "wss://uyykwnzvwwaerzpgsqsp.supabase.co/realtime/v1/websocket?apikey=sb_publishable_aVIcrblTbubwlgXsXMuLsw_D9gQUqPy&vsn=1.0.0";
  var TEXTES = {"fr":{"code":"Code affiché sur l'iPhone (écran TV de Timer4Coachs)","connexion":"Connexion…","reconnexion":"Reconnexion…","refuse":"Accès refusé","injoignable":"iPhone injoignable","attente":"Lance une séance sur l'iPhone","appairage":"Sur l'iPhone, ouvre l'écran TV et autorise cet écran","verification":"Vérification","ancien":"Ce navigateur est trop ancien. Ouvre le lien envoyé depuis l'iPhone sur un autre appareil."},"en":{"code":"Code shown on the iPhone (TV screen in Timer4Coachs)","connexion":"Connecting…","reconnexion":"Reconnecting…","refuse":"Access denied","injoignable":"iPhone unreachable","attente":"Start a session on the iPhone","appairage":"On the iPhone, open the TV screen and allow this screen","verification":"Verification","ancien":"This browser is too old. Open the link sent from the iPhone on another device."},"de":{"code":"Code auf dem iPhone (TV-Bildschirm in Timer4Coachs)","connexion":"Verbinden…","reconnexion":"Erneut verbinden…","refuse":"Zugriff verweigert","injoignable":"iPhone nicht erreichbar","attente":"Starte eine Einheit auf dem iPhone","appairage":"Öffne auf dem iPhone den TV-Bildschirm und erlaube diesen Bildschirm","verification":"Prüfzahl","ancien":"Dieser Browser ist zu alt. Öffne den vom iPhone gesendeten Link auf einem anderen Gerät."},"es":{"code":"Código que aparece en el iPhone (pantalla TV de Timer4Coachs)","connexion":"Conectando…","reconnexion":"Reconectando…","refuse":"Acceso denegado","injoignable":"iPhone inaccesible","attente":"Inicia una sesión en el iPhone","appairage":"En el iPhone, abre la pantalla TV y autoriza esta pantalla","verification":"Verificación","ancien":"Este navegador es demasiado antiguo. Abre el enlace enviado desde el iPhone en otro dispositivo."},"it":{"code":"Codice mostrato sull'iPhone (schermata TV di Timer4Coachs)","connexion":"Connessione…","reconnexion":"Riconnessione…","refuse":"Accesso negato","injoignable":"iPhone non raggiungibile","attente":"Avvia una sessione sull'iPhone","appairage":"Sull'iPhone apri la schermata TV e autorizza questo schermo","verification":"Verifica","ancien":"Questo browser è troppo vecchio. Apri il link inviato dall'iPhone su un altro dispositivo."},"pt-BR":{"code":"Código exibido no iPhone (tela TV do Timer4Coachs)","connexion":"Conectando…","reconnexion":"Reconectando…","refuse":"Acesso negado","injoignable":"iPhone inacessível","attente":"Inicie uma sessão no iPhone","appairage":"No iPhone, abra a tela TV e autorize esta tela","verification":"Verificação","ancien":"Este navegador é antigo demais. Abra o link enviado pelo iPhone em outro aparelho."},"pt-PT":{"code":"Código mostrado no iPhone (ecrã TV do Timer4Coachs)","connexion":"A ligar…","reconnexion":"A voltar a ligar…","refuse":"Acesso recusado","injoignable":"iPhone inacessível","attente":"Inicia uma sessão no iPhone","appairage":"No iPhone, abre o ecrã TV e autoriza este ecrã","verification":"Verificação","ancien":"Este navegador é demasiado antigo. Abre a ligação enviada pelo iPhone noutro aparelho."},"nl":{"code":"Code op de iPhone (tv-scherm in Timer4Coachs)","connexion":"Verbinden…","reconnexion":"Opnieuw verbinden…","refuse":"Toegang geweigerd","injoignable":"iPhone onbereikbaar","attente":"Start een sessie op de iPhone","appairage":"Open op de iPhone het tv-scherm en sta dit scherm toe","verification":"Controle","ancien":"Deze browser is te oud. Open de link die de iPhone stuurde op een ander apparaat."},"da":{"code":"Kode vist på iPhonen (tv-skærm i Timer4Coachs)","connexion":"Forbinder…","reconnexion":"Genopretter forbindelse…","refuse":"Adgang nægtet","injoignable":"iPhone kan ikke nås","attente":"Start en session på iPhonen","appairage":"Åbn tv-skærmen på iPhonen, og tillad denne skærm","verification":"Kontrol","ancien":"Denne browser er for gammel. Åbn linket fra iPhonen på en anden enhed."},"nb":{"code":"Kode vist på iPhonen (TV-skjerm i Timer4Coachs)","connexion":"Kobler til…","reconnexion":"Kobler til igjen…","refuse":"Tilgang nektet","injoignable":"iPhone kan ikke nås","attente":"Start en økt på iPhonen","appairage":"Åpne TV-skjermen på iPhonen og tillat denne skjermen","verification":"Kontroll","ancien":"Denne nettleseren er for gammel. Åpne lenken fra iPhonen på en annen enhet."},"sv":{"code":"Kod som visas på iPhonen (tv-skärm i Timer4Coachs)","connexion":"Ansluter…","reconnexion":"Återansluter…","refuse":"Åtkomst nekad","injoignable":"iPhone går inte att nå","attente":"Starta ett pass på iPhonen","appairage":"Öppna tv-skärmen på iPhonen och tillåt den här skärmen","verification":"Kontroll","ancien":"Den här webbläsaren är för gammal. Öppna länken från iPhonen på en annan enhet."},"fi":{"code":"iPhonessa näkyvä koodi (Timer4Coachsin TV-näkymä)","connexion":"Yhdistetään…","reconnexion":"Yhdistetään uudelleen…","refuse":"Pääsy estetty","injoignable":"iPhonea ei tavoiteta","attente":"Aloita harjoitus iPhonessa","appairage":"Avaa iPhonessa TV-näkymä ja salli tämä näyttö","verification":"Tarkistus","ancien":"Tämä selain on liian vanha. Avaa iPhonesta lähetetty linkki toisella laitteella."},"pl":{"code":"Kod widoczny na iPhonie (ekran TV w Timer4Coachs)","connexion":"Łączenie…","reconnexion":"Ponowne łączenie…","refuse":"Odmowa dostępu","injoignable":"iPhone nieosiągalny","attente":"Rozpocznij sesję na iPhonie","appairage":"Na iPhonie otwórz ekran TV i zezwól na ten ekran","verification":"Weryfikacja","ancien":"Ta przeglądarka jest za stara. Otwórz link wysłany z iPhone'a na innym urządzeniu."},"cs":{"code":"Kód zobrazený v iPhonu (obrazovka TV v Timer4Coachs)","connexion":"Připojování…","reconnexion":"Opětovné připojování…","refuse":"Přístup odepřen","injoignable":"iPhone je nedostupný","attente":"Spusť lekci v iPhonu","appairage":"V iPhonu otevři obrazovku TV a povol tuto obrazovku","verification":"Ověření","ancien":"Tento prohlížeč je příliš starý. Otevři odkaz poslaný z iPhonu na jiném zařízení."},"el":{"code":"Κωδικός στο iPhone (οθόνη TV στο Timer4Coachs)","connexion":"Σύνδεση…","reconnexion":"Επανασύνδεση…","refuse":"Άρνηση πρόσβασης","injoignable":"Το iPhone δεν είναι διαθέσιμο","attente":"Ξεκίνα μια προπόνηση στο iPhone","appairage":"Στο iPhone άνοιξε την οθόνη TV και επίτρεψε αυτή την οθόνη","verification":"Επαλήθευση","ancien":"Αυτό το πρόγραμμα περιήγησης είναι πολύ παλιό. Άνοιξε τον σύνδεσμο από το iPhone σε άλλη συσκευή."},"ru":{"code":"Код на iPhone (экран ТВ в Timer4Coachs)","connexion":"Подключение…","reconnexion":"Переподключение…","refuse":"Доступ запрещён","injoignable":"iPhone недоступен","attente":"Начни тренировку на iPhone","appairage":"На iPhone открой экран ТВ и разреши этот экран","verification":"Проверка","ancien":"Этот браузер слишком старый. Открой ссылку, отправленную с iPhone, на другом устройстве."},"uk":{"code":"Код на iPhone (екран ТВ у Timer4Coachs)","connexion":"Під'єднання…","reconnexion":"Повторне під'єднання…","refuse":"Доступ заборонено","injoignable":"iPhone недоступний","attente":"Почни заняття на iPhone","appairage":"На iPhone відкрий екран ТВ і дозволь цей екран","verification":"Перевірка","ancien":"Цей браузер застарий. Відкрий посилання, надіслане з iPhone, на іншому пристрої."},"tr":{"code":"iPhone'da görünen kod (Timer4Coachs TV ekranı)","connexion":"Bağlanıyor…","reconnexion":"Yeniden bağlanıyor…","refuse":"Erişim reddedildi","injoignable":"iPhone'a ulaşılamıyor","attente":"iPhone'da bir seans başlat","appairage":"iPhone'da TV ekranını aç ve bu ekrana izin ver","verification":"Doğrulama","ancien":"Bu tarayıcı çok eski. iPhone'dan gönderilen bağlantıyı başka bir cihazda aç."},"ar":{"code":"الرمز الظاهر على الـ iPhone (شاشة التلفاز في Timer4Coachs)","connexion":"جارٍ الاتصال…","reconnexion":"جارٍ إعادة الاتصال…","refuse":"تم رفض الوصول","injoignable":"تعذّر الوصول إلى الـ iPhone","attente":"ابدأ حصة على الـ iPhone","appairage":"على الـ iPhone، افتح شاشة التلفاز واسمح بهذه الشاشة","verification":"التحقّق","ancien":"هذا المتصفح قديم جدًا. افتح الرابط المُرسل من الـ iPhone على جهاز آخر."},"he":{"code":"הקוד שמופיע באייפון (מסך הטלוויזיה ב-Timer4Coachs)","connexion":"מתחבר…","reconnexion":"מתחבר מחדש…","refuse":"הגישה נדחתה","injoignable":"האייפון לא זמין","attente":"התחל אימון באייפון","appairage":"באייפון, פתח את מסך הטלוויזיה ואשר את המסך הזה","verification":"אימות","ancien":"הדפדפן הזה ישן מדי. פתח את הקישור שנשלח מהאייפון במכשיר אחר."},"hi":{"code":"iPhone पर दिखा कोड (Timer4Coachs की टीवी स्क्रीन)","connexion":"जुड़ रहा है…","reconnexion":"फिर से जुड़ रहा है…","refuse":"पहुँच अस्वीकृत","injoignable":"iPhone तक नहीं पहुँच पा रहे","attente":"iPhone पर सत्र शुरू करो","appairage":"iPhone पर टीवी स्क्रीन खोलो और इस स्क्रीन को अनुमति दो","verification":"सत्यापन","ancien":"यह ब्राउज़र बहुत पुराना है। iPhone से भेजा लिंक किसी दूसरे डिवाइस पर खोलो।"},"ja":{"code":"iPhone に表示されたコード（Timer4Coachs のテレビ画面）","connexion":"接続中…","reconnexion":"再接続中…","refuse":"アクセスが拒否されました","injoignable":"iPhone に接続できません","attente":"iPhone でセッションを開始してください","appairage":"iPhone でテレビ画面を開き、この画面を許可してください","verification":"確認番号","ancien":"このブラウザは古すぎます。iPhone から送ったリンクを別の端末で開いてください。"},"ko":{"code":"iPhone에 표시된 코드 (Timer4Coachs의 TV 화면)","connexion":"연결 중…","reconnexion":"다시 연결 중…","refuse":"접근이 거부됨","injoignable":"iPhone에 연결할 수 없음","attente":"iPhone에서 세션을 시작하세요","appairage":"iPhone에서 TV 화면을 열고 이 화면을 허용하세요","verification":"확인 번호","ancien":"이 브라우저는 너무 오래되었습니다. iPhone에서 보낸 링크를 다른 기기에서 여세요."},"zh-Hans":{"code":"iPhone 上显示的代码（Timer4Coachs 的电视界面）","connexion":"正在连接…","reconnexion":"正在重新连接…","refuse":"访问被拒绝","injoignable":"无法连接 iPhone","attente":"请在 iPhone 上开始课程","appairage":"请在 iPhone 上打开电视界面并允许此屏幕","verification":"验证码","ancien":"此浏览器版本太旧。请在其他设备上打开 iPhone 发送的链接。"},"zh-Hant":{"code":"iPhone 上顯示的代碼（Timer4Coachs 的電視畫面）","connexion":"正在連線…","reconnexion":"正在重新連線…","refuse":"存取被拒","injoignable":"無法連線到 iPhone","attente":"請在 iPhone 上開始課程","appairage":"請在 iPhone 上開啟電視畫面並允許此螢幕","verification":"驗證碼","ancien":"此瀏覽器版本太舊。請在其他裝置上開啟 iPhone 傳送的連結。"},"ckb":{"code":"کۆدی سەر iPhone (شاشەی تەلەفزیۆنی Timer4Coachs)","connexion":"پەیوەندی دەکرێت…","reconnexion":"دووبارە پەیوەندی دەکرێت…","refuse":"ڕێگە نەدرا","injoignable":"iPhone بەردەست نییە","attente":"وانەیەک لەسەر iPhone دەست پێ بکە","appairage":"لەسەر iPhone شاشەی تەلەفزیۆن بکەرەوە و ڕێگە بەم شاشەیە بدە","verification":"پشتڕاستکردنەوە","ancien":"ئەم وێبگەڕە زۆر کۆنە. بەستەری نێردراو لە iPhone لەسەر ئامێرێکی تر بکەرەوە."},"ku":{"code":"Koda li ser iPhone (ekrana TV ya Timer4Coachs)","connexion":"Tê girêdan…","reconnexion":"Ji nû ve tê girêdan…","refuse":"Destûr nehat dayîn","injoignable":"iPhone nayê gihîştin","attente":"Li ser iPhone dersekê dest pê bike","appairage":"Li ser iPhone ekrana TV veke û destûrê bide vê ekranê","verification":"Piştrastkirin","ancien":"Ev gerok pir kevn e. Girêdana ji iPhone hatî şandin li ser amûreke din veke."}};
  var ALPHABET = /^[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{6}$/;
  var moi = "e" + Math.random().toString(36).slice(2, 10);
  var code = null, ws = null, ref = 0, joinRef = null, battement = null, attente = 1000;
  // Sécurité : l'iPhone chiffre chaque état (AES-GCM) avec une clé secrète. La page la reçoit par le lien
  // (#CODE.CLE, jamais envoyé à un serveur) ou, ouverte avec le seul code, en se faisant autoriser sur l'iPhone
  // (échange ECDH P-256, nombre de vérification affiché des deux côtés). Sans la clé, rien ne s'affiche.
  var subtil = window.crypto && window.crypto.subtle;
  var CLE = /^[A-Za-z0-9_-]{43}$/;
  var cleBrute = null, cleAes = null, dernierT = 0, appairage = null, saisieOuverte = false;
  var etat = null, recuA = 0, dernierMessage = 0;
  // Logo de la salle : reçu à part (message « logo »), affiché tant que l'état annonce la même empreinte.
  var logoId = "", logoDemande = 0;

  function $(id) { return document.getElementById(id); }
  // Langue : celle de l'iPhone (gardée pour les prochaines ouvertures), sinon celle du navigateur.
  function choisirLangue(l) {
    if (!l) return null;
    l = String(l).replace("_", "-");
    if (TEXTES[l]) return l;
    var b = l.split("-")[0].toLowerCase();
    if (b === "zh") return /Hant|TW|HK|MO/i.test(l) ? "zh-Hant" : "zh-Hans";
    if (b === "pt") return /PT/.test(l) ? "pt-PT" : "pt-BR";
    if (b === "no" || b === "nn") return "nb";
    return TEXTES[b] ? b : null;
  }
  var langue = null;
  try { langue = choisirLangue(localStorage.getItem("langueTV")); } catch (e) {}
  langue = langue || choisirLangue(navigator.language || navigator.userLanguage) || "fr";
  function tr(k) { return (TEXTES[langue] || TEXTES.fr)[k]; }
  function appliquerLangue(l) {
    var c = choisirLangue(l);
    if (!c || c === langue) return;
    langue = c;
    try { localStorage.setItem("langueTV", c); } catch (e) {}
    document.documentElement.lang = c;
    document.documentElement.dir = /^(ar|he|ckb)$/.test(c) ? "rtl" : "ltr";
    texte($("consigneCode"), tr("code"));
  }
  var montree = null;
  function montrer(id) {
    if (id !== montree) { montree = id; var l = $("liaison"); if (l.className.indexOf("ok") === 0) l.className = id === "seance" ? "ok discret" : "ok"; }
    var ids = ["accueil", "message", "seance"];
    for (var i = 0; i < ids.length; i++) $(ids[i]).className = ids[i] === id ? (id === "seance" ? "" : "centre") : (ids[i] === "seance" ? "cache" : "centre cache");
  }
  function texte(el, t) { if (el.textContent !== t) el.textContent = t; }
  function chrono(s) {
    var v = Math.max(0, Math.ceil(s - 1e-6));
    var m = Math.floor(v / 60), r = v % 60;
    return m + ":" + (r < 10 ? "0" : "") + r;
  }
  function liaison(ok, t) { var l = $("liaison"); l.className = ok ? (montree === "seance" ? "ok discret" : "ok") : ""; texte(l, t); }

  // Code : dans l'adresse (#K7M2QX.CLE), sinon saisi à la télécommande puis gardé.
  function valider() {
    var c = $("champ").value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!ALPHABET.test(c)) { $("champ").value = ""; return false; }
    saisieOuverte = false;
    if (c === code) brancher(c, null); else location.hash = c;
    return false;
  }
  // OK de la télécommande sur un écran d'attente : revenir à la saisie du code.
  function ouvrirSaisie() {
    saisieOuverte = true;
    montrer("accueil");
    $("champ").value = code || "";
    try { $("champ").focus(); } catch (e) {}
  }
  document.addEventListener("keydown", function (ev) {
    var k = ev.key || ev.keyCode;
    if (!saisieOuverte && (k === "Enter" || k === 13) && $("seance").className === "cache") { ev.preventDefault && ev.preventDefault(); ouvrirSaisie(); }
  });
  $("message").onclick = function () { if (!saisieOuverte) ouvrirSaisie(); };
  $("saisie").onsubmit = function (ev) { if (ev && ev.preventDefault) ev.preventDefault(); return valider(); };
  function lireCode() {
    var h = (location.hash || "").replace("#", "").split(".");
    var c = (h[0] || "").toUpperCase(), k = CLE.test(h[1] || "") ? h[1] : null;
    if (!ALPHABET.test(c)) { k = null; try { c = localStorage.getItem("codeTV") || ""; } catch (e) { c = ""; } }
    return ALPHABET.test(c) ? { code: c, cle: k } : null;
  }
  window.onhashchange = function () { var l = lireCode(); if (l && (l.code !== code || l.cle)) brancher(l.code, l.cle); };

  // Base64url <-> octets.
  function versOctets(s) {
    var b = atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4));
    var o = new Uint8Array(b.length);
    for (var i = 0; i < b.length; i++) o[i] = b.charCodeAt(i);
    return o;
  }
  function versTexte64(o) {
    o = new Uint8Array(o);
    var b = "";
    for (var i = 0; i < o.length; i++) b += String.fromCharCode(o[i]);
    return btoa(b).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function utf8(o) { return decodeURIComponent(escape(String.fromCharCode.apply(null, new Uint8Array(o)))); }
  function octetsTexte(t) { var u = unescape(encodeURIComponent(t)), o = new Uint8Array(u.length); for (var i = 0; i < u.length; i++) o[i] = u.charCodeAt(i); return o; }

  // Clé des écrans : gardée pour ce code, prête pour AES-GCM.
  function prendreCle(k) {
    cleBrute = k; cleAes = null; dernierT = 0;
    if (!k || !subtil) return;
    subtil.importKey("raw", versOctets(k), { name: "AES-GCM" }, false, ["decrypt"]).then(function (c) {
      if (cleBrute === k) { cleAes = c; envoyer("broadcast", { type: "broadcast", event: "bonjour", payload: { ecran: moi } }); }
    }, function () {});
  }
  function dechiffrer(m) {
    ouvrir(m, 20000, function (d) {
      if (!d || typeof d.t !== "number" || d.t <= dernierT) return;
      var v = verifier(d.e);
      if (!v) return;
      dernierT = d.t;
      etat = v; recuA = Date.now(); dernierMessage = recuA;
      appliquerLangue(etat.langue);
      liaison(true, code);
    });
  }
  // Déchiffre un message de l'iPhone (AES-GCM, clé des écrans) puis passe son JSON à suite.
  function ouvrir(m, max, suite) {
    if (!cleAes || !m || typeof m.iv !== "string" || typeof m.ct !== "string" || m.ct.length > max || m.iv.length > 40) return;
    var c = cleAes;
    subtil.decrypt({ name: "AES-GCM", iv: versOctets(m.iv) }, c, versOctets(m.ct)).then(function (clair) {
      if (c !== cleAes) return;
      var d; try { d = JSON.parse(utf8(clair)); } catch (e) { return; }
      suite(d);
    }, function () {});
  }
  // Logo : JPEG en base64 (60 Ko au plus), affiché par une adresse data: (seule source d'image permise avec ce site).
  function recevoirLogo(m) {
    ouvrir(m, 90000, function (d) {
      var l = d && d.e;
      if (!l || typeof l.id !== "string" || !/^[0-9a-f]{12}$/.test(l.id) || typeof l.l !== "string" || l.l.length > 60000 || !/^[A-Za-z0-9+\/]+=*$/.test(l.l)) return;
      logoId = l.id;
      $("logo").src = "data:image/jpeg;base64," + l.l;
    });
  }

  // Autorisation sur l'iPhone : clé publique éphémère publiée toutes les 3 s, nombre de vérification affiché.
  function demarrerAppairage() {
    if (cleBrute || !subtil) return;
    if (appairage) { publierAppairage(); return; }
    var a = { pret: false };
    appairage = a;
    subtil.generateKey({ name: "ECDH", namedCurve: "P-256" }, false, ["deriveBits"]).then(function (paire) {
      return subtil.exportKey("raw", paire.publicKey).then(function (brut) {
        a.prive = paire.privateKey; a.pub = versTexte64(brut);
        return subtil.digest("SHA-256", brut);
      }).then(function (h) {
        var o = new Uint8Array(h);
        var n = ((o[0] * 16777216) + (o[1] << 16) + (o[2] << 8) + o[3]) % 1000000;
        var t = ("00000" + n).slice(-6);
        a.nombre = t.slice(0, 3) + " " + t.slice(3);
        a.pret = true;
        publierAppairage();
        a.minuteur = setInterval(publierAppairage, 3000);
      });
    }).then(null, function () { appairage = null; });
  }
  function publierAppairage() {
    if (appairage && appairage.pret && !cleBrute) envoyer("broadcast", { type: "broadcast", event: "appairage", payload: { ecran: moi, pub: appairage.pub } });
  }
  function arreterAppairage() { if (appairage && appairage.minuteur) clearInterval(appairage.minuteur); appairage = null; }
  function recevoirCle(m) {
    var a = appairage;
    if (!a || !a.prive || cleBrute || !m || m.ecran !== moi || typeof m.pub !== "string" || typeof m.iv !== "string" || typeof m.ct !== "string") return;
    var c0 = code;
    subtil.importKey("raw", versOctets(m.pub), { name: "ECDH", namedCurve: "P-256" }, false, []).then(function (sienne) {
      return subtil.deriveBits({ name: "ECDH", "public": sienne }, a.prive, 256);
    }).then(function (secret) {
      return subtil.importKey("raw", secret, "HKDF", false, ["deriveBits"]);
    }).then(function (base) {
      return subtil.deriveBits({ name: "HKDF", hash: "SHA-256", salt: octetsTexte("timer4coachs-tv"), info: octetsTexte(c0) }, base, 256);
    }).then(function (k) {
      return subtil.importKey("raw", k, { name: "AES-GCM" }, false, ["decrypt"]);
    }).then(function (k) {
      return subtil.decrypt({ name: "AES-GCM", iv: versOctets(m.iv) }, k, versOctets(m.ct));
    }).then(function (cle) {
      if (code !== c0 || appairage !== a || cle.byteLength !== 32) return;
      var k = versTexte64(cle);
      try { localStorage.setItem("cleTV", c0 + "." + k); } catch (e) {}
      arreterAppairage();
      prendreCle(k);
    }, function () {});
  }

  // Realtime Supabase (protocole Phoenix) : canal public « tv-CODE ».
  function envoyer(event, payload) {
    if (!ws || ws.readyState !== 1) return;
    ref++;
    ws.send(JSON.stringify({ topic: "realtime:tv-" + code, event: event, payload: payload, ref: String(ref), join_ref: joinRef }));
  }
  function brancher(c, k) {
    code = c;
    saisieOuverte = false;
    try { localStorage.setItem("codeTV", c); } catch (e) {}
    // La clé ne reste pas dans l'adresse : elle est gardée pour ce code seulement.
    if (k) { try { localStorage.setItem("cleTV", c + "." + k); } catch (e) {} }
    else { var g = null; try { g = (localStorage.getItem("cleTV") || "").split("."); } catch (e) {} k = g && g[0] === c && CLE.test(g[1] || "") ? g[1] : null; }
    if (location.hash !== "#" + c) history.replaceState(null, "", "#" + c);
    arreterAppairage();
    prendreCle(k);
    etat = null;
    afficherMessage("Timer4Coachs", "…", c);
    connecter();
  }
  function connecter() {
    if (ws) { ws.onclose = null; try { ws.close(); } catch (e) {} }
    clearInterval(battement);
    liaison(false, tr("connexion"));
    ws = new WebSocket(URL_WS);
    ws.onopen = function () {
      attente = 1000;
      ref++; joinRef = String(ref);
      ws.send(JSON.stringify({ topic: "realtime:tv-" + code, event: "phx_join", ref: joinRef, join_ref: joinRef,
        payload: { config: { broadcast: { ack: false, self: false }, presence: { key: moi }, "private": true } } }));
      battement = setInterval(function () {
        ref++;
        ws.send(JSON.stringify({ topic: "phoenix", event: "heartbeat", payload: {}, ref: String(ref) }));
      }, 25000);
    };
    ws.onmessage = function (m) {
      if (typeof m.data !== "string" || m.data.length > 100000) return;
      var d; try { d = JSON.parse(m.data); } catch (e) { return; }
      if (d.event === "phx_reply" && d.ref === joinRef) {
        if (d.payload && d.payload.status === "ok") {
          liaison(true, code);
          envoyer("presence", { type: "presence", event: "track", payload: { ecran: moi } });
          if (cleAes) envoyer("broadcast", { type: "broadcast", event: "bonjour", payload: { ecran: moi } });
          else demarrerAppairage();
        } else liaison(false, tr("refuse"));
      } else if (d.event === "broadcast" && d.payload && d.payload.event === "etat") {
        dechiffrer(d.payload.payload);
      } else if (d.event === "broadcast" && d.payload && d.payload.event === "logo") {
        recevoirLogo(d.payload.payload);
      } else if (d.event === "broadcast" && d.payload && d.payload.event === "cle") {
        recevoirCle(d.payload.payload);
      }
    };
    ws.onclose = function () {
      clearInterval(battement);
      liaison(false, tr("reconnexion"));
      setTimeout(connecter, attente);
      attente = Math.min(attente * 2, 10000);
    };
    ws.onerror = function () { try { ws.close(); } catch (e) {} };
  }

  // Message reçu : n'importe qui ayant le code peut écrire sur le canal. On ne garde que des champs
  // du bon type et de taille bornée ; le reste est ignoré (texte seulement, jamais de HTML ni d'adresse).
  function chaine(v, n) { return typeof v === "string" ? v.slice(0, n) : ""; }
  function nombre(v, max) { return typeof v === "number" && isFinite(v) ? Math.min(max, Math.max(0, v)) : 0; }
  function verifier(p) {
    if (!p || typeof p !== "object" || Object.prototype.toString.call(p) === "[object Array]") return null;
    var t = p.textes && typeof p.textes === "object" ? p.textes : {}, textes = {};
    var cles = ["attente", "pause", "ensuite", "miRound", "fin", "coach"];
    for (var i = 0; i < cles.length; i++) textes[cles[i]] = chaine(t[cles[i]], 120);
    return {
      seance: typeof p.seance === "string" ? p.seance.slice(0, 200) : null,
      termine: p.termine === true, enMarche: p.enMarche === true,
      bloc: chaine(p.bloc, 120), libelle: chaine(p.libelle, 120),
      type: /^(travail|repos|consigne)$/.test(p.type) ? p.type : "travail",
      couleur: /^#[0-9A-Fa-f]{6}$/.test(p.couleur) ? p.couleur : "#8E9096",
      restant: nombre(p.restant, 86400), duree: nombre(p.duree, 86400), ecoule: nombre(p.ecoule, 86400), total: nombre(p.total, 86400),
      rang: Math.floor(nombre(p.rang, 999)), nb: Math.floor(nombre(p.nb, 999)),
      consigne: chaine(p.consigne, 300),
      salle: chaine(p.salle, 60), coach: chaine(p.coach, 60), logo: /^[0-9a-f]{12}$/.test(p.logo) ? p.logo : "",
      suivant: chaine(p.suivant, 120), dureeSuivant: nombre(p.dureeSuivant, 86400),
      miRound: typeof p.miRound === "string" ? p.miRound.slice(0, 120) : null,
      textes: textes, langue: chaine(p.langue, 20)
    };
  }

  function afficherMessage(titre, sous, c) {
    montrer("message");
    texte($("mTitre"), titre); texte($("mSous"), sous); texte($("mCode"), c || "");
  }

  // Dessin : 10 fois par seconde, le temps restant est décompté ici entre deux messages.
  function dessiner() {
    if (!code || saisieOuverte) return;
    if (!cleBrute) {
      if (!subtil) afficherMessage("Timer4Coachs", tr("ancien"), "");
      else afficherMessage("Timer4Coachs", tr("appairage"), appairage && appairage.nombre ? tr("verification") + " " + appairage.nombre : "");
      return;
    }
    if (!etat || Date.now() - dernierMessage > 15000) {
      afficherMessage("Timer4Coachs", etat && etat.textes ? etat.textes.attente : tr("attente"), code);
      if (etat && Date.now() - dernierMessage > 15000) liaison(false, tr("injoignable"));
      return;
    }
    var e = etat, t = e.textes || {};
    if (!e.seance) { afficherMessage("Timer4Coachs", t.attente || "", code); return; }
    if (e.termine) { afficherMessage(t.fin || "", e.seance, ""); return; }
    montrer("seance");
    entete(e, t);
    var passe = e.enMarche ? (Date.now() - recuA) / 1000 : 0;
    var restant = Math.max(0, e.restant - passe), ecoule = Math.min(e.total, e.ecoule + passe);
    var p = e.duree > 0 ? Math.min(1, Math.max(0, 1 - restant / e.duree)) : 0;
    var racine = document.documentElement;
    if (racine.style.getPropertyValue("--c") !== e.couleur) {
      racine.style.setProperty("--c", e.couleur);
      racine.style.setProperty("--h", melange(e.couleur, 0.26));
    }
    $("cadran").className = e.type === "consigne" ? "consigne" : "";
    var largeur = $("cadran").clientWidth;
    $("remplissage").style.width = e.type === "travail" ? (p * 100) + "%" : "0";
    $("hachures").style.width = e.type === "repos" ? (p * 100) + "%" : "0";
    var cs = [$("c1"), $("c2")];
    for (var i = 0; i < 2; i++) {
      cs[i].style.width = largeur + "px";
      texte(cs[i].querySelector(".bloc"), e.bloc);
      texte(cs[i].querySelector(".rang"), e.nb > 1 ? e.rang + "/" + e.nb : "");
      texte(cs[i].querySelector(".temps"), chrono(restant));
      texte(cs[i].querySelector(".lib"), e.libelle);
    }
    $("pause").className = e.enMarche ? "cache" : "";
    texte($("pause"), t.pause || "");
    ligne(e.consigne);
    texte($("ensuite"), e.suivant ? t.ensuite || "" : "");
    texte($("suivant"), e.suivant);
    texte($("dureeSuivant"), e.dureeSuivant > 0 ? chrono(e.dureeSuivant) : "");
    $("barre").firstChild.style.width = (e.total > 0 ? Math.min(100, ecoule / e.total * 100) : 0) + "%";
    $("mi").className = e.miRound ? "" : "cache";
    texte($("miT"), t.miRound || ""); texte($("miM"), e.miRound || "");
  }
  // Bandeau : logo (s'il est arrivé et que c'est le bon), nom de la salle, coach. Absent si l'iPhone n'envoie rien.
  function entete(e, t) {
    var logoOk = e.logo !== "" && e.logo === logoId;
    if (e.logo !== "" && !logoOk && Date.now() - logoDemande > 10000) {
      logoDemande = Date.now();
      envoyer("broadcast", { type: "broadcast", event: "bonjour", payload: { ecran: moi } });
    }
    var avec = logoOk || e.salle !== "" || e.coach !== "";
    $("seance").className = avec ? "avecEntete" : "";
    $("entete").className = avec ? "" : "cache";
    $("logo").className = logoOk ? "" : "cache";
    texte($("salle"), e.salle);
    $("coach").className = e.coach ? "" : "cache";
    texte($("etiqCoach"), t.coach || "Coach");
    texte($("nomCoach"), e.coach);
  }

  // Ligne de la consigne : elle défile (après 2 s d'arrêt sur le début) quand elle ne tient pas sur la largeur.
  var defile = { texte: null, actif: false, largeur: 0, debut: 0 };
  function ligne(c) {
    if (c !== defile.texte) {
      defile.texte = c; defile.debut = Date.now();
      texte($("consigne"), c); texte($("copie"), c);
    }
    var largeur = $("consigne").offsetWidth, actif = largeur > $("defile").clientWidth + 1;
    if (actif !== defile.actif) {
      defile.actif = actif; defile.debut = Date.now();
      $("copie").className = actif ? "" : "cache";
      if (actif) image(animer); else decaler(0);
    }
    defile.largeur = largeur;
  }
  var image = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (f) { return setTimeout(f, 16); };
  function animer() {
    if (!defile.actif || $("seance").className === "cache") { defile.actif = false; decaler(0); $("copie").className = "cache"; return; }
    var vitesse = window.innerHeight * 0.09, pause = 2000;
    var parcours = $("copie").offsetWidth;
    var cycle = pause + parcours / vitesse * 1000;
    var t = (Date.now() - defile.debut) % cycle;
    decaler(t < pause ? 0 : (t - pause) / 1000 * vitesse);
    image(animer);
  }
  function decaler(x) {
    var v = "translateX(" + (document.documentElement.dir === "rtl" ? x : -x) + "px)";
    var s = [$("consigne").style, $("copie").style];
    for (var i = 0; i < 2; i++) { s[i].transform = v; s[i].webkitTransform = v; }
  }

  // Couleur de la phase mêlée au noir, comme les hachures de l'iPhone.
  function melange(hex, t) {
    var n = parseInt(hex.replace("#", ""), 16), a = [11, 11, 12];
    var c = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    var r = [];
    for (var i = 0; i < 3; i++) r.push(Math.round(a[i] * (1 - t) + c[i] * t));
    return "rgb(" + r.join(",") + ")";
  }

  // Écran toujours allumé, là où le navigateur le permet.
  function garderAllume() {
    try { if (navigator.wakeLock) navigator.wakeLock.request("screen").then(function (v) { v.addEventListener("release", function () {}); }, function () {}); } catch (e) {}
  }
  document.addEventListener("visibilitychange", function () { if (!document.hidden) garderAllume(); });

  document.documentElement.lang = langue;
  document.documentElement.dir = /^(ar|he|ckb)$/.test(langue) ? "rtl" : "ltr";
  texte($("consigneCode"), tr("code"));
  var c0 = lireCode();
  if (c0) brancher(c0.code, c0.cle); else { montrer("accueil"); liaison(false, ""); try { $("champ").focus(); } catch (e) {} }
  garderAllume();
  setInterval(dessiner, 100);
})();
