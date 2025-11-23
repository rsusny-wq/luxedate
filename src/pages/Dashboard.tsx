import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { MatchCard } from '../components/MatchCard';
import { MoneyPool } from '../components/MoneyPool';
import { ActivitySuggestions } from '../components/ActivitySuggestions';
import './Dashboard.css';

// Mock Data
const MOCK_PROFILE = {
    name: "Elena",
    age: 28,
    location: "Manhattan, NYC",
    bio: "Art curator. Love jazz clubs, rooftop cocktails, and meaningful conversations. Looking for someone serious.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
};

const MOCK_ACTIVITIES = [
    {
        id: '1',
        title: 'Jazz at The Blue Note',
        description: 'An intimate evening of live jazz with a reserved table.',
        priceRange: '$$$',
        imageUrl: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: '2',
        title: 'Private Omakase',
        description: 'Chef\'s choice sushi experience at a hidden gem.',
        priceRange: '$$$$',
        imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
];

type DashboardState = 'matching' | 'matched' | 'date_mode' | 'feedback';

export const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [state, setState] = useState<DashboardState>('matching');
    const [poolAmount, setPoolAmount] = useState(0);
    const [userDeposited, setUserDeposited] = useState(false);
    const [partnerDeposited, setPartnerDeposited] = useState(false);

    const handleMatch = () => {
        // Simulate match acceptance
        setTimeout(() => {
            setState('matched');
            // Simulate partner depositing after a delay
            setTimeout(() => {
                setPartnerDeposited(true);
                setPoolAmount(prev => prev + 150);
            }, 2000);
        }, 500);
    };

    const handleDeposit = () => {
        setUserDeposited(true);
        setPoolAmount(prev => prev + 150);
        // If both deposited, move to date mode
        if (partnerDeposited) {
            setTimeout(() => setState('date_mode'), 1000);
        } else {
            // Check if partner deposits later (simulated above, but need to check state transition)
            // In this simple mock, we'll use an effect or just check in render? 
            // Actually, let's just use a timeout here to transition if partner already deposited
            // or wait for partner deposit to trigger transition.
        }
    };

    // Effect to transition to date_mode when both deposited
    React.useEffect(() => {
        if (userDeposited && partnerDeposited && state === 'matched') {
            setTimeout(() => setState('date_mode'), 1000);
        }
    }, [userDeposited, partnerDeposited, state]);

    const handleSelectActivity = (id: string) => {
        console.log('Selected activity:', id);
        // Move to feedback/confirmation
        alert("Date Confirmed! Enjoy your evening.");
        setState('feedback');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>LuxeDate</h2>
                <Button variant="ghost" size="sm" onClick={() => navigate('/')}>Log Out</Button>
            </header>

            <main className="dashboard-content">
                {state === 'matching' && (
                    <div className="matching-view">
                        <h3>Daily Recommendations</h3>
                        <MatchCard
                            {...MOCK_PROFILE}
                            onMatch={handleMatch}
                            onPass={() => alert('Passed')}
                        />
                    </div>
                )}

                {state === 'matched' && (
                    <div className="matched-view">
                        <h3>It's a Match!</h3>
                        <p>You and Elena have matched. Deposit to the Money Pool to secure your date.</p>

                        <div className="pool-section">
                            <MoneyPool
                                amount={poolAmount}
                                target={300}
                                userDeposited={userDeposited}
                                partnerDeposited={partnerDeposited}
                                onDeposit={handleDeposit}
                            />
                        </div>
                    </div>
                )}

                {state === 'date_mode' && (
                    <div className="date-mode-view">
                        <div className="pool-summary">
                            <h3>Date Fund Active</h3>
                            <p className="fund-amount">$300 Available</p>
                        </div>

                        <ActivitySuggestions
                            activities={MOCK_ACTIVITIES}
                            onSelect={handleSelectActivity}
                        />
                    </div>
                )}

                {state === 'feedback' && (
                    <div className="feedback-view">
                        <h3>Date Completed?</h3>
                        <p>How did it go? Provide feedback to unlock your rewards.</p>
                        <Button onClick={() => setState('matching')}>Submit Feedback</Button>
                    </div>
                )}
            </main>
        </div>
    );
};
