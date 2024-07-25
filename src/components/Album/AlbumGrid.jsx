import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Link } from "react-router-dom"
import { importAllImages } from "../../utils/importImages"

export const AlbumGrid = ({ album, onClose }) => {

    const images = importAllImages(require.context('../../assets/img/gallery-low', false, /\.(png|jpe?g|svg)$/))
    const [isUnmounting, setIsUnmounting] = useState(false)

    const handleClose = () => {
        setIsUnmounting(true)
        setTimeout(() => {
            onClose(false)
        }, 300)
    }

    return (
        <div className={`album-grid ${isUnmounting ? 'album-grid-close' : ''}`}>
            <p>Álbum completo</p>
            <button className="btn-close-album-grid" onClick={handleClose}><FontAwesomeIcon icon={faXmark} /></button>
            <div>
                {Object.keys(images).map((e, i) => (
                    <Link onClick={handleClose} key={i} to={`/album/${i + 1}`}>
                        <img src={images[e]} loading="lazy" />
                    </Link>
                ))}
            </div>
        </div>
    )
}