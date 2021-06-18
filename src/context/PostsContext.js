import React, { createContext, useState, useContext, useEffect, useReducer } from 'react';

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

    const getPosts = () => {
        const uri = 'https://dummyapi.io/data/api/post?limit=10';
        let h = new Headers();
        h.append('app-id', '60ccfffdc826b7e8b02cb0ea');
        // h.append('app-id', '60cbc53bea9ef7bbdc44dd76');
        let req = new Request(uri, {
            method: 'GET',
            headers: h,
            mode: 'cors'
        })
        fetch(req).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then( d => {
            setPosts(d.data);
        }).catch( error => {
            console.error(error);
        });
    }

    useEffect(()=>{
        getPosts();
    },[]);

    return (
        <PostsContext.Provider value={{ posts, state, dispatch }}>
            { children }
        </PostsContext.Provider>
    );
}

const usePostsContext = () => useContext(PostsContext);

export { usePostsContext, PostsContextProvider as default };