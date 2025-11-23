import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { generateResponse } from '../services/gemini';
import './ChatInterface.css';

interface Message {
    id: string;
    text: string;
    sender: 'ai' | 'user';
}

interface ChatInterfaceProps {
    onComplete: (summary: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onComplete }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "Welcome to LuxeDate. I'm your personal concierge. Let's build your profile. First, what are you looking for in a partner?", sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Web Speech API
    const recognitionRef = useRef<any>(null);
    const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US'; // Default, could be dynamic

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInputValue(transcript);
                handleSend(transcript);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const speak = (text: string) => {
        if (synthRef.current) {
            const utterance = new SpeechSynthesisUtterance(text);
            // Try to find a premium sounding voice
            const voices = synthRef.current.getVoices();
            const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Premium'));
            if (preferredVoice) utterance.voice = preferredVoice;
            synthRef.current.speak(utterance);
        }
    };

    const handleSend = async (textOverride?: string) => {
        const text = textOverride || inputValue;
        if (!text.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), text: text, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsProcessing(true);

        try {
            // Prepare history for Gemini
            // Gemini requires history to start with user, so we skip the initial AI greeting
            const validHistory = messages.slice(1).map(m => ({
                role: m.sender === 'ai' ? 'model' : 'user' as "model" | "user",
                parts: m.text
            }));

            const aiResponseText = await generateResponse(text, validHistory);

            const aiMsg: Message = { id: (Date.now() + 1).toString(), text: aiResponseText, sender: 'ai' };
            const updatedMessages = [...messages, userMsg, aiMsg];
            setMessages(updatedMessages);

            // Save to DB
            import('../services/db').then(({ db }) => {
                db.saveInterview(updatedMessages);
            });

            speak(aiResponseText);

            // Simple heuristic to end interview (in real app, Gemini could output a structured signal)
            if (messages.length > 6) {
                setTimeout(() => onComplete("Profile generated based on conversation."), 3000);
            }

        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
        }
    };

    return (
        <div className="chat-interface glass-panel">
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
                        <div className="message-bubble">{msg.text}</div>
                    </div>
                ))}
                {isProcessing && (
                    <div className="message ai">
                        <div className="message-bubble typing-indicator">
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-area">
                <Button
                    variant={isListening ? "primary" : "secondary"}
                    onClick={toggleListening}
                    className="mic-btn"
                >
                    {isListening ? '🎤 Listening...' : '🎤'}
                </Button>
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type or speak..."
                    fullWidth
                    disabled={isProcessing}
                />
                <Button onClick={() => handleSend()} disabled={!inputValue.trim() || isProcessing}>
                    Send
                </Button>
            </div>
        </div>
    );
};
