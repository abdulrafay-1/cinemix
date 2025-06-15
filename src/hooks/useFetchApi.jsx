import React, { useEffect, useState } from 'react'
import moviesInstance from '../axios/movies.instace'

const useFetchApi = (endPoint) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                const response = await moviesInstance(`${endPoint}`)
                setData(response.data)
            } catch (error) {
                setError(error)
            }
            finally {
                setLoading(false)
            }
        })()
    }, [])

    return { data, error, loading }
}

export default useFetchApi