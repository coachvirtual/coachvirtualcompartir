/* ============================================================
   CONTADOR GLOBAL DE VISITAS — Firebase Cloud Firestore
   ------------------------------------------------------------
   Registra una visita con App Check y muestra el total acumulado en la
   píldora #contador-visitas, junto al botón de Coach Bot.

   Documento usado: colección "estadisticas" → doc "contadorVisitas",
   campo "total". Requiere que Firestore esté creado y con reglas que
   permitan exclusivamente incrementos de +1 (ver firestore.rules).
   App Check debe estar configurado y exigido para Cloud Firestore.
   Sin la clave de App Check, solo se consulta el histórico.

   Si FIREBASE_CONFIG está incompleto, el contador no se muestra y
   no genera errores en consola (modo silencioso, igual que GA4).
   ============================================================ */
(function () {
    'use strict';

    var cfg = window.FIREBASE_CONFIG || {};
    var configurado = !!(cfg.apiKey && cfg.projectId);
    window.CONTADOR_ACTIVO = configurado;

    var FIREBASE_VERSION = '12.12.0';
    var COLECCION = 'estadisticas';
    var DOCUMENTO = 'contadorVisitas';
    var appCheckKey = window.COUNTER_APP_CHECK_SITE_KEY || '';

    function formatear(n) {
        try { return Number(n).toLocaleString('es-CO'); }
        catch (_) { return String(n); }
    }

    function mostrar(valor) {
        var wrap = document.getElementById('contador-visitas');
        if (!wrap) return;
        var num = document.getElementById('contador-visitas-num');
        if (num) num.textContent = formatear(valor);
        wrap.classList.remove('hidden');
        if (window.lucide && typeof lucide.createIcons === 'function') {
            try { lucide.createIcons({ nodes: [wrap] }); } catch (_) {}
        }
    }

    if (!configurado) {
        console.info('[Coach Virtual] Contador de visitas no configurado. Rellena FIREBASE_CONFIG para activarlo.');
        return;
    }

    function cargarScript(src) {
        return new Promise(function (resolve, reject) {
            var s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.onload = resolve;
            s.onerror = function () { reject(new Error('No se pudo cargar ' + src)); };
            document.head.appendChild(s);
        });
    }

    var base = 'https://www.gstatic.com/firebasejs/' + FIREBASE_VERSION + '/';

    cargarScript(base + 'firebase-app-compat.js')
        .then(function () { return cargarScript(base + 'firebase-firestore-compat.js'); })
        .then(function () {
            return appCheckKey ? cargarScript(base + 'firebase-app-check-compat.js') : undefined;
        })
        .then(function () {
            if (!window.firebase || !firebase.initializeApp) {
                throw new Error('SDK de Firebase no disponible');
            }
            if (!firebase.apps || !firebase.apps.length) {
                firebase.initializeApp(cfg);
            }
            var db  = firebase.firestore();
            var ref = db.collection(COLECCION).doc(DOCUMENTO);
            if (!appCheckKey) return ref.get();
            var appCheck = firebase.appCheck();
            appCheck.activate(new firebase.appCheck.ReCaptchaEnterpriseProvider(appCheckKey), true);
            // No escribir si el proveedor no ha emitido un token de App Check.
            return appCheck.getToken(false).then(function () {
                return ref.update({ total: firebase.firestore.FieldValue.increment(1) });
            }).catch(function (err) {
                console.warn('[Coach Virtual] No se registró la visita:', err && err.message);
            }).then(function () { return ref.get(); });
        })
        .then(function (snap) {
            var valor = (snap && snap.exists && snap.data()) ? snap.data().total : 0;
            if (!Number.isSafeInteger(valor) || valor < 0) return;
            mostrar(valor);
        })
        .catch(function (err) {
            // Falla de red, reglas, o Firestore no creado: no mostramos el contador.
            console.warn('[Coach Virtual] Contador de visitas no disponible:', err && err.message);
        });
})();
