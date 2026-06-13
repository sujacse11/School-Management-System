import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Mail, Send, HelpCircle, AlertTriangle, CheckCircle, ShieldAlert, ArrowRight, MessageSquare } from 'lucide-react';

const ContactTeacher = () => {
  const { user, web3Key, addSentMessage, sentMessages } = useApp();
  
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  // States for form interaction
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isShaking, setIsShaking] = useState(false);
  const [submitResult, setSubmitResult] = useState(null); // { success: boolean, message: string }

  if (!user) return null;

  const validateForm = () => {
    const tempErrors = {};
    if (!subject) {
      tempErrors.subject = 'Please select a message subject';
    }
    if (!message) {
      tempErrors.message = 'Please enter a message';
    } else if (message.length < 15) {
      tempErrors.message = 'Message must be at least 15 characters long';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitResult(null);

    const isValid = validateForm();
    if (!isValid) {
      triggerShake();
      return;
    }

    setLoading(true);

    const messagePayload = {
      id: `MSG_${Date.now()}`,
      parentName: user.name,
      studentName: user.childName,
      email: user.email,
      subject: subject,
      message: message,
      timestamp: new Date().toLocaleString(),
      mode: web3Key ? 'Web3Forms API' : 'Simulated'
    };

    if (web3Key) {
      // Real Web3Forms Submission
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: `${user.name} (Parent of ${user.childName})`,
            email: user.email,
            subject: `[School Portal] ${subject} - ${user.childName}`,
            message: message,
            botcheck: false
          })
        });

        const resData = await response.json();
        
        if (response.status === 200 || resData.success) {
          addSentMessage(messagePayload);
          setSubmitResult({ success: true, message: 'Your message has been delivered to the teacher\'s email inbox!' });
          setMessage('');
          setSubject('');
        } else {
          setSubmitResult({ success: false, message: resData.message || 'Web3Forms API error. Please check your Access Key.' });
        }
      } catch (err) {
        setSubmitResult({ success: false, message: 'Network error. Failed to submit message to Web3Forms.' });
      } finally {
        setLoading(false);
      }
    } else {
      // Simulated Submission
      setTimeout(() => {
        addSentMessage(messagePayload);
        setSubmitResult({ 
          success: true, 
          message: 'Form validation successful! (Simulation Mode: Web3Forms access key not set in Settings, but the action completed successfully)' 
        });
        setMessage('');
        setSubject('');
        setLoading(false);
      }, 1200);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 fade-in">
      
      {/* Contact Form Container */}
      <div className="lg:col-span-3 flex flex-col gap-4">
        
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600 rounded-xl text-white flex items-center justify-center">
            <Mail size={22} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-extrabold text-slate-800 dark:text-white">
              Contact Class Teacher
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
              Send an email to teacher Mrs. Sarah Connor using Web3Forms.
            </p>
          </div>
        </div>

        {/* Missing Key Warning */}
        {!web3Key && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/60 flex items-start gap-3.5">
            <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
              <strong>Email Delivery is in Demo Mode:</strong> No Web3Forms Access Key is set. Your form will validate, but submission will only be simulated. You can configure a key in the <Link to="/settings" className="underline font-bold text-amber-900 dark:text-amber-100">Settings Page</Link> to enable real email delivery.
            </div>
          </div>
        )}

        {/* Submit feedback overlays */}
        {submitResult && (
          <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
            submitResult.success 
              ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-950 text-emerald-600 dark:text-emerald-400' 
              : 'bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-950 text-rose-500'
          }`}>
            {submitResult.success ? (
              <CheckCircle size={18} className="shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert size={18} className="shrink-0 mt-0.5" />
            )}
            <div className="text-xs font-semibold leading-relaxed">
              {submitResult.message}
            </div>
          </div>
        )}

        {/* Form panel */}
        <div className={`glass p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 transition-all ${isShaking ? 'shake' : ''}`}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Prefilled readonly info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-850">
              <div className="text-xs">
                <span className="text-slate-400 dark:text-slate-500 font-bold block mb-0.5">Sender Parent</span>
                <span className="font-semibold text-slate-700 dark:text-slate-350">{user.name}</span>
              </div>
              <div className="text-xs">
                <span className="text-slate-400 dark:text-slate-500 font-bold block mb-0.5">Linked Student</span>
                <span className="font-semibold text-slate-700 dark:text-slate-350">{user.childName}</span>
              </div>
            </div>

            {/* Subject Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Message Subject
              </label>
              <select
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  if (errors.subject) setErrors(prev => ({ ...prev, subject: '' }));
                }}
                className={`input-field ${errors.subject ? 'error' : ''}`}
              >
                <option value="">-- Choose Subject --</option>
                <option value="Academic Performance Inquiry">Academic Performance Inquiry</option>
                <option value="Attendance / Sick Leave Request">Attendance / Sick Leave Request</option>
                <option value="Tuition Fee / Payment Query">Tuition Fee / Payment Query</option>
                <option value="Parent-Teacher Meeting Request">Parent-Teacher Meeting Request</option>
                <option value="General Feedback / Other">General Feedback / Other</option>
              </select>
              {errors.subject && (
                <span className="text-xs text-rose-500 font-semibold mt-0.5">{errors.subject}</span>
              )}
            </div>

            {/* Message Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Message Body
              </label>
              <textarea
                placeholder="Write your message to the class teacher here (minimum 15 characters)..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                }}
                rows={5}
                className={`input-field resize-none py-3 ${errors.message ? 'error' : ''}`}
              />
              {errors.message && (
                <span className="text-xs text-rose-500 font-semibold mt-0.5">{errors.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 rounded-xl font-semibold text-sm mt-3 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting message...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>{web3Key ? 'Send Email via Web3Forms' : 'Simulate Message Submission'}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Message History Drawer / Panel */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        
        <h3 className="text-lg font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <MessageSquare size={18} className="text-indigo-500" />
          <span>Sent Messages History ({sentMessages.length})</span>
        </h3>

        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
          {sentMessages.length === 0 ? (
            <div className="glass p-8 rounded-3xl text-center border border-slate-200 dark:border-slate-800/80 text-xs font-semibold text-slate-400 dark:text-slate-500">
              No message logs found. Submitted queries will display here.
            </div>
          ) : (
            sentMessages.map((msg) => (
              <div 
                key={msg.id} 
                className="glass p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col gap-2 fade-in"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                    {msg.subject.split(' ').slice(0, 3).join(' ')}...
                  </span>
                  <span className="text-slate-400 font-semibold">{msg.timestamp.split(',')[0]}</span>
                </div>
                
                <p className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed font-medium">
                  {msg.message}
                </p>
                
                <div className="pt-2 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between text-[9px] font-bold text-slate-400">
                  <span>Method: {msg.mode}</span>
                  <span className="text-emerald-500 uppercase tracking-widest">Sent</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default ContactTeacher;
