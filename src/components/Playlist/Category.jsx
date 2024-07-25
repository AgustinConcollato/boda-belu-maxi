import { Link } from "react-router-dom"

export const Category = ({ e }) => {
    return (
        <li className="category">
            <Link to={`/playlist/${e.id}?name=${e.name}&search=category&url=${e.icons[0].url}`}>
                <img src={e.icons[0].url} alt={`${e.name} icon`} />
                <span>{e.name}</span>
            </Link>
        </li>
    )
}