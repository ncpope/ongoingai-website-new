// Pricing.jsx
function PriceCard({ tier, price, blurb, features, highlight }) {
  return (
    <div style={{
      background: highlight ? 'var(--orange-400)' : 'var(--bg-elevated)',
      color: highlight ? 'var(--fg-on-accent)' : 'var(--fg-1)',
      border: '1px solid var(--ink-900)',
      borderRadius: 14, padding: '32px 28px',
      display:'flex',flexDirection:'column',gap:16
    }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
        <span style={{fontFamily:'var(--font-mono)',fontSize:11,fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'inherit',opacity:.75}}>{tier}</span>
        {highlight && <span style={{background:'var(--ink-900)',color:'var(--ink-50)',fontFamily:'var(--font-mono)',fontSize:10,padding:'4px 8px',borderRadius:999,letterSpacing:'.08em',textTransform:'uppercase'}}>Most chosen</span>}
      </div>
      <div>
        <span style={{fontFamily:'var(--font-display)',fontSize:56,letterSpacing:'-.03em',lineHeight:1}}>{price}</span>
        <span style={{fontFamily:'var(--font-sans)',fontSize:14,color:'inherit',opacity:.7,marginLeft:6}}>/ month</span>
      </div>
      <p style={{margin:0,fontFamily:'var(--font-sans)',fontSize:14,color:'inherit',opacity:.85}}>{blurb}</p>
      <ul style={{listStyle:'none',padding:0,margin:'4px 0 12px',display:'flex',flexDirection:'column',gap:8}}>
        {features.map(f => (
          <li key={f} style={{display:'flex',alignItems:'center',gap:10,fontFamily:'var(--font-sans)',fontSize:14}}>
            <span style={{width:16,height:16,display:'inline-flex'}}><i data-lucide="check" style={{width:16,height:16}}/></span>
            {f}
          </li>
        ))}
      </ul>
      <button style={{
        background: highlight ? 'var(--ink-900)' : 'var(--orange-400)',
        color: highlight ? 'var(--ink-50)' : 'var(--fg-on-accent)',
        border:'1px solid var(--ink-900)', borderRadius:10, padding:'12px 16px',
        fontFamily:'var(--font-sans)',fontSize:14,fontWeight:600,cursor:'pointer'
      }}>Start with {tier} →</button>
    </div>
  );
}

function Pricing() {
  return (
    <section id="pricing" style={{padding:'80px 32px',maxWidth:1200,margin:'0 auto'}}>
      <span style={{fontFamily:'var(--font-mono)',fontSize:11,fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--orange-500)'}}>Pricing</span>
      <h2 style={{fontFamily:'var(--font-display)',fontSize:48,lineHeight:1.05,letterSpacing:'-.03em',margin:'12px 0 40px',color:'var(--fg-1)'}}>
        Flat. <em style={{fontStyle:'italic'}}>Fair.</em> No per-seat gotchas.
      </h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:16}}>
        <PriceCard tier="Solo" price="$0" blurb="For weekend projects and new habits." features={['Unlimited checkpoints','100 agent runs / month','Local only','Community support']} />
        <PriceCard tier="Pro" price="$18" blurb="For people who ship on Sundays." features={['Everything in Solo','Unlimited agent runs','Cloud checkpoint sync','Priority support']} highlight />
        <PriceCard tier="Team" price="$49" blurb="Per seat. For teams that move fast together." features={['Everything in Pro','Shared style guides','SSO & audit log','Slack + GitHub app']} />
      </div>
    </section>
  );
}

Object.assign(window, { Pricing, PriceCard });
