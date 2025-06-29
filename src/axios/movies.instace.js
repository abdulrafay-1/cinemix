import axios from "axios";

const moviesInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        include_adult: false
    },
    headers: { 'Authorization': `Bearer ${import.meta.env.VITE_MOVIES_API_KEY}` }
});

export default moviesInstance   