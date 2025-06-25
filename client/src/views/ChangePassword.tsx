import React, { useState } from 'react'
import Header from '../components/Header'
import { Icon, Input } from '../components/Index'

const ChangePassword = () => {
    const [formData, setFormData] = useState<any>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only include password fields if user wants to change password
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            setError('All password fields are required when changing password');
            setIsLoading(false);
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setError('New passwords do not match');
            setIsLoading(false);
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('New password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const { currentPassword, newPassword, confirmPassword } = formData;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen p-4 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 w-full max-w-4xl mx-auto flex justify-between space-x-3">
                    {/* Header */}
                    <div className="text-center my-8 w-1/2 justify-start">
                        <div className="mx-auto h-16 w-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 border border-white/30">
                            <Icon size={'10'} icon="forgot-password" color="white" />
                        </div>
                        <h1 className="mt-6 text-2xl font-bold text-white mb-2">
                            Change Password
                        </h1>
                        <p className="text-lg text-white/80 font-medium">
                            Update your password
                        </p>
                    </div>
                    {/* Password Change Form */}
                    <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30 w-full">
                        <form className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                    Change Password (Optional)
                                </h3>
                                <Input
                                    icon="password"
                                    label="Current Password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    type="password"
                                    required={false}
                                    value={currentPassword}
                                    onChange={handleInputChange}
                                    placeholder="Enter current password"
                                />
                                <Input
                                    icon="password"
                                    label="New Password"
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    required={false}
                                    value={newPassword}
                                    onChange={handleInputChange}
                                    placeholder="Enter new password"
                                />
                                <Input
                                    icon="password"
                                    label="Confirm New Password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required={false}
                                    value={confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm new password"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;