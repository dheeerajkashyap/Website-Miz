import { useState, useEffect, useCallback } from "react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// After deploying your Google Apps Script, paste the Web App URL here:
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxuRYoPfdKPxCVBDCrQ2mY0337XUjwSOOUFblPqjlxuM6RWPYPFvwDbZEnCgtJiyHfxBQ/exec";

const SESSION_KEY = "miz_freight_token";
const SESSION_EXPIRY_KEY = "miz_freight_token_expiry";
const SESSION_HOURS = 8; // auto-logout after 8 hours of inactivity

// ─── STYLES ──────────────────────────────────────────────────────────────────
const S = {
  overlay: {
    minHeight: "100vh",
    background: "#0f0f0f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: "24px",
  },
  card: {
    background: "#1a1a1a",
    border: "1px solid #2e2e2e",
    borderRadius: "16px",
    padding: "40px",
    width: "100%",
    maxWidth: "420px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#f0f0f0",
    marginBottom: "4px",
    letterSpacing: "-0.3px",
  },
  logoAccent: { color: "#00d97e" },
  tagline: { fontSize: "12px", color: "#888", marginBottom: "32px" },
  tabRow: {
    display: "flex",
    gap: "0",
    background: "#222",
    borderRadius: "8px",
    padding: "4px",
    marginBottom: "28px",
  },
  tab: (active) => ({
    flex: 1,
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    background: active ? "#00d97e" : "transparent",
    color: active ? "#000" : "#888",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  }),
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "#888",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    background: "#222",
    border: "1px solid #2e2e2e",
    borderRadius: "8px",
    color: "#f0f0f0",
    padding: "10px 14px",
    fontSize: "14px",
    outline: "none",
    marginBottom: "16px",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  inputFocus: { borderColor: "#00d97e" },
  btn: (variant = "primary", disabled = false) => ({
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: variant === "primary" ? "#00d97e" : "transparent",
    color: variant === "primary" ? "#000" : "#888",
    fontSize: "13px",
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    marginTop: "4px",
    transition: "opacity 0.2s",
    fontFamily: "inherit",
    border: variant === "ghost" ? "1px solid #2e2e2e" : "none",
  }),
  error: {
    background: "rgba(255,77,77,0.1)",
    border: "1px solid rgba(255,77,77,0.3)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#ff4d4d",
    fontSize: "12px",
    marginBottom: "16px",
  },
  success: {
    background: "rgba(0,217,126,0.1)",
    border: "1px solid rgba(0,217,126,0.3)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#00d97e",
    fontSize: "12px",
    marginBottom: "16px",
  },
  divider: {
    height: "1px",
    background: "#2e2e2e",
    margin: "20px 0",
  },
  hint: { fontSize: "11px", color: "#555", textAlign: "center", marginTop: "16px" },
};

