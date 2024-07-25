import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { createContext, useEffect, useState } from "react"

export const PlaylistContext = createContext()

export let audio = null

export const PlaylistProvider = ({ children }) => {

    const db = getFirestore()

    const [token, setToken] = useState()
    const [idSong, setIdSong] = useState(false)

    const getAccessToken = async (clientId, clientSecret) => {
        const url = 'https://accounts.spotify.com/api/token'
        const credentials = btoa(`${clientId}:${clientSecret}`)

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${credentials}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        })

        const data = await response.json()
        return data.access_token
    }

    const getCategories = async () => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/browse/categories?limit=50`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            const data = await response.json()
            return data.categories.items
        } catch (error) {
            console.log(error)
        }
    }

    const searchSpotify = async (e) => {

        const song = e.target.value

        if (song !== '') {
            try {
                const response = await fetch(`https://api.spotify.com/v1/search?q=${song}&type=track&include_external=audio`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
                const data = await response.json()
                return data.tracks.items
            } catch (error) {
                console.log(error)
            }
        }

    }

    const checkIfSongExists = async (songId) => {
        const playlistCollection = collection(db, 'playlist')
        const q = query(playlistCollection, where('id', '==', songId))
        const querySnapshot = await getDocs(q)
        return !querySnapshot.empty
    }

    const addTracksPlaylist = async (e) => {

        const songExists = await checkIfSongExists(e.id)

        if (!songExists) {
            const playlistCollection = collection(db, "playlist")
            const response = await addDoc(playlistCollection, e)

            return response.id ? 'Canción agregada a la playlist' : ''
        } else {
            return 'La canción ya existe en la playlist'
        }
    }

    const getPlaylistFromCategory = async (id) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            const data = await response.json()
            return data.playlists.items
        } catch (error) {
            console.log(error)
        }
    }

    const getTracksFormPlaylist = async (id) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })

            const data = await response.json()
            return data.items

        } catch (error) {
            console.log(error)
        }
    }

    const resetValues = () => {
        audio.currentTime = 0
        audio.src = ''
        setIdSong(false)
    }

    const playPauseSong = (data) => {

        const { preview_url, id } = data

        if (preview_url !== null) {

            if (audio && !audio.paused) {
                audio.pause()
            }

            if (audio?.src == preview_url) {
                resetValues()
                return
            }

            audio = new Audio(preview_url)

            audio.addEventListener('loadedmetadata', () => {
                audio.play()
                setIdSong(id)
            })

            audio.addEventListener('ended', () => {
                resetValues()
            })
        }
    }

    useEffect(() => {
        const clientSecret = process.env.REACT_APP_CLIENT_SECRET
        const clientId = process.env.REACT_APP_CLIENT_ID

        getAccessToken(clientId, clientSecret)
            .then(token => {
                setToken(token)
            })
            .catch(error => {
                console.error('Error al obtener el token de acceso:', error)
            })

    }, [])

    return (
        <PlaylistContext.Provider value={{
            getCategories,
            searchSpotify,
            addTracksPlaylist,
            getPlaylistFromCategory,
            getTracksFormPlaylist,
            playPauseSong,
            resetValues,
            idSong,
            token
        }}>
            {children}
        </PlaylistContext.Provider>
    )
}