import React, { createContext, useState, useContext, useEffect} from 'react';
import axios from "axios";

const CommentsContext = createContext();

const CommentsContextProvider = ({ children }) => {
    const [comments, setComments] = useState();

    useEffect(()=>{
        const ac = new AbortController();
        axios.get(`https://dummyapi.io/data/api/post?limit=10`, { headers: { 'app-id': process.env.REACT_APP_API_ID } })
            .then(({ data }) => setComments(data.data))
            .catch(console.error);
        return () => ac.abort();
    },[]);

    return (
        <CommentsContext.Provider value={{ comments }}>
            { children }
        </CommentsContext.Provider>
    );
}

const useCommentsContext = () => useContext(CommentsContext);

export { useCommentsContext, CommentsContextProvider as default };