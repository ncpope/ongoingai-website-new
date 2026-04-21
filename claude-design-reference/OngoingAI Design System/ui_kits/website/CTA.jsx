// CTA.jsx
function CTABanner() {
  return (
    <section style={{padding:'32px'}}>
      <div style={{maxWidth:1200,margin:'0 auto',background:'var(--orange-400)',border:'1px solid var(--ink-900)',borderRadius:14,padding:'64px 48px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:40,flexWrap:'wrap'}}>
        <div style={{flex:'1 1 480px'}}>
          <h2 style={{margin:0,fontFamily:'var(--font-display)',fontSize:56,lineHeight:1.05,letterSpacing:'-.03em',color:'var(--ink-900)',textWrap:'pretty'}}>
            Ship the idea.<br/>Keep the receipts.
          </h2>
          <p style={{margin:'16px 0 0',fontFamily:'var(--font-sans)',fontSize:16,lineHeight:1.55,color:'var(--ink-800)',maxWidth:480}}>
            Free while in beta. Bring your own model or use ours.
          </p>
        </div>
        <div style={{display:'flex',gap:12,flexDirection:'column',alignItems:'flex-start'}}>
          <button style={{background:'var(--ink-900)',color:'var(--ink-50)',border:'none',padding:'16px 24px',borderRadius:10,fontFamily:'var(--font-sans)',fontSize:16,fontWeight:600,cursor:'pointer'}}>Install the CLI →</button>
          <span style={{fontFamily:'var(--font-mono)',fontSize:12,color:'var(--ink-800)'}}>curl -fsSL ongoing.ai/i | sh</span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CTABanner });
