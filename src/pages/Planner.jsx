import React from 'react';
import { Target, TrendingUp, Coins, Trophy, Clock } from 'lucide-react';

const Planner = ({ stats, history, balance }) => {
    // Derive Stats from props or use defaults
    const successCount = stats?.success || 0;
    const failedCount = stats?.failed || 0;
    const totalTasks = successCount + failedCount;
    const successRate = totalTasks > 0 ? Math.round((successCount / totalTasks) * 100) : 0;
    const totalStaked = stats?.staked || 0;
    const coinsEarned = stats?.earned || 0;

    const statCards = [
        { label: 'Success Rate', value: `${successRate}%`, icon: Target, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
        { label: 'Total Staked', value: totalStaked, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
        { label: 'Coins Earned', value: coinsEarned, icon: Coins, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
        { label: 'Current Balance', value: balance, icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
    ];

    return (
        <div className="animate-in" style={{ paddingBottom: '40px' }}>

            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>Progress Dashboard</h1>
                <p style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>
                    Track your productivity and performance metrics
                </p>
            </div>

            {/* Stats Grid */}
            <div className="planner-stats-grid" style={{ display: 'grid', gap: '20px', marginBottom: '32px' }}>
                {statCards.map((stat, index) => (
                    <div key={index} style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '20px',
                        border: '1px solid',
                        borderColor: index === 0 ? '#BBF7D0' : index === 1 ? '#BFDBFE' : index === 2 ? '#FEF08A' : '#E9D5FF', // Taildwind-ish colors hardcoded
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '10px',
                            backgroundColor: index === 0 ? '#F0FDF4' : index === 1 ? '#EFF6FF' : index === 2 ? '#FEFCE8' : '#FAF5FF',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '16px'
                        }}>
                            <stat.icon size={20} color={index === 0 ? '#16A34A' : index === 1 ? '#2563EB' : index === 2 ? '#CA8A04' : '#9333EA'} />
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>{stat.label}</div>
                        <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginTop: '4px' }}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="planner-charts-grid" style={{ display: 'grid', gap: '24px', marginBottom: '32px' }}>

                {/* Task Distribution (Donut Chart Mock) */}
                <div className="card" style={{ padding: '24px', minHeight: '320px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '24px' }}>Task Distribution</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
                        {/* Simple SVG Donut */}
                        <svg width="160" height="160" viewBox="0 0 160 160">
                            <circle cx="80" cy="80" r="70" fill="none" stroke="#F1F5F9" strokeWidth="20" />
                            <circle cx="80" cy="80" r="70" fill="none" stroke="#3B82F6" strokeWidth="20" strokeDasharray="300 440" strokeLinecap="round" transform="rotate(-90 80 80)" />
                            <circle cx="80" cy="80" r="70" fill="none" stroke="#22C55E" strokeWidth="20" strokeDasharray="100 440" strokeDashoffset="-300" strokeLinecap="round" transform="rotate(-90 80 80)" />
                            <text x="80" y="85" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0F172A">85%</text>
                        </svg>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} /> Completed
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }} /> Active
                        </div>
                    </div>
                </div>

                {/* Weekly Performance (Bar Chart Mock) */}
                <div className="card" style={{ padding: '24px', minHeight: '320px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '24px' }}>This Week's Performance</h3>

                    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 20px' }}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                            <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '150px' }}>
                                    <div style={{ width: '12px', height: `${[40, 70, 50, 90, 60, 30, 80][i]}%`, backgroundColor: '#10B981', borderRadius: '4px' }} /> {/* Completed */}
                                    <div style={{ width: '12px', height: `${[10, 0, 20, 10, 0, 0, 10][i]}%`, backgroundColor: '#EF4444', borderRadius: '4px' }} /> {/* Failed */}
                                </div>
                                <span style={{ fontSize: '12px', color: '#64748B' }}>{day}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#10B981' }} /> Completed
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: '#EF4444' }} /> Failed
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Peak Performance */}
            <div className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Peak Performance Timer</h3>
                        <p style={{ fontSize: '13px', color: '#64748B' }}>Most productive hours</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFF7ED', padding: '8px 16px', borderRadius: '20px', color: '#C2410C', fontWeight: 600, fontSize: '13px' }}>
                        <Clock size={16} /> Peak Hour: 09:00 AM
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Planner;
