import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';

const HER_NAME = 'My Love';
const YOUR_NAME = 'Your Guilty Boy';

const evidence = [
  {
    icon: '🧸',
    title: 'Exhibit A',
    text: 'I remember the tiny things that make you smile... even if my calendar committed betrayal.'
  },
  {
    icon: '💬',
    title: 'Exhibit B',
    text: 'Your messages can turn an ordinary day into my favourite part of the week.'
  },
  {
    icon: '🌷',
    title: 'Exhibit C',
    text: 'I may have missed the date, but I never forget how lucky I am to have you.'
  }
];

const caseFiles = [
  {
    title: 'Motive',
    label: 'Love, excessive amounts',
    text: 'The suspect is completely, hopelessly and permanently in love with the victim.'
  },
  {
    title: 'Confession',
    label: '100% guilty',
    text: 'No excuses. I forgot a day that matters to us, and you deserved better.'
  },
  {
    title: 'Sentence',
    label: 'Lifetime of making it up',
    text: 'Starting with flowers, hugs, a proper date and unlimited princess treatment.'
  }
];

const promises = [
  'Flowers delivered with a very guilty face 🌷',
  'A proper anniversary date planned by me 🍽️',
  'A calendar reminder that will haunt me forever 📅',
  'Extra cuddles, attention and kisses with interest 💗'
];

const apologyLines = [
  `Dear ${HER_NAME},`,
  'I really messed up today. Our anniversary is not just a date; it is a reminder of the beautiful thing we have together.',
  'I do not want to defend it or make excuses. I just want you to know that you are important to me every day, including the day my brain stupidly forgot to celebrate properly.',
  'I forgot the calendar date, not the girl who made every date worth remembering.',
  'I am sorry, and I love you more than this criminal website can prove. ❤️'
];

