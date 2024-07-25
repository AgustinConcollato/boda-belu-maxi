import { faCopy } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { icon4 } from "../../assets/icons/icons"
import './Gifts.css'

export const Gifts = () => {

    const [copy, setCopy] = useState(false)
    const alias = 'lunademiel.bym'

    const copyNumber = () => {
        navigator.clipboard.writeText(alias)
            .then(() => {
                setTimeout(() => setCopy(false), 5000)
                setCopy(true)
            })
            .catch((error) => {
                console.error('Error al copiar el código: ', error)
            })
    }

    return (
        <section className='section5 section7'>
            <div>
                {icon4}
                <h3>Regalos</h3>
                <p>Lo que más queremos es compartir con vos nuestro gran día, pero si quisieras ayudarnos con nuestra <span>luna de miel</span> podés transferirnos acá</p>
                <div className="container-alias">
                    <span>Alias: {alias}</span>
                    <button className="btn-primary" onClick={copyNumber} >{copy ? 'Copiado' : ' Copiar alias'} <FontAwesomeIcon icon={faCopy} /></button>
                </div>
            </div>
        </section>
    )
}