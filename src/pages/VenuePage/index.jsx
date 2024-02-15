import { useParams } from "react-router-dom"
import { useCurrentVenue, useNewBooking } from "../../store.js"
import { useEffect, useState } from "react"
import { shallow } from "zustand/shallow"
import ImgCarusel from "../../components/imgCarusel/index.jsx"
import cssVenuePage from "./venuePage.module.css"
import Calendar from "../../components/Calendar/index.jsx"
import Rating from "../../components/Rating/index.jsx"


export default () => {
    const { venueId } = useParams()
    const { name, description, media, price, maxGuests, created, updated, hasWifi, hasParking, servesBreakfast, allowsPets, address, city, zip, country, continent, updateVenue } = useCurrentVenue(
        (state) => ({
            name: state.name,
            description: state.description,
            media: state.media,
            price: state.price,
            maxGuests: state.maxGuests,
            created: state.created,
            updated: state.updated,
            hasWifi: state.hasWifi,
            hasParking: state.hasParking,
            servesBreakfast: state.servesBreakfast,
            allowsPets: state.allowsPets,
            address: state.address,
            city: state.city,
            zip: state.zip,
            country: state.country,
            continent: state.continent,
            updateVenue: state.updateVenue,
        }),
        shallow
    )
    const { setVenueIdForBooking, clearBooking, setGuestNumberForBooking, numberOfGuests, numberOfDates } = useNewBooking(state => ({
            setVenueIdForBooking: state.setVenueId,
            clearBooking: state.clearBooking,
            setGuestNumberForBooking: state.setGuests,
            numberOfGuests: state.guests,
            numberOfDates: state.numberOfDates
        }),
        shallow
    )
    
    useEffect(() => {
        console.log(hasWifi, hasParking, servesBreakfast, allowsPets)
    }, [hasWifi, hasParking, servesBreakfast, allowsPets])

    useEffect(() => {
        clearBooking()
        updateVenue(venueId)
        setVenueIdForBooking(venueId)
    }, [ venueId ])

    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        setTotalPrice( price * numberOfGuests * numberOfDates )
    }, [ price, numberOfGuests, numberOfDates ])

    return (
        <section className={cssVenuePage.container}>
            <div className={cssVenuePage.titleArea}>
                <h1>{name}</h1>
                <Rating/>
            </div>
            <ImgCarusel images={media} carousel={true} classNames={cssVenuePage.img}/>
            <div className={cssVenuePage.order}>
                <Calendar></Calendar>
                <div className={cssVenuePage.numberOfGuests}>
                    <label htmlFor="numberOfGuests">How meny people:</label>
                    <select name="numberOfGuests" id="numberOfGuests" onChange={({target: {value}}) => {
                        console.log(value)
                        setGuestNumberForBooking(Number(value))
                    }}>
                        {
                            
                            Array(null, maxGuests).map((_, index) => (<option key={index} value={index + 1} default={index === 0}>{index + 1} person</option>))
                        }
                    </select>
                </div>
                <div className={cssVenuePage.priceAndButton}>
                    <span>total: ${totalPrice}</span>
                    <button className="primary">book a room</button>
                </div>
            </div>
            <div className={cssVenuePage.desc}>
                <h2>Description</h2>
                <p>{description}</p>
            </div>
            <table className={cssVenuePage.infoTable}>
                <tr>
                    <td>Wifi</td>
                    <td>
                        {hasWifi ? (<span>Awailable</span>) : (<span>Not Awailable</span>)}
                    </td>
                </tr>
                <tr>
                    <td>Parking</td>
                    <td>
                        {hasParking ? (<span>Awailable</span>) : (<span>Not Awailable</span>)}
                    </td>
                </tr>
                <tr>
                    <td>Breakfast</td>
                    <td>
                        {servesBreakfast ? (<span>Awailable</span>) : (<span>Not Awailable</span>)}
                    </td>
                </tr>
                <tr>
                    <td>Pets</td>
                    <td>
                        {allowsPets ? (<span>Allowed</span>) : (<span>Not Allowed</span>)}
                    </td>
                </tr>
            </table>
        </section>
    )
}