import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login';
import Chat from './components/Chat';
import Register from "./components/register";

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const handleLogin = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    return (
        <Router>
            <Routes>
                <Route 
                    path="/login"
                    element={token ? <Navigate to="/Chat"/> : <Login onLogin={handleLogin}/>}
                />
                <Route 
                    path="/register"
                    element={token ? <Navigate to="/Chat"/> : <Register/>}
                />
                <Route 
                    path="/chat"
                    element={token ? <Chat token={token}/> : <Navigate to="/login"/>}
                />
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
        </Router>
    );
};

export default App;