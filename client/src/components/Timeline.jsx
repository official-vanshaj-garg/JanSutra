import { MapPin } from 'lucide-react';

export default function Timeline({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="card" aria-labelledby="timeline-heading">
      <h2 id="timeline-heading">Your Step-by-Step Path</h2>
      <div style={{ position: 'relative', paddingLeft: '2rem' }}>
        {/* Timeline Line */}
        <div style={{ 
          position: 'absolute', 
          left: '11px', 
          top: 0, 
          bottom: 0, 
          width: '2px', 
          backgroundColor: 'var(--border-color)' 
        }} aria-hidden="true" />

        {items.map((item, index) => (
          <div key={index} style={{ position: 'relative', marginBottom: '1.5rem' }}>
            {/* Timeline Dot */}
            <div style={{
              position: 'absolute',
              left: '-2rem',
              top: '4px',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              zIndex: 1
            }} aria-hidden="true">
              {index + 1}
            </div>
            
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--bg-color)', 
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} aria-hidden="true" />
                {item}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
