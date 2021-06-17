import React, { createContext, useState, useContext} from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: 'happy_doggy-1',
        username: 'happy_doggy',
        profileImage: 'https://source.unsplash.com/2l0CWTpcChI/900x900'
    });
    return (
        <UserContext.Provider value={{ user }}>
            { children }
        </UserContext.Provider>
    );
}

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserContextProvider as default };