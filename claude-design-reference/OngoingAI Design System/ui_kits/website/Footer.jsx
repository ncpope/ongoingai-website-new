// Footer.jsx
function Footer() {
  const col = (heading, items) => (
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      <span style={{fontFamily:'var(--font-mono)',fontSize:11,fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ink-400)'}}>{heading}</span>
      {items.map(i => <a key={i} href="#" style={{color:'var(--ink-100)',fontSize:14,textDecoration:'none'}}>{i}</a>)}
    </div>
  );
  return (
    <footer style={{background:'var(--ink-900)',color:'var(--ink-50)',padding:'80px 32px 40px',marginTop:48}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:40,marginBottom:64}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:12,fontFamily:'var(--font-display)',fontSize:28,letterSpacing:'-.02em'}}>
              <img src="../../assets/logo-mark.png" alt="OngoingAI" style={{width:40,height:40,borderRadius:8,display:'block'}}/>
              OngoingAI
            </div>
            <p style={{fontFamily:'var(--font-display)',fontSize:32,lineHeight:1.1,letterSpacing:'-.02em',margin:'24px 0 0',color:'var(--ink-50)',maxWidth:360}}>
              Keep <em style={{fontStyle:'italic'}}>building</em>.
            </p>
          </div>
          {col('Product', ['Overview','Checkpoints','Time travel','Pricing'])}
          {col('Resources', ['Docs','Changelog','Blog','Guides'])}
          {col('Company', ['About','Careers','Status','Contact'])}
        </div>
        <div style={{borderTop:'1px solid var(--ink-700)',paddingTop:24,display:'flex',justifyContent:'space-between',alignItems:'center',fontFamily:'var(--font-mono)',fontSize:12,color:'var(--ink-400)',letterSpacing:'.04em'}}>
          <span>© 2026 OngoingAI · Made for people who ship</span>
          <div style={{display:'flex',gap:20}}>
            <a href="#" style={{color:'inherit',textDecoration:'none'}}>Privacy</a>
            <a href="#" style={{color:'inherit',textDecoration:'none'}}>Terms</a>
            <a href="#" style={{color:'inherit',textDecoration:'none'}}>Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
