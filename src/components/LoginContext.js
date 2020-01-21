import React from 'react';
// const axios = require('axios');

export const LoginContext = React.createContext({
    isLoggedIn: false,
    loggedUser: "",
    toggleLogin: () => {}
});