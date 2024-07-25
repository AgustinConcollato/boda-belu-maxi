import { faAngleLeft, faAngleRight, faTableCellsLarge } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { importAllImages } from '../../utils/importImages'

import './Album.css'
import { AlbumGrid } from "./AlbumGrid"

export const Album = () => {
    const { id } = useParams()

    const images = importAllImages(require.context('../../assets/img/gallery', false, /\.(png|jpe?g|svg)$/))
    const albumRef = useRef([])
    const navigate = useNavigate()

    const [position, setPosition] = useState(1)
    const [touchStart, setTouchStart] = useState(null)
    const [touchEnd, setTouchEnd] = useState(null)
    const [albumGrid, setAlbumGrid] = useState(null)

    window.onkeyup = (e) => {
        e.key == "ArrowLeft" && backImg()
        e.key == "ArrowRight" && nextImg()
    }

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (touchStart === null || touchEnd === null) return

        const distance = touchStart - touchEnd
        const threshold = 50

        if (Math.abs(distance) > threshold) {
            if (distance > threshold && position < Object.keys(images).length) {
                nextImg()
            } else if (distance < -threshold && position > 1) {
                backImg()
            }
        }

    }

    const nextImg = () => {
        setPosition(position + 1)
        navigate(`/album/${position + 1}`)
    }

    const backImg = () => {
        setPosition(position - 1)
        navigate(`/album/${position - 1}`)
    }

    useEffect(() => {
        if (id > 47) setPosition(47)
        else if (id < 1) setPosition(1)
        else setPosition(Number(id))
    }, [id])

    useEffect(() => {
        if (albumRef.current[position - 1]) {
            albumRef.current[position - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
    }, [position])

    return (
        <section className="album">
            <Link className="btn-back-invitation" to={'/'}><FontAwesomeIcon icon={faAngleLeft} /> Volver a invitación</Link>
            <button className="btn-grid-album" onClick={() => setAlbumGrid(!albumGrid)}><FontAwesomeIcon icon={faTableCellsLarge} /></button>
            {Object.keys(images).map((e, i) =>
                <div key={i} className="current-img-album">
                    <div
                        className="container-img"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        ref={el => albumRef.current[i] = el}
                    >
                        <img src={images[e]} loading="lazy" />
                    </div>
                </div>
            )}
            <div className="btn-back-next-img">
                {position !== 1 ? <button onClick={backImg}><FontAwesomeIcon icon={faAngleLeft} /></button> : <div></div>}
                {position < Object.keys(images).length && <button onClick={nextImg}><FontAwesomeIcon icon={faAngleRight} /></button>}
            </div>
            {albumGrid && <AlbumGrid album={images} onClose={setAlbumGrid} />}
        </section>
    )
}
