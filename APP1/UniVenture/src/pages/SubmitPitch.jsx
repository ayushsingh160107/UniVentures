// ========================================
// SubmitPitch.jsx — Premium multi-step form
// ========================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Rocket, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import TagBadge from '../components/TagBadge';
import { getStartups, saveStartups, getUser, DOMAINS, ROLE_OPTIONS, MARKET_SIZES, FUNDING_TYPES, REVENUE_MODELS } from '../data/mockStartups';
import { generateId } from '../utils/helpers';

const STEPS = [
  { num: 1, title: 'The Idea', desc: 'Tell us about your startup', emoji: '💡' },
  { num: 2, title: 'The Business', desc: 'Market and funding details', emoji: '📊' },
  { num: 3, title: 'The Team', desc: 'Who\'s building this?', emoji: '👥' },
];

// Convert YouTube watch URLs → embed URLs
function convertToEmbed(url) {
  if (!url) return '';
  // Already an embed URL
  if (url.includes('/embed/')) return url;
  // youtube.com/watch?v=ID
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  // Loom share → embed
  if (url.includes('loom.com/share/')) return url.replace('/share/', '/embed/');
  return url;
}

export default function SubmitPitch() {
  const navigate = useNavigate();
  const user = getUser();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const [form, setForm] = useState({
    title: '', tagline: '', domain: '', problem: '', solution: '', tags: [],
    market: '', marketSize: '', fundingAsk: '', fundingType: 'Equity',
    traction: '', revenueModel: '',
    founderName: user.name || '', college: user.college || '', founderRole: 'CEO',
    rolesNeeded: [], deckLink: '', demoVideo: '', contactEmail: user.email || ''
  });

  function updateField(name, value) {
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  function handleTagKeyDown(e) {
    if ((e.key === ',' || e.key === 'Enter') && tagInput.trim()) {
      e.preventDefault();
      const tag = tagInput.trim().replace(/,/g, '');
      if (tag && !form.tags.includes(tag) && form.tags.length < 5) {
        updateField('tags', [...form.tags, tag]);
      }
      setTagInput('');
    }
  }

  function removeTag(tag) { updateField('tags', form.tags.filter(t => t !== tag)); }

  function toggleRole(role) {
    const current = form.rolesNeeded;
    updateField('rolesNeeded', current.includes(role) ? current.filter(r => r !== role) : [...current, role]);
  }

  function validateStep(s) {
    const errs = {};
    if (s === 1) {
      if (!form.title.trim()) errs.title = 'Required';
      if (!form.tagline.trim()) errs.tagline = 'Required';
      if (!form.domain) errs.domain = 'Required';
      if (!form.problem.trim()) errs.problem = 'Required';
      if (!form.solution.trim()) errs.solution = 'Required';
    } else if (s === 2) {
      if (!form.market.trim()) errs.market = 'Required';
      if (!form.marketSize) errs.marketSize = 'Required';
      if (!form.fundingAsk) errs.fundingAsk = 'Required';
    } else if (s === 3) {
      if (!form.founderName.trim()) errs.founderName = 'Required';
      if (!form.contactEmail.trim()) errs.contactEmail = 'Required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function nextStep() { if (validateStep(step)) setStep(step + 1); }
  function prevStep() { if (step > 1) setStep(step - 1); }

  function handleSubmit() {
    if (!validateStep(3)) return;
    const newStartup = {
      id: generateId(), title: form.title, tagline: form.tagline, domain: form.domain,
      tags: form.tags, problem: form.problem, solution: form.solution, market: form.market,
      traction: form.traction || 'Early stage — building MVP',
      fundingAsk: parseInt(form.fundingAsk) || 0, fundingType: form.fundingType,
      marketSize: form.marketSize, revenueModel: form.revenueModel || 'Other',
      votes: 0, views: 0, comments: [], saves: 0, rolesNeeded: form.rolesNeeded,
      founders: [{ name: form.founderName, college: form.college, role: form.founderRole }],
      contactEmail: form.contactEmail,
      demoVideo: form.demoVideo ? convertToEmbed(form.demoVideo) : '',
      postedAt: new Date().toISOString(), isTrending: false
    };
    const startups = getStartups();
    startups.unshift(newStartup);
    saveStartups(startups);
    setShowSuccess(true);
    setTimeout(() => navigate('/explore'), 2500);
  }

  const progress = ((step - 1) / 2) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F0FF] via-[#F8FAFF] to-white">
      <Navbar />

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="relative bg-white border border-gray-100 rounded-3xl p-10 text-center max-w-md mx-4 animate-fade-up shadow-2xl">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="absolute w-2 h-2 rounded-full animate-confetti"
                style={{
                  backgroundColor: ['#6C63FF', '#00B4D8', '#F59E0B', '#EF4444', '#10B981'][i % 5],
                  top: '40%', left: '50%',
                  transform: `rotate(${i * 30}deg) translateY(-60px)`,
                  animationDelay: `${i * 0.05}s`
                }} />
            ))}
            <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-5">
              <Check size={32} className="text-[#10B981]" />
            </div>
            <h2 className="font-[Syne] text-2xl font-bold text-[#1A1A2E] mb-2">Pitch Submitted! 🎉</h2>
            <p className="text-[#6B7280] text-sm">Your startup is now live. Redirecting to explore...</p>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  step === s.num
                    ? 'bg-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/25'
                    : step > s.num
                      ? 'bg-[#10B981]/10 text-[#10B981]'
                      : 'bg-gray-100 text-[#6B7280]'
                }`}>
                  {step > s.num ? <Check size={14} /> : <span>{s.emoji}</span>}
                  <span className="hidden sm:inline">{s.title}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`w-8 md:w-16 h-0.5 mx-2 rounded ${step > s.num ? 'bg-[#10B981]/40' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#6C63FF] to-[#00B4D8] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 p-6 md:p-8">
          <div className="mb-8">
            <h1 className="font-[Syne] text-2xl font-bold text-[#1A1A2E] flex items-center gap-2">
              {STEPS[step - 1].emoji} {STEPS[step - 1].title}
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">{STEPS[step - 1].desc}</p>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-up">
              <Field label="Startup Name" error={errors.title} required>
                <input value={form.title} onChange={e => updateField('title', e.target.value)} placeholder="e.g., EduBot AI" className="field-input" />
              </Field>
              <Field label="Tagline" error={errors.tagline} required count={`${form.tagline.length}/100`}>
                <input value={form.tagline} maxLength={100} onChange={e => updateField('tagline', e.target.value)} placeholder="One-liner that describes your startup" className="field-input" />
              </Field>
              <Field label="Domain" error={errors.domain} required>
                <select value={form.domain} onChange={e => updateField('domain', e.target.value)} className="field-input">
                  <option value="">Select domain</option>
                  {DOMAINS.map(d => <option key={d.name} value={d.name}>{d.emoji} {d.name}</option>)}
                </select>
              </Field>
              <Field label="Problem Statement" error={errors.problem} required count={`${form.problem.length}/300`}>
                <textarea value={form.problem} maxLength={300} rows={3} onChange={e => updateField('problem', e.target.value)} placeholder="What problem does your startup solve?" className="field-input resize-none" />
              </Field>
              <Field label="Solution" error={errors.solution} required count={`${form.solution.length}/300`}>
                <textarea value={form.solution} maxLength={300} rows={3} onChange={e => updateField('solution', e.target.value)} placeholder="How does your startup solve this problem?" className="field-input resize-none" />
              </Field>
              <Field label="Tags" hint="Press comma or enter to add (max 5)">
                <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown} placeholder="e.g., AI, B2C, SaaS" className="field-input mb-2" />
                {form.tags.length > 0 && <div className="flex flex-wrap gap-1.5">{form.tags.map(tag => <TagBadge key={tag} tag={tag} onRemove={removeTag} />)}</div>}
              </Field>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-up">
              <Field label="Target Market" error={errors.market} required>
                <textarea value={form.market} rows={3} onChange={e => updateField('market', e.target.value)} placeholder="Who are your target customers?" className="field-input resize-none" />
              </Field>
              <Field label="Market Size" error={errors.marketSize} required>
                <select value={form.marketSize} onChange={e => updateField('marketSize', e.target.value)} className="field-input">
                  <option value="">Select market size</option>
                  {MARKET_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Funding Ask (₹)" error={errors.fundingAsk} required>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] text-sm font-medium">₹</span>
                    <input type="number" value={form.fundingAsk} onChange={e => updateField('fundingAsk', e.target.value)} placeholder="2000000" className="field-input pl-7" />
                  </div>
                </Field>
                <Field label="Funding Type">
                  <select value={form.fundingType} onChange={e => updateField('fundingType', e.target.value)} className="field-input">
                    {FUNDING_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Traction">
                <textarea value={form.traction} rows={3} onChange={e => updateField('traction', e.target.value)} placeholder="Users, revenue, partnerships..." className="field-input resize-none" />
              </Field>
              <Field label="Revenue Model">
                <select value={form.revenueModel} onChange={e => updateField('revenueModel', e.target.value)} className="field-input">
                  <option value="">Select revenue model</option>
                  {REVENUE_MODELS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-up">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Founder Name" error={errors.founderName} required>
                  <input value={form.founderName} onChange={e => updateField('founderName', e.target.value)} placeholder="Your full name" className="field-input" />
                </Field>
                <Field label="College / University">
                  <input value={form.college} onChange={e => updateField('college', e.target.value)} placeholder="e.g., IIT Delhi" className="field-input" />
                </Field>
              </div>
              <Field label="Your Role">
                <select value={form.founderRole} onChange={e => updateField('founderRole', e.target.value)} className="field-input">
                  {['CEO', 'CTO', 'CPO', 'COO', 'CMO', 'Co-Founder'].map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </Field>
              <Field label="Roles Looking For" hint="Select all that apply">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ROLE_OPTIONS.map(role => (
                    <button key={role} type="button" onClick={() => toggleRole(role)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                        form.rolesNeeded.includes(role) ? 'bg-[#6C63FF]/5 text-[#6C63FF] border-[#6C63FF]/30 shadow-sm' : 'bg-gray-50 text-[#6B7280] border-gray-200 hover:border-gray-300'
                      }`}>
                      {role}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Pitch Deck Link" hint="Optional">
                <input value={form.deckLink} onChange={e => updateField('deckLink', e.target.value)} placeholder="https://..." className="field-input" />
              </Field>
              <Field label="Demo Video URL" hint="YouTube or Loom URL — helps investors understand your product">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]">▶</span>
                  <input value={form.demoVideo} onChange={e => updateField('demoVideo', e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="field-input pl-8" />
                </div>
                {form.demoVideo && (
                  <p className="text-xs text-[#10B981] mt-1 flex items-center gap-1">✓ Video will be embedded on your pitch page</p>
                )}
              </Field>
              <Field label="Contact Email" error={errors.contactEmail} required>
                <input type="email" value={form.contactEmail} onChange={e => updateField('contactEmail', e.target.value)} placeholder="you@example.com" className="field-input" />
              </Field>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button onClick={prevStep} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] bg-gray-50 border border-gray-200 hover:text-[#1A1A2E] transition-colors">
                <ArrowLeft size={16} /> Previous
              </button>
            ) : <div />}
            {step < 3 ? (
              <button onClick={nextStep} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-[#6C63FF] text-white shadow-lg shadow-[#6C63FF]/25 hover:shadow-xl hover:shadow-[#6C63FF]/30 transition-all">
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={handleSubmit} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-[#6C63FF] to-[#00B4D8] text-white shadow-lg shadow-[#6C63FF]/25 hover:shadow-xl transition-all">
                <Rocket size={16} /> Submit Pitch
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .field-input {
          width: 100%; padding: 0.625rem 0.875rem; border-radius: 0.75rem;
          background: #F9FAFB; border: 1.5px solid #E5E7EB; color: #1A1A2E;
          font-size: 0.875rem; transition: all 0.2s; outline: none;
        }
        .field-input::placeholder { color: #9CA3AF; }
        .field-input:focus { border-color: #6C63FF; box-shadow: 0 0 0 3px rgba(108,99,255,0.08); background: white; }
        select.field-input { cursor: pointer; }
      `}</style>
    </div>
  );
}

function Field({ label, error, required, count, hint, children }) {
  return (
    <div>
      <label className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-[#1A1A2E]">{label} {required && <span className="text-[#EF4444]">*</span>}</span>
        {count && <span className="text-xs text-[#6B7280] font-mono">{count}</span>}
      </label>
      {hint && <p className="text-xs text-[#9CA3AF] mb-1.5">{hint}</p>}
      {children}
      {error && <p className="text-xs text-[#EF4444] mt-1">{error}</p>}
    </div>
  );
}
