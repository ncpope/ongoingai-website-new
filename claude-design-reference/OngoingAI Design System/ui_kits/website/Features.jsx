// Features.jsx
function FeatureCard({ icon, title, body, tone = 'paper' }) {
  const styles = tone === 'hero'
    ? { background:'var(--orange-400)', color:'var(--fg-on-accent)', border:'1px solid var(--ink-900)' }
    : tone === 'ink'
    ? { background:'var(--ink-900)', color:'var(--ink-50)', border:'1px solid var(--ink-900)' }
    : { background:'var(--bg-elevated)', color:'var(--fg-1)', border:'1px solid var(--border-1)' };
  return (
    <div style={{...styles, borderRadius:14, padding:'24px 24px 28px', display:'flex', flexDirection:'column', gap:12}}>
      <i data-lucide={icon} style={{width:24,height:24,color:'currentColor'}}/>
      <h3 style={{margin:'4px 0 0',fontFamily:'var(--font-sans)',fontSize:19,fontWeight:600,letterSpacing:'-.01em',color:'inherit'}}>{title}</h3>
      <p style={{margin:0,fontFamily:'var(--font-sans)',fontSize:14,lineHeight:1.55,color: tone==='paper' ? 'var(--fg-2)' : 'inherit', opacity: tone==='paper' ? 1 : .85, textWrap:'pretty'}}>{body}</p>
    </div>
  );
}

function Features() {
  return (
    <section id="product" style={{padding:'80px 32px',maxWidth:1200,margin:'0 auto'}}>
      <span style={{fontFamily:'var(--font-mono)',fontSize:11,fontWeight:500,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--orange-500)'}}>What you get</span>
      <h2 style={{fontFamily:'var(--font-display)',fontSize:48,lineHeight:1.05,letterSpacing:'-.03em',margin:'12px 0 48px',color:'var(--fg-1)',maxWidth:780}}>
        The safety net for <em style={{fontStyle:'italic'}}>fast hands</em>.
      </h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:16}}>
        <FeatureCard icon="git-branch" title="Checkpoints" body="Every change is a branch. Roll back a bad idea in one click. Keep the three good ones." />
        <FeatureCard icon="rotate-ccw" title="Time travel" body="Scrub through your project like a video. See what the agent did, where, and why." tone="hero" />
        <FeatureCard icon="shield-check" title="Guardrails" body="Tests run on every checkpoint. Secrets stay out of prompts. Deploys require confirmation." />
        <FeatureCard icon="sparkles" title="Vibe-first prompts" body="Describe the feel. The agent handles the plumbing. Edit back with plain language." />
        <FeatureCard icon="terminal" title="CLI that stays put" body="One install, zero config. Works alongside whatever editor you already love." />
        <FeatureCard icon="users" title="Team context" body="The agent reads your team's style guide, linters, and past PRs. It ships like you do." tone="ink" />
      </div>
    </section>
  );
}

Object.assign(window, { Features, FeatureCard });
