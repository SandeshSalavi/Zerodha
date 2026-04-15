import React, { useState } from 'react';
import './Signup.css';

function Signup() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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
        if (!formData.name.trim()) {
            setError('Name is required');
            return false;
        }
        if (formData.name.trim().length < 2) {
            setError('Name must be at least 2 characters');
            return false;
        }
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
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        console.log('📋 Form Data:', formData);

        if (!validateForm()) {
            console.log('❌ Form validation failed');
            return;
        }

        setLoading(true);
        console.log('🚀 Submitting signup request...');

        try {
            const payload = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
                confirmPassword: formData.confirmPassword
            };

            console.log('📤 Sending to backend:', payload);

            const response = await fetch('http://localhost:3002/auth/signup', {
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
                throw new Error(data.message || 'Signup failed');
            }

            console.log('✅ Signup successful!');
            console.log('🔑 Token:', data.token);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setSuccess('Account created successfully! Redirecting...');
            
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);

        } catch (err) {
            console.error('❌ Signup Error:', err.message);
            setError(err.message || 'An error occurred during signup');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h1>Create Account</h1>
                <p className="signup-subtitle">Join us and start trading</p>

                {error && <div className="alert alert-error">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            disabled={loading}
                            required
                        />
                    </div>

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
                            placeholder="Enter password (min 6 characters)"
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            disabled={loading}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn-signup"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="login-link">
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </div>
        </div>
    );
}

export default Signup;