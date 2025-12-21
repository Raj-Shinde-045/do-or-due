import React, { useState } from 'react';
import { Pencil } from 'lucide-react';
import AvatarEditModal from './AvatarEditModal';

const AvatarWithEdit = ({ currentAvatar, onAvatarChange, size = 120, editable = true }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleSave = async (newAvatar) => {
        if (onAvatarChange) {
            await onAvatarChange(newAvatar);
        }
    };

    const renderAvatar = () => {
        // Display image avatars (default or custom)
        if (currentAvatar?.value) {
            return (
                <img
                    src={currentAvatar.value}
                    alt={currentAvatar.name || 'Avatar'}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            );
        }

        // Fallback to initials or placeholder
        return (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: `${size / 3}px`,
                fontWeight: 600,
                color: 'hsl(var(--color-text-secondary))'
            }}>
                ?
            </div>
        );
    };

    return (
        <>
            <div
                style={{
                    position: 'relative',
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: `3px solid hsl(var(--color-border))`,
                    boxShadow: 'var(--shadow-md)',
                    background: 'hsl(var(--color-bg-input))',
                    cursor: editable ? 'pointer' : 'default'
                }}
                onMouseEnter={() => editable && setIsHovered(true)}
                onMouseLeave={() => editable && setIsHovered(false)}
                onClick={() => editable && setIsModalOpen(true)}
                role={editable ? 'button' : 'img'}
                aria-label={editable ? 'Edit avatar' : 'User avatar'}
                tabIndex={editable ? 0 : -1}
                onKeyDown={(e) => {
                    if (editable && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        setIsModalOpen(true);
                    }
                }}
            >
                {renderAvatar()}

                {/* Edit Overlay - Only show if editable */}
                {editable && (
                    <div
                        className="avatar-edit-overlay"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: isHovered ? 1 : 0,
                            transition: 'opacity 0.2s ease',
                            pointerEvents: 'none'
                        }}
                    >
                        <div
                            className="avatar-edit-icon"
                            style={{
                                background: 'white',
                                borderRadius: '50%',
                                width: `${size / 3}px`,
                                height: `${size / 3}px`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: isHovered ? 'scale(1)' : 'scale(0.8)',
                                transition: 'transform 0.2s ease',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                            }}
                        >
                            <Pencil
                                size={size / 6}
                                color="hsl(var(--color-text-main))"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {editable && (
                <AvatarEditModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    currentAvatar={currentAvatar}
                    onSave={handleSave}
                />
            )}
        </>
    );
};

export default AvatarWithEdit;
