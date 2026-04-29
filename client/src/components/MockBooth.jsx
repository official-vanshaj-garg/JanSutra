import { useState, useEffect } from 'react';

export default function MockBooth({ apiBase }) {
  const [steps, setSteps] = [
    "Identity Check",
    "Inking",
    "EVM",
    "VVPAT"
  ]; // Using hardcoded for simplicity, but simulating the API flow
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [error, setError] = useState('');
  const [evmChoice, setEvmChoice] = useState(null);

  const handleNext = async (targetStepIndex) => {
    setError('');
    const targetStep = steps[targetStepIndex];
    const currentStep = steps[currentStepIndex];

    try {
      const res = await fetch(`${apiBase}/simulation/next`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentStep, targetStep })
      });
      const data = await res.json();

      if (data.valid) {
        setCurrentStepIndex(targetStepIndex);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error connecting to simulation engine.");
    }
  };

  const renderActiveStep = () => {
    switch (steps[currentStepIndex]) {
      case "Identity Check":
        return <p>Show your dummy ID to the Polling Officer.</p>;
      case "Inking":
        return <p>The officer applies indelible ink to your left index finger.</p>;
      case "EVM":
        return (
          <div>
            <p>Press the blue button next to your chosen dummy candidate.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              {["Candidate Apple (Symbol: 🍎)", "Candidate Sun (Symbol: ☀️)", "Candidate Tree (Symbol: 🌳)"].map((cand, i) => (
                <button 
                  key={i}
                  className="btn btn-secondary" 
                  onClick={() => setEvmChoice(cand)}
                  style={{ justifyContent: 'flex-start', background: evmChoice === cand ? 'var(--primary)' : '', color: evmChoice === cand ? 'white' : '' }}
                >
                  <span style={{ display: 'inline-block', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'blue', marginRight: '10px' }} aria-hidden="true" />
                  {cand}
                </button>
              ))}
            </div>
          </div>
        );
      case "VVPAT":
        return (
          <div>
            <p>Look at the VVPAT window. A slip will print and be visible for 7 seconds to verify your choice.</p>
            {evmChoice ? (
              <div style={{ padding: '1rem', border: '2px dashed var(--primary)', textAlign: 'center', marginTop: '1rem' }}>
                <strong>Printed:</strong> {evmChoice}
              </div>
            ) : (
              <p style={{ color: 'red' }}>You did not select a candidate on the EVM.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="card" aria-labelledby="mock-booth-heading">
      <h2 id="mock-booth-heading">Mock Booth Rehearsal</h2>
      <p style={{ marginBottom: '1rem' }}>Practice the polling day steps in a safe, neutral environment.</p>
      
      {error && (
        <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: 'var(--border-radius)', marginBottom: '1rem' }} role="alert">
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {steps.map((step, index) => (
          <button
            key={step}
            className={`btn ${index === currentStepIndex ? '' : 'btn-secondary'}`}
            onClick={() => handleNext(index)}
            disabled={index < currentStepIndex}
            style={{ opacity: index < currentStepIndex ? 0.5 : 1, whiteSpace: 'nowrap' }}
          >
            {index + 1}. {step}
          </button>
        ))}
      </div>

      <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Active: {steps[currentStepIndex]}</h3>
        {renderActiveStep()}
      </div>

      {currentStepIndex === steps.length - 1 && (
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p><strong>Rehearsal Complete!</strong> You have successfully navigated the Mock Booth.</p>
          <button className="btn btn-secondary" onClick={() => { setCurrentStepIndex(0); setEvmChoice(null); }} style={{ marginTop: '1rem' }}>Restart Rehearsal</button>
        </div>
      )}
    </section>
  );
}
