import { useState, createContext, useEffect } from "react"
import axios from 'axios'

export const AuthContext = createContext()

function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user')
            return storedUser ? JSON.parse(storedUser) : null
        } catch (e) {
            return null;
        }
    })

    const login = async (inputs) => {
        const res = await axios.post('http://localhost:8800/api/auth/login', inputs, {
            withCredentials: true
        })
        setCurrentUser(res.data)
    }

    // const logout = () => {
    //     setCurrentUser(null);
    //     localStorage.removeItem("user");
    // };

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("user");
        }
    }, [currentUser]);

    const value = {
        currentUser,
        login,
        // logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider 