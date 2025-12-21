import React, { useState } from 'react';
import { Shield, Coins, Moon, ChevronDown, Trophy, Calendar, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children, onNavigate, balance, onAddFunds }) => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch {
            alert("Failed to log out");
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        // Simple mock toggle for now, in real app would toggle class on body
        document.body.style.filter = !darkMode ? "invert(1) hue-rotate(180deg)" : "none";
    };

    return (
        <div style={{ paddingBottom: '80px' }}> {/* Increased padding for bottom nav */}

            {/* --- DESKTOP / TABLET HEADER --- */}
            <div className="hidden-mobile" style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
                <header style={{
                    width: '90%',
                    maxWidth: '1000px',
                    height: '64px',
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-pill)',
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                    zIndex: 50,
                    position: 'relative'
                }}>
                    {/* Logo Area */}
                    <button onClick={() => onNavigate('dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Shield fill="hsl(var(--color-text-main))" size={20} color="hsl(var(--color-text-main))" />
                        <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.5px' }}>DoOrDue</span>
                    </button>

                    {/* Right Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button className="icon-btn" onClick={toggleDarkMode} style={{ borderRadius: '50%', padding: '8px', cursor: 'pointer', background: 'transparent', border: 'none' }}>
                            <Moon size={18} />
                        </button>

                        {/* Coins Pill */}
                        <div style={{
                            backgroundColor: '#F1F5F9', // Slate 100
                            padding: '6px 12px',
                            borderRadius: 'var(--radius-pill)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: 'hsl(var(--color-text-main))'
                        }}>
                            <Coins size={14} color="hsl(var(--color-accent-gold))" fill="hsl(var(--color-accent-gold))" />
                            {balance}
                            <button
                                onClick={onAddFunds}
                                style={{
                                    background: '#E2E8F0', border: 'none', borderRadius: '50%',
                                    width: '16px', height: '16px', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', fontSize: '12px', marginLeft: '4px', cursor: 'pointer'
                                }}
                            >
                                +
                            </button>
                        </div>

                        {/* Avatar & Dropdown */}
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer'
                                }}
                            >
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', fontWeight: 600, fontSize: '13px', color: '#334155'
                                }}>
                                    R
                                </div>
                                <ChevronDown size={14} color="#64748B" />
                            </button>

                            {/* Dropdown Menu */}
                            {showUserMenu && (
                                <div className="animate-in" style={{
                                    position: 'absolute',
                                    top: '48px',
                                    right: 0,
                                    width: '220px',
                                    backgroundColor: 'white',
                                    borderRadius: '16px',
                                    boxShadow: 'var(--shadow-lg)',
                                    border: '1px solid #F1F5F9',
                                    padding: '8px',
                                    zIndex: 100
                                }}>
                                    <div style={{ padding: '8px 12px', borderBottom: '1px solid #F1F5F9', marginBottom: '4px' }}>
                                        <p style={{ fontWeight: 600, fontSize: '14px' }}>Raj Shinde</p>
                                        <p style={{ fontSize: '12px', color: '#64748B' }}>Pro Member</p>
                                    </div>

                                    <DropdownItem onClick={() => { onNavigate('leaderboard'); setShowUserMenu(false); }} icon={<Trophy size={16} />} label="Leaderboard" />
                                    <DropdownItem onClick={() => { onNavigate('planner'); setShowUserMenu(false); }} icon={<Calendar size={16} />} label="Planner" />
                                    <DropdownItem onClick={() => { alert('Settings coming soon'); setShowUserMenu(false); }} icon={<Settings size={16} />} label="Settings" />

                                    <div style={{ borderTop: '1px solid #F1F5F9', margin: '4px 0' }} />

                                    <button onClick={handleLogout} style={{
                                        display: 'flex', alignItems: 'center', gap: '10px',
                                        width: '100%', padding: '10px 12px', borderRadius: '8px',
                                        border: 'none', background: 'transparent', cursor: 'pointer',
                                        fontSize: '14px', color: '#EF4444', fontWeight: 500, textAlign: 'left'
                                    }}>
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
            </div>

            {/* --- MOBILE HEADER (Simplified) --- */}
            <div className="visible-mobile" style={{ justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', backgroundColor: 'white', position: 'sticky', top: 0, zIndex: 40, borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Shield fill="hsl(var(--color-text-main))" size={20} color="hsl(var(--color-text-main))" />
                    <span style={{ fontWeight: 800, fontSize: '18px' }}>DoOrDue</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        backgroundColor: '#F1F5F9', padding: '4px 10px', borderRadius: '12px',
                        display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600
                    }}>
                        <Coins size={12} fill="hsl(var(--color-accent-gold))" color="hsl(var(--color-accent-gold))" />
                        {balance}
                        <button onClick={onAddFunds} style={{ border: 'none', background: 'transparent', fontWeight: 'bold' }}>+</button>
                    </div>
                </div>
            </div>


            {/* Main Content Container */}
            <main className="container animate-in">
                {children}
            </main>

            {/* --- MOBILE BOTTOM NAVIGATION --- */}
            <div className="visible-mobile" style={{
                position: 'fixed', bottom: 0, left: 0, width: '100%', height: '64px',
                backgroundColor: 'white', borderTop: '1px solid #F1F5F9',
                display: 'flex', alignItems: 'center', justifyContent: 'space-around', zIndex: 1000
            }}>
                <button onClick={() => onNavigate('dashboard')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#64748B' }}>
                    <Shield size={20} />
                    <span style={{ fontSize: '10px', fontWeight: 600 }}>Home</span>
                </button>
                <button onClick={() => onNavigate('planner')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#64748B' }}>
                    <Calendar size={20} />
                    <span style={{ fontSize: '10px', fontWeight: 600 }}>Planner</span>
                </button>
                <button onClick={() => onNavigate('leaderboard')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#64748B' }}>
                    <Trophy size={20} />
                    <span style={{ fontSize: '10px', fontWeight: 600 }}>Ranks</span>
                </button>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', color: '#EF4444' }}>
                    <LogOut size={20} />
                    <span style={{ fontSize: '10px', fontWeight: 600 }}>Exit</span>
                </button>
            </div>

        </div>
    );
};

const DropdownItem = ({ icon, label, onClick }) => (
    <button onClick={onClick} style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        width: '100%', padding: '10px 12px', borderRadius: '8px',
        border: 'none', background: 'transparent', cursor: 'pointer',
        fontSize: '14px', color: '#334155', fontWeight: 500, textAlign: 'left',
        transition: 'background 0.2s'
    }}
        onMouseEnter={(e) => e.target.style.background = '#F8FAFC'}
        onMouseLeave={(e) => e.target.style.background = 'transparent'}
    >
        {icon} {label}
    </button>
);

export default Layout;
