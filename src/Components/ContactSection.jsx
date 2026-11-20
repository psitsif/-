import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { sendContactMessage } from '../lib/api';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry / Incubation',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    // Client side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        loading: false,
        success: false,
        error: 'Please fill in all required fields (Name, Email, and Message).'
      });
      return;
    }

    try {
      await sendContactMessage(formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry / Incubation',
        message: ''
      });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || 'Unable to submit your inquiry. Please try again.'
      });
    }
  };

  return (
    <section className="py-20 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-heading-container">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-4 border border-emerald-200 shadow-2xs">
            Connect With SIF
          </div>
          <h2 className="section-title">Get in Touch</h2>
          <div className="section-title-bar" />
          <p className="section-subtitle">
            Whether you are a student founder with an idea, an early-stage venture seeking lab infrastructure, or an ecosystem mentor, we look forward to collaborating with you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          {/* Left: Contact Coordinates & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-50/70 p-5 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-2xl font-bold font-outfit text-slate-900">
                Incubation Administration
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Reach out directly to the PSIT Startup & Incubation Foundation team. We respond to prospective founders, ecosystem partners, and student inquiries within 1-2 business days.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Physical Location</div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Pranveer+Singh+Institute+of+Technology%2C+Bhauti%2C+Kanpur%2C+Uttar+Pradesh+209305"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-800 text-sm font-medium mt-0.5 leading-snug hover:text-emerald-700 transition-colors block"
                    >
                      Pranveer Singh Institute of Technology<br />
                      NH 19, Bhauti, Kanpur - 209305, Uttar Pradesh, India
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Direct Telephone</div>
                    <a
                      href="tel:+918960510510"
                      className="text-slate-800 text-sm font-semibold hover:text-emerald-700 transition-colors"
                    >
                      +91 89605 10510
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Official Correspondence</div>
                    <a
                      href="mailto:anurag.dhawan@psit.ac.in"
                      className="text-slate-800 text-sm font-semibold hover:text-emerald-700 transition-colors"
                    >
                      anurag.dhawan@psit.ac.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

           
{/* Google Map Embed (PSIT Kanpur) */}
<div className="h-64 w-full rounded-3xl overflow-hidden border border-slate-200 shadow-xs relative bg-slate-50">
  <iframe
    title="PSIT Kanpur Location"
    src="https://maps.google.com/maps?q=Pranveer%20Singh%20Institute%20of%20Technology%2C%20Bhauti%2C%20Kanpur%2C%20Uttar%20Pradesh%20209305&output=embed"
    width="100%"
    height="100%"
    style={{ border: 0, pointerEvents: "none" }}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />

  <a
    href="https://www.google.com/maps/search/?api=1&query=Pranveer+Singh+Institute+of+Technology%2C+Bhauti%2C+Kanpur%2C+Uttar+Pradesh+209305"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Open PSIT Kanpur in Google Maps"
    className="absolute inset-0 z-10 cursor-pointer"
  />
</div>

          </div>

          {/* Right: Working Backend Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
            <h3 className="text-2xl font-bold font-outfit text-slate-900 mb-2">
              Send an Official Inquiry
            </h3>
            <p className="text-slate-500 text-sm mb-8">
              All messages are recorded in our incubation management system and reviewed by our administrative panel.
            </p>

            {status.success && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div className="text-sm font-medium">
                  <strong>Inquiry Submitted!</strong> Thank you for reaching out to PSIT SIF. Your message has been saved in our database, and our incubation team will get back to you shortly.
                </div>
              </div>
            )}

            {status.error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800">
                <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
                <div className="text-sm font-medium">
                  {status.error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. founder@startup.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Subject / Area of Interest
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  >
                    <option value="General Inquiry / Incubation">General Inquiry / Incubation</option>
                    <option value="Apply for i-TBI Prototype Grant">Apply for i-TBI Prototype Grant</option>
                    <option value="Idea Lab & Workstation Access">Idea Lab & Workstation Access</option>
                    <option value="IPR Clinic & Patent Advisory">IPR Clinic & Patent Advisory</option>
                    <option value="Mentorship & Industry Connect">Mentorship & Industry Connect</option>
                    <option value="Media / Conclave Outreach">Media / Conclave Outreach</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Message / Project Pitch *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your venture, problem statement, team background, or specific assistance required..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold shadow-xs active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm"
              >
                {status.loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting to SIF Database...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Message to Incubation Team
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
