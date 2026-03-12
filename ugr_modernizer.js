// Diccionario de webs y sus scripts correspondientes
const automatizacion = [
    {
        urlFragmento: "ugr.es/~pjara/D/Docen14/TR/index.htm",
        scriptUrl: "https://moradtest.github.io/mrd-prueba/ugr_modernizer.js"
    }
];

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    // Solo actuamos cuando la página termina de cargar
    if (changeInfo.status === 'complete' && tab.url) {
        
        // Buscamos si la URL actual necesita algún script automático
        const configuracion = automatizacion.find(item => tab.url.includes(item.urlFragmento));

        if (configuracion) {
            console.log("Web detectada. Aplicando script automático...");
            try {
                const res = await fetch(configuracion.scriptUrl);
                const codigo = await res.text();

                await browser.scripting.executeScript({
                    target: { tabId: tabId },
                    func: (code) => {
                        const s = document.createElement('script');
                        s.textContent = code;
                        document.documentElement.appendChild(s);
                        s.remove();
                    },
                    args: [codigo]
                });
            } catch (e) {
                console.error("Error en la auto-inyección:", e);
            }
        }
    }
});
