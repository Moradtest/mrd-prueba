chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes("ugr.es")) {
        try {
            const url = "https://moradtest.github.io/mrd-prueba/ugr_modernizer.js";
            const res = await fetch(url);
            const codigo = await res.text();

            await chrome.scripting.executeScript({
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
            console.error("Error en Edge:", e);
        }
    }
});
