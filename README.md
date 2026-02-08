
// ==UserScript==
// @name         TT Quick Replies vNext
// @namespace    https://t.corp.amazon.com/
// @version      6.0
// @description  TT Replies – con JSON interno
// @match        https://www.ugr.es/~pjara/D/Docen14/TR/index.htm
// @grant        GM_getResourceText
// @resource     repliesJSON https://tucdn.com/respuestas.json
// ==/UserScript==

(function() {
    'use strict';

    // ================== CARGAR JSON ==================
    const repliesText = GM_getResourceText("repliesJSON");
    const replies = JSON.parse(repliesText);

    console.log("Respuestas cargadas:", replies);

    // ================== AQUI VA EL SCRIPT ORIGINAL ==================
    // Tu textarea, panel, botones, etc.
})();
