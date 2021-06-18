import React, { createContext, useState, useContext, useEffect, useReducer} from 'react';
import axios from "axios";

const UserContext = createContext();

const initialState = {likedPosts: []};

function reducer(state, action) {
    switch (action.type) {
      case 'LIKE':
        return  {...state,
            likedPosts: [action.postId, ...state.likedPosts]
        };
      case 'UNLIKE':
        return {
            ...state,
            likedPosts: state.likedPosts.filter(
                (id) => id !== action.postId
            )
        };
      default:
        return state;
    }
  }

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(()=>{
        axios.get(`https://dummyapi.io/data/api/user/5aZRSdkcBOM6j3lkWEoP`, { headers: { 'app-id': process.env.REACT_APP_API_ID } })
            .then(({ data }) => setUser(data))
            .catch(console.error)
    },[]);
    return (
        <UserContext.Provider value={{ user, state, dispatch }}>
            { children }
        </UserContext.Provider>
    );
}

const useUserContext = () => useContext(UserContext);

export { useUserContext, UserContextProvider as default };