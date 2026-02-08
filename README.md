<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>TT Quick Replies - Prueba Online</title>
<style>
body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #f4f4f4; }
textarea { width: 90%; height: 180px; margin: 20px auto; display: block; font-size: 15px; }
#tt-button { position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; border-radius: 50%; background: #232f3e; color: #fff; font-size: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10000; }
#tt-panel { position: fixed; bottom: 90px; right: 20px; width: 420px; max-height: 70vh; overflow-y: auto; background: #fff; border-radius: 10px; padding: 10px; display: none; z-index: 10001; box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
#tt-panel input { width: 100%; margin-bottom: 8px; padding: 6px; font-size: 14px; }
#tt-panel button { width: 100%; margin-bottom: 6px; padding: 8px; cursor: pointer; font-size: 14px; background: #e2e2e2; border: none; border-radius: 4px; text-align: left; }
#tt-panel button:hover { background: #d1d1d1; }
</style>
</head>
<body>

<h2 style="text-align:center;">TT Quick Replies - Área de prueba</h2>
<textarea id="tt-textarea" placeholder="🧪 Área de prueba – aquí se insertan las respuestas"></textarea>

<div id="tt-button">📬</div>
<div id="tt-panel">
  <input type="text" id="tt-search" placeholder="Buscar respuesta...">
  <div id="tt-container"></div>
</div>

<script>
// ================== RESPUESTAS ==================
const replies = [
  { key: 'Accion completa', text: "Hi,\nDone as requested.\nRegards," },
  { key: 'DP match', text: "Hi,\nThe product on hand matches the DP.\nAttached photos.\n\nRegards" },
  { key: 'DP mismatch', text: "Hi,\nThe product does not match the DP.\nAttached photos.\n\nRegards" },
  { key: 'No inventory', text: "Hi,\nWe do not have inventory of the item.\nRegards," },
  { key: 'Duplicate', text: "Hi,\nThe ticket is a duplicate of:\nRegards," },
  { key: 'Any updates', text: "Hello team,\nAny updates?\nThanks," },
  { key: 'Serial issue', text: "Hi,\nThere is a problem with the serial number; it is not possible to change the unit to SEALABLE.\nImages attached.\nRegards," }
];

// ================== FUNCIONES ==================
const textarea = document.getElementById('tt-textarea');
function setValue(text) {
  textarea.value = text;
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
}

const container = document.getElementById('tt-container');
const search = document.getElementById('tt-search');

function render(filter='') {
  container.innerHTML = '';
  replies.filter(r => r.key.toLowerCase().includes(filter.toLowerCase()))
         .forEach(r => {
           const btn = document.createElement('button');
           btn.textContent = r.key;
           btn.onclick = () => setValue(r.text);
           container.appendChild(btn);
         });
}

search.addEventListener('input', () => render(search.value));
render();

// ================== PANEL ==================
const panel = document.getElementById('tt-panel');
document.getElementById('tt-button').addEventListener('click', () => {
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
});
</script>

</body>
</html>
