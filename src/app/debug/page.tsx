'use client';

import { useState } from 'react';

export default function DebugPage() {
  const [response, setResponse] = useState(null);

  const testApiMe = async () => {
    const res = await fetch('https://zombieland-api.onrender.com/api/me', {
      credentials: 'include',
    });
    const data = await res.json();
    setResponse(data);
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Debug Cookie / Auth</h1>
      <button
        onClick={testApiMe}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Test /api/me
      </button>
      {response && (
        <pre className="mt-4 bg-gray-100 p-2 rounded">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </main>
  );
}
