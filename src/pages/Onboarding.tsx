import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { ChatInterface } from '../components/ChatInterface';
import { WebcamMock } from '../components/WebcamMock';
import './Onboarding.css';

type OnboardingStep = 'intro' | 'interview' | 'verification' | 'processing' | 'complete';

export const Onboarding: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<OnboardingStep>('intro');

    const handleInterviewComplete = (summary: string) => {
        console.log(summary);
        setStep('verification');
    };

    const handleVerificationComplete = () => {
        setStep('processing');
        // Simulate profile generation
        setTimeout(() => {
            setStep('complete');
        }, 3000);
    };

    return (
        <div className="onboarding-container">
            {step === 'intro' && (
                <div className="onboarding-step intro-step">
                    <h1>Welcome to the Inner Circle</h1>
                    <p>To ensure the highest quality of connections, we require a brief AI interview and identity verification.</p>
                    <p>This process is private, secure, and automated.</p>
                    <Button size="lg" onClick={() => setStep('interview')}>Begin Interview</Button>
                </div>
            )}

            {step === 'interview' && (
                <div className="onboarding-step interview-step">
                    <h2>AI Concierge</h2>
                    <p className="step-subtitle">Tell us about yourself.</p>
                    <ChatInterface onComplete={handleInterviewComplete} />
                </div>
            )}

            {step === 'verification' && (
                <div className="onboarding-step verification-step">
                    <h2>Identity Verification</h2>
                    <WebcamMock onCapture={handleVerificationComplete} />
                </div>
            )}

            {step === 'processing' && (
                <div className="onboarding-step processing-step">
                    <div className="loading-spinner"></div>
                    <h2>Generating Profile</h2>
                    <p>Analyzing personality traits...</p>
                    <p>Verifying biometrics...</p>
                    <p>Curating potential matches...</p>
                </div>
            )}

            {step === 'complete' && (
                <div className="onboarding-step complete-step">
                    <div className="success-icon">✓</div>
                    <h2>You're Verified</h2>
                    <p>Your profile has been created and you are now a member.</p>
                    <Button size="lg" onClick={() => {
                        import('../services/db').then(({ db }) => {
                            db.saveUser({ faceVerified: true, name: 'New Member' });
                            db.setSession(true);
                            navigate('/dashboard');
                        });
                    }}>Enter LuxeDate</Button>
                </div>
            )}
        </div>
    );
};
