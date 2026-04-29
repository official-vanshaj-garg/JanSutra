import { useState } from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export default function SatyaCheck({ apiBase }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/satya-check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ safe: false, intent: 'error', message: 'Connection failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card" aria-labelledby="satyacheck-heading">
      <h2 id="satyacheck-heading" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <ShieldCheck color="var(--primary)" />
        SatyaCheck Guardrail
      </h2>
      <p style={{ marginBottom: '1rem' }}>Test JanSutra's neutrality engine. Try asking for political opinions, exact deadlines, or sensitive data.</p>
      
      <form onSubmit={handleCheck} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="e.g., 'Who should I vote for?' or 'When exactly is the election?'"
          aria-label="Query for SatyaCheck"
          style={{ marginBottom: 0 }}
        />
        <button type="submit" className="btn" disabled={loading}>
          Test Query
        </button>
      </form>

      {result && (
        <div style={{ 
          padding: '1rem', 
          borderRadius: 'var(--border-radius)', 
          backgroundColor: result.safe ? '#dcfce7' : '#fee2e2',
          border: `1px solid ${result.safe ? '#86efac' : '#fca5a5'}`
        }} role="alert">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            {result.safe ? <ShieldCheck color="#166534" /> : <ShieldAlert color="#991b1b" />}
            <strong style={{ color: result.safe ? '#166534' : '#991b1b' }}>
              Status: {result.safe ? 'Safe (Educational)' : `Blocked (${result.intent})`}
            </strong>
          </div>
          {result.message && <p style={{ color: result.safe ? '#166534' : '#991b1b', margin: 0 }}>{result.message}</p>}
        </div>
      )}
    </section>
  );
}
