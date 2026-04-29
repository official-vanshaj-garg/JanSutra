import { Eye, EyeOff } from 'lucide-react';

export default function Header({ sahajMode, toggleSahaj }) {
  return (
    <header className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h1 style={{ marginBottom: '0.2rem' }}>JanSutra</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Thread your way through the election process.</p>
        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: '500' }}>
          Educational Assistant • Not an Official Authority
        </p>
      </div>
      
      <button 
        className="btn btn-secondary" 
        onClick={toggleSahaj}
        aria-pressed={sahajMode}
        aria-label={sahajMode ? "Disable Sahaj simple mode" : "Enable Sahaj simple mode"}
      >
        {sahajMode ? <EyeOff size={20} /> : <Eye size={20} />}
        {sahajMode ? 'Standard Mode' : 'Sahaj Mode'}
      </button>
    </header>
  );
}
