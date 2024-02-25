import starFull from "../../assets/star_full.svg"
import starEmpty from "../../assets/star_empty.svg"

import cssRating from "./rating.module.css"
import useCurrentVenueStore from "../../stores/useCurrentVenueStore"

export default function Rating({className, givenRating}) {

    const rating = givenRating ? givenRating : useCurrentVenueStore(state => state.rating)

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