import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        }
      );

      setUser(response.data.user);
    } catch (error) {
      console.error(error);

      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const register = async (formData) => {
    const response = await api.post("/register", formData);

    const { token, user } = response.data;

    localStorage.setItem("token", token);

    setUser(user);

    return response.data;
  };

  const login = async (formData) => {
    const response = await api.post("/login", formData);

    const { token, user } = response.data;

    localStorage.setItem("token", token);

    setUser(user);

    return response.data;
  };

const logout = async () => {
    try {
        await api.post("/logout");
    } catch (error) {
        console.log(error);
    }

    localStorage.removeItem("token");
    setUser(null);
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        fetchUser,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}