import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "../https/axios";
import { authReducer } from "../Reducers/auth-reducers";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


// Context for Authentication

const AuthProvider = ({ children }) => {
    const token = localStorage.getItem("token");
    const initialState = {
      user: null,
      isAuthenticated: false,
      loading: token ? true : false,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);
  
    const loadUserProfile = async () => {
      dispatch({ type: "USER_LOADING" });
      try {
        const { data } = await axios.get("/auth/profile");
        dispatch({ type: "USER_LOADED", payload: data.data });
      } catch (error) {
        dispatch({ type: "USER_LOAD_FAIL" });
      }
    };
  
    useEffect(() => {
      if (token && !state.isAuthenticated) {
        loadUserProfile();
      }
    }, [token, dispatch]);
  
    
    return (
      <AuthContext.Provider
        value={{
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          loading: state.loading,
          dispatch,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
  export { AuthProvider };