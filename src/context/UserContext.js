import React, { createContext, useState, useContext, useEffect} from 'react';
import axios from "axios";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(()=>{
        console.log("USER CONTEXT FETCH");
        axios.get(`https://dummyapi.io/data/api/user/5aZRSdkcBOM6j3lkWEoP`, { headers: { 'app-id': process.env.REACT_APP_API_ID } })
            .then(({ data }) => setUser(data))
            .catch(console.error)
    },[]);
    return (
        <UserContext.Provider value={{ user }}>
            { children }
        </UserContext.Provider>
    );
}

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserContextProvider as default };