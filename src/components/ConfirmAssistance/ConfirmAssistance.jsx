import { icon3 } from '../../assets/icons/icons'
import './ConfirmAssistance.css'

export const ConfirmAssistance = () => {
    return (
        <section className='section5'>
            <div>
                {icon3}
                <h3>¿Nos acompañas?</h3>
                <div>
                    <h5>Valor de la tarjeta</h5>
                    <p>Mayores: $57.000</p>
                    <p>Menores de 10 años no pagan</p>
                </div>
                <p>
                    Fecha límite para confirmar: 30/09
                    <br />
                    Fecha límite de pago: 7/10
                </p>
                <a className='btn-primary'>confirmar asistencia</a>
            </div>
        </section>
    )
}