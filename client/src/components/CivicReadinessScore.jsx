export default function CivicReadinessScore({ scoreData }) {
  if (!scoreData) return null;

  return (
    <section className="card" aria-labelledby="readiness-heading">
      <h2 id="readiness-heading" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        Civic Learning Readiness: {scoreData.score}%
      </h2>
      
      <div style={{
        width: '100%',
        backgroundColor: 'var(--border-color)',
        borderRadius: 'var(--border-radius)',
        height: '24px',
        marginBottom: '1rem',
        overflow: 'hidden'
      }} aria-hidden="true">
        <div style={{
          width: `${scoreData.score}%`,
          backgroundColor: scoreData.score >= 80 ? '#166534' : 'var(--primary)',
          height: '100%',
          transition: 'width 0.5s ease-in-out'
        }}></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <h3>Included in your learning plan</h3>
          <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
            {(Array.isArray(scoreData?.completed) ? scoreData.completed : []).map((item, i) => (
              <li key={i} style={{ color: '#166534' }}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          {(Array.isArray(scoreData?.remaining) ? scoreData.remaining : []).length > 0 && (
            <>
              <h3>Recommended next steps</h3>
              <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
                {(Array.isArray(scoreData?.remaining) ? scoreData.remaining : []).map((item, i) => (
                  <li key={i} style={{ color: '#92400e' }}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, fontStyle: 'italic' }}>
        This is an educational learning indicator, not an official eligibility, voter status, deadline, or polling booth result. Always verify live election details through official election authority portals.
      </p>
    </section>
  );
}
