'use client';

import { useState } from 'react';

export default function DebugPage() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testApiMe = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://zombieland-api.onrender.com/api/me', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: 'Erreur réseau ou CORS' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Debug Auth - Cookie Test</h1>
      <button
        onClick={testApiMe}
        style={{
          padding: '10px 20px',
          background: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer',
          marginTop: 10,
        }}
      >
        Tester /api/me
      </button>

      {loading && <p>Chargement...</p>}

      {response && (
        <pre
          style={{
            marginTop: 20,
            padding: 10,
            background: '#f0f0f0',
            borderRadius: 5,
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
        >
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </main>
  );
}
