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
                    <p>Mayores: $--.---</p>
                    <p>
                        Menores: $--.---
                        <span>(hasta 10 años)</span>
                    </p>
                </div>
                <p>Tenés tiempo para confirmar tu asistencia hasta el --/--</p>
                <a className='btn-primary' href="https://docs.google.com/forms/d/e/1FAIpQLScD1T94LdbbleRdzIGrROeFRGCDsqECI1GmT9Aj0K58MN-UnA/viewform" target="_blank" rel="noopener noreferrer">confirmar asistencia</a>
            </div>
        </section>
    )
}