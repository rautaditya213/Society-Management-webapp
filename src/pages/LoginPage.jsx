import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, Button, Input } from '../components/UI';
import { Building2 } from 'lucide-react';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (login(identifier, password)) {
      navigate('/');
    } else {
      setError('Invalid username/flat number or password');
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <Building2 size={40} color="var(--primary-color)" />
          </div>
          <h1>Society Sync</h1>
          <p>Login to your account</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <Input
            label="Username / Flat Number"
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="e.g. admin or A-101"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button type="submit" className="w-full mt-4">Login</Button>
        </form>
        
       
      </Card>
    </div>
  );
};

export default LoginPage;
