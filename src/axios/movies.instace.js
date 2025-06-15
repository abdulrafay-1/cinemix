import axios from "axios";

const moviesInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: { 'Authorization': `Bearer ${import.meta.env.VITE_MOVIES_API_KEY}` }
});

export default moviesInstance