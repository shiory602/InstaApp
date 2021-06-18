import React, { createContext, useState, useContext, useEffect} from 'react';
import axios from "axios";

const PostsContext = createContext();

const PostsContextProvider = ({ children }) => {
    const [posts, setPosts] = useState();

    useEffect(()=>{
        const ac = new AbortController();
        axios.get(`https://dummyapi.io/data/api/post?limit=10`, { headers: { 'app-id': process.env.REACT_APP_API_ID } })
            .then(({ data }) => setPosts(data.data))
            .catch(console.error);
        return () => ac.abort();
    },[]);

    return (
        <PostsContext.Provider value={{ posts }}>
            { children }
        </PostsContext.Provider>
    );
}

const usePostsContext = () => useContext(PostsContext);

export { usePostsContext, PostsContextProvider as default };