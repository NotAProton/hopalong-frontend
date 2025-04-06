import { useState } from "react";
import { API_DOMAIN } from "../env";
import { useAuthStore } from "../store/authStore";

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

interface Credentials {
  email: string;
  password: string;
  remember?: boolean;
}

interface AuthResponse {
  status: string;
  payload: {
    token?: string;
    user?: User;
    message?: string;
  };
}

interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface VerifyRequest {
  email: string;
  code: string;
}

export function useLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { login } = useAuthStore();

  const loginUser = async (credentials: Credentials): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_DOMAIN}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = (await response.json()) as AuthResponse;
      if (data.status !== "success" || !data.payload.token) {
        throw new Error(data.payload.message ?? "Login failed");
      }

      // Store auth data in zustand store
      if (data.payload.token && data.payload.user) {
        login(data.payload.token, data.payload.user);
      }

      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login: loginUser, loading, error };
}

export function useSignup() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const signup = async (request: SignupRequest): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_DOMAIN}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const data = (await response.json()) as AuthResponse;
      if (data.status !== "success") {
        throw new Error(data.payload.message ?? "Signup failed");
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
}

export function useVerify() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const verify = async (request: VerifyRequest): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_DOMAIN}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const data = (await response.json()) as AuthResponse;
      if (data.status !== "success") {
        throw new Error(data.payload.message ?? "Verification failed");
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { verify, loading, error };
}

export function useLogout() {
  const { logout } = useAuthStore();

  const logoutUser = (): void => {
    logout();
  };

  return { logout: logoutUser };
}
