import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import API from '../utils/api';
import { Input, ErrorAlert, Button, Icon } from '../components/Index';

interface ProfileForm {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const Profile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ProfileForm>({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await API.get('/users/profile');
            const userData = response.data;
            setUser(userData);
            setFormData(prev => ({
                ...prev,
                username: userData.username || '',
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email || ''
            }));
        } catch (err: any) {
            console.error('Failed to fetch user profile:', err);
            if (err.response?.status === 401) {
                navigate('/login');
                return;
            }
            setError('Failed to load profile data');
        } finally {
            setIsLoadingProfile(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
        if (success) setSuccess('');
    };

    const handleUpdateProfile = async () => {
        if (!formData.username || !formData.firstName || !formData.lastName || !formData.email) {
            setError('All fields are required');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const updateData: any = {
                username: formData.username,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email
            };

            // Only include password fields if user wants to change password
            if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
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

                updateData.currentPassword = formData.currentPassword;
                updateData.newPassword = formData.newPassword;
            }

            const response = await API.put('/users/profile', updateData);

            // Update local storage with new user data
            const updatedUser = { ...user, ...response.data };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);

            setSuccess('Profile updated successfully!');

            // Clear password fields
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }));

        } catch (err: any) {
            setError(err.response?.data || 'Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await API.delete('/users/profile');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data || 'Failed to delete account. Please try again.');
            setIsLoading(false);
        }
    };

    if (isLoadingProfile) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <div className="text-white text-xl">Loading profile...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <div className="text-white text-xl">Failed to load profile</div>
            </div>
        );
    }

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
                            <Icon size={'10'} icon="user" color="white" />
                        </div>
                        <h1 className="mt-6 text-2xl font-bold text-white mb-2">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-lg text-white/80 font-medium">
                            {user.email}
                        </p>
                    </div>

                    {/* Profile Form */}
                    <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30 w-full">
                        <form className="space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                    Basic Information
                                </h3>
                                <Input
                                    icon="user"
                                    label="Username"
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="Enter your username"
                                />
                                <Input
                                    icon="user"
                                    label="First Name"
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your first name"
                                />
                                <Input
                                    icon="user"
                                    label="Last Name"
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your last name"
                                />
                                <Input
                                    icon="email"
                                    label="Email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Error and Success Messages */}
                            {error && <ErrorAlert message={error} />}
                            {success && (
                                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                                    {success}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    icon="save"
                                    onClick={handleUpdateProfile}
                                    type="button"
                                    isLoading={isLoading}
                                    text="Update Profile"
                                    actionText="Updating..."
                                />
                                <Button
                                    classname="bg-red-500 hover:bg-red-600 text-white"
                                    icon="delete"
                                    onClick={handleDeleteAccount}
                                    type="button"
                                    isLoading={isLoading}
                                    text="Delete Account"
                                    actionText="Deleting..."
                                />
                            </div>
                        </form>

                        {/* Back to Home */}
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => navigate('/')}
                                className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200 underline decoration-2 underline-offset-2 hover:decoration-blue-700"
                            >
                                ← Back to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;  