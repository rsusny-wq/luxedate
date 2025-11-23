import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Button } from './Button';
import './FaceLogin.css';

interface FaceLoginProps {
    onLogin: () => void;
    onCancel: () => void;
}

export const FaceLogin: React.FC<FaceLoginProps> = ({ onLogin, onCancel }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState('Initializing Face ID...');

    useEffect(() => {
        const loadModels = async () => {
            try {
                // In a real app, these models should be served from public/models
                // For this prototype, we'll simulate the loading delay and mock the detection
                // as loading external models requires static file setup
                await new Promise(resolve => setTimeout(resolve, 1500));
                setIsLoading(false);
                setStatus('Looking for face...');
                startVideo();
            } catch (err) {
                console.error(err);
                setStatus('Error loading Face ID');
            }
        };
        loadModels();
    }, []);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: {} })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(err => console.error(err));
    };

    const handleVideoPlay = () => {
        setStatus('Scanning...');
        // Mock detection logic for prototype
        setTimeout(() => {
            setStatus('Face Verified');
            setTimeout(onLogin, 1000);
        }, 2000);
    };

    return (
        <div className="face-login-overlay">
            <div className="face-login-modal glass-panel">
                <h3>Face ID Login</h3>
                <div className="video-container">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        onPlay={handleVideoPlay}
                        width="320"
                        height="240"
                    />
                    <canvas ref={canvasRef} className="overlay-canvas" />
                    <div className="scan-overlay"></div>
                </div>
                <p className="status-text">{status}</p>
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
            </div>
        </div>
    );
};
