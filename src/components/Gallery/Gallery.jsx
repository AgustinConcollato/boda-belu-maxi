import { useEffect, useState, useRef } from 'react'
import img1 from '../../assets/img/gallery/aimg1.jpg'
import img2 from '../../assets/img/gallery/aimg2.jpg'
import img3 from '../../assets/img/gallery/aimg3.jpg'
import img4 from '../../assets/img/gallery/aimg4.jpg'
// import img5 from '../../assets/img/gallery/aimg5.jpg'
import img6 from '../../assets/img/gallery/aimg6.jpg'
import img7 from '../../assets/img/gallery/aimg7.jpg'
import img8 from '../../assets/img/gallery/aimg8.jpg'
import img9 from '../../assets/img/gallery/aimg9.jpg'
import './Gallery.css'
import { Link } from 'react-router-dom'

const images = [img1, img2, img3, img4, img6, img7, img8, img9]

const Pagination = ({ totalItems, itemsPerPage, currentImg, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const currentPage = currentImg / itemsPerPage + 1

    const pageRefs = useRef([])

    const generatePageNumbers = () => {
        const pages = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
        return pages
    }

    useEffect(() => {
        const handleScroll = () => {
            const section = document.querySelector('.section6')
            if (section) {
                const sectionTop = section.getBoundingClientRect().top + window.scrollY
                const sectionBottom = sectionTop + section.clientHeight
                const windowHeight = window.innerHeight
                const scrollTop = window.scrollY || window.pageYOffset

                const isInViewport = (sectionTop >= scrollTop - 200) && (sectionBottom <= scrollTop + windowHeight + 200)

                if (isInViewport) {
                    const pageIndex = Math.floor(currentImg / itemsPerPage)
                    if (pageRefs.current[pageIndex]) {
                        pageRefs.current[pageIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                    }
                }
            }
        }

        handleScroll()

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [currentImg, itemsPerPage])

    return (
        <div className='pagination'>
            {generatePageNumbers().map(page => (
                <div
                    key={page}
                    ref={el => pageRefs.current[page - 1] = el}
                    className={page === currentPage ? 'active' : ''}
                >
                    <img
                        onClick={() => onPageChange((page - 1) * itemsPerPage)}
                        src={images[page - 1]}
                    />
                    {page === currentPage && <div className="time"></div>}
                </div>
            ))}
        </div>
    )
}

export const Gallery = () => {
    const [currentImg, setCurrentImg] = useState(0)
    const [intervalId, setIntervalId] = useState(null)

    const resetInterval = () => {
        if (intervalId) {
            clearInterval(intervalId)
        }
        const id = setInterval(() => {
            setCurrentImg(prevOffset => (prevOffset + 1) % images.length)
        }, 5000)
        setIntervalId(id)
    }

    useEffect(() => {
        resetInterval()
        return () => clearInterval(intervalId)
    }, [currentImg])

    const handlePageChange = (newOffset) => {
        setCurrentImg(newOffset)
    }

    return (
        <section className='section6'>
            <Link className='container-current-img' to={'/album/' + parseInt(currentImg + 1)}>
                <img className='current-img' src={images[currentImg]} loading="lazy" />
            </Link>
            <Pagination
                totalItems={images.length}
                itemsPerPage={1}
                currentImg={currentImg}
                onPageChange={handlePageChange}
            />
            <Link className='btn-primary' to={'/album/1'}>Ver álbum completo</Link>
        </section>
    )
}