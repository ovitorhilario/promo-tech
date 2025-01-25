import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { getSession } from "~/services/api/actions/auth/get-session";
import { login as loginRequest, LoginPayload } from "~/services/api/actions/auth/login";
import { Session } from "~/types/actions/session";

export interface AuthContext {
  session: Session | null;
  token: string | null;
  isAdmin: boolean;
  login: (payload: LoginPayload) => Promise<void>;     
  logOut: () => void;
}

export const AuthContext = createContext<AuthContext | null>(null);

type AuthProviderProps = PropsWithChildren<any>;

export function Provider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const queryClient = useQueryClient();

  async function login(payload: LoginPayload) {
    const response = await loginRequest(payload);
    if (!response?.token) {
      throw new Error("Failed to log in");
    }
    localStorage.setItem("token", response.token);
    setToken(response.token);
  }

  async function logOut() {
    localStorage.removeItem("token");
    setToken(""); 
    queryClient.removeQueries({ queryKey: ["session"] });
  }

  const { data, error } = useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    enabled: !!token,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (error) {
      logOut();
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{
      session: data ?? null, 
      isAdmin: data?.role === "ADMIN",
      token, 
      login, 
      logOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
}