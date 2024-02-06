import { Link } from "react-router-dom"
import cardCss from "./card.module.css"
import noImage from "../../assets/No_Image_Available.jpg"
import isCounty from "../../utils/isCounty"

export default function Card({id, name, media, rating, location: { country }}) {

    const displayCountry = isCounty(country) ? country.trim() : ''
    const displayRating = `${rating}/5 ⭐`

    return (
    <Link key={id} className={cardCss.container} to={`venue/${id}`}>
        {
            media[0] 
            ? <img src={media[0]} alt="" className={cardCss.image} />
            : <img src={noImage} alt="no image is available for this location" className={cardCss.image} />
        }
        <span className={cardCss.name}>{name}</span>
        <span className={cardCss.country}>{displayCountry}</span>
        <span className={cardCss.rating}>{displayRating}</span>
    </Link>
    )
}