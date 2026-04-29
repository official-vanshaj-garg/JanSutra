import { useState } from 'react';

export default function JanPathWizard({ onSubmit }) {
  const [context, setContext] = useState({
    isFirstTimeVoter: false,
    isSeniorCitizen: false,
    isPwD: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(context);
  };

  return (
    <section className="card" aria-labelledby="wizard-heading">
      <h2 id="wizard-heading">Personalize Your Election Journey</h2>
      <form onSubmit={handleSubmit}>
        
        <fieldset style={{ border: 'none', marginBottom: '1rem' }}>
          <legend style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Select all that apply to you:</legend>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={context.isFirstTimeVoter}
              onChange={(e) => setContext({...context, isFirstTimeVoter: e.target.checked})}
              style={{ width: 'auto', margin: 0 }}
            />
            I am a first-time voter or future voter
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={context.isSeniorCitizen}
              onChange={(e) => setContext({...context, isSeniorCitizen: e.target.checked})}
              style={{ width: 'auto', margin: 0 }}
            />
            I am a senior citizen (85+ years)
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={context.isPwD}
              onChange={(e) => setContext({...context, isPwD: e.target.checked})}
              style={{ width: 'auto', margin: 0 }}
            />
            I am a Person with Disability (PwD)
          </label>
        </fieldset>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="language" style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Preferred Language:</label>
          <select id="language" defaultValue="en">
            <option value="en">English</option>
            <option value="hi">Hindi (Coming Soon)</option>
          </select>
        </div>

        <button type="submit" className="btn" style={{ width: '100%' }}>
          Generate My Path
        </button>
      </form>
    </section>
  );
}
