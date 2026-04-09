// ========================================
// Submit.jsx - Form to submit a new startup pitch
// Route: /submit
// ========================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getStartups, saveStartups, CATEGORIES } from '../data/seedData';
import { useAuth } from '../context/AuthContext';
import './Submit.css';

export default function Submit() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form data stored in state
  const [form, setForm] = useState({
    title: '',
    authorName: user ? user.name : '',
    category: '',
    description: '',
    problem: '',
    solution: '',
    market: '',
    funding: ''
  });

  // Track which fields have errors
  const [errors, setErrors] = useState({});

  // Update form when user types
  function handleChange(e) {
    const { name, value } = e.target;

    // Limit description to 200 characters
    if (name === 'description' && value.length > 200) return;

    setForm({ ...form, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  }

  // Check if all required fields are filled
  function validate() {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Required';
    if (!form.authorName.trim()) newErrors.authorName = 'Required';
    if (!form.category) newErrors.category = 'Required';
    if (!form.description.trim()) newErrors.description = 'Required';
    if (!form.problem.trim()) newErrors.problem = 'Required';
    if (!form.solution.trim()) newErrors.solution = 'Required';
    if (!form.market.trim()) newErrors.market = 'Required';
    if (!form.funding.trim()) newErrors.funding = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Stop if validation fails
    if (!validate()) return;

    // Create new startup object
    const newStartup = {
      id: 'startup-' + Date.now(),
      title: form.title,
      authorName: form.authorName,
      authorId: user ? user.id : 'guest',
      category: form.category,
      description: form.description,
      problem: form.problem,
      solution: form.solution,
      market: form.market,
      funding: form.funding,
      date: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      likedBy: []
    };

    // Add to localStorage and redirect
    const startups = getStartups();
    startups.unshift(newStartup); // add to beginning
    saveStartups(startups);
    navigate('/explore');
  }

  // Filter out "All" from categories for the dropdown
  const categoryOptions = CATEGORIES.filter(c => c !== 'All');

  return (
    <div className="submit-page">
      <Navbar />

      <div className="submit-container">
        <div className="submit-card">
          <h1 className="submit-title">Submit Your Startup Pitch</h1>
          <p className="submit-subtitle">Share your idea with the world.</p>

          <form onSubmit={handleSubmit} className="submit-form">

            {/* Row 1: Name fields side by side */}
            <div className="form-row">
              <div className={`form-group ${errors.title ? 'form-group--error' : ''}`}>
                <label>Startup Name *</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="e.g., Scale AI" />
                {errors.title && <span className="form-error">{errors.title}</span>}
              </div>

              <div className={`form-group ${errors.authorName ? 'form-group--error' : ''}`}>
                <label>Your Name *</label>
                <input name="authorName" value={form.authorName} onChange={handleChange} placeholder="e.g., John Doe" />
                {errors.authorName && <span className="form-error">{errors.authorName}</span>}
              </div>
            </div>

            {/* Category dropdown */}
            <div className={`form-group ${errors.category ? 'form-group--error' : ''}`}>
              <label>Category *</label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Select a category</option>
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <span className="form-error">{errors.category}</span>}
            </div>

            {/* Short description with character counter */}
            <div className={`form-group ${errors.description ? 'form-group--error' : ''}`}>
              <label>
                Short Description *
                <span className="char-count">{form.description.length}/200</span>
              </label>
              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Brief description of your startup..." rows="3" />
              {errors.description && <span className="form-error">{errors.description}</span>}
            </div>

            {/* Problem */}
            <div className={`form-group ${errors.problem ? 'form-group--error' : ''}`}>
              <label>Problem Statement *</label>
              <textarea name="problem" value={form.problem} onChange={handleChange}
                placeholder="What problem does your startup solve?" rows="3" />
              {errors.problem && <span className="form-error">{errors.problem}</span>}
            </div>

            {/* Solution */}
            <div className={`form-group ${errors.solution ? 'form-group--error' : ''}`}>
              <label>Solution *</label>
              <textarea name="solution" value={form.solution} onChange={handleChange}
                placeholder="How does your startup solve this problem?" rows="3" />
              {errors.solution && <span className="form-error">{errors.solution}</span>}
            </div>

            {/* Market */}
            <div className={`form-group ${errors.market ? 'form-group--error' : ''}`}>
              <label>Target Market *</label>
              <textarea name="market" value={form.market} onChange={handleChange}
                placeholder="Who are your target customers?" rows="3" />
              {errors.market && <span className="form-error">{errors.market}</span>}
            </div>

            {/* Funding */}
            <div className={`form-group ${errors.funding ? 'form-group--error' : ''}`}>
              <label>Funding Required *</label>
              <input name="funding" value={form.funding} onChange={handleChange} placeholder="e.g., $500,000" />
              {errors.funding && <span className="form-error">{errors.funding}</span>}
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              🚀 Submit Pitch
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
