import { API_BASE_URL } from '@/config/api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  user_id: number;
}

export interface UserProfile {
  id: number;
  name: string;
  email: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  userId: number;
  expiresIn: number;
  user?: UserProfile;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Email ou senha inválidos');
      }
      
      const error = await res.json().catch(() => ({ message: 'Erro ao fazer login' }));
      throw new Error(error.message || `Erro: ${res.status}`);
    }

    return res.json();
  },

  saveToken(authResponse: AuthResponse, userProfile: UserProfile): void {
    const tokenData: AuthToken = {
      accessToken: authResponse.access_token,
      refreshToken: authResponse.refresh_token,
      userId: authResponse.user_id,
      expiresIn: authResponse.expires_in,
      user: userProfile,
    };
    localStorage.setItem('auth_token', JSON.stringify(tokenData));
  },

  getToken(): AuthToken | null {
    const token = localStorage.getItem('auth_token');
    return token ? JSON.parse(token) : null;
  },

  clearToken(): void {
    localStorage.removeItem('auth_token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  async getCurrentUser(accessToken: string): Promise<UserProfile> {
    const res = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Erro ao buscar dados do usuário: ${res.status}`);
    }

    const response = await res.json();
    return response.data;
  },

  getAccessToken(): string | null {
    const token = this.getToken();
    return token?.accessToken || null;
  },

  getUserProfile(): UserProfile | null {
    const token = this.getToken();
    return token?.user || null;
  },

  getUserName(): string | null {
    const user = this.getUserProfile();
    return user?.name || null;
  },

  getFirstName(): string | null {
    const userName = this.getUserName();
    if (userName) {
      return userName.split(' ')[0];
    }
    return null;
  },
};
