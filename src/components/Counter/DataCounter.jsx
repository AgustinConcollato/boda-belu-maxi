import { useEffect, useRef, useState } from "react"

export const DataCounter = ({ data }) => {

    const [number, setNumber] = useState([0, 0, 0])


    useEffect(() => {

        if (data !== undefined) {
            const a = data > 9 ? data : '0' + data
            setNumber(a.toString().split(''))
        }
    }, [data])

    return (
        <>
            <span>
                <Number a={false} num={number[0]} />
                <Number a={true} num={number[1]} />
                <Number a={false} num={number[2]} />
            </span>
        </>
    )
}

const Number = ({ num, a }) => {

    const ref = useRef()

    useEffect(() => {

        const classanimation = a ? 'changeNumber1' : 'changeNumber2'

        ref.current.classList.add(classanimation)

        setTimeout(() => {
            ref.current?.classList.remove(classanimation)
        }, 900)

    }, [num])



    return (
        <>
            <p ref={ref}>{num}</p>
        </>
    )

}
