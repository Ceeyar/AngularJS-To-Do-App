import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
}

const Home = () => {
    const navigate = useNavigate();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        setIsAdding(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const todo: Todo = {
            id: Date.now(),
            text: newTodo.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };

        setTodos([todo, ...todos]);
        setNewTodo('');
        setIsAdding(false);
    };

    const toggleTodo = async (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = async (id: number) => {
        // Add animation delay
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const completedCount = todos.filter(t => t.completed).length;
    const pendingCount = todos.filter(t => !t.completed).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <Header />

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
                {/* Add Todo Form */}
                <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 mb-8 border border-white/30">
                    <form onSubmit={handleAddTodo} className="flex gap-4">
                        <div className="flex-1 relative group">
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="What needs to be done?"
                                className="w-full px-6 py-4 pl-14 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm text-lg"
                                disabled={isAdding}
                            />
                            <svg className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <button
                            type="submit"
                            disabled={!newTodo.trim() || isAdding}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg font-semibold flex items-center space-x-3"
                        >
                            {isAdding ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    <span>Adding...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span>Add Todo</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Todo List */}
                <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Your Todos</h2>
                        {completedCount > 0 && (
                            <button
                                onClick={clearCompleted}
                                className="text-sm text-red-500 hover:text-red-700 transition-colors font-semibold underline decoration-2 underline-offset-2"
                            >
                                Clear completed ({completedCount})
                            </button>
                        )}
                    </div>

                    {todos.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                                <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">No todos yet</h3>
                            <p className="text-lg text-gray-500">Add your first todo above to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {todos.map((todo, index) => (
                                <div
                                    key={todo.id}
                                    className={`group flex items-center justify-between p-6 border-2 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] ${todo.completed
                                        ? 'bg-green-50 border-green-200 shadow-lg'
                                        : 'bg-gray-50 border-gray-200 hover:shadow-xl hover:border-blue-200'
                                        }`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="flex items-center gap-5 flex-1">
                                        <button
                                            onClick={() => toggleTodo(todo.id)}
                                            className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${todo.completed
                                                ? 'bg-green-500 border-green-500 text-white shadow-lg'
                                                : 'border-gray-300 hover:border-blue-500 hover:shadow-md'
                                                }`}
                                        >
                                            {todo.completed && (
                                                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                        <span
                                            className={`text-xl transition-all duration-300 font-medium ${todo.completed
                                                ? 'line-through text-gray-500'
                                                : 'text-gray-800'
                                                }`}
                                        >
                                            {todo.text}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-3 rounded-xl hover:bg-red-50 transition-all duration-300"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Stats */}
                {todos.length > 0 && (
                    <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 mt-8 border border-white/30">
                        <div className="grid grid-cols-3 gap-6 text-center">
                            <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-100">
                                <div className="text-3xl font-bold text-blue-600 mb-2">{todos.length}</div>
                                <div className="text-sm text-blue-500 font-semibold">Total</div>
                            </div>
                            <div className="p-6 bg-green-50 rounded-2xl border-2 border-green-100">
                                <div className="text-3xl font-bold text-green-600 mb-2">{completedCount}</div>
                                <div className="text-sm text-green-500 font-semibold">Completed</div>
                            </div>
                            <div className="p-6 bg-orange-50 rounded-2xl border-2 border-orange-100">
                                <div className="text-3xl font-bold text-orange-600 mb-2">{pendingCount}</div>
                                <div className="text-sm text-orange-500 font-semibold">Pending</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home; 