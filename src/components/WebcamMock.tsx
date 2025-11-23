import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import './WebcamMock.css';

interface WebcamMockProps {
    onCapture: () => void;
}

export const WebcamMock: React.FC<WebcamMockProps> = ({ onCapture }) => {
    const [scanning, setScanning] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setScanning(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="webcam-mock glass-panel">
            <div className="camera-feed">
                <div className="face-guide"></div>
                {scanning && <div className="scan-line"></div>}
                <div className="camera-status">
                    {scanning ? 'Scanning Face Geometry...' : 'Face Verified'}
                </div>
            </div>
            <div className="camera-controls">
                <p>Our AI is verifying your identity and analyzing your features for the best matches.</p>
                <Button onClick={onCapture} disabled={scanning} fullWidth>
                    {scanning ? 'Please Hold Still' : 'Complete Verification'}
                </Button>
            </div>
        </div>
    );
};
