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