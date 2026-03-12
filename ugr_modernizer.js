(function () {
    'use strict';

    // borrar estructura original
    document.body.innerHTML = "";

    // crear layout nuevo
    const app = document.createElement("div");
    app.id = "mrd-app";

    app.innerHTML = `
        <header class="mrd-header">
            <h1>📚 Recursos Matemáticas</h1>
            <p>Versión moderna del sitio</p>
        </header>

        <main class="mrd-content">
            <div class="mrd-card">
                <h2>Material disponible</h2>
                <ul id="mrd-links"></ul>
            </div>
        </main>

        <footer class="mrd-footer">
            Script Tampermonkey personalizado
        </footer>
    `;

    document.body.appendChild(app);

    // recoger enlaces de la página original
    fetch(window.location.href)
        .then(r => r.text())
        .then(html => {

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const links = doc.querySelectorAll("a");

            const list = document.getElementById("mrd-links");

            links.forEach(link => {

                if(link.href){

                    const li = document.createElement("li");

                    li.innerHTML = `
                        <a href="${link.href}" target="_blank">
                        ${link.textContent || link.href}
                        </a>
                    `;

                    list.appendChild(li);
                }

            });

        });


    // estilos modernos
    const style = document.createElement("style");

    style.innerHTML = `

        body{
            margin:0;
            font-family:system-ui;
            background:#0f172a;
            color:white;
        }

        .mrd-header{
            background:#1e293b;
            padding:30px;
            text-align:center;
            border-bottom:1px solid #334155;
        }

        .mrd-content{
            max-width:900px;
            margin:auto;
            padding:40px;
        }

        .mrd-card{
            background:#1e293b;
            padding:25px;
            border-radius:10px;
            box-shadow:0 10px 30px rgba(0,0,0,0.4);
        }

        a{
            color:#38bdf8;
            text-decoration:none;
            font-weight:500;
        }

        li{
            margin:10px 0;
        }

        .mrd-footer{
            text-align:center;
            padding:20px;
            opacity:0.6;
        }

    `;

    document.head.appendChild(style);

})();