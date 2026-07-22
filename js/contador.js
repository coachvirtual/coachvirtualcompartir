/* ============================================================
   CONTADOR GLOBAL DE VISITAS — Firebase Cloud Firestore
   ------------------------------------------------------------
   Suma +1 cada vez que se abre o recarga la página y muestra el
   total acumulado (compartido entre TODOS los visitantes) en la
   píldora #contador-visitas, junto al botón de Coach Bot.

   Documento usado: colección "estadisticas" → doc "contadorVisitas",
   campo "total". Requiere que Firestore esté creado y con reglas que
   permitan leer/incrementar ese documento (ver index.html).

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
            if (!window.firebase || !firebase.initializeApp) {
                throw new Error('SDK de Firebase no disponible');
            }
            if (!firebase.apps || !firebase.apps.length) {
                firebase.initializeApp(cfg);
            }
            var db  = firebase.firestore();
            var ref = db.collection(COLECCION).doc(DOCUMENTO);
            // Incremento atómico del servidor (crea el campo si no existe).
            return ref.set(
                { total: firebase.firestore.FieldValue.increment(1) },
                { merge: true }
            ).then(function () {
                return ref.get();
            });
        })
        .then(function (snap) {
            var valor = (snap && snap.exists && snap.data()) ? (snap.data().total || 0) : 0;
            mostrar(valor);
        })
        .catch(function (err) {
            // Falla de red, reglas, o Firestore no creado: no mostramos el contador.
            console.warn('[Coach Virtual] Contador de visitas no disponible:', err && err.message);
        });
})();
