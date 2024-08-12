import img5celular from '../../assets/img/img5celular.jpg'
import img5compu from '../../assets/img/img5compu.jpg'
import './Hero.css'

export const Hero = () => {

    const platform = navigator.userAgentData.mobile

    return (
        <section className='section-hero'>
            <div className='container-img5'>
                <img src={platform ? img5celular : img5compu} />
                <div className="background-fade"></div>
            </div>
            <section className='section1'>
                <h1>
                    <span>¡nos casamos!</span>
                    Belu y Maxi
                </h1>
                <p className='efisios'>"y los dos se convertirán en uno sólo" <span>Efesios 5:31</span></p>
                <p>Queremos invitarte a compartir la alegría de unir nuestras vidas...</p>
            </section>
        </section>
    )
}