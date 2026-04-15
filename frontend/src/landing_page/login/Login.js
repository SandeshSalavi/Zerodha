import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const validateForm = () => {
        if (!formData.email.trim()) {
            setError('Email is required');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email');
            return false;
        }
        if (!formData.password) {
            setError('Password is required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        console.log('📋 Login Form Data:', formData);

        if (!validateForm()) {
            console.log('❌ Form validation failed');
            return;
        }

        setLoading(true);
        console.log('🚀 Submitting login request...');

        try {
            const payload = {
                email: formData.email.trim(),
                password: formData.password
            };

            console.log('📤 Sending to backend:', payload);

            const response = await fetch('http://localhost:3002/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            console.log('📥 Response Status:', response.status);
            
            const data = await response.json();
            console.log('📥 Response Data:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            console.log('✅ Login successful!');
            console.log('🔑 Token:', data.token);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setSuccess('Login successful! Redirecting...');
            
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);

        } catch (err) {
            console.error('❌ Login Error:', err.message);
            setError(err.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Welcome Back</h1>
                <p className="login-subtitle">Login to your account</p>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            disabled={loading}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn-login"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="signup-link">
                    Don't have an account? <a href="/signup">Sign up here</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
