import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...', size = 'md' }) => {
    const sizeMap = {
        sm: { spinner: 20, text: '13px' },
        md: { spinner: 32, text: '14px' },
        lg: { spinner: 48, text: '16px' }
    };

    const { spinner, text } = sizeMap[size];

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '24px'
        }}>
            <Loader2
                size={spinner}
                color="hsl(var(--color-text-main))"
                style={{
                    animation: 'spin 1s linear infinite'
                }}
            />
            <p style={{
                fontSize: text,
                color: 'hsl(var(--color-text-secondary))',
                fontWeight: 500,
                margin: 0
            }}>
                {message}
            </p>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoadingSpinner;
