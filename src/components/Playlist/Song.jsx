import { faCircle, faPause, faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect, useState } from "react"
import { PlaylistContext } from "../../context/PlaylistContext"
import defaultImgMusic from '../../assets/img/deafault-img-musica.png'

export const Song = ({ e, add = true }) => {

    const { addTracksPlaylist, idSong, playPauseSong } = useContext(PlaylistContext)

    const [hoverSong, setHoverSong] = useState(false)
    const [notification, setNotification] = useState('')
    const [loading, setLoading] = useState(false)

    const addSong = () => {
        setLoading(true)
        addTracksPlaylist(e)
            .then(e => {
                setNotification(e)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        notification !== '' && setTimeout(() => setNotification(''), 3000)
    }, [notification])

    return (
        !e
            ? <div className="song-loading"></div>
            : <li>
                <div
                    onClick={() => {
                        setHoverSong(false)
                        e?.preview_url
                            ? playPauseSong(e)
                            : setNotification('Esta canción no tiene una visualización previa')
                        setTimeout(() => setNotification(''), 3000)
                    }}
                    onMouseEnter={() => setHoverSong(true)}
                    onMouseLeave={() => setHoverSong(false)}
                >
                    <div className="container-img-song">
                        <img src={e?.album.images[2]?.url || e?.album.images[1]?.url || e?.album.images[0]?.url || defaultImgMusic} />
                        {(idSong == e?.id || hoverSong) && <button><FontAwesomeIcon icon={idSong != e?.id ? faPlay : faPause} size="lg" /></button>}
                    </div>
                    <div className="info-song">
                        <h5>{e?.name}</h5>
                        <span>{e?.artists.map(e => e.name).join(', ').replace(/,([^,]*)$/, ' y$1')}</span>
                    </div>
                </div>
                {loading
                    ? <span className="loading"><FontAwesomeIcon icon={faCircle} /></span>
                    : add == true && <button className="btn-add-song" onClick={addSong}><span>AÑADIR</span> +</button>}
                {notification && <span className="notification">{notification}</span>}
            </li>
    )
}