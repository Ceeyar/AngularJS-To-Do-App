import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Input, ErrorAlert, Button, Icon } from '../components/Index';

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = async () => {

        if (!formData.username || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', formData);
            console.log("response", response);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data || 'Login failed. Please try again.');
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
                    <form className="space-y-6" >
                        <Input icon="user" label="Username" id="username" name="username" type="text" required value={formData.username} onChange={handleInputChange} placeholder="Enter your username" />
                        <Input icon="password" label="Password" id="password" name="password" type="password" required value={formData.password} onChange={handleInputChange} placeholder="Enter your password" />
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
                            <ErrorAlert message={error} />
                        )}

                        {/* Submit Button */}
                        <Button icon="login" onClick={handleSubmit} type="submit" isLoading={isLoading} text="Login" actionText="Signing in..." />
                    </form>

                    {/* Register Link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
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
