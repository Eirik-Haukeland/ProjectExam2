import starFull from "../../assets/star_full.svg"
import starEmpty from "../../assets/star_empty.svg"
import { useCurrentVenue } from "../../store"
import cssRating from "./rating.module.css"

export default function Rating({className}) {

    const rating = useCurrentVenue(state => state.rating)

    return (
        <div aria-label={`${rating} of 5 stars`} className={`${className} ${cssRating.starContainer}`}>
            {
                [1, 2, 3, 4, 5].map((starNumber) => {
                    if (starNumber <= rating) {
                        return (
                            <img key={starNumber} src={starFull} alt=""/>
                        )
                    } else {
                        return (
                            <img key={starNumber} src={starEmpty} alt=""/>
                        )
                    }
                })
            }
        </div>
    )
}