import { useContext, useEffect, useState } from "react"
import { PlaylistContext } from "../../context/PlaylistContext"
import { Category } from "./Category"
import { Link, useParams, useLocation } from "react-router-dom"
import { Song } from "./Song"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"

export const PlaylistCategoies = () => {

    const {
        getTracksFormPlaylist,
        getPlaylistFromCategory,
        token,
    } = useContext(PlaylistContext)

    const { id } = useParams()

    const location = useLocation()

    const [list, setList] = useState([])

    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    const url = params.get('url');
    const search = params.get('search');

    const category = {
        name,
        id,
        icons: [{
            url
        }],
    }

    useEffect(() => {
        if (token) {
            search == 'category'
                ? getPlaylistFromCategory(id)
                    .then(e => setList(e))
                : getTracksFormPlaylist(id)
                    .then(e => setList(e))
        }
    }, [token, id])

    return (
        token &&
        <ul className="playlists-category">
            <li className="category-detail">
                <ul>
                    <Link to={'#'} onClick={() => window.history.back()}><FontAwesomeIcon icon={faAngleLeft} /></Link>
                    <Category e={category} />
                </ul>
            </li>
            {search === 'category'
                ? list.map((e, i) =>
                    e && e.id &&
                    <li key={i}>
                        <Link
                            to={`/playlist/${e.id}?name=${e.name}&search=playlist&url=${e?.images[0]?.url}`}
                        >
                            <img src={e?.images[0]?.url} alt="" />
                            <span>{e.name}</span>
                        </Link>
                    </li>
                )
                : list.map((e, i) => <Song key={i} e={e.track} />)
            }
        </ul>
    )
}