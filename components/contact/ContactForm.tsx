"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
        setFormData({ name: "", email: "", phone: "", company: "", service: "", message: "" });
      } else {
        setStatus({ type: 'error', message: data.error || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send the message. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-off-white p-8 md:p-10 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-2xl font-bold text-dark-navy mb-6">Send an Inquiry</h3>
      
      {status.type && (
        <div className={`p-4 rounded-md mb-6 ${status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">Full Name *</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-colors" placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">Email Address *</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} required className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-colors" placeholder="john@example.com" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">Phone Number</label>
            <input type="text" id="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-colors" placeholder="+977-XXXXXXXXXX" />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-charcoal mb-2">Company Name (Optional)</label>
            <input type="text" id="company" value={formData.company} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-colors" placeholder="Your Company Ltd." />
          </div>
        </div>
        
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-charcoal mb-2">Service Interested In</label>
          <select id="service" value={formData.service} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-colors text-charcoal">
            <option value="">Select a service...</option>
            <option value="legal">Legal Services</option>
            <option value="registration">Registration & Renewal</option>
            <option value="accounting">Accounting Services</option>
            <option value="financial">Financial Management</option>
            <option value="other">Other / General Inquiry</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">Message *</label>
          <textarea id="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full bg-white border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-colors" placeholder="How can we help you?"></textarea>
        </div>
        
        <button type="submit" disabled={isSubmitting} className="bg-primary-blue hover:bg-dark-navy disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-md transition-colors shadow-md w-full md:w-auto">
          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
        </button>
      </form>
    </div>
  );
}
