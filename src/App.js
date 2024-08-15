import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { icon6, iconDivisor } from './assets/icons/icons'
import img6 from './assets/img/img6.jpg'
import { AddSong } from './components/AddSong/AddSong'
import { ConfirmAssistance } from './components/ConfirmAssistance/ConfirmAssistance'
import { Counter } from './components/Counter/Counter'
import { Date } from './components/Date/Date'
import { Events } from './components/Events/Events'
import { Gallery } from './components/Gallery/Gallery'
import { Gifts } from './components/Gifts/Gifts'
import { Hero } from './components/Hero/Hero'
import { Playlist } from './components/Playlist/Playlist'
import { ViewPlaylist } from './components/ViewPlaylist/ViewPlaylist'
import { PlaylistProvider } from './context/PlaylistContext'

import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { Album } from './components/Album/Album'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "boda-belu-maxi.firebaseapp.com",
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: "boda-belu-maxi.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)


export const App = () => {

    const platform = navigator.userAgentData.mobile

    useEffect(() => {
        document.fonts.ready.then(function () {
            document.body.style.opacity = 1
        })
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/*' element={
                    <>
                        <Hero />
                        <Date />
                        <Counter />
                        <Events />
                        <ConfirmAssistance />
                        <Gallery />
                        <Gifts />
                        <AddSong />
                        <section className='section7'>
                            <div>
                                {icon6}
                                <h3>Subí las fotos de los momentos compartidos</h3>
                                <a className='btn-primary' href="https://drive.google.com/drive/folders/1dKB-lbbhzYUYIlEJcaeKTnq8T2SXUK5b?usp=sharing" target="_blank" rel="noopener noreferrer">subir foto</a>
                            </div>
                        </section>
                        <section className='section8'>
                            <h4>¡Esperamos verte ahi!</h4>
                            <h4>Belu y Maxi</h4>
                            <img src={img6} />
                            {iconDivisor}
                        </section>
                        <footer>
                            <div>
                                {platform
                                    ? <Link rel="noopener noreferrer" to="whatsapp://send?phone=+543492417924" data-action="share/whatsapp/share">
                                        <FontAwesomeIcon icon={faWhatsapp} />
                                    </Link>
                                    : <Link target="_blank" rel="noopener noreferrer" to="https://web.whatsapp.com/send?&amp;phone=+543492417924">
                                        <FontAwesomeIcon icon={faWhatsapp} />
                                    </Link>
                                }
                                <Link target="_blank" rel="noopener noreferrer" to="https://www.instagram.com/conco.soluciones.web/">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </Link>
                            </div>
                            <p>Hecho por <a href='https://concosw.netlify.app' target="_blank" rel="noopener noreferrer">Conco Soluciones Web</a></p>
                        </footer>
                    </>
                }
                />
                <Route path='/playlist/*' element={
                    <PlaylistProvider>
                        <Playlist />
                    </PlaylistProvider>
                } />
                <Route path={'/playlist/boda-belu-maxi'} element={
                    <PlaylistProvider>
                        <ViewPlaylist />
                    </PlaylistProvider>
                } />
                <Route path='/album/:id' element={<Album />} />
            </Routes>
        </BrowserRouter>
    )
}