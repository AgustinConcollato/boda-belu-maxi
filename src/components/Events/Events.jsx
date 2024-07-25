import { icon1, icon2, iconDivisor } from "../../assets/icons/icons"
import './Events.css'

export const Events = () => {

    return (
        <section className='section4'>
            <div>
                <div className='color1'></div>
                <div className='color3'></div>
                <div className='ceremony'>
                    {icon1}
                    <h3>Ceremonia Religiosa</h3>
                    <p>
                        <span>Hora</span>
                        20:00
                    </p>
                    <p>
                        <span>Lugar</span>
                        Catedral San Rafael
                    </p>
                    <a className="btn-primary" href="https://www.google.com/maps/place/Catedral+San+Rafael/@-31.2538558,-61.4943597,17z/data=!3m1!4b1!4m6!3m5!1s0x95caae37f4ad98e7:0x70298b01c7633f9e!8m2!3d-31.2538604!4d-61.4917848!16s%2Fg%2F1hc0sxzqw?entry=ttu" target="_blank" rel="noopener noreferrer">ver ubicación</a>
                </div>
                <div className="divisor">
                    <div></div>
                    {iconDivisor}
                    <div></div>
                </div>
                <div className='celebration'>
                    {icon2}
                    <h3>Celebración</h3>
                    <p>
                        <span>Hora</span>
                        21:00
                    </p>
                    <p>
                        <span>Lugar</span>
                        Tipuana Tipu
                    </p>
                    <a className="btn-primary" href="https://www.google.com/maps/place/Tipuana+Tipu/@-31.2590845,-61.4668876,17z/data=!3m1!4b1!4m6!3m5!1s0x95caaf01a843c1ef:0xbdfa35e2b3fae283!8m2!3d-31.2590891!4d-61.4643127!16s%2Fg%2F11f0kxn8fv?entry=ttu" target="_blank" rel="noopener noreferrer">ver ubicación</a>
                </div>
            </div>
        </section>
    )
}