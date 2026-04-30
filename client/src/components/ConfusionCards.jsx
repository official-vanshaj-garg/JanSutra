import { HelpCircle } from 'lucide-react';

const confusions = [
  {
    title: "Voter ID vs Name in Electoral Roll",
    desc: "Having a Voter ID card does not guarantee you can vote. Your name MUST be active on the official Electoral Roll at your polling booth."
  },
  {
    title: "Registration vs Voting",
    desc: "Registering via Form 6 is just the first step. You must verify your registration status and find your exact polling station before Election Day."
  },
  {
    title: "EVM vs VVPAT",
    desc: "The EVM registers your vote electronically. The VVPAT prints a paper slip visible for 7 seconds to verify your vote was cast correctly."
  },
  {
    title: "Polling Booth vs Constituency",
    desc: "Your constituency has many booths. You can only vote at the specific polling booth assigned to your address."
  },
  {
    title: "General Awareness vs Official Deadline",
    desc: "News channels provide general dates, but official cutoff dates for registration (Form 6) are strictly managed by the Election Commission."
  }
];

export default function ConfusionCards() {
  return (
    <section className="card" aria-labelledby="confusion-heading">
      <h2 id="confusion-heading" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <HelpCircle color="var(--primary)" />
        Common Election Confusions
      </h2>
      <p style={{ marginBottom: '1rem' }}>Short, neutral explanations to clear up common misunderstandings.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        {confusions.map((c, i) => (
          <div key={i} style={{ 
            padding: '1rem', 
            border: '1px solid var(--border-color)', 
            borderRadius: 'var(--border-radius)',
            backgroundColor: 'var(--bg-color)'
          }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{c.title}</h3>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
