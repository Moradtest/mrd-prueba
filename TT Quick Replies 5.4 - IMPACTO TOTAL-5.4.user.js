// ==UserScript==
// @name         TT Quick Replies 5.4 - IMPACTO TOTAL
// @namespace    https://t.corp.amazon.com/
// @version      5.4
// @description  TT Replies – versión completa y moderna para pruebas
// @match        https://www.ugr.es/~pjara/D/Docen14/TR/index.htm
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // ================== RESPUESTAS ==================
    const replies = [
        { category: "Inventario", key: 'Accion completa', text: "Hi,\nDone as requested.\nRegards," },
        { category: "Inventario", key: 'DP match', text: "Hi,\nThe product on hand matches the DP.\nAttached photos.\n\nRegards" },
        { category: "Inventario", key: 'DP mismatch', text: "Hi,\nThe product does not match the DP.\nAttached photos.\n\nRegards" },
        { category: "Problemas", key: 'Serial issue', text: "Hi,\nThere is a problem with the serial number; it is not possible to change the unit to SEALABLE.\nImages attached.\nRegards," },
        { category: "General", key: 'Any updates', text: "Hello team,\nAny updates?\nThanks," },
        { category: "General", key: 'No inventory', text: "Hi,\nWe do not have inventory of the item.\nRegards," },
        { category: "DEFECTIVE", key: 'DEFECTIVE – INACTS', text: `Dear,\nRegarding units in DEFECTIVE status at BCN4:\nUnits marked as DEFECTIVE are controlled by automated systems and cannot be modified locally from BCN4.\nProcedure: contact Product Compliance team.\nBest regards,` },
        { category: "DEFECTIVE", key: 'ASIN restored', text: "Hello!\nUnits marked as DEFECTIVE cannot be converted to SEALABLE from BCN4.\nPlease contact Product Compliance.\nRegards" }
        // Puedes añadir más aquí...
    ];

    // ================== ESTILO ==================
    const style = document.createElement('style');
    style.textContent = `
        #tt-panel { position: fixed; bottom: 90px; right: 20px; width: 450px; max-height: 70vh; overflow-y: auto;
                    background: #f9f9f9; border-radius: 10px; padding: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.25); font-family: sans-serif; z-index: 9999; display: none;}
        #tt-panel input { width: 100%; padding: 6px 10px; margin-bottom: 10px; border-radius: 6px; border: 1px solid #ccc; }
        .tt-category { font-weight: bold; margin: 10px 0 5px; cursor: pointer; user-select: none; }
        .tt-category.open + .tt-list { display: block; }
        .tt-list { display: none; padding-left: 0; list-style: none; margin-bottom: 10px; }
        .tt-list li { margin-bottom: 5px; }
        .tt-list button { width: 100%; padding: 6px; border-radius: 6px; border: 1px solid #888; cursor: pointer; background: #fff; transition: 0.2s; }
        .tt-list button:hover { background: #e0f0ff; border-color: #0073e6; }
        #tt-textarea { width: 90%; height: 180px; margin: 20px; font-size: 15px; padding: 8px; border-radius: 8px; border: 1px solid #aaa; }
        #tt-toggle { position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; border-radius: 50%; background: #232f3e; color: #fff; font-size: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10000; }
        .tt-copy { margin-left: 5px; font-size: 12px; color: #0073e6; cursor: pointer; }
    `;
    document.head.appendChild(style);

    // ================== TEXTAREA ==================
    const textarea = document.createElement('textarea');
    textarea.id = 'tt-textarea';
    textarea.placeholder = '🧪 Área de prueba – aquí se insertan las respuestas';
    document.body.appendChild(textarea);

    // ================== PANEL ==================
    const toggle = document.createElement('div');
    toggle.id = 'tt-toggle';
    toggle.textContent = '📬';
    document.body.appendChild(toggle);

    const panel = document.createElement('div');
    panel.id = 'tt-panel';
    document.body.appendChild(panel);

    const search = document.createElement('input');
    search.placeholder = 'Buscar respuesta...';
    panel.appendChild(search);

    const container = document.createElement('div');
    panel.appendChild(container);

    // ================== RENDER ==================
    function render(filter = '') {
        container.innerHTML = '';
        const categories = [...new Set(replies.map(r => r.category))];
        categories.forEach(cat => {
            const catBtn = document.createElement('div');
            catBtn.className = 'tt-category';
            catBtn.textContent = cat;
            catBtn.onclick = () => catBtn.classList.toggle('open');
            container.appendChild(catBtn);

            const list = document.createElement('ul');
            list.className = 'tt-list';
            replies.filter(r => r.category === cat &&
                (r.key.toLowerCase().includes(filter.toLowerCase()) || r.text.toLowerCase().includes(filter.toLowerCase()))
            ).forEach(r => {
                const li = document.createElement('li');
                const btn = document.createElement('button');
                btn.textContent = r.key;
                btn.onclick = () => textarea.value = r.text;

                const copyBtn = document.createElement('span');
                copyBtn.textContent = '📋';
                copyBtn.className = 'tt-copy';
                copyBtn.onclick = (e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(r.text);
                    alert('✅ Copiado al portapapeles');
                };

                li.appendChild(btn);
                li.appendChild(copyBtn);
                list.appendChild(li);
            });
            container.appendChild(list);
        });
    }

    render();
    search.oninput = () => render(search.value);

    toggle.onclick = () => {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    };

})();
