import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import './ActivitySuggestions.css';

interface Activity {
    id: string;
    title: string;
    description: string;
    priceRange: string;
    imageUrl: string;
}

interface ActivitySuggestionsProps {
    activities: Activity[];
    onSelect: (activityId: string) => void;
}

export const ActivitySuggestions: React.FC<ActivitySuggestionsProps> = ({
    activities,
    onSelect
}) => {
    return (
        <div className="activity-suggestions">
            <h3 className="suggestions-title">AI Curated Dates</h3>
            <p className="suggestions-subtitle">Based on your shared interests in Art and Fine Dining</p>

            <div className="activities-grid">
                {activities.map((activity) => (
                    <Card key={activity.id} className="activity-card" hoverEffect>
                        <div className="activity-image" style={{ backgroundImage: `url(${activity.imageUrl})` }}>
                            <div className="activity-price">{activity.priceRange}</div>
                        </div>
                        <div className="activity-content">
                            <h4>{activity.title}</h4>
                            <p>{activity.description}</p>
                            <Button
                                size="sm"
                                fullWidth
                                onClick={() => onSelect(activity.id)}
                            >
                                Select Date
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};
