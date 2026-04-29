import { useState, useEffect } from 'react';
import { ExternalLink, AlertCircle } from 'lucide-react';

export default function OfficialLinks({ apiBase }) {
  const [links, setLinks] = useState(null);

  useEffect(() => {
    fetch(`${apiBase}/official-links`)
      .then(res => res.json())
      .then(data => setLinks(data))
      .catch(err => console.error(err));
  }, [apiBase]);

  if (!links) return null;

  return (
    <section className="card" aria-labelledby="official-heading">
      <h2 id="official-heading">Official Verification Panel</h2>
      
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#fffbeb', 
        border: '1px solid #fcd34d', 
        borderRadius: 'var(--border-radius)',
        marginBottom: '1rem',
        display: 'flex',
        gap: '1rem'
      }}>
        <AlertCircle color="#b45309" style={{ flexShrink: 0 }} aria-hidden="true" />
        <p style={{ margin: 0, color: '#92400e', fontSize: '0.95rem' }}>
          <strong>Important:</strong> JanSutra is an educational practice lab. We do not provide live election data or final deadlines. 
          You must verify your eligibility, polling booth details, and exact deadlines on the official Election Commission portals.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <a 
          href={links.votersPortal} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ textDecoration: 'none', justifyContent: 'flex-start' }}
        >
          <ExternalLink size={18} />
          Voters' Service Portal (Check Roll / Apply)
        </a>
        <a 
          href={links.eciWebsite} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-secondary"
          style={{ textDecoration: 'none', justifyContent: 'flex-start' }}
        >
          <ExternalLink size={18} />
          Election Commission of India (Main Website)
        </a>
      </div>
    </section>
  );
}
