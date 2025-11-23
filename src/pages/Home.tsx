import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { FaceLogin } from '../components/FaceLogin';
import './Home.css';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const [showFaceLogin, setShowFaceLogin] = useState(false);

    const handleFaceLoginSuccess = () => {
        setShowFaceLogin(false);
        navigate('/dashboard');
    };

    return (
        <div className="home-container">
            {showFaceLogin && (
                <FaceLogin
                    onLogin={handleFaceLoginSuccess}
                    onCancel={() => setShowFaceLogin(false)}
                />
            )}
            <div className="hero-section">
                <h1 className="hero-title">LuxeDate</h1>
                <p className="hero-subtitle">Exclusivity. Commitment. Romance.</p>
                <p className="hero-text">
                    The only dating app where serious connections are backed by real commitment.
                    Join the elite circle of singles in NYC.
                </p>

                <div className="hero-actions">
                    <div className="login-group">
                        <Button size="lg" onClick={() => navigate('/dashboard')}>
                            Member Login
                        </Button>
                        <button className="text-link" onClick={() => setShowFaceLogin(true)}>
                            Login with Face ID
                        </button>
                    </div>
                    <Button variant="outline" size="lg" onClick={() => navigate('/onboarding')}>
                        Apply for Membership
                    </Button>
                </div>
            </div>

            <div className="features-section">
                <Card className="feature-card" hoverEffect>
                    <h3>The Money Pool</h3>
                    <p>Mutual investment for your first date. Serious intentions only.</p>
                </Card>
                <Card className="feature-card" hoverEffect>
                    <h3>Curated Experiences</h3>
                    <p>AI-tailored dates at NYC's finest venues.</p>
                </Card>
                <Card className="feature-card" hoverEffect>
                    <h3>Exclusive Rewards</h3>
                    <p>Earn rewards for successful dates and milestones.</p>
                </Card>
            </div>
        </div>
    );
};
