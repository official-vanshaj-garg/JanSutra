import { CheckSquare } from 'lucide-react';

export default function Checklist({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="card" aria-labelledby="checklist-heading">
      <h2 id="checklist-heading">Preparation Checklist</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item, index) => (
          <li key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            padding: '1rem',
            borderBottom: index !== items.length - 1 ? '1px solid var(--border-color)' : 'none'
          }}>
            <CheckSquare size={24} color="var(--primary)" aria-hidden="true" />
            <span style={{ fontSize: '1.1rem' }}>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
