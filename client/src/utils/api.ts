import axios from 'axios';

// API Configuration
const API_BASE_URL = 'http://localhost:5048/api';

// Create axios instance with default configuration
const API = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle auth errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid, redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Todo API functions
export const todoAPI = {
    // Get all todos for the current user
    getAll: async () => {
        const response = await API.get('/todos');
        return response.data;
    },

    // Create a new todo
    create: async (todo: { text: string }) => {
        const response = await API.post('/todos', todo);
        return response.data;
    },

    // Update a todo
    update: async (id: number, todo: { text?: string; completed?: boolean }) => {
        const response = await API.put(`/todos/${id}`, todo);
        return response.data;
    },

    // Delete a todo
    delete: async (id: number) => {
        const response = await API.delete(`/todos/${id}`);
        return response.data;
    },

    // Toggle todo completion status
    toggle: async (id: number, completed: boolean) => {
        const response = await API.patch(`/todos/${id}/toggle`);
        return response.data;
    }
};

// Auth API functions
export const authApi = {
    login: async (credentials: { username: string; password: string }) => {
        const response = await API.post('/auth/login', credentials);
        return response.data;
    },

    register: async (userData: { email: string; password: string; firstName: string; lastName: string }) => {
        const response = await API.post('/auth/register', userData);
        return response.data;
    },

    refreshToken: async () => {
        const response = await API.post('/auth/refresh');
        return response.data;
    }
};

// User API functions
export const userApi = {
    getProfile: async () => {
        const response = await API.get('/users/profile');
        return response.data;
    },

    updateProfile: async (userData: { firstName?: string; lastName?: string; email?: string }) => {
        const response = await API.put('/users/profile', userData);
        return response.data;
    },

    changePassword: async (passwordData: { currentPassword: string; newPassword: string }) => {
        const response = await API.put('/users/change-password', passwordData);
        return response.data;
    }
};

export default API; 