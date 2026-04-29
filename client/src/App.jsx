import { useState } from 'react';
import Header from './components/Header';
import JanPathWizard from './components/JanPathWizard';
import Timeline from './components/Timeline';
import Checklist from './components/Checklist';
import MockBooth from './components/MockBooth';
import SatyaCheck from './components/SatyaCheck';
import OfficialLinks from './components/OfficialLinks';

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

function App() {
  const [sahajMode, setSahajMode] = useState(false);
  const [userContext, setUserContext] = useState(null);
  const [journey, setJourney] = useState([]);
  const [checklist, setChecklist] = useState([]);

  const toggleSahaj = () => {
    setSahajMode(!sahajMode);
    document.documentElement.setAttribute('data-sahaj', !sahajMode);
  };

  const handleContextSubmit = async (context) => {
    setUserContext(context);
    
    // Fetch Journey
    const journeyRes = await fetch(`${API_BASE}/api/journey`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(context)
    });
    const journeyData = await journeyRes.json();
    setJourney(journeyData.journey);

    // Fetch Checklist
    const checklistRes = await fetch(`${API_BASE}/api/checklist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(context)
    });
    const checklistData = await checklistRes.json();
    setChecklist(checklistData.checklist);
  };

  return (
    <div className="container">
      <Header sahajMode={sahajMode} toggleSahaj={toggleSahaj} />
      
      <main>
        {!userContext ? (
          <JanPathWizard onSubmit={handleContextSubmit} />
        ) : (
          <div className="journey-results">
            <button className="btn btn-secondary" onClick={() => setUserContext(null)} style={{marginBottom: '1rem'}}>
              Start Over
            </button>
            <Timeline items={journey} />
            <Checklist items={checklist} />
            <MockBooth apiBase={`${API_BASE}/api`} />
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
