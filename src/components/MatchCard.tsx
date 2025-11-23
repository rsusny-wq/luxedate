import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import './MatchCard.css';

interface MatchCardProps {
    name: string;
    age: number;
    location: string;
    bio: string;
    imageUrl: string; // In a real app, this would be a URL. We'll use a placeholder.
    onMatch: () => void;
    onPass: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
    name,
    age,
    location,
    bio,
    imageUrl,
    onMatch,
    onPass
}) => {
    return (
        <Card className="match-card">
            <div className="match-image" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="match-overlay">
                    <h2>{name}, {age}</h2>
                    <p className="match-location">{location}</p>
                </div>
            </div>
            <div className="match-content">
                <p className="match-bio">{bio}</p>
                <div className="match-actions">
                    <Button variant="outline" onClick={onPass}>Pass</Button>
                    <Button variant="primary" onClick={onMatch}>Match Request</Button>
                </div>
            </div>
        </Card>
    );
};
