import { Link } from "react-router-dom"
import cardCss from "./card.module.css"

import isCountry from "../../utils/isCountry"
import Rating from "../Rating"
import Image from "../Image"

export default function Card({id, name, media, rating, location: { country }}) {

    const displayCountry = isCountry(country) ? country.trim() : ''

    return (
    <Link key={id} className={cardCss.container} to={`venue/${id}`}>
        <Image src={media[0]} className={cardCss.image}/>
        <span className={cardCss.name}>{name}</span>
        <span className={cardCss.country}>{displayCountry}</span>
        <Rating givenRating={rating} className={cardCss.rating}/>
    </Link>
    )
}