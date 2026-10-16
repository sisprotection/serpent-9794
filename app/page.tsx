'use client'

import { useMemo, useState } from 'react'
import { Activity, ArrowRight, Check, ChevronDown, CloudSnow, Gauge, Layers3, MapPin, Menu, Radio, ShieldCheck, ThermometerSnowflake, Zap } from 'lucide-react'

const facilityTypes = ['Cold storage / freezer', 'Refrigerated warehouse', 'Multi-temperature distribution']
const zones = ['Frozen', 'Chilled', 'Produce', 'Pharma / specialty']

function Field({ label, value, suffix, onChange, type = 'text' }: { label: string; value: string; suffix?: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="input-wrap">
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
        {suffix && <b>{suffix}</b>}
      </div>
    </label>
  )
}

export default function Page() {
  const [facility, setFacility] = useState('Cold storage / freezer')
  const [zone, setZone] = useState('Frozen')
  const [area, setArea] = useState('185000')
  const [temp, setTemp] = useState('-18')
  const [backup, setBackup] = useState('8')
  const [submitted, setSubmitted] = useState(false)
  const [navOpen, setNavOpen] = useState(false)

  const metrics = useMemo(() => {
    const squareFeet = Math.max(0, Number(area) || 0)
    const target = Math.abs(Number(temp) || 18)
    const hours = Math.max(0, Number(backup) || 0)
    const thermal = Math.min(99, Math.round(62 + Math.min(squareFeet / 30000, 9) + Math.min(hours * 1.5, 18) + (target > 15 ? 6 : 0)))
    return { thermal, hours: hours.toFixed(1), load: Math.round(squareFeet * 0.0019 + target * 1.4) }
  }, [area, temp, backup])

  return (
    <main className="portal-shell">
      <div className="top-stamp"><span className="stamp-dot" /> SECURED BY SERPENT INTELLIGENCE SYSTEMS <span className="stamp-line" /> <span>SI-PORTAL / 01</span></div>
      <header className="masthead">
        <div className="brand-lockup">
          <div className="brand-mark"><ShieldCheck /></div>
          <div><p className="eyebrow">SERPENT INDUSTRIAL</p><h1>CLIMATE HARDENING</h1></div>
        </div>
        <nav className={navOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
          <a className="active" href="#intake">01 / Intake</a><a href="#metrics">02 / Resilience model</a><a href="#protocol">03 / Protocol</a>
        </nav>
        <button className="menu-button" onClick={() => setNavOpen(!navOpen)} aria-label="Toggle navigation"><Menu /></button>
        <div className="system-status"><span className="status-pulse" /> SYSTEM ONLINE<br /><small>LOCAL CALCULATION MODE</small></div>
      </header>

      <section className="hero-grid" id="intake">
        <div className="hero-copy">
          <div className="section-index">01 <span>/</span> FACILITY INTAKE</div>
          <h2>Harden the<br /><em>cold chain.</em></h2>
          <p>Configure your facility profile to establish a baseline for thermal resilience, continuity risk, and HVAC hardening priorities.</p>
          <div className="hero-meta"><span><Radio /> ENCRYPTED SESSION</span><span><Activity /> MODEL V.2.4</span></div>
        </div>
        <div className="crosshair"><span /><span /><span /><span /></div>
      </section>

      <div className="workbench">
        <section className="panel profile-panel">
          <div className="panel-header"><div><span className="panel-kicker">A / SITE PROFILE</span><h3>Facility parameters</h3></div><span className="panel-code">INPUT_001</span></div>
          <div className="panel-body">
            <label className="field"><span>Facility classification</span><div className="select-wrap"><select value={facility} onChange={(event) => setFacility(event.target.value)}>{facilityTypes.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown /></div></label>
            <div className="field-grid"><Field label="Conditioned footprint" value={area} suffix="SQ FT" onChange={setArea} type="number" /><Field label="Primary climate zone" value={zone} onChange={setZone} /></div>
            <div className="zone-chips" aria-label="Climate zone"><span className="chip-label">ZONE PROFILE</span>{zones.map((item) => <button key={item} className={zone === item ? 'chip selected' : 'chip'} onClick={() => setZone(item)}>{item}</button>)}</div>
          </div>
        </section>

        <section className="panel hvac-panel">
          <div className="panel-header"><div><span className="panel-kicker">B / THERMAL SYSTEM</span><h3>HVAC + continuity</h3></div><span className="panel-code">INPUT_002</span></div>
          <div className="panel-body"><div className="field-grid"><Field label="Design setpoint" value={temp} suffix="°C" onChange={setTemp} type="number" /><Field label="Generator autonomy" value={backup} suffix="HRS" onChange={setBackup} type="number" /></div>
            <div className="system-readout"><div className="readout-icon"><ThermometerSnowflake /></div><div><span>THERMAL SYSTEM SIGNATURE</span><strong>{zone.toUpperCase()} / {facility.split(' / ')[0].toUpperCase()}</strong></div><span className="verified"><Check /> VERIFIED</span></div>
            <label className="toggle-line"><input type="checkbox" defaultChecked /><span className="fake-toggle" /> Critical load shedding protocol enabled</label>
          </div>
        </section>
      </div>

      <section className="metrics-section" id="metrics">
        <div className="metrics-heading"><div><span className="panel-kicker">LIVE MODEL OUTPUT</span><h3>Resilience snapshot</h3></div><span className="calc-note"><Zap /> CALCULATED LOCALLY / NO DATA TRANSMITTED</span></div>
        <div className="metric-grid">
          <article className="metric-card primary"><div className="metric-label"><Gauge /> THERMAL RESILIENCE INDEX</div><div className="metric-value">{metrics.thermal}<small>/100</small></div><div className="meter"><span style={{ width: `${metrics.thermal}%` }} /></div><p>Strong baseline. Review door-cycle losses for further hardening.</p></article>
          <article className="metric-card"><div className="metric-label"><CloudSnow /> CRITICAL TEMP HOLD</div><div className="metric-value">{metrics.hours}<small> HRS</small></div><p>Estimated buffer before product safety threshold is breached.</p></article>
          <article className="metric-card"><div className="metric-label"><Layers3 /> DESIGN LOAD</div><div className="metric-value">{metrics.load.toLocaleString()}<small> kW</small></div><p>Indicative peak demand for the declared envelope.</p></article>
        </div>
      </section>

      <section className="action-bar" id="protocol"><div className="action-note"><MapPin /> PROFILE READY <span>·</span> LATENT RISK MODEL PREPARED</div><button className="primary-button" onClick={() => setSubmitted(true)}>{submitted ? 'INTAKE SECURED' : 'SECURE FACILITY PROFILE'} <ArrowRight /></button></section>
      {submitted && <div className="success-banner" role="status"><Check /> Profile secured locally. Your hardening baseline is ready for engineering review.</div>}
      <footer><span>© 2026 SERPENT INTELLIGENCE SYSTEMS</span><span>CONTROLLED ACCESS / INDUSTRIAL SYSTEMS</span><span>BUILD 01.26.10</span></footer>
    </main>
  )
}
