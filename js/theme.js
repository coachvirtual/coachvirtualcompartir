/* Shared by the portal and its same-origin resource pages. Apply before paint. */
(() => {
    const key = 'compartir-theme';
    const system = matchMedia('(prefers-color-scheme: dark)');
    let preference;
    try { preference = localStorage.getItem(key); } catch (_) { /* Private storage. */ }
    function apply(theme) {
        document.documentElement.dataset.theme = theme;
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = theme === 'dark' ? '#191c36' : '#f5f4fa';
        document.querySelectorAll('[data-theme-toggle]').forEach(button => {
            button.setAttribute('aria-label', theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro');
            button.setAttribute('aria-pressed', String(theme === 'dark'));
            button.textContent = theme === 'dark' ? '☀' : '☾';
            button.title = theme === 'dark' ? 'Cambiar a claro' : 'Cambiar a oscuro';
        });
    }
    function toggle() {
        preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem(key, preference); } catch (_) { /* Keep this session. */ }
        apply(preference);
        document.querySelectorAll('iframe').forEach(frame => {
            try { frame.contentWindow.postMessage({ type: 'compartir-theme', theme: preference }, location.origin); } catch (_) { /* External media. */ }
        });
    }
    apply(preference === 'light' || preference === 'dark' ? preference : system.matches ? 'dark' : 'light');
    document.addEventListener('DOMContentLoaded', () => {
        if (window === window.top && !document.querySelector('[data-theme-toggle]')) {
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.themeToggle = '';
            button.className = 'theme-toggle resource-theme-toggle';
            document.body.append(button);
        }
        apply(document.documentElement.dataset.theme);
        document.querySelectorAll('[data-theme-toggle]').forEach(button => button.addEventListener('click', toggle));
    });
    addEventListener('storage', event => {
        if (event.key === key) { preference = event.newValue; apply(preference || (system.matches ? 'dark' : 'light')); }
    });
    addEventListener('message', event => {
        if (event.origin === location.origin && event.source === parent && event.data?.type === 'compartir-theme' && ['light', 'dark'].includes(event.data.theme)) apply(event.data.theme);
    });
    system.addEventListener('change', event => { if (!preference) apply(event.matches ? 'dark' : 'light'); });
})();
