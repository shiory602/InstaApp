import React, { createContext, useState, useContext, useEffect, useReducer } from 'react';
import axios from "axios";

const PostsContext = createContext();


const PostsReducer = (posts, action) => {
    switch (action.type) {
        case "ADD_POST":
            return [
                ...posts,
                action.post,
            ];
        default:
            return posts;
    }
};

const PostsContextProvider = ({ children }) => {
    const [posts, setPosts] = useState();
    const [state, dispatch] = useReducer(PostsReducer, posts);
    
    useEffect(()=>{
        const ac = new AbortController();
        axios.get(`https://dummyapi.io/data/api/post?limit=10`, { headers: { 'app-id': process.env.REACT_APP_API_ID } })
            .then(({ data }) => setPosts(data.data))
            .catch(console.error);
        return () => ac.abort();
    },[]);

    return (
        <PostsContext.Provider value={{ posts, state, dispatch }}>
            { children }
        </PostsContext.Provider>
    );
}

const usePostsContext = () => useContext(PostsContext);

export { usePostsContext, PostsContextProvider as default };