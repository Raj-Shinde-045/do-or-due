import React, { useState } from 'react';
import { User, Save, Mail } from 'lucide-react';
import AvatarWithEdit from '../components/AvatarWithEdit';
import { updateUserProfile } from '../services/dbService';
import { useAuth } from '../context/AuthContext';

const Settings = ({ userProfile, onProfileUpdate, onShowPopup }) => {
    const { currentUser } = useAuth();
    const [name, setName] = useState(userProfile.name || '');
    const [selectedAvatar, setSelectedAvatar] = useState(userProfile.avatar || null);
    const [saving, setSaving] = useState(false);

    const handleAvatarChange = async (newAvatar) => {
        setSelectedAvatar(newAvatar);
        // Auto-save avatar change
        try {
            await updateUserProfile(currentUser.uid, {
                avatar: newAvatar
            });
            if (onProfileUpdate) {
                onProfileUpdate({ ...userProfile, avatar: newAvatar });
            }
        } catch (error) {
            console.error('Error updating avatar:', error);
            if (onShowPopup) {
                onShowPopup({
                    title: 'Update Failed',
                    message: 'Failed to update avatar. Please try again.',
                    type: 'error'
                });
            }
        }
    };


    const handleSave = async () => {
        setSaving(true);
        try {
            await updateUserProfile(currentUser.uid, {
                name
            });
            if (onShowPopup) {
                onShowPopup({
                    title: 'Success',
                    message: 'Profile updated successfully!',
                    type: 'success'
                });
            }
            if (onProfileUpdate) {
                onProfileUpdate({ ...userProfile, name });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            if (onShowPopup) {
                onShowPopup({
                    title: 'Update Failed',
                    message: 'Failed to update profile. Please try again.',
                    type: 'error'
                });
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={{ paddingBottom: '40px', maxWidth: '900px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', color: 'hsl(var(--color-text-main))' }}>Settings</h1>
            <p style={{ color: 'hsl(var(--color-text-secondary))', marginBottom: '32px' }}>
                Manage your profile and account settings
            </p>

            {/* Profile Picture Section */}
            <div className="card" style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'hsl(var(--color-text-main))' }}>
                    Profile Picture
                </h2>

                {/* Avatar with Edit */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <AvatarWithEdit
                        currentAvatar={selectedAvatar}
                        onAvatarChange={handleAvatarChange}
                        size={120}
                        editable={true}
                    />
                    <p style={{ fontSize: '13px', color: 'hsl(var(--color-text-secondary))', textAlign: 'center', maxWidth: '300px' }}>
                        Hover over your avatar and click the edit icon to change
                    </p>
                </div>
            </div>

            {/* Personal Information Section */}
            <div className="card" style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'hsl(var(--color-text-main))' }}>
                    Personal Information
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'hsl(var(--color-text-main))' }}>
                            <User size={14} style={{ display: 'inline', marginRight: '6px' }} />
                            Display Name
                        </label>
                        <input
                            className="input-field"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: 'hsl(var(--color-text-main))' }}>
                            <Mail size={14} style={{ display: 'inline', marginRight: '6px' }} />
                            Email Address
                        </label>
                        <input
                            className="input-field"
                            type="email"
                            value={currentUser?.email || ''}
                            disabled
                            style={{ opacity: 0.6, cursor: 'not-allowed' }}
                        />
                        <p style={{ fontSize: '12px', color: 'hsl(var(--color-text-secondary))', marginTop: '6px' }}>
                            Email cannot be changed
                        </p>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={saving}
                style={{
                    width: '100%',
                    padding: '16px',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    opacity: saving ? 0.6 : 1,
                    cursor: saving ? 'not-allowed' : 'pointer'
                }}
            >
                <Save size={18} />
                {saving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
    );
};

export default Settings;
