import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Toast from '../components/ui/Toast';

export default function AuthPage() {
  const router = useRouter();

  // Auth state machine: 'login' | 'signup' | 'forgot' | 'otp' | 'success'
  const [authState, setAuthState] = useState('login');

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Errors and Status
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '', variant: 'success', icon: '✨' });

  // Floating sprinkle particles configuration
  const [sprinkles, setSprinkles] = useState([]);

  useEffect(() => {
    // Generate random ambient background sprinkles
    const items = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 6 + 4}px`,
      color: ['#FF6B9D', '#FFE4C4', '#F4A0B5', '#C4763A'][Math.floor(Math.random() * 4)],
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 10 + 10}s`,
    }));
    setSprinkles(items);
  }, []);

  const triggerToast = (msg, variant = 'success', icon = '✨') => {
    setToast({ show: true, msg, variant, icon });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleStateChange = (newState) => {
    setErrors({});
    setAuthState(newState);
  };

  // Helper validation
  const validateEmail = (val) => {
    return /\S+@\S+\.\S+/.test(val);
  };

  // Login handler
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = 'Email address is required';
    else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerToast('Please resolve validation errors', 'error', '⚠️');
      return;
    }

    setLoading(true);
    // Simulate premium fintech authentication request
    setTimeout(() => {
      setLoading(false);
      // Simulate successful login, saving a session token
      localStorage.setItem('glazed_user_token', 'mock_token_123');
      localStorage.setItem('glazed_user_name', email.split('@')[0]);
      triggerToast('Signed in successfully!', 'success', '🔑');
      setAuthState('success');
    }, 1800);
  };

  // Signup handler
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name) newErrors.name = 'Full name is required';
    if (!email) newErrors.email = 'Email address is required';
    else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreeTerms) newErrors.agreeTerms = 'You must accept the terms & conditions';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      triggerToast('Please resolve validation errors', 'error', '⚠️');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      triggerToast('Account created! Verification code sent.', 'success', '📨');
      setAuthState('otp');
    }, 1800);
  };

  // Forgot password handler
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = 'Email address is required';
    else if (!validateEmail(email)) newErrors.email = 'Please enter a valid email';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      triggerToast('Reset instructions sent to your email', 'success', '✉️');
      handleStateChange('login');
    }, 1500);
  };

  // OTP inputs handling
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next field
    if (element.value !== '' && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Move to previous on backspace
    if (e.key === 'Backspace' && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length < 4) {
      triggerToast('Please fill out the full 4-digit code', 'error', '⚠️');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('glazed_user_token', 'mock_token_123');
      localStorage.setItem('glazed_user_name', name || 'Artisan Baker');
      setAuthState('success');
    }, 1500);
  };

  // Success handler transition
  useEffect(() => {
    if (authState === 'success') {
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [authState, router]);

  return (
    <>
      <Head>
        <title>Sign In &mdash; Glazed &amp; Dazed</title>
      </Head>

      <Toast show={toast.show} msg={toast.msg} variant={toast.variant} icon={toast.icon} />

      <div className="auth-page-container">
        {/* Floating Background Sparkles */}
        <div className="auth-ambient-wrap">
          {sprinkles.map((sp) => (
            <div
              key={sp.id}
              className="auth-particle"
              style={{
                left: sp.left,
                top: sp.top,
                width: sp.size,
                height: sp.size,
                backgroundColor: sp.color,
                animationDelay: sp.delay,
                animationDuration: sp.duration,
              }}
            />
          ))}
        </div>

        {/* Unified Split Layout */}
        <div className="auth-card-wrapper">

          {/* LEFT: Premium Cinematic Brand Area */}
          <div className="auth-branding-panel">
            <div className="auth-branding-overlay" />
            <div className="auth-branding-content">
              <Link href="/" className="auth-logo">
                Glazed <span>&amp;</span> Dazed
              </Link>

              <div className="auth-branding-visual">
                <div className="auth-branding-donut-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <video
                    src="/images/hero_donut.mp4"
                    className="auth-3d-donut"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', maxWidth: '320px', height: 'auto', display: 'block', borderRadius: '16px' }}
                  />
                </div>
              </div>

              <div className="auth-branding-quote">
                <Badge variant="gold" className="auth-branding-badge">Loyalty Ecosystem ✦</Badge>
                <h3>Curated for the Sweet Obsessed!</h3>
                <p>Register to unlock members-only rewards, trace deliveries in real-time, and stack dessert point achievements.</p>
              </div>
            </div>
          </div>

          {/* RIGHT: High-fidelity Auth Form panel */}
          <div className="auth-form-panel">

            {/* Login View */}
            {authState === 'login' && (
              <div className="auth-panel-content">
                <div className="auth-header-block">
                  <h2>Welcome Back</h2>
                  <p>Sign in to manage your loyalty membership &amp; order history</p>
                </div>

                {/* Social Login Buttons */}
                <div className="auth-social-row">
                  <button type="button" className="auth-social-btn" onClick={() => triggerToast('Connecting Google...', 'info', '🌍')}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                    Google
                  </button>
                  <button type="button" className="auth-social-btn" onClick={() => triggerToast('Connecting Apple...', 'info', '🍎')}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.63.73-1.18 1.87-1.03 2.98.12.01.24.02.36.02.94 0 2.09-.6 2.62-1.44z" />
                    </svg>
                    Apple
                  </button>
                </div>

                <div className="auth-divider">
                  <span>or continue with email</span>
                </div>

                <form onSubmit={handleLoginSubmit} className="auth-form">
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    required
                  />
                  <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    required
                  />

                  <div className="auth-action-row">
                    <label className="auth-checkbox-label">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span>Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="auth-link-btn"
                      onClick={() => handleStateChange('forgot')}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button type="submit" loading={loading} className="auth-submit-btn">
                    Sign In
                  </Button>
                </form>

                <p className="auth-footer-text">
                  New to Glazed &amp; Dazed?{' '}
                  <button type="button" onClick={() => handleStateChange('signup')}>
                    Create a free account
                  </button>
                </p>
              </div>
            )}

            {/* Signup View */}
            {authState === 'signup' && (
              <div className="auth-panel-content">
                <div className="auth-header-block">
                  <h2>Create Account</h2>
                  <p>Unlock free delivery, points stacking, and order history</p>
                </div>

                <form onSubmit={handleSignupSubmit} className="auth-form">
                  <Input
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    required
                  />
                  <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    required
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={errors.confirmPassword}
                    required
                  />

                  <div className="auth-action-row" style={{ marginTop: '0.5rem' }}>
                    <label className="auth-checkbox-label" style={{ alignItems: 'flex-start' }}>
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        style={{ marginTop: '3px' }}
                      />
                      <span style={{ fontSize: '0.8rem', lineHeight: '1.4' }}>
                        I agree to the{' '}
                        <a href="#terms" onClick={(e) => e.preventDefault()} style={{ color: 'var(--glaze)', textDecoration: 'none' }}>
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#privacy" onClick={(e) => e.preventDefault()} style={{ color: 'var(--glaze)', textDecoration: 'none' }}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <span className="input-ui-error-msg" style={{ display: 'block', marginTop: '0.2rem' }}>
                      {errors.agreeTerms}
                    </span>
                  )}

                  <Button type="submit" loading={loading} className="auth-submit-btn">
                    Create Account
                  </Button>
                </form>

                <p className="auth-footer-text">
                  Already have an account?{' '}
                  <button type="button" onClick={() => handleStateChange('login')}>
                    Sign in here
                  </button>
                </p>
              </div>
            )}

            {/* Forgot Password View */}
            {authState === 'forgot' && (
              <div className="auth-panel-content">
                <div className="auth-header-block">
                  <h2>Reset Password</h2>
                  <p>Enter your email to receive recovery instructions</p>
                </div>

                <form onSubmit={handleForgotSubmit} className="auth-form">
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                    required
                  />

                  <Button type="submit" loading={loading} className="auth-submit-btn">
                    Send Reset Link
                  </Button>
                </form>

                <p className="auth-footer-text">
                  Remember your details?{' '}
                  <button type="button" onClick={() => handleStateChange('login')}>
                    Back to Sign In
                  </button>
                </p>
              </div>
            )}

            {/* OTP Verification View */}
            {authState === 'otp' && (
              <div className="auth-panel-content">
                <div className="auth-header-block">
                  <h2>Verify Email</h2>
                  <p>We've sent a 4-digit code to <strong>{email || 'your email'}</strong></p>
                </div>

                <form onSubmit={handleOtpSubmit} className="auth-form">
                  <div className="auth-otp-row">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={data}
                        onChange={(e) => handleOtpChange(e.target, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        onFocus={(e) => e.target.select()}
                        className="auth-otp-input"
                        required
                      />
                    ))}
                  </div>

                  <Button type="submit" loading={loading} className="auth-submit-btn" style={{ marginTop: '2rem' }}>
                    Verify Code
                  </Button>
                </form>

                <div className="auth-otp-resend">
                  <p>Didn't receive the email?</p>
                  <button
                    type="button"
                    onClick={() => {
                      triggerToast('Resent validation code!', 'success', '📨');
                      setOtp(['', '', '', '']);
                    }}
                  >
                    Resend Code
                  </button>
                </div>

                <p className="auth-footer-text">
                  Need to change details?{' '}
                  <button type="button" onClick={() => handleStateChange('signup')}>
                    Go back
                  </button>
                </p>
              </div>
            )}

            {/* Success Animation Screen */}
            {authState === 'success' && (
              <div className="auth-panel-content auth-success-content">
                <div className="auth-success-circle">
                  {/* Confetti Explosion Visual inside SVG */}
                  <svg className="auth-success-checkmark" viewBox="0 0 52 52">
                    <circle className="auth-success-circle-path" cx="26" cy="26" r="25" fill="none" />
                    <path className="auth-success-check-path" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                  </svg>
                </div>

                <div className="auth-header-block text-center" style={{ marginTop: '2rem' }}>
                  <h2>Authenticating...</h2>
                  <p>Synchronizing your loyalty achievements and setting up your dessert dashboard portal.</p>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </>
  );
}
