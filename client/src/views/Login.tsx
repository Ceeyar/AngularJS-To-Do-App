import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../utils/api';
import { Input, ErrorAlert, Button, Icon } from '../components/Index';
import { toast } from 'react-toastify';

interface LoginForm {
    username: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginForm>({
        username: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Don't clear error immediately - let user see the error until they submit again
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await authApi.login({
                username: formData.username,
                password: formData.password
            });

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            toast.success('Login successful');
            navigate('/');

        } catch (err: any) {
            const errorMessage = err.response?.data?.message ||
                err.message ||
                'Login failed. Please check your credentials and try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto h-16 w-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-300 border border-white/30">
                        <Icon icon="login" color="white" />
                    </div>
                    <h1 className="mt-6 text-4xl font-bold text-white mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-lg text-white/80 font-medium">
                        Sign in to your TODO account
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30">
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            icon="password"
                            label="Password"
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center cursor-pointer">
                                <input type="checkbox" id="remember" name="remember" className="h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer" />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-700 cursor-pointer">Remember me</label>
                            </div>
                            <div onClick={() => navigate('/forgot-password')} className="flex items-center cursor-pointer">
                                <a className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200 underline decoration-2 underline-offset-2 hover:decoration-blue-700">Forgot password?</a>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm font-medium">{error}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setError('')}
                                        className="text-red-400 hover:text-red-600 transition-colors"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            icon="login"
                            type="submit"
                            isLoading={isLoading}
                            text="Login"
                            actionText="Signing in..."
                        />
                    </form>

                    {/* Register Link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/register')}
                                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 underline decoration-2 underline-offset-2 hover:decoration-blue-700"
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
