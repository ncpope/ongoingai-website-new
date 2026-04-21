// Nav.jsx
const { useState, useEffect } = React;

function Logo({ size = 28 }) {
  return (
    <img src="../../assets/logo-mark.png" alt="OngoingAI"
      style={{ width: size, height: size, display: 'block', borderRadius: 6 }} />
  );
}

function LogoDark({ size = 32 }) {
  // Transparent version for ink-dark backgrounds (renders as near-ink on dark, so we wrap in orange square)
  return (
    <img src="../../assets/logo-mark.png" alt="OngoingAI"
      style={{ width: size, height: size, display: 'block', borderRadius: 6 }} />
  );
}

function Nav({ onCta }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 20, height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', background: 'var(--bg)',
      borderBottom: scrolled ? '1px solid var(--border-1)' : '1px solid transparent',
      transition: 'border-color 160ms',
    }}>
      <div style={{display:'flex',alignItems:'center',gap:10,fontFamily:'var(--font-display)',fontSize:22,letterSpacing:'-.02em',color:'var(--fg-1)'}}>
        <Logo />
        OngoingAI
      </div>
      <div style={{display:'flex',gap:28,fontFamily:'var(--font-sans)',fontSize:14,fontWeight:500,color:'var(--fg-2)'}}>
        <a href="#product" style={{color:'inherit',textDecoration:'none'}}>Product</a>
        <a href="#how" style={{color:'inherit',textDecoration:'none'}}>How it works</a>
        <a href="#changelog" style={{color:'inherit',textDecoration:'none'}}>Changelog</a>
        <a href="#docs" style={{color:'inherit',textDecoration:'none'}}>Docs</a>
        <a href="#pricing" style={{color:'inherit',textDecoration:'none'}}>Pricing</a>
      </div>
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <a href="#signin" style={{fontSize:14,fontWeight:500,color:'var(--fg-2)',textDecoration:'none'}}>Sign in</a>
        <button onClick={onCta} style={{background:'var(--ink-900)',color:'var(--ink-50)',padding:'9px 16px',borderRadius:999,border:'none',fontFamily:'var(--font-sans)',fontSize:13,fontWeight:500,cursor:'pointer'}}>Try it →</button>
      </div>
    </nav>
  );
}

Object.assign(window, { Nav, Logo, LogoDark });
