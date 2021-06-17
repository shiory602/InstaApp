import React, { createContext, useState, useContext, useEffect} from 'react';

const FetchContext = createContext();

const FetchContextProvider = ({ children }) => {
    const [comments, setComments] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [users, setUsers] = useState([]);
    
    const baseurl = 'https://jsonplaceholder.typicode.com/'
    // API reference: https://jsonplaceholder.typicode.com/

    function getComments () {
        fetch(`${baseurl}comments/10`)
            .then(response => response.json())
            .then(json => setComments(json))
            .catch(err => console.log(`error ${err}`))
    }

    function getPhotos () {
        fetch(`${baseurl}photos/10`)
        .then(response => response.json())
        .then(json => setPhotos(json))
        .catch(err => console.log(`error ${err}`))
    }

    function getUsers () {
        fetch(`${baseurl}users/10`)
            .then(response => response.json())
            .then(json => setUsers(json))
            .catch(err => console.log(`error ${err}`))
    }

    useEffect(() => {
        // comments: body
        getComments();
        // photos: url, thumbnailUrl
        getPhotos();
        // users: username
        getUsers();
    }, [])
    
    return (
        <FetchContext.Provider value={{ comments, users, photos }}>
            { children }
        </FetchContext.Provider>
    );
}

const useFetchContext = () => useContext(FetchContext);

export { useFetchContext, FetchContextProvider as default };