require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs' }});
require(['vs/editor/editor.main'], function() {
  const editor = monaco.editor.create(document.getElementById('editor'), {
    value: '// Tulis kode di sini\nfunction hello(){ console.log("hello"); }',
    language: 'javascript',
    theme: 'vs-light',
    automaticLayout: true
  });

  document.getElementById('save').onclick = async () => {
    const content = editor.getValue();
    await fetch('/api/ingest/snippet', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ language: 'javascript', filename: 'monaco-snippet.js', content })
    });
    alert('Saved to local SQLite');
  };

  document.getElementById('run').onclick = async () => {
    const code = editor.getValue();
    const res = await fetch('/api/exec/run', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ language: 'javascript', code })
    });
    const j = await res.json();
    document.getElementById('out').textContent = JSON.stringify(j, null, 2);
  };
});

