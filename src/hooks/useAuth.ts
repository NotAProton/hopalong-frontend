import { useState } from "react";
import { API_DOMAIN } from "../env";

interface Credentials {
  email: string;
  password: string;
  remember?: boolean;
}

interface AuthResponse {
  status: string;
  payload: {
    token?: string;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (credentials: Credentials): Promise<AuthResponse> => {
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
      if (data.status !== "success") {
        throw new Error(data.payload.message ?? "Login failed");
      }
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}

export function useSignup() {
  const [loading, setLoading] = useState(false);
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
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
}

export function useVerify() {
  const [loading, setLoading] = useState(false);
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
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { verify, loading, error };
}
