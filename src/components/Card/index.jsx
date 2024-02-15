import { Link } from "react-router-dom"
import cardCss from "./card.module.css"

import isCounty from "../../utils/isCounty"
import ImgCarusel from "../imgCarusel"

export default function Card({id, name, media, rating, location: { country }}) {

    const displayCountry = isCounty(country) ? country.trim() : ''
    const displayRating = `${rating}/5 ⭐`

    return (
    <Link key={id} className={cardCss.container} to={`venue/${id}`}>
        <ImgCarusel images={media} classNames={cardCss.image} carousel={false}/>
        <span className={cardCss.name}>{name}</span>
        <span className={cardCss.country}>{displayCountry}</span>
        <span className={cardCss.rating}>{displayRating}</span>
    </Link>
    )
}