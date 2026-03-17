import axios from 'axios';

// Configuration de l'API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Intercepteur pour ajouter le token à chaque requête
api.interceptors.request.use(
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

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============ AUTH ============

export const authService = {
  // Inscription
  register: async (userData) => {
    const response = await api.post('/auth/register/', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Connexion
  login: async (credentials) => {
    const response = await api.post('/auth/login/', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  // Déconnexion
  logout: async () => {
    try {
      await api.post('/auth/logout/');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Obtenir l'utilisateur courant
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

// ============ CAREERS ============

export const careersService = {
  // Liste des métiers
  getAll: async (params = {}) => {
    const response = await api.get('/careers/', { params });
    return response.data;
  },

  // Détail d'un métier
  getBySlug: async (slug) => {
    const response = await api.get(`/careers/${slug}/`);
    return response.data;
  },

  // Catégories de métiers
  getCategories: async () => {
    const response = await api.get('/careers/categories/');
    return response.data;
  },

  // Recherche de métiers
  search: async (query) => {
    const response = await api.get('/careers/search/', { params: { q: query } });
    return response.data;
  },

  // Ajouter aux favoris
  addToFavorites: async (slug) => {
    const response = await api.post(`/careers/${slug}/favorite/`);
    return response.data;
  },

  // Retirer des favoris
  removeFromFavorites: async (slug) => {
    const response = await api.delete(`/careers/${slug}/favorite/`);
    return response.data;
  },

  // Obtenir les favoris
  getFavorites: async () => {
    const response = await api.get('/careers/favorites/');
    return response.data;
  },
};

// ============ UNIVERSITIES ============

export const universitiesService = {
  // Liste des universités
  getAll: async (params = {}) => {
    const response = await api.get('/universities/', { params });
    return response.data;
  },

  // Détail d'une université
  getById: async (id) => {
    const response = await api.get(`/universities/${id}/`);
    return response.data;
  },

  // Liste des filières
  getFields: async (params = {}) => {
    const response = await api.get('/fields/', { params });
    return response.data;
  },

  // Détail d'une filière
  getFieldById: async (id) => {
    const response = await api.get(`/fields/${id}/`);
    return response.data;
  },

  // Filières par université
  getFieldsByUniversity: async (universityId) => {
    const response = await api.get(`/universities/${universityId}/fields/`);
    return response.data;
  },
};

// ============ ORIENTATION TEST ============

export const orientationService = {
  // Obtenir les questions du test
  getQuestions: async () => {
    const response = await api.get('/orientation/questions/');
    return response.data;
  },

  // Soumettre le test
  submitTest: async (answers) => {
    const response = await api.post('/orientation/submit/', { answers });
    return response.data;
  },

  // Obtenir les résultats
  getResults: async () => {
    const response = await api.get('/orientation/results/');
    return response.data;
  },

  // Obtenir l'historique des tests
  getHistory: async () => {
    const response = await api.get('/orientation/history/');
    return response.data;
  },
};

// ============ USER PROFILE ============

export const userService = {
  // Obtenir le profil
  getProfile: async () => {
    const response = await api.get('/users/profile/');
    return response.data;
  },

  // Mettre à jour le profil
  updateProfile: async (data) => {
    const response = await api.patch('/users/profile/', data);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  },

  // Changer le mot de passe
  changePassword: async (passwords) => {
    const response = await api.post('/users/change-password/', passwords);
    return response.data;
  },
};

// Export par défaut de l'instance axios pour des requêtes personnalisées
export default api;
