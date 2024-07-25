import { useState, useEffect } from "react";
import './Counter.css';
import { DataCounter } from "./DataCounter";

export const Counter = () => {
    const [days, setDays] = useState()
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()


    useEffect(() => {
        const eventDate = new Date('2024-10-19T20:00:00').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime()
            const difference = eventDate - now

            const days = Math.floor(difference / (1000 * 60 * 60 * 24))
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((difference % (1000 * 60)) / 1000)

            setDays(days)
            setHours(hours)
            setMinutes(minutes)
            setSeconds(seconds)

            if (difference < 0) {
                clearInterval(interval)
                setDays(0)
                setHours(0)
                setMinutes(0)
                setSeconds(0)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <section className='section3'>
            <h4>faltan</h4>
            <div className='day-counter'>
                <div>
                    <DataCounter data={days} />
                    <span>días</span>
                </div>

                <div>
                    <pre>:</pre>
                </div>
                <div>
                    <DataCounter data={hours} />
                    <span>horas</span>
                </div>

                <div>
                    <pre>:</pre>
                </div>
                <div>
                    <DataCounter data={minutes} />
                    <span>minutos</span>
                </div>


                <div>
                    <pre>:</pre>
                </div>
                <div>
                    <DataCounter data={seconds} />
                    <span>segundos</span>
                </div>

            </div>
            <h4>para el ¡Si quiero!</h4>
        </section>
    );
};
