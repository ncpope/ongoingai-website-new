// CodeDemo.jsx — the "see it work" block — a stylized terminal showing a prompt + rollback
function CodeDemo() {
  return (
    <section style={{padding:'32px',maxWidth:1200,margin:'0 auto'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,alignItems:'stretch'}}>
        {/* LEFT: Prompt card */}
        <div style={{background:'var(--bg-elevated)',border:'1px solid var(--ink-900)',borderRadius:14,padding:24,display:'flex',flexDirection:'column'}}>
          <span style={{fontFamily:'var(--font-mono)',fontSize:11,fontWeight:500,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--fg-3)'}}>You prompt</span>
          <p style={{fontFamily:'var(--font-display)',fontSize:26,lineHeight:1.2,letterSpacing:'-.02em',color:'var(--fg-1)',margin:'10px 0 20px',textWrap:'pretty'}}>
            "Make the checkout page feel snappier and add a discount field."
          </p>
          <div style={{flex:1}}/>
          <div style={{display:'flex',alignItems:'center',gap:8,fontFamily:'var(--font-mono)',fontSize:12,color:'var(--fg-3)'}}>
            <span style={{width:6,height:6,borderRadius:999,background:'var(--orange-500)',boxShadow:'0 0 0 3px rgba(240,122,27,.2)'}}/>
            Agent working · 14 files · checkpoint <span style={{color:'var(--fg-1)',fontWeight:600}}>a8c2f</span>
          </div>
        </div>
        {/* RIGHT: Terminal */}
        <div style={{background:'var(--ink-900)',borderRadius:14,padding:20,fontFamily:'var(--font-mono)',fontSize:13,lineHeight:1.7,color:'var(--ink-50)',overflow:'hidden'}}>
          <div style={{display:'flex',gap:6,marginBottom:14}}>
            <span style={{width:10,height:10,borderRadius:999,background:'#FF5F57'}}/>
            <span style={{width:10,height:10,borderRadius:999,background:'#FEBC2E'}}/>
            <span style={{width:10,height:10,borderRadius:999,background:'#28C840'}}/>
          </div>
          <div><span style={{color:'var(--orange-400)'}}>❯</span> ongoing run</div>
          <div style={{color:'var(--ink-300)'}}>  → branched <span style={{color:'var(--orange-300)'}}>checkout-feel-snappier</span></div>
          <div style={{color:'var(--ink-300)'}}>  → edited 14 files <span style={{color:'var(--ink-400)'}}>· 312 lines</span></div>
          <div style={{color:'var(--ink-300)'}}>  → tests: <span style={{color:'#7ED49A'}}>✓ passed</span> 42/42</div>
          <div style={{color:'var(--ink-300)'}}>  → checkpoint <span style={{color:'var(--orange-300)'}}>a8c2f</span> saved</div>
          <div style={{marginTop:10}}><span style={{color:'var(--orange-400)'}}>❯</span> ongoing revert <span style={{color:'var(--ink-300)'}}>--to a8c2f</span></div>
          <div style={{color:'#7ED49A'}}>  ✓ restored in 0.4s</div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { CodeDemo });
