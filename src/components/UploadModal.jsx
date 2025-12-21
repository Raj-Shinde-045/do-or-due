import React, { useState } from 'react';
import { Upload, Camera, X } from 'lucide-react';

const UploadModal = ({ task, onClose, onUpload }) => {
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = React.useRef(null);

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files[0]);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onUpload(e.dataTransfer.files[0]);
        }
    };

    return (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="modal-content" style={{ maxWidth: '600px', padding: '0' }}>

                {/* Header */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'center' }}>
                        <span style={{ color: '#F59E0B' }}>⚖️</span> Upload Proof for Verification
                    </h3>
                    <button onClick={onClose} style={{ position: 'absolute', right: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '32px' }}>
                    <div
                        className="dropzone"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        style={{
                            border: '2px dashed #CBD5E1',
                            borderRadius: '16px',
                            backgroundColor: dragActive ? '#F8FAFC' : 'white',
                            padding: '40px 20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: dragActive ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none'
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F8FAFC'; e.currentTarget.style.borderColor = '#94A3B8'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
                    >
                        <div style={{ width: '48px', height: '48px', margin: '0 auto 16px', color: '#64748B' }}>
                            <Upload size={48} strokeWidth={1.5} />
                        </div>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                            Drop your proof here
                        </h4>
                        <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>
                            or <span style={{ color: '#3B82F6', fontWeight: 600 }}>click to browse</span>
                        </p>
                        <p style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '24px' }}>
                            Supports: Images, PDF, Word, Excel
                        </p>

                        <div style={{ display: 'inline-block', backgroundColor: '#F1F5F9', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, color: '#64748B', letterSpacing: '0.5px' }}>
                            OR CAPTURE LIVE
                        </div>

                        <button style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            width: '100%', maxWidth: '280px', margin: '24px auto 0',
                            padding: '12px', border: '1px solid #E2E8F0', borderRadius: '8px', background: 'white',
                            fontWeight: 600, fontSize: '14px', color: '#0F172A', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}>
                            <Camera size={18} /> Take Photo
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                            accept="image/*,application/pdf"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UploadModal;
