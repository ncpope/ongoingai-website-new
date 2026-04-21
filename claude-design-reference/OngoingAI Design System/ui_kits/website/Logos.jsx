// Logos.jsx — "Used by teams shipping at" logo row
function LogoRow() {
  const names = ['Kindling','Overcast','Mercato','Northfield','Penny','Halcyon'];
  return (
    <section style={{padding:'24px 32px 56px',maxWidth:1200,margin:'0 auto'}}>
      <span style={{fontFamily:'var(--font-mono)',fontSize:11,fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--fg-3)'}}>Used by teams shipping at</span>
      <div style={{display:'flex',gap:48,alignItems:'center',marginTop:18,flexWrap:'wrap'}}>
        {names.map(n => (
          <span key={n} style={{fontFamily:'var(--font-display)',fontSize:24,letterSpacing:'-.02em',color:'var(--fg-3)',opacity:.85}}>{n}</span>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { LogoRow });
