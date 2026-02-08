<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>TT Quick Replies - Página de prueba</title>
<style>
  body { font-family: Arial, sans-serif; margin: 20px; background: #f0f0f0; }
  #textarea { width: 90%; height: 180px; margin: 20px 0; font-size: 15px; }
  #panel { position: fixed; bottom: 90px; right: 20px; width: 420px; max-height: 70vh; overflow-y: auto; background: #fff; border-radius: 10px; padding: 10px; display: none; box-shadow: 0 0 10px rgba(0,0,0,0.3); z-index: 1000; }
  #toggle { position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; border-radius: 50%; background: #232f3e; color: #fff; font-size: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1000; }
  button { width: 100%; margin-bottom: 6px; }
  input { width: 100%; margin-bottom: 8px; padding: 5px; font-size: 14px; }
</style>
</head>
<body>

<h1>TT Quick Replies - Página de prueba</h1>

<textarea id="textarea" placeholder="🧪 Área de prueba – aquí se insertan las respuestas"></textarea>

<div id="toggle">📬</div>
<div id="panel">
  <input type="text" id="search" placeholder="Buscar respuesta...">
  <div id="container"></div>
</div>

<script>
// ================== CARGAR RESPUESTAS DESDE JSON ==================
async function loadReplies() {
  try {
    const res = await fetch('replies.json');
    return await res.json();
  } catch (err) {
    console.error("No se pudo cargar replies.json", err);
    return [];
  }
}

// ================== INICIALIZAR ==================
const textarea = document.getElementById('textarea');
const toggle = document.getElementById('toggle');
const panel = document.getElementById('panel');
const container = document.getElementById('container');
const search = document.getElementById('search');

function setValue(el, value) {
  el.value = value;
  el.dispatchEvent(new Event('input', { bubbles: true }));
}

function renderReplies(replies, filter = '') {
  container.innerHTML = '';
  replies.filter(r => r.key.toLowerCase().includes(filter.toLowerCase()))
         .forEach(r => {
            const btn = document.createElement('button');
            btn.textContent = r.key;
            btn.onclick = () => setValue(textarea, r.text);
            container.appendChild(btn);
         });
}

// ================== BOTÓN Y BÚSQUEDA ==================
toggle.onclick = () => {
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
};

search.addEventListener('input', () => {
  renderReplies(window.allReplies, search.value);
});

// ================== CARGAR REPLIES ==================
loadReplies().then(data => {
  window.allReplies = data;
  renderReplies(data);
});
</script>

</body>
</html>
