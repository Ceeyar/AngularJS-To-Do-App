import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { todoAPI } from '../utils/api';
import { Icon } from '../components/Index';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
    userId: number;
}

const Home = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // Load todos on component mount
    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            setIsLoading(true);
            setError('');
            const data = await todoAPI.getAll();
            setTodos(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load todos');
            console.error('Error loading todos:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        try {
            setIsAdding(true);
            setError('');

            const createdTodo = await todoAPI.create({ text: newTodo.trim() });
            setTodos([createdTodo, ...todos]);
            setNewTodo('');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to add todo');
            console.error('Error adding todo:', err);
        } finally {
            setIsAdding(false);
        }
    };

    const toggleTodo = async (id: number) => {
        try {
            const todo = todos.find(t => t.id === id);
            if (!todo) return;

            const originalCompleted = todo.completed;

            // Optimistically update the UI first
            setTodos(prevTodos =>
                prevTodos.map(t =>
                    t.id === id ? { ...t, completed: !originalCompleted } : t
                )
            );

            // Then make the API call
            const updatedTodo = await todoAPI.toggle(id, !originalCompleted);

            // Update with the server response to ensure consistency
            setTodos(prevTodos =>
                prevTodos.map(t => t.id === id ? updatedTodo : t)
            );

        } catch (err: any) {
            // Revert the optimistic update on error
            const todo = todos.find(t => t.id === id);
            if (todo) {
                setTodos(prevTodos =>
                    prevTodos.map(t =>
                        t.id === id ? { ...t, completed: todo.completed } : t
                    )
                );
            }
            setError(err.response?.data?.message || 'Failed to update todo');
            console.error('Error updating todo:', err);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            await todoAPI.delete(id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete todo');
            console.error('Error deleting todo:', err);
        }
    };

    const clearCompleted = async () => {
        try {
            const completedTodos = todos.filter(todo => todo.completed);
            await Promise.all(completedTodos.map(todo => todoAPI.delete(todo.id)));
            setTodos(todos.filter(todo => !todo.completed));
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to clear completed todos');
            console.error('Error clearing completed todos:', err);
        }
    };

    const completedCount = todos.filter(t => t.completed).length;
    const pendingCount = todos.filter(t => !t.completed).length;
    console.log(todos);
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
                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 shadow-lg">
                        <div className="flex items-center space-x-3">
                            <Icon icon="close" size="5" color="currentColor" />
                            <span className="font-semibold">{error}</span>
                        </div>
                    </div>
                )}

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
                            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 group-focus-within:text-blue-500 transition-colors duration-300">
                                <Icon icon="add" size="5" color="gray" />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={!newTodo.trim() || isAdding}
                            className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg font-semibold flex items-center space-x-3"
                        >
                            {isAdding ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    <span>Adding...</span>
                                </>
                            ) : (
                                <>
                                    <Icon icon="add" size="4" color="white" />
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

                    {isLoading ? (
                        <div className="text-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                            <p className="text-lg text-gray-600">Loading your todos...</p>
                        </div>
                    ) : todos.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-lg">
                                <Icon icon="todos" size="12" color="gray" />
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
                                                <Icon icon="check" size="3" color="white" />
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
                                        <Icon icon="delete" size="5" color="currentColor" />
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