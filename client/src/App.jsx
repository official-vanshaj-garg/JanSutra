import { useState } from 'react';
import Header from './components/Header';
import JanPathWizard from './components/JanPathWizard';
import CivicReadinessScore from './components/CivicReadinessScore';
import Timeline from './components/Timeline';
import Checklist from './components/Checklist';
import MockBooth from './components/MockBooth';
import SatyaCheck from './components/SatyaCheck';
import OfficialLinks from './components/OfficialLinks';
import ConfusionCards from './components/ConfusionCards';
import AssistantPanel from './components/AssistantPanel';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

function App() {
  const [sahajMode, setSahajMode] = useState(false);
  const [userContext, setUserContext] = useState(null);
  const [journey, setJourney] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [readiness, setReadiness] = useState(null);

  const toggleSahaj = () => {
    setSahajMode(!sahajMode);
    document.documentElement.setAttribute('data-sahaj', !sahajMode);
  };

  const [error, setError] = useState(null);

  const handleContextSubmit = async (context) => {
    setUserContext(context);
    setError(null);
    
    try {
      // Fetch Journey
      const journeyRes = await fetch(`${API_BASE}/api/journey`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(context)
      });
      if (!journeyRes.ok) throw new Error('Failed to fetch journey');
      const journeyData = await journeyRes.json();
      setJourney(journeyData.journey || []);

      // Fetch Checklist
      const checklistRes = await fetch(`${API_BASE}/api/checklist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(context)
      });
      if (!checklistRes.ok) throw new Error('Failed to fetch checklist');
      const checklistData = await checklistRes.json();
      setChecklist(checklistData.checklist || []);

      // Fetch Readiness Score
      const readinessRes = await fetch(`${API_BASE}/api/readiness`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(context)
      });
      if (!readinessRes.ok) throw new Error('Failed to fetch readiness score');
      const readinessData = await readinessRes.json();
      setReadiness(readinessData);

    } catch (err) {
      console.error(err);
      setError("Failed to generate your personalized path. Please ensure the server is running and try again.");
    }
  };

  return (
    <div className="container">
      <Header sahajMode={sahajMode} toggleSahaj={toggleSahaj} />
      
      <main>
        {!userContext ? (
          <JanPathWizard onSubmit={handleContextSubmit} />
        ) : error ? (
          <div className="card" style={{ backgroundColor: '#fee2e2', borderColor: '#fca5a5' }}>
            <h2 style={{ color: '#991b1b', margin: 0 }}>Error</h2>
            <p style={{ color: '#991b1b', marginTop: '0.5rem' }}>{error}</p>
            <button className="btn" onClick={() => { setUserContext(null); setError(null); }} style={{ marginTop: '1rem', backgroundColor: '#991b1b' }}>
              Try Again
            </button>
          </div>
        ) : (
          <div className="journey-results">
            <button className="btn btn-secondary" onClick={() => setUserContext(null)} style={{marginBottom: '1rem'}}>
              Start Over
            </button>
            <CivicReadinessScore scoreData={readiness} />
            <Timeline items={journey || []} />
            <Checklist items={checklist || []} />
            <ConfusionCards />
            <MockBooth apiBase={`${API_BASE}/api`} />
            <AssistantPanel apiBase={`${API_BASE}/api`} context={userContext} />
          </div>
        )}

        <hr style={{margin: '2rem 0', borderColor: 'var(--border-color)'}} />
        <SatyaCheck apiBase={`${API_BASE}/api`} />
        <OfficialLinks apiBase={`${API_BASE}/api`} />
      </main>
    </div>
  );
}

export default App;
