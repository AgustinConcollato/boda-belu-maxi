import { faAngleLeft, faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import imgPlaylist from '../../assets/img/img3.jpeg'
import { useContext, useEffect, useState } from "react"
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../App'

import './ViewPlaylist.css'
import { Song } from "../Playlist/Song"
import { audio, PlaylistContext } from "../../context/PlaylistContext"
import { BtnAddSongs } from "../BtnAddSongs/BtnAddSongs"

export const ViewPlaylist = () => {

    const { resetValues } = useContext(PlaylistContext)

    const [playlist, setPlaylist] = useState([])
    const [loading, setLoading] = useState(false)

    function addSpotify() {

        const totalPart = []
        const part1 = []
        const part2 = []

        playlist.forEach((e, i) => {
            if (i < (playlist.length / 2)) {
                part1.push(e.uri)
            } else {
                part2.push(e.uri)
            }
        })

        totalPart.push(part1)
        totalPart.push(part2)

        // totalPart.map(e => {
        //     fetch('https://api.spotify.com/v1/playlists/6cB2h2cAUuVBYNT8plT19R/tracks', {
        //         method: 'POST',
        //         headers: {
        //             'Authorization': `Bearer BQA7cgTjMfaaxfSO0DCONhwK39kgzX7kx3m6RO4MiPt_virgM-LBVyOkotk3Pe7fQwrk-vkA7TNDcQOSpNjqL7ODEV5wmQtJxIaEpLA4YeviSHaTPl0lPSgvquvBUfbmQEDEKj09N-4NlxY7Yvyk-B3qRP-eI267WGp4ZzB6mqel7P3BA8BcFc_fzd_kxFNzHhBwzNgO5djA21W9ddmyPHyboSSdqur_ZjO4VVA`,
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(e)
        //     })
        //         .then(e => e.json())
        //         .then(e => console.log(e))
        //         .catch(error => console.log(error))
        // })
    }

    useEffect(() => {

        async function getPlaylist() {
            const querySnapshot = await getDocs(collection(db, 'playlist'))
            const songs = []
            querySnapshot.forEach((doc) => {
                songs.push(doc.data())
            })
            return songs
        }

        getPlaylist().then((songs) => {
            setPlaylist(songs)
            setLoading(true)
        }).catch((error) => {
            console.error('Error al obtener datos:', error)
        })

        return () => audio ? resetValues() : false
    }, [])

    return (
        <section className="playlist">
            <header>
                <div>
                    <Link to={'/'}><FontAwesomeIcon icon={faAngleLeft} size="2xs" /> Invitación</Link>
                    <BtnAddSongs />
                    <button onClick={addSpotify}>agregar a spotify</button>
                </div>
                <div className="info-playlist">
                    <img src={imgPlaylist} />
                    <div>
                        <h1>Boda Belu&Maxi</h1>
                        <p>{playlist.length} canciones</p>
                    </div>
                </div>
            </header>
            {loading
                ? <ul className="playlist-oficial">
                    {playlist.length !== 0
                        ? playlist.map((e, i) => <Song key={i} e={e} add={false} />)
                        : <div className="playlist-empty">
                            <p>Todavía no hay canciones</p>
                            <BtnAddSongs />
                        </div>
                    }
                </ul>
                : <ul>
                    <span className="loading"><FontAwesomeIcon icon={faCircle} /></span>
                </ul>
            }
        </section>
    )
}