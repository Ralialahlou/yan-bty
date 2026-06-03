import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from './Button';
import Logo from './Logo';
import styles from './AuthModal.module.css';

export default function AuthModal() {
  const { isAuthOpen, authMode, closeAuth, login, register } = useAuth();
  const [mode, setMode] = useState(authMode ?? 'login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  if (!isAuthOpen) return null;

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (mode === 'login') {
      await login(form.email, form.password);
    } else {
      await register(form.name, form.email, form.password);
    }
    setLoading(false);
  };

  return (
    <>
      <div className={styles.overlay} onClick={closeAuth} />
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={closeAuth}><X size={20} /></button>

        <div className={styles.header}>
          <Logo size="md" variant="red" linkTo="/" />
          <h2 className={styles.title}>{mode === 'login' ? 'Welcome back' : 'Create an account'}</h2>
          <p className={styles.sub}>{mode === 'login' ? 'Sign in to your account' : 'Join the Yan BTY community'}</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === 'register' && (
            <div className={styles.field}>
              <label className={styles.label}>Full Name</label>
              <input className={styles.input} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Layla Benhaddou" required />
            </div>
          )}
          <div className={styles.field}>
            <label className={styles.label}>Email Address</label>
            <input className={styles.input} type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input className={styles.input} type="password" value={form.password} onChange={e => update('password', e.target.value)} placeholder="••••••••" required />
          </div>
          {mode === 'login' && (
            <button type="button" className={styles.forgotLink}>Forgot password?</button>
          )}
          <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <p className={styles.switchText}>
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
          {' '}
          <button className={styles.switchBtn} onClick={() => setMode(m => m === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Register' : 'Sign In'}
          </button>
        </p>

        <p className={styles.loyalty}>
          Join now and start earning <strong>kenzup</strong> loyalty points from your first purchase.
        </p>
      </div>
    </>
  );
}
