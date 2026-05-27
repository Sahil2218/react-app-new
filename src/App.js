import { useEffect, useMemo, useState } from 'react';
import './App.css';

const HER_NAME = 'Shreya S Chavan';
const YOUR_NAME = 'Sahil D Chavan';

const evidence = [
  {
    icon: '🦄',
    image: '/IMG_1312.jpeg',
    alt: 'The unicorn soft toy gift for Shreya',
    title: 'Exhibit A',
    gift: 'Unicorn Soft Toy',
    text: 'A cuddly unicorn soft toy, because you deserve something cute, soft and magical just like your smile.'
  },
  {
    icon: '💡',
    image: '/IMG_8431.jpeg',
    alt: 'The I Love You light sign gift for Shreya',
    title: 'Exhibit B',
    gift: 'I Love You Light Sign',
    text: 'An “I Love You” light sign, because even when my memory fails, my love for you should always stay glowing.'
  },
  {
    icon: '💑',
    image: '/IMG_8441.jpeg',
    alt: 'The couple statue gift for Shreya',
    title: 'Exhibit C',
    gift: 'Couple Statue',
    text: 'A couple statue, a tiny reminder of us and how much I treasure what we have together.'
  }
];

const caseFiles = [
  {
    title: 'Motive',
    label: 'Love, excessive amounts',
    text: 'The suspect is completely, hopelessly and permanently in love with Shreya S Chavan.'
  },
  {
    title: 'Confession',
    label: '100% guilty',
    text: 'No excuses. I forgot a day that matters to us, and you deserved better.'
  },
  {
    title: 'Sentence',
    label: 'Lifetime of making it up',
    text: 'Starting with a unicorn, a glowing love sign, our little couple statue and unlimited princess treatment.'
  }
];

const promises = [
  'A unicorn soft toy for my cutest girl 🦄',
  'An “I Love You” light sign to keep my confession glowing 💡❤️',
  'A couple statue to remind you of us, always 💑',
  'Extra cuddles, attention and love with interest 💗'
];

const apologyLines = [
  `Dear ${HER_NAME},`,
  'I really messed up today. Our anniversary is not just a date; it is a reminder of the beautiful thing we have together.',
  'I do not want to defend it or make excuses. I just want you to know that you are important to me every day, including the day my brain stupidly forgot to celebrate properly.',
  'The unicorn, the glowing “I Love You” sign and the little couple statue are not enough to undo my mistake, but I hope they remind you how genuinely special you are to me.',
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

  const noTexts = [
    'No 😤',
    'Are you sure? 🥺',
    'Think again pls 😭',
    'Look at Yes 👀',
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
            A very serious offence has occurred. The suspect forgot the anniversary... but has brought
            three carefully chosen pieces of evidence and one very honest apology.
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
                <p><strong>Victim:</strong> {HER_NAME}</p>
                <p><strong>Suspect:</strong> {YOUR_NAME}, a stupid boy who loves her terribly</p>
                <p><strong>Crime:</strong> Forgetting our anniversary</p>
                <p><strong>Evidence:</strong> One unicorn soft toy, an “I Love You” light sign, a couple statue and one dramatic website</p>
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
              <h2>Three gifts from a guilty heart</h2>
            </div>
            <div className="evidence-grid">
              {evidence.map((item) => (
                <article className="evidence-card" key={item.title}>
                  <figure className="evidence-photo">
                    <img src={item.image} alt={item.alt} loading="lazy" />
                    <figcaption><span>{item.icon}</span>{item.gift}</figcaption>
                  </figure>
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
              <h2>The official make-it-up evidence</h2>
            </div>
            <div className="promise-list">
              {promises.map((promise) => (
                <div className="promise" key={promise}><span>✓</span>{promise}</div>
              ))}
            </div>
          </section>

          <section className="question-section">
            <p className="final-tag">Final Verdict Required</p>
            <h2>Do you forgive this crime?</h2>
            <p className="question-copy">The accused is trembling while waiting for your judgment.</p>
            <div className="button-court">
              <button
                className={`yes-button yes-level-${noCount}`}
                onClick={acceptApology}
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
