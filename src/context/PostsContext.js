import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from "axios";

const PostsContext = createContext();

const initialState = {
    posts: JSON.parse(localStorage.getItem("posts")),
    myPosts: JSON.parse(localStorage.getItem("myPosts")),
    likedPosts: JSON.parse(localStorage.getItem("likedPosts")),
    loading: false
}
const PostsReducer = (state, action) => {
    let liked, p, mp ;
    switch (action.type) {
        case "LOADING": return {loading: true, myPosts: state.myPosts, likedPosts: state.likedPosts}
        case "ADD_POST":
            p = state.posts ? [action.post, ...state.posts] : [action.post];
            mp = state.myPosts ? [action.post, ...state.myPosts] : [action.post];
            localStorage.setItem("posts", JSON.stringify(p));
            localStorage.setItem("myPosts", JSON.stringify(mp));
            return {posts : p,
                    myPosts: mp,
                    loading: false};
        case "ADD_POSTS":
            p = state.myPosts ?  [...action.posts, ...state.myPosts] : [...action.posts]
            return {posts : p,
                    myPosts : state.myPosts,
                    likedPosts : state.likedPosts,
                    loading: false};
        case "LIKE":
            liked = state.likedPosts ? [...state.likedPosts, action.postId] : [action.postId];
            localStorage.setItem("likedPosts", JSON.stringify(liked));
            return {
                likedPosts: liked,
                myPosts: state.myPosts,
                posts : state.posts.map(p => { if(p.id === action.postId){
                return {
                    ...p, likes: p.likes++
                }
            }
            return p;
        })};
        case "UNLIKE":
            liked = state.likedPosts.filter(lp => lp !== action.postId);
            localStorage.setItem("likedPosts", JSON.stringify(liked));

            return { 
                likedPosts: liked,
                myPosts: state.myPosts,
                posts : state.posts.map(p => { if(p.id === action.postId){
                return {
                    ...p, likes: p.likes--
                }
            }
            return p;
        })}
        default:
            return state;
    }
};
const PostsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PostsReducer, initialState);
    console.log(state);
    useEffect(()=>{
        console.log("Post CONTEXT FETCH");
        dispatch({type: "LOADING"});
        axios.get(`https://dummyapi.io/data/api/post?limit=10`, { headers: { 'app-id': process.env.REACT_APP_API_ID } })
            .then(({ data }) => dispatch({type: "ADD_POSTS", posts: data.data}))
            .catch(console.error);
    },[]);

    return (
        <PostsContext.Provider value={{ state, dispatch }}>
            { children }
        </PostsContext.Provider>
    );
}

const PostsConsumer = PostsContext.Consumer;

const usePostsContext = () => useContext(PostsContext);

export { usePostsContext, PostsConsumer, PostsContextProvider as default };