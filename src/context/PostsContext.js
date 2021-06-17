import React, { createContext, useState, useContext, useEffect} from 'react';

const PostsContext = createContext();

const PostsContextProvider = ({ children }) => {
    const [posts, setPosts] = useState();

    console.log("POSTS"+posts);

    const getPosts = () => {
        const uri = 'https://dummyapi.io/data/api/post?limit=10';
        let h = new Headers();
        h.append('app-id', '60cbc53bea9ef7bbdc44dd76');
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
        <PostsContext.Provider value={{ posts }}>
            { children }
        </PostsContext.Provider>
    );
}

const usePostsContext = () => useContext(PostsContext);

export { usePostsContext, PostsContextProvider as default };