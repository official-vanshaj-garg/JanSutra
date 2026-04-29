import { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function AssistantPanel({ apiBase, context }) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/assistant/explain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context, question })
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({
        answer: "Failed to connect to the assistant.",
        safetyCategory: "error",
        usedFallback: true,
        officialVerificationRequired: true
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card" aria-labelledby="assistant-heading">
      <h2 id="assistant-heading" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Sparkles color="var(--primary)" />
        Ask JanSutra
      </h2>
      <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
        Educational AI Assistant. Ask questions about the election process.
      </p>

      <form onSubmit={handleAsk} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input 
          type="text" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          placeholder="e.g., How does the VVPAT machine work?"
          aria-label="Ask an election process question"
          style={{ marginBottom: 0 }}
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </form>

      {response && (
        <div style={{ padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
          <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{response.answer}</p>
          
          {response.officialVerificationRequired && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fffbeb', border: '1px solid #fcd34d', borderRadius: '4px', display: 'flex', gap: '0.5rem', fontSize: '0.9rem' }}>
              <AlertCircle size={16} color="#b45309" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ color: '#92400e' }}>
                Please verify live deadlines, eligibility rules, and polling booth locations on official Election Commission portals.
              </span>
            </div>
          )}
          
          {response.usedFallback && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Note: Responded using deterministic safety fallback ({response.safetyCategory}).
            </div>
          )}
        </div>
      )}
    </section>
  );
}
