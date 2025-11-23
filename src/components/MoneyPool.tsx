import React from 'react';
import { Card } from './Card';
import './MoneyPool.css';

interface MoneyPoolProps {
    amount: number;
    target: number;
    userDeposited: boolean;
    partnerDeposited: boolean;
    onDeposit: () => void;
}

export const MoneyPool: React.FC<MoneyPoolProps> = ({
    amount,
    target,
    userDeposited,
    partnerDeposited,
    onDeposit
}) => {
    const progress = (amount / target) * 100;

    return (
        <Card className="money-pool-card">
            <div className="pool-header">
                <h3>Date Fund</h3>
                <span className="pool-amount">${amount} / ${target}</span>
            </div>

            <div className="pool-progress-bar">
                <div className="pool-progress-fill" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="pool-status">
                <div className={`status-item ${userDeposited ? 'active' : ''}`}>
                    <div className="status-dot"></div>
                    <span>You</span>
                </div>
                <div className={`status-item ${partnerDeposited ? 'active' : ''}`}>
                    <div className="status-dot"></div>
                    <span>Partner</span>
                </div>
            </div>

            {!userDeposited && (
                <button className="deposit-btn" onClick={onDeposit}>
                    Deposit Share (${target / 2})
                </button>
            )}
        </Card>
    );
};
