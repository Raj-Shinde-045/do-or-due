import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Check } from 'lucide-react';
import { defaultAvatars } from '../data/defaultAvatars';

const AvatarEditModal = ({ isOpen, onClose, currentAvatar, onSave }) => {
    const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const modalRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setSelectedAvatar(currentAvatar);
            setUploadedImage(null);
        }
    }, [isOpen, currentAvatar]);

    // Focus trap and keyboard handling
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) { // 5MB limit
                setError('Image size should be less than 5MB');
                return;
            }

            setError('');
            const reader = new FileReader();
            reader.onloadend = () => {
                const customAvatar = {
                    type: 'custom',
                    value: reader.result,
                    name: 'Custom Avatar'
                };
                setUploadedImage(reader.result);
                setSelectedAvatar(customAvatar);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setError('');
        try {
            await onSave(selectedAvatar);
            onClose();
        } catch (error) {
            console.error('Error saving avatar:', error);
            setError('Failed to save avatar. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="modal-backdrop"
                onClick={handleBackdropClick}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 999,
                    animation: 'fadeIn 0.2s ease-out'
                }}
            />

            {/* Modal Container */}
            <div
                className="modal-container"
                onClick={handleBackdropClick}
                style={{
                    position: 'fixed',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}
            >
                <div
                    ref={modalRef}
                    className="modal-content"
                    style={{
                        background: 'hsl(var(--color-bg-card))',
                        borderRadius: '16px',
                        boxShadow: 'var(--shadow-xl)',
                        width: '100%',
                        maxWidth: '600px',
                        maxHeight: '90vh',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        animation: 'slideUp 0.3s ease-out'
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '24px',
                        borderBottom: `1px solid hsl(var(--color-border-light))`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: 'hsl(var(--color-text-main))',
                            margin: 0
                        }}>
                            Choose Your Avatar
                        </h2>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'hsl(var(--color-bg-input))',
                                border: 'none',
                                borderRadius: '8px',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                            aria-label="Close modal"
                        >
                            <X size={18} color="hsl(var(--color-text-secondary))" />
                        </button>
                    </div>

                    {/* Content */}
                    <div style={{
                        padding: '24px',
                        overflowY: 'auto',
                        flex: 1
                    }}>
                        {/* Default Avatars Grid */}
                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{
                                fontSize: '14px',
                                fontWeight: 600,
                                color: 'hsl(var(--color-text-main))',
                                marginBottom: '16px'
                            }}>
                                Default Avatars
                            </h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                                gap: '12px'
                            }}>
                                {defaultAvatars.map(avatar => (
                                    <button
                                        key={avatar.id}
                                        onClick={() => setSelectedAvatar(avatar)}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '50%',
                                            border: selectedAvatar?.id === avatar.id
                                                ? '3px solid hsl(var(--color-text-main))'
                                                : '2px solid hsl(var(--color-border))',
                                            cursor: 'pointer',
                                            padding: 0,
                                            background: 'hsl(var(--color-bg-input))',
                                            overflow: 'hidden',
                                            transition: 'all 0.2s',
                                            transform: selectedAvatar?.id === avatar.id ? 'scale(1.05)' : 'scale(1)',
                                            position: 'relative'
                                        }}
                                        aria-label={avatar.name}
                                    >
                                        <img
                                            src={avatar.value}
                                            alt={avatar.name}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        {selectedAvatar?.id === avatar.id && (
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '4px',
                                                right: '4px',
                                                background: 'hsl(var(--color-text-main))',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <Check size={12} color="white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom Upload */}
                        <div>
                            <h3 style={{
                                fontSize: '14px',
                                fontWeight: 600,
                                color: 'hsl(var(--color-text-main))',
                                marginBottom: '16px'
                            }}>
                                Upload Custom Image
                            </h3>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '12px 20px',
                                        background: 'hsl(var(--color-bg-input))',
                                        border: `2px dashed hsl(var(--color-border))`,
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        color: 'hsl(var(--color-text-main))',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <Upload size={18} />
                                    Choose File
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                                {uploadedImage && (
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        overflow: 'hidden',
                                        border: '2px solid hsl(var(--color-border))'
                                    }}>
                                        <img
                                            src={uploadedImage}
                                            alt="Uploaded preview"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <p style={{
                                fontSize: '12px',
                                color: 'hsl(var(--color-text-secondary))',
                                marginTop: '8px'
                            }}>
                                Max size: 5MB. Supported formats: JPG, PNG, GIF
                            </p>
                            {error && (
                                <p style={{
                                    fontSize: '13px',
                                    color: '#EF4444',
                                    marginTop: '8px',
                                    fontWeight: 500
                                }}>
                                    {error}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{
                        padding: '24px',
                        borderTop: `1px solid hsl(var(--color-border-light))`,
                        display: 'flex',
                        gap: '12px',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            onClick={onClose}
                            disabled={saving}
                            style={{
                                padding: '10px 20px',
                                background: 'hsl(var(--color-bg-input))',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: 'hsl(var(--color-text-main))',
                                cursor: saving ? 'not-allowed' : 'pointer',
                                opacity: saving ? 0.5 : 1
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="btn btn-primary"
                            style={{
                                padding: '10px 20px',
                                fontSize: '14px',
                                opacity: saving ? 0.6 : 1,
                                cursor: saving ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AvatarEditModal;
