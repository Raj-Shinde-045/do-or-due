import React, { useState, useEffect } from 'react';
import { Clock, Check, X, Shield, Coins } from 'lucide-react';

const ActiveTask = ({ task, onComplete, onFail }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const deadlineDate = new Date(task.deadline);
            const distance = deadlineDate.getTime() - now;
            const totalDuration = deadlineDate.getTime() - new Date().getTime(); // Simplified for visual progress

            if (isNaN(distance)) {
                setTimeLeft('Invalid Date');
                return;
            }

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft('EXPIRED');
                setProgress(0);
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                if (days > 0) setTimeLeft(`${days}d ${hours}h ${minutes}m`);
                else if (hours > 0) setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
                else setTimeLeft(`${minutes}m ${seconds}s`);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [task.deadline]);

    return (
        <div className="animate-in" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'hsl(var(--color-bg-app))',
            padding: '20px'
        }}>

            {/* Locked Badge */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                backgroundColor: '#FEF2F2', padding: '8px 16px', borderRadius: 'var(--radius-pill)',
                color: '#EF4444', fontWeight: 600, fontSize: '14px', marginBottom: '24px'
            }}>
                <Shield size={16} /> Protocol Active: Locked
            </div>

            <div className="card" style={{ maxWidth: '500px', width: '100%', textAlign: 'center', padding: '40px', boxShadow: 'var(--shadow-float)' }}>

                <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px', lineHeight: 1.2 }}>
                    {task.objective}
                </h1>
                <p style={{ color: 'hsl(var(--color-text-secondary))', marginBottom: '40px' }}>
                    Commitment verified. Failure will trigger donation.
                </p>

                {/* Timer Display */}
                <div style={{ marginBottom: '40px' }}>
                    <div style={{ fontSize: '56px', fontWeight: 800, fontFamily: 'monospace', color: 'hsl(var(--color-text-main))', letterSpacing: '-2px' }}>
                        {timeLeft || '00:00:00'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '8px', color: 'hsl(var(--color-text-secondary))', fontSize: '14px' }}>
                        <Clock size={16} /> Time Remaining
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                    <button
                        className="btn"
                        onClick={onComplete}
                        style={{
                            backgroundColor: '#22C55E', color: 'white', padding: '16px',
                            fontSize: '16px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.3)'
                        }}
                    >
                        <Check size={20} /> I Did It
                    </button>
                    <button
                        className="btn"
                        onClick={onFail}
                        style={{
                            backgroundColor: 'white', color: '#64748B', border: '1px solid #E2E8F0', padding: '16px',
                            fontSize: '16px', borderRadius: '12px'
                        }}
                    >
                        <X size={20} /> I Failed
                    </button>
                </div>

                {/* Stake Info */}
                <div style={{
                    display: 'flex', justifyContent: 'center'
                }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        backgroundColor: '#F8FAFC', padding: '8px 16px', borderRadius: '8px',
                        fontSize: '14px', fontWeight: 600, color: 'hsl(var(--color-text-main))'
                    }}>
                        <Coins size={16} color="#FBBF24" fill="#FBBF24" />
                        {task.stake} DueCoins At Stake
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ActiveTask;