// ─── AUTH GATE ────────────────────────────────────────────────────────────────
function AuthGate({ onAuth }) {
  const [tab, setTab] = useState("login");
  const [token, setToken] = useState("");
  const [form, setForm] = useState({ name: "", id: "", company: "" });
  const [status, setStatus] = useState(null); // { type: 'error'|'success', msg }
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(null);

  const inputStyle = (field) => ({
    ...S.input,
    ...(focused === field ? S.inputFocus : {}),
  });

  // ── LOGIN ──
  async function handleLogin() {
    if (!token.trim()) return setStatus({ type: "error", msg: "Please enter your access token." });
    const t = token.trim().toUpperCase();
    if (!/^MIZ-[A-Z0-9]{4}$/.test(t)) {
      return setStatus({ type: "error", msg: "Invalid token format. Expected MIZ-XXXX." });
    }
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?action=validate&token=${encodeURIComponent(t)}`);
      const data = await res.json();
      if (data.valid) {
        const expiry = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
        sessionStorage.setItem(SESSION_KEY, t);
        sessionStorage.setItem(SESSION_EXPIRY_KEY, expiry.toString());
        onAuth(data.user || t);
      } else {
        setStatus({ type: "error", msg: data.message || "Token not recognised. Request access below." });
      }
    } catch {
      setStatus({ type: "error", msg: "Could not reach server. Check your connection and try again." });
    } finally {
      setLoading(false);
    }
  }

  // ── REQUEST ACCESS ──
  async function handleRequest() {
    if (!form.name.trim() || !form.id.trim() || !form.company.trim()) {
      return setStatus({ type: "error", msg: "Please fill in all fields." });
    }
    setLoading(true);
    setStatus(null);
    try {
      const params = new URLSearchParams({
        action: "request",
        name: form.name.trim(),
        id: form.id.trim(),
        company: form.company.trim(),
        timestamp: new Date().toISOString(),
      });
      const res = await fetch(`${APPS_SCRIPT_URL}?${params}`);
      const data = await res.json();
      if (data.success) {
        setStatus({ type: "success", msg: "Request submitted! You'll receive your access token shortly." });
        setForm({ name: "", id: "", company: "" });
      } else {
        setStatus({ type: "error", msg: data.message || "Submission failed. Please try again." });
      }
    } catch {
      setStatus({ type: "error", msg: "Could not reach server. Please try again later." });
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e, action) {
    if (e.key === "Enter") action();
  }

  return (
    <div style={S.overlay}>
      <div style={S.card}>
        <div style={S.logo}>Mizzen<span style={S.logoAccent}>IQ</span></div>
        <div style={S.tagline}>Freight Weight Auditor · Restricted Access</div>

        <div style={S.tabRow}>
          <button style={S.tab(tab === "login")} onClick={() => { setTab("login"); setStatus(null); }}>
            Sign In
          </button>
          <button style={S.tab(tab === "request")} onClick={() => { setTab("request"); setStatus(null); }}>
            Request Access
          </button>
        </div>

        {status && <div style={status.type === "error" ? S.error : S.success}>{status.msg}</div>}

        {tab === "login" && (
          <>
            <label style={S.label}>Access Token</label>
            <input
              style={inputStyle("token")}
              type="text"
              placeholder="MIZ-XXXX"
              value={token}
              maxLength={8}
              onChange={e => setToken(e.target.value.toUpperCase())}
              onFocus={() => setFocused("token")}
              onBlur={() => setFocused(null)}
              onKeyDown={e => handleKey(e, handleLogin)}
              autoComplete="off"
              spellCheck={false}
            />
            <button style={S.btn("primary", loading)} onClick={handleLogin} disabled={loading}>
              {loading ? "Verifying…" : "Access Tool →"}
            </button>
            <div style={S.hint}>Don't have a token? Switch to Request Access above.</div>
          </>
        )}

        {tab === "request" && (
          <>
            <label style={S.label}>Full Name</label>
            <input
              style={inputStyle("name")}
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused(null)}
            />
            <label style={S.label}>ID / Designation</label>
            <input
              style={inputStyle("id")}
              type="text"
              placeholder="e.g. Ops Manager, SKU-001"
              value={form.id}
              onChange={e => setForm({ ...form, id: e.target.value })}
              onFocus={() => setFocused("id")}
              onBlur={() => setFocused(null)}
            />
            <label style={S.label}>Company Name</label>
            <input
              style={inputStyle("company")}
              type="text"
              placeholder="Your organisation"
              value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
              onFocus={() => setFocused("company")}
              onBlur={() => setFocused(null)}
              onKeyDown={e => handleKey(e, handleRequest)}
            />
            <button style={S.btn("primary", loading)} onClick={handleRequest} disabled={loading}>
              {loading ? "Submitting…" : "Submit Request →"}
            </button>
            <div style={S.hint}>Approvals typically processed within 24 hours.</div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── MAIN FREIGHT AUDIT TOOL ──────────────────────────────────────────────────
function FreightAuditTool({ user, onLogout }) {
  // ── state ──
  const [files, setFiles] = useState({ uc: null, order: null, invoice: null });
  const [parsed, setParsed] = useState({ uc: null, order: null, invoice: null });
  const [headers, setHeaders] = useState({ uc: [], order: [], invoice: [] });
  const [results, setResults] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mappings, setMappings] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState(1);
  const [settings, setSettings] = useState({ divisor: 5000, rounding: 0.5, threshold: 0.5 });
  const [stats, setStats] = useState(null);
  const [dragging, setDragging] = useState(null);

  const allReady = parsed.uc && parsed.order && parsed.invoice;

  // ── CSV parser ──
  function parseCSV(text) {
    const lines = text.trim().split(/\r?\n/);
    if (!lines.length) return { headers: [], rows: [] };
    const hdrs = splitLine(lines[0]);
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const vals = splitLine(lines[i]);
      const obj = {};
      hdrs.forEach((h, idx) => { obj[h] = (vals[idx] || "").trim(); });
      rows.push(obj);
    }
    return { headers: hdrs, rows };
  }

  function splitLine(line) {
    const result = []; let cur = ""; let inQ = false;
    for (const c of line) {
      if (c === '"') inQ = !inQ;
      else if (c === "," && !inQ) { result.push(cur.trim()); cur = ""; }
      else cur += c;
    }
    result.push(cur.trim());
    return result;
  }

  // ── file handling ──
  function handleFile(file, key) {
    if (!file || !file.name.endsWith(".csv")) return;
    const reader = new FileReader();
    reader.onload = e => {
      const p = parseCSV(e.target.result);
      setParsed(prev => ({ ...prev, [key]: p.rows }));
      setHeaders(prev => ({ ...prev, [key]: p.headers }));
      setFiles(prev => ({ ...prev, [key]: file.name }));
    };
    reader.readAsText(file);
  }

  function clearFile(key) {
    setFiles(prev => ({ ...prev, [key]: null }));
    setParsed(prev => ({ ...prev, [key]: null }));
    setHeaders(prev => ({ ...prev, [key]: [] }));
  }

  // ── guess column ──
  function guess(hdrs, keywords) {
    const h = hdrs.map(x => x.toLowerCase());
    for (const kw of keywords) {
      const idx = h.findIndex(x => x.includes(kw));
      if (idx !== -1) return hdrs[idx];
    }
    return hdrs[0] || "";
  }

  // ── open modal with auto-guessed mappings ──
  function openModal() {
    setMappings({
      ucSku: guess(headers.uc, ["product code", "sku", "code", "article"]),
      ucLen: guess(headers.uc, ["length", "len"]),
      ucWid: guess(headers.uc, ["width", "wid"]),
      ucHt: guess(headers.uc, ["height", "ht", "hgt"]),
      ucWt: guess(headers.uc, ["weight", "wt", "gms", "gram"]),
      orderAwb: guess(headers.order, ["awb", "tracking", "waybill", "shipment"]),
      orderSku: guess(headers.order, ["sku", "product", "code", "item", "article"]),
      invAwb: guess(headers.invoice, ["awb", "tracking", "waybill"]),
      invWt: guess(headers.invoice, ["charged", "billed", "weight", "wt", "chargeable"]),
    });
    setShowModal(true);
  }

  // ── audit logic ──
  function runAudit() {
    setShowModal(false);
    const { divisor, rounding, threshold } = settings;

    const roundUp = (val, step) => Math.ceil(val / step) * step;

    // Build UC map
    const ucMap = {};
    for (const row of parsed.uc) {
      const sku = (row[mappings.ucSku] || "").trim().toUpperCase();
      if (!sku) continue;
      const L = parseFloat(row[mappings.ucLen]) || 0;
      const W = parseFloat(row[mappings.ucWid]) || 0;
      const H = parseFloat(row[mappings.ucHt]) || 0;
      const actualGms = parseFloat(row[mappings.ucWt]) || 0;
      ucMap[sku] = {
        actualKg: actualGms / 1000,
        volWtKg: (L / 10 * W / 10 * H / 10) / divisor,
      };
    }

    // Build AWB → SKUs map
    const awbSkuMap = {};
    for (const row of parsed.order) {
      const awb = (row[mappings.orderAwb] || "").trim();
      const sku = (row[mappings.orderSku] || "").trim().toUpperCase();
      if (!awb || !sku) continue;
      if (!awbSkuMap[awb]) awbSkuMap[awb] = [];
      awbSkuMap[awb].push(sku);
    }

    // Invoice map
    const invMap = {};
    for (const row of parsed.invoice) {
      const awb = (row[mappings.invAwb] || "").trim();
      const wt = parseFloat(row[mappings.invWt]) || 0;
      if (awb) invMap[awb] = wt;
    }

    // Process
    const out = [];
    for (const [awb, chargedWt] of Object.entries(invMap)) {
      const skus = awbSkuMap[awb] || [];
      const unmatched = skus.length === 0;
      let totalActual = 0, totalVol = 0;
      for (const sku of skus) {
        const info = ucMap[sku];
        if (!info) continue;
        totalActual += info.actualKg;
        totalVol += info.volWtKg;
      }
      const billableRaw = Math.max(totalActual, totalVol);
      const billable = roundUp(billableRaw, rounding);
      const diff = parseFloat((chargedWt - billable).toFixed(3));
      const status = unmatched ? "unmatched" : diff > threshold ? "overcharge" : "ok";
      out.push({
        awb, skus: skus.join(", ") || "—",
        item_count: skus.length,
        actual_wt: parseFloat(totalActual.toFixed(3)),
        vol_wt: parseFloat(totalVol.toFixed(3)),
        billable_wt: billable,
        charged_wt: chargedWt,
        diff, status,
        is_single: skus.length === 1,
        unmatched,
      });
    }

    setResults(out);
    const oc = out.filter(r => r.status === "overcharge");
    setStats({
      total: out.length,
      overcharged: oc.length,
      single: out.filter(r => r.is_single).length,
      unmatched: out.filter(r => r.unmatched).length,
      totalOverKg: oc.reduce((s, r) => s + r.diff, 0),
    });
  }

  // ── filter + sort ──
  useEffect(() => {
    let data = [...results];
    if (activeFilter === "overcharge") data = data.filter(r => r.status === "overcharge");
    else if (activeFilter === "single") data = data.filter(r => r.is_single);
    else if (activeFilter === "multi") data = data.filter(r => r.item_count > 1);
    else if (activeFilter === "ok") data = data.filter(r => r.status === "ok");
    else if (activeFilter === "unmatched") data = data.filter(r => r.unmatched);
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(r => r.awb.toLowerCase().includes(q) || r.skus.toLowerCase().includes(q));
    }
    if (sortCol) {
      data.sort((a, b) => {
        const av = a[sortCol], bv = b[sortCol];
        return typeof av === "number" ? (av - bv) * sortDir : String(av).localeCompare(String(bv)) * sortDir;
      });
    }
    setFiltered(data);
  }, [results, activeFilter, search, sortCol, sortDir]);

  function handleSort(col) {
    if (sortCol === col) setSortDir(d => d * -1);
    else { setSortCol(col); setSortDir(1); }
  }

  // ── download CSV ──
  function downloadCSV() {
    const hdrs = ["AWB", "SKUs", "Item Count", "Actual Wt (kg)", "Vol Wt (kg)", "Billable Wt (kg)", "Charged Wt (kg)", "Diff (kg)", "Status", "Single Item", "Unmatched"];
    const rows = results.map(r => [
      r.awb, `"${r.skus}"`, r.item_count,
      r.actual_wt, r.vol_wt, r.billable_wt, r.charged_wt, r.diff,
      r.status === "overcharge" ? "OVERCHARGED" : r.unmatched ? "UNMATCHED" : "OK",
      r.is_single ? "YES" : "NO", r.unmatched ? "YES" : "NO",
    ]);
    const csv = [hdrs.join(","), ...rows.map(r => r.join(","))].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "freight_audit_results.csv";
    a.click();
  }

  // ── drop zone ──
  const DropZone = ({ fileKey, label, desc }) => {
    const hasFile = !!files[fileKey];
    return (
      <div style={{
        background: "#1a1a1a", border: `1px solid ${hasFile ? "#00d97e" : "#2e2e2e"}`,
        borderRadius: "12px", padding: "20px",
      }}>
        <div style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", color: "#888", marginBottom: "4px" }}>{label}</div>
        <div style={{ fontSize: "11px", color: "#555", marginBottom: "12px" }}>{desc}</div>
        <div
          style={{
            border: `1px dashed ${dragging === fileKey ? "#00d97e" : "#2e2e2e"}`,
            borderRadius: "8px", padding: "16px", textAlign: "center", cursor: "pointer",
            background: dragging === fileKey ? "rgba(0,217,126,0.05)" : "transparent",
            transition: "all 0.2s",
          }}
          onClick={() => document.getElementById(`input-${fileKey}`).click()}
          onDragOver={e => { e.preventDefault(); setDragging(fileKey); }}
          onDragLeave={() => setDragging(null)}
          onDrop={e => { e.preventDefault(); setDragging(null); handleFile(e.dataTransfer.files[0], fileKey); }}
        >
          <input type="file" id={`input-${fileKey}`} accept=".csv" style={{ display: "none" }}
            onChange={e => handleFile(e.target.files[0], fileKey)} />
          <div style={{ fontSize: "20px", marginBottom: "4px" }}>📄</div>
          <div style={{ fontSize: "11px", color: "#555" }}>
            <span style={{ color: "#00d97e", cursor: "pointer" }}>Browse</span> or drop CSV
          </div>
        </div>
        {hasFile && (
          <div style={{
            display: "flex", alignItems: "center", gap: "8px", marginTop: "10px",
            background: "rgba(0,217,126,0.08)", border: "1px solid rgba(0,217,126,0.3)",
            borderRadius: "8px", padding: "7px 10px",
          }}>
            <span style={{ color: "#00d97e", fontSize: "11px" }}>✓</span>
            <span style={{ flex: 1, fontSize: "11px", color: "#00d97e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{files[fileKey]}</span>
            <span style={{ color: "#ff4d4d", cursor: "pointer", fontSize: "14px" }} onClick={() => clearFile(fileKey)}>✕</span>
          </div>
        )}
      </div>
    );
  };

  // ── select helper ──
  const MapSelect = ({ id, hdrs, val, onChange }) => (
    <select value={val || ""} onChange={e => onChange(e.target.value)}
      style={{ flex: 1, background: "#222", border: "1px solid #2e2e2e", borderRadius: "8px", color: "#f0f0f0", padding: "7px 10px", fontSize: "12px", outline: "none" }}>
      {hdrs.map(h => <option key={h} value={h}>{h}</option>)}
    </select>
  );

  const setMap = (key) => (val) => setMappings(m => ({ ...m, [key]: val }));

  // ── badge ──
  const Badge = ({ type, children }) => {
    const styles = {
      danger: { background: "rgba(255,77,77,0.1)", color: "#ff4d4d", border: "1px solid rgba(255,77,77,0.3)" },
      warn: { background: "rgba(245,166,35,0.1)", color: "#f5a623", border: "1px solid rgba(245,166,35,0.3)" },
      ok: { background: "rgba(0,217,126,0.1)", color: "#00d97e", border: "1px solid rgba(0,217,126,0.3)" },
      info: { background: "rgba(77,159,255,0.1)", color: "#4d9fff", border: "1px solid rgba(77,159,255,0.3)" },
      gray: { background: "rgba(136,136,136,0.1)", color: "#888", border: "1px solid rgba(136,136,136,0.2)" },
    };
    return (
      <span style={{ ...styles[type], display: "inline-flex", alignItems: "center", gap: "3px", padding: "2px 8px", borderRadius: "20px", fontSize: "11px", fontWeight: 600 }}>
        {children}
      </span>
    );
  };

  // ── render ──
  return (
    <div style={{ minHeight: "100vh", background: "#0f0f0f", color: "#f0f0f0", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", fontSize: "14px" }}>

      {/* HEADER */}
      <div style={{ borderBottom: "1px solid #2e2e2e", padding: "14px 32px", display: "flex", alignItems: "center", gap: "12px", background: "#1a1a1a" }}>
        <div style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.3px" }}>
          Freight<span style={{ color: "#00d97e" }}>Audit</span>
        </div>
        <div style={{ fontSize: "11px", color: "#555", marginLeft: "8px" }}>by MizzenIQ</div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "12px", color: "#555" }}>
            <span style={{ color: "#00d97e" }}>●</span> {user}
          </span>
          <button onClick={onLogout}
            style={{ background: "transparent", border: "1px solid #2e2e2e", borderRadius: "6px", color: "#888", padding: "5px 12px", fontSize: "12px", cursor: "pointer" }}>
            Sign out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "28px 24px" }}>

        {/* UPLOAD */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "20px" }}>
          <DropZone fileKey="uc" label="📦 UC Catalog" desc="Product master with dimensions & weight" />
          <DropZone fileKey="order" label="🗂️ Order Sheet" desc="Maps AWBs to SKUs" />
          <DropZone fileKey="invoice" label="🧾 Invoice Sheet" desc="AWBs with charged weight" />
        </div>

        {/* SETTINGS */}
        <div style={{ background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: "12px", padding: "14px 20px", display: "flex", alignItems: "center", gap: "28px", marginBottom: "20px", flexWrap: "wrap" }}>
          {[
            { label: "Vol. divisor", key: "divisor", min: 1000, max: 10000, step: 500 },
            { label: "Rounding (kg)", key: "rounding", min: 0.1, max: 1, step: 0.1 },
            { label: "Overcharge threshold (kg)", key: "threshold", min: 0, max: 5, step: 0.1 },
          ].map(({ label, key, min, max, step }) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <label style={{ fontSize: "12px", color: "#888" }}>{label}</label>
              <input type="number" value={settings[key]} min={min} max={max} step={step}
                onChange={e => setSettings(s => ({ ...s, [key]: parseFloat(e.target.value) }))}
                style={{ background: "#222", border: "1px solid #2e2e2e", borderRadius: "6px", color: "#f0f0f0", padding: "5px 8px", fontSize: "12px", width: "76px", outline: "none" }} />
            </div>
          ))}
          <span style={{ fontSize: "11px", color: "#444", marginLeft: "auto" }}>Vol wt = (L×W×H cm) ÷ divisor</span>
        </div>

        {/* PROCESS BTN */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "28px", alignItems: "center" }}>
          <button disabled={!allReady} onClick={openModal}
            style={{ padding: "10px 22px", borderRadius: "8px", border: "none", background: allReady ? "#00d97e" : "#2e2e2e", color: allReady ? "#000" : "#555", fontSize: "13px", fontWeight: 700, cursor: allReady ? "pointer" : "not-allowed", transition: "all 0.2s" }}>
            ⚡ Map Columns & Process
          </button>
          {!allReady && <span style={{ fontSize: "12px", color: "#555" }}>Upload all 3 files to continue</span>}
        </div>

        {/* STATS */}
        {stats && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px", marginBottom: "20px" }}>
              {[
                { label: "Total AWBs", val: stats.total, color: "#f0f0f0" },
                { label: "Overcharged", val: stats.overcharged, color: "#ff4d4d" },
                { label: "Single-item", val: stats.single, color: "#f5a623" },
                { label: "Unmatched", val: stats.unmatched, color: "#4d9fff" },
                { label: "Total Overcharge (kg)", val: stats.totalOverKg.toFixed(2), color: "#ff4d4d" },
              ].map(({ label, val, color }) => (
                <div key={label} style={{ background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: "12px", padding: "14px 16px" }}>
                  <div style={{ fontSize: "11px", color: "#555", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "6px" }}>{label}</div>
                  <div style={{ fontSize: "22px", fontWeight: 700, color }}>{val}</div>
                </div>
              ))}
            </div>

            {/* FILTERS */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "14px", flexWrap: "wrap", alignItems: "center" }}>
              {[
                { key: "all", label: "All AWBs", type: "default" },
                { key: "overcharge", label: "🔴 Overcharged", type: "danger" },
                { key: "single", label: "🟡 Single item", type: "warn" },
                { key: "multi", label: "🔵 Multi item", type: "info" },
                { key: "ok", label: "✅ Correct", type: "ok" },
                { key: "unmatched", label: "❓ Unmatched", type: "gray" },
              ].map(({ key, label }) => (
                <button key={key} onClick={() => setActiveFilter(key)}
                  style={{
                    padding: "5px 12px", borderRadius: "20px", border: `1px solid ${activeFilter === key ? "#00d97e" : "#2e2e2e"}`,
                    background: activeFilter === key ? "rgba(0,217,126,0.1)" : "transparent",
                    color: activeFilter === key ? "#00d97e" : "#888", fontSize: "12px", cursor: "pointer",
                  }}>
                  {label}
                </button>
              ))}
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search AWB or SKU…"
                style={{ marginLeft: "auto", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: "8px", color: "#f0f0f0", padding: "6px 12px", fontSize: "12px", width: "200px", outline: "none" }} />
            </div>

            {/* TABLE */}
            <div style={{ border: "1px solid #2e2e2e", borderRadius: "12px", overflow: "hidden", overflowX: "auto", marginBottom: "20px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12.5px" }}>
                <thead>
                  <tr>
                    {[
                      ["awb", "AWB"], ["skus", "SKU(s)"], ["item_count", "Items"],
                      ["actual_wt", "Actual (kg)"], ["vol_wt", "Vol. (kg)"],
                      ["billable_wt", "Billable (kg)"], ["charged_wt", "Charged (kg)"],
                      ["diff", "Diff (kg)"], ["status", "Status"],
                    ].map(([col, lbl]) => (
                      <th key={col} onClick={() => handleSort(col)}
                        style={{ background: "#1a1a1a", color: "#555", textAlign: "left", padding: "10px 12px", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px", borderBottom: "1px solid #2e2e2e", whiteSpace: "nowrap", cursor: "pointer", userSelect: "none" }}>
                        {lbl} {sortCol === col ? (sortDir === 1 ? "↑" : "↓") : "↕"}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={9} style={{ textAlign: "center", padding: "40px", color: "#555" }}>No results match the current filter.</td></tr>
                  ) : filtered.map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #1e1e1e" }}>
                      <td style={{ padding: "9px 12px", fontFamily: "monospace", fontSize: "12px", color: "#f0f0f0" }}>{r.awb}</td>
                      <td style={{ padding: "9px 12px", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#f0f0f0" }}>{r.skus}</td>
                      <td style={{ padding: "9px 12px", color: "#f0f0f0" }}>
                        {r.item_count}
                        {r.is_single && !r.unmatched && <> <Badge type="warn">1 item</Badge></>}
                        {r.item_count > 1 && <> <Badge type="info">{r.item_count} items</Badge></>}
                      </td>
                      <td style={{ padding: "9px 12px", color: "#f0f0f0" }}>{r.actual_wt.toFixed(3)}</td>
                      <td style={{ padding: "9px 12px", color: "#f0f0f0" }}>{r.vol_wt.toFixed(3)}</td>
                      <td style={{ padding: "9px 12px", fontWeight: 600, color: "#f0f0f0" }}>{r.billable_wt.toFixed(2)}</td>
                      <td style={{ padding: "9px 12px", color: "#f0f0f0" }}>{r.charged_wt.toFixed(2)}</td>
                      <td style={{ padding: "9px 12px", fontWeight: 600, color: r.diff > 0 ? "#ff4d4d" : r.diff < 0 ? "#00d97e" : "#555" }}>
                        {r.diff > 0 ? `+${r.diff.toFixed(2)}` : r.diff.toFixed(2)}
                      </td>
                      <td style={{ padding: "9px 12px" }}>
                        {r.status === "overcharge" ? <Badge type="danger">🔴 Overcharged</Badge>
                          : r.unmatched ? <Badge type="gray">❓ Unmatched</Badge>
                          : <Badge type="ok">✅ OK</Badge>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* DOWNLOAD */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: "12px", padding: "16px 20px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, marginBottom: "3px" }}>Export audit results</div>
                <div style={{ fontSize: "12px", color: "#555" }}>Full CSV with all flags, diffs, and weight breakdowns</div>
              </div>
              <button onClick={downloadCSV}
                style={{ padding: "9px 18px", borderRadius: "8px", border: "none", background: "#f5a623", color: "#000", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                ⬇ Download CSV
              </button>
            </div>
          </>
        )}
      </div>

      {/* COLUMN MAPPING MODAL */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "24px" }}>
          <div style={{ background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: "16px", padding: "28px", width: "100%", maxWidth: "480px", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>Map your columns</div>
            <div style={{ fontSize: "12px", color: "#555", marginBottom: "20px" }}>Auto-detected from your file headers — confirm or adjust.</div>

            {[
              { heading: "UC Catalog", fields: [
                { label: "Product Code / SKU", key: "ucSku", hdrs: headers.uc },
                { label: "Length (mm)", key: "ucLen", hdrs: headers.uc },
                { label: "Width (mm)", key: "ucWid", hdrs: headers.uc },
                { label: "Height (mm)", key: "ucHt", hdrs: headers.uc },
                { label: "Weight (gms)", key: "ucWt", hdrs: headers.uc },
              ]},
              { heading: "Order Sheet", fields: [
                { label: "AWB / Tracking No.", key: "orderAwb", hdrs: headers.order },
                { label: "SKU / Product Code", key: "orderSku", hdrs: headers.order },
              ]},
              { heading: "Invoice Sheet", fields: [
                { label: "AWB / Tracking No.", key: "invAwb", hdrs: headers.invoice },
                { label: "Charged Weight (kg)", key: "invWt", hdrs: headers.invoice },
              ]},
            ].map(({ heading, fields }) => (
              <div key={heading}>
                <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "#555", margin: "16px 0 10px", paddingBottom: "6px", borderBottom: "1px solid #2e2e2e" }}>{heading}</div>
                {fields.map(({ label, key, hdrs }) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <span style={{ fontSize: "12px", color: "#888", width: "140px", flexShrink: 0 }}>{label}</span>
                    <MapSelect id={key} hdrs={hdrs} val={mappings[key]} onChange={setMap(key)} />
                  </div>
                ))}
              </div>
            ))}

            <div style={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "flex-end" }}>
              <button onClick={() => setShowModal(false)}
                style={{ padding: "9px 16px", borderRadius: "8px", border: "1px solid #2e2e2e", background: "transparent", color: "#888", fontSize: "13px", cursor: "pointer" }}>
                Cancel
              </button>
              <button onClick={runAudit}
                style={{ padding: "9px 20px", borderRadius: "8px", border: "none", background: "#00d97e", color: "#000", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                ⚡ Run Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────
export default function FreightAudit() {
  const [authed, setAuthed] = useState(false);
  const [user, setUser] = useState("");

  // Check existing session on mount
  useEffect(() => {
    const token = sessionStorage.getItem(SESSION_KEY);
    const expiry = sessionStorage.getItem(SESSION_EXPIRY_KEY);
    if (token && expiry && Date.now() < parseInt(expiry)) {
      setUser(token);
      setAuthed(true);
    }
  }, []);

  function handleAuth(u) {
    setUser(u);
    setAuthed(true);
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_EXPIRY_KEY);
    setAuthed(false);
    setUser("");
  }

  if (!authed) return <AuthGate onAuth={handleAuth} />;
  return <FreightAuditTool user={user} onLogout={handleLogout} />;
}
