import React, { useState } from 'react';
import { X, CreditCard, Coins } from 'lucide-react';

const AddFundsModal = ({ onClose, onProceed, balance }) => {
    const [amount, setAmount] = useState('100'); // Default to 100

    return (
        <div className="modal-overlay">
            <div className="modal-content animate-in" style={{ maxWidth: '400px' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ background: '#EFF6FF', padding: '8px', borderRadius: '8px' }}>
                            <CreditCard size={20} color="#2563EB" />
                        </div>
                        Add Funds
                    </h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={24} color="#64748B" />
                    </button>
                </div>

                {/* Body */}
                <div style={{ marginBottom: '24px' }}>
                    <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '20px' }}>
                        Buy DueCoins to stake on your tasks. <br />
                        <span style={{ fontWeight: 600, color: '#0F172A' }}>Rate: 1 INR = 1 DueCoin</span>
                    </p>

                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Amount (INR)</label>
                    <div className="input-field" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '18px', padding: '16px' }}>
                        <span style={{ fontWeight: 700, color: '#64748B' }}>₹</span>
                        <input
                            type="number"
                            autoFocus
                            min="10"
                            step="10"
                            style={{ border: 'none', outline: 'none', width: '100%', fontWeight: 700, fontSize: '18px' }}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF7ED', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', color: '#C2410C', fontWeight: 700 }}>
                            <Coins size={12} /> {amount || 0} Coins
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                        {[100, 500, 1000].map(val => (
                            <button key={val}
                                onClick={() => setAmount(val.toString())}
                                style={{
                                    flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #E2E8F0', background: 'white',
                                    fontSize: '13px', fontWeight: 600, color: '#64748B', cursor: 'pointer'
                                }}
                            >
                                ₹{val}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <button
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '16px', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                    onClick={() => {
                        if (parseInt(amount) > 0) {
                            onProceed(parseInt(amount));
                        } else {
                            alert("Please enter a valid amount");
                        }
                    }}
                >
                    Pay ₹{amount || 0} with Razorpay
                </button>

                <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', color: '#94A3B8' }}>
                    Secured by Razorpay • Test Mode
                </div>

            </div>
        </div>
    );
};

export default AddFundsModal;
