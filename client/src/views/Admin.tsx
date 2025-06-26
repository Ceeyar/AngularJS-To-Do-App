import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import API from '../utils/api';
import { Icon } from '../components/Index';

interface AdminTodo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
    userId: string;
    userName: string;
    userEmail: string;
    userFullName: string;
}

const Admin = () => {
    const [todos, setTodos] = useState<AdminTodo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setIsLoading(true);
            setError('');
            const response = await API.get('/admin/todos');
            setTodos(response.data);
        } catch (err: any) {
            setError(err.response?.data || 'Failed to load todos');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await API.delete(`/admin/todos/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err: any) {
            setError(err.response?.data || 'Failed to delete todo');
        }
    };

    const toggleTodo = async (id: number) => {
        try {
            const updated = await API.patch(`/admin/todos/${id}/toggle`);
            setTodos(todos.map(t => t.id === id ? updated.data : t));
        } catch (err: any) {
            setError(err.response?.data || 'Failed to toggle todo');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <Header />
            <div className="max-w-7xl mx-auto px-6 py-10">
                <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-4">
                    <Icon icon="settings" size="8" color="white" />
                    Admin Todo Management
                </h2>
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 shadow-lg">
                        <div className="flex items-center space-x-3">
                            <Icon icon="close" size="5" color="currentColor" />
                            <span className="font-semibold">{error}</span>
                        </div>
                    </div>
                )}
                {isLoading ? (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-lg text-white">Loading all todos...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">User</th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Email</th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Todo</th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Created</th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Status</th>
                                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.map(todo => (
                                    <tr key={todo.id} className="hover:bg-blue-50 transition-all">
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-900">{todo.userFullName}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-700">{todo.userEmail}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-800">{todo.text}</td>
                                        <td className="px-4 py-2 whitespace-nowrap text-gray-600">{new Date(todo.createdAt).toTimeString()}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${todo.completed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                {todo.completed ? 'Completed' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                                            <button
                                                onClick={() => toggleTodo(todo.id)}
                                                className={`px-3 py-1 rounded-lg font-semibold text-xs ${todo.completed ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-green-500 text-white hover:bg-green-600'} transition-all`}
                                            >
                                                {todo.completed ? 'Mark Pending' : 'Mark Complete'}
                                            </button>
                                            <button
                                                onClick={() => deleteTodo(todo.id)}
                                                className="px-3 py-1 rounded-lg font-semibold text-xs bg-red-500 text-white hover:bg-red-600 transition-all"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {todos.length === 0 && (
                            <div className="text-center py-12 text-gray-500 text-lg">No todos found.</div>
                        )}
                    </div>
                )}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-sm text-blue-100 hover:text-white transition-colors duration-200 underline decoration-2 underline-offset-2 hover:decoration-white"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Admin; 