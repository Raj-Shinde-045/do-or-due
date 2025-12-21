import React, { useEffect, useState } from 'react';
import { Trophy, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { subscribeToLeaderboard } from '../services/dbService';
import { useAuth } from '../context/AuthContext';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const unsub = subscribeToLeaderboard((data) => {
            setUsers(data);
        });
        return () => unsub();
    }, []);

    return (
        <div className="animate-in" style={{ paddingBottom: '40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Leaderboard</h1>
                <p style={{ color: 'hsl(var(--color-text-secondary))' }}>Top performers this week</p>
            </div>

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '0' }}>
                {users.map((user, index) => (
                    <div key={user.id || index} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '20px',
                        borderBottom: index !== users.length - 1 ? '1px solid #F1F5F9' : 'none',
                        backgroundColor: user.id === currentUser?.uid ? '#F0F9FF' : (index === 0 ? '#FFFBEB' : 'white') // Highlight current user
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, color: '#64748B'
                            }}>
                                {index + 1}
                            </div>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '50%',
                                backgroundColor: index === 0 ? '#FCD34D' : '#E2E8F0',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 600,
                                textTransform: 'uppercase'
                            }}>
                                {user.email?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {user.name || user.email.split('@')[0]}
                                    {user.id === currentUser?.uid && <span style={{ fontSize: '10px', backgroundColor: '#DBEAFE', color: '#1E40AF', padding: '2px 6px', borderRadius: '4px' }}>YOU</span>}
                                </div>
                                <div style={{ fontSize: '12px', color: '#64748B' }}>{user.streak || 0} day streak</div>
                            </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 700, color: '#0F172A' }}>{user.xp || 0} XP</div>
                            {/* Change logic would require tracking previous rank, skipping for now as it needs more DB structure */}
                        </div>
                    </div>
                ))}
            </div>
            {users.length === 0 && <div style={{ textAlign: 'center', padding: '20px', color: '#94A3B8' }}>No active users yet. Be the first!</div>}
        </div>
    );
};

export default Leaderboard;