function FloatingHearts({ celebration }) {
  const items = useMemo(
    () => Array.from({ length: celebration ? 34 : 15 }, (_, index) => ({
      id: index,
      symbol: celebration ? ['💗', '💕', '✨', '🌸', '❤️'][index % 5] : ['♡', '✦', '♡'][index % 3],
      left: `${(index * 19 + 7) % 100}%`,
      delay: `${(index % 10) * 0.65}s`,
      duration: `${7 + (index % 6)}s`,
      size: `${14 + (index % 5) * 6}px`
    })),
    [celebration]
  );

  return (
    <div className={`floating-layer ${celebration ? 'party' : ''}`} aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            fontSize: item.size
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
}

function App() {
  const [opened, setOpened] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [forgiven, setForgiven] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const questionRef = useRef(null);

  const noTexts = [
    'No 😤',
    'Are you sure? 🥺',
    'Think again pls 😭',
    'Look at the Yes button 👀',
    'Mercy, my lady 😩',
    'No is illegal now 🚫'
  ];

  useEffect(() => {
    if (!showToast) return undefined;
    const timer = setTimeout(() => setShowToast(false), 2500);
    return () => clearTimeout(timer);
  }, [showToast]);

  const beginInvestigation = () => {
    setOpened(true);
    setTimeout(() => {
      document.getElementById('crime-report')?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const rejectPlea = () => {
    setNoCount((count) => Math.min(count + 1, noTexts.length - 1));
    setShowToast(true);
  };

  const acceptApology = () => {
    setForgiven(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (forgiven) {
    return (
      <main className="celebration-screen">
        <FloatingHearts celebration />
        <div className="celebration-card">
          <div className="stamp approved">CASE CLOSED</div>
          <p className="tiny-label">Official verdict</p>
          <h1>You forgave me! 🥹❤️</h1>
          <p className="celebration-copy">
            The criminal has been released directly into your arms and sentenced to loving you properly,
            forever.
          </p>
          <div className="kiss">💋</div>
          <p className="signature">With all my love, <span>{YOUR_NAME}</span></p>
          <button className="secondary-button" onClick={() => setForgiven(false)}>Read the case file again</button>
        </div>
      </main>
    );
  }

  return (
    <main className={`page ${opened ? 'case-open' : ''}`}>
      <FloatingHearts celebration={false} />

      <section className="hero">
        <div className="police-tape top">CAUTION • LOVE CRIME SCENE • CAUTION • LOVE CRIME SCENE •</div>
        <div className="hero-card">
          <p className="case-number">CASE NO. 2705 — ANNIVERSARY DIVISION</p>
          <div className="badge">🚨 URGENT CASE FILE 🚨</div>
          <h1>The Anniversary<br /><span>Crime Scene</span></h1>
          <p className="hero-text">
            A very serious offence has occurred. The suspect forgot the anniversary... but is prepared
            to present overwhelming evidence of love.
          </p>
          <button className="primary-button" onClick={beginInvestigation}>
            Open the Case File 💌
          </button>
          <p className="suspect">Prime suspect: <strong>{YOUR_NAME}</strong></p>
        </div>
        <div className="police-tape bottom">GUILTY OF LOVING YOU • GUILTY OF LOVING YOU •</div>
      </section>

      {opened && (
        <>
          <section id="crime-report" className="section report-section reveal">
            <div className="section-heading">
              <p>Incident Report</p>
              <h2>A crime was committed.</h2>
            </div>
            <div className="report-card">
              <div className="report-left">
                <div className="fingerprint">💔</div>
                <div className="stamp guilty">GUILTY</div>
              </div>
              <div className="report-details">
                <p><strong>Victim:</strong> The sweetest girl in the world</p>
                <p><strong>Suspect:</strong> A stupid boy who loves her terribly</p>
                <p><strong>Crime:</strong> Forgetting our anniversary</p>
                <p><strong>Evidence:</strong> Immediate regret, flowers incoming, one very dramatic website</p>
                <p className="verdict"><strong>Statement:</strong> I am sorry, {HER_NAME}. I truly am.</p>
              </div>
            </div>
          </section>

          <section className="section files-section">
            <div className="section-heading">
              <p>Investigation Board</p>
              <h2>The facts of the case</h2>
            </div>
            <div className="files-grid">
              {caseFiles.map((file, index) => (
                <article className="file-card" key={file.title} style={{ animationDelay: `${index * 0.15}s` }}>
                  <span className="pin" />
                  <p className="file-tag">{file.title}</p>
                  <h3>{file.label}</h3>
                  <p>{file.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section evidence-section">
            <div className="section-heading">
              <p>Collected Evidence</p>
              <h2>Proof that you are everything to me</h2>
            </div>
            <div className="evidence-grid">
              {evidence.map((item) => (
                <article className="evidence-card" key={item.title}>
                  <div className="photo-placeholder"><span>{item.icon}</span><small>Add our photo</small></div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section letter-section">
            <div className="section-heading">
              <p>Sealed Confession</p>
              <h2>One letter for you</h2>
            </div>
            {!letterOpen ? (
              <button className="envelope" onClick={() => setLetterOpen(true)} aria-label="Open apology letter">
                <span className="envelope-flap" />
                <span className="heart-seal">❤️</span>
                <span className="open-message">Tap to open</span>
              </button>
            ) : (
              <article className="letter revealed-letter">
                {apologyLines.map((line, index) => (
                  <p key={line} className={index === 0 ? 'letter-greeting' : ''}>{line}</p>
                ))}
                <p className="letter-sign">— {YOUR_NAME}</p>
              </article>
            )}
          </section>

          <section className="section promise-section">
            <div className="section-heading">
              <p>Recovery Plan</p>
              <h2>The official make-it-up sentence</h2>
            </div>
            <div className="promise-list">
              {promises.map((promise) => (
                <div className="promise" key={promise}><span>✓</span>{promise}</div>
              ))}
            </div>
          </section>

          <section className="question-section" ref={questionRef}>
            <p className="final-tag">Final Verdict Required</p>
            <h2>Do you forgive this crime?</h2>
            <p className="question-copy">The accused is trembling while waiting for your judgment.</p>
            <div className="button-court">
              <button
                className="yes-button"
                onClick={acceptApology}
                style={{ transform: `scale(${1 + noCount * 0.22})` }}
              >
                Yes, I forgive you ❤️
              </button>
              <button className="no-button" onClick={rejectPlea}>
                {noTexts[noCount]}
              </button>
            </div>
            {noCount > 2 && <p className="plea">Your honour, please notice how sincere that Yes button looks 🥺</p>}
          </section>
        </>
      )}

      {showToast && <div className="toast">The court suggests reconsidering... the Yes button is growing 😭</div>}
    </main>
  );
}

export default App;
