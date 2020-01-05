import React from 'react';
export const LoginContext = React.createContext({
    isLoggedIn: false,
    toggleStatus: () => {} 
});