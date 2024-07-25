import { Link } from "react-router-dom";
import { icon5 } from "../../assets/icons/icons";

export const AddSong = () => {


    return (
        <section className='section7'>
            <div>
                {icon5}
                <h3>No es una fiesta si no suena....</h3>
                <p>¿Qué tema no puede faltar en nuestra fiesta? ¡Ayúdanos a armar la lista!</p>
                <Link className='btn-primary' to="/playlist" >añadir tema</Link>
            </div>
        </section>
    )
}