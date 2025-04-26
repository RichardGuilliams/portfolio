import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Get } from "../../methods/requests"

const AuthContext = createContext();

export async function getRole(token){
  
  const state = {
    user: undefined,
    loading: true
  }
  
  function setUser(data){
    state.user = data;
  }
  
  function setLoading(data){
    state.loading = data;
  }
    
    try{
      const id = jwtDecode(token).id;
    await Get(`users/${id}`, setUser, setLoading);
    return state.user.role;
  }
  catch(err){
    console.log(err)
  }
  finally{
    setLoading(false)
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // Start as undefined
  const [loading, setLoading] = useState(true); // Until we rehydrate

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        console.log(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (!isExpired) {
          setUser({ ...JSON.parse(userData), token });
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false); // Done loading
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser({ ...userData, token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
