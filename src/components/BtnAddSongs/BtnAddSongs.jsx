import { Link } from "react-router-dom";

import './BtnAddSongs.css'

export const BtnAddSongs = () => <Link className="btn-add-songs" to={'/playlist'}>Agregar canciones</Link>