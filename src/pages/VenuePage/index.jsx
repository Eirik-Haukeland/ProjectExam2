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
    const { id, name, description, media, price, maxGuests, rating, created, updated, hasWifi, hasParking, servesBreakfast, allowsPets, address, city, zip, country, continent, bookings, updateVenue } = useCurrentVenue(
        (state) => ({
            id: state.id,
            name: state.name,
            description: state.description,
            media: state.media,
            price: state.price,
            maxGuests: state.maxGuests,
            rating: state.rating,
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
            bookings: state.bookings
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
                <h1 >{name}</h1>
                <Rating/>
            </div>
            <ImgCarusel images={media} carousel={true} classNames={cssVenuePage.img}/>
            <div className={cssVenuePage.order}>
                <Calendar></Calendar>
                <select name="" id="" onChange={({target: {value}}) => setGuestNumberForBooking(Number(value))}>
                    {
                        Array(null, maxGuests).map((_, index) => {
                            return (<option key={index} value={index + 1} default={index === 0}>{index + 1} person</option>)
                        })
                    }
                </select>
                <div className={cssVenuePage.priceAndButton}>
                    <span>total: ${totalPrice}</span>
                    <button>book a room</button>
                </div>
            </div>
            <div className={cssVenuePage.desc}>
                <p>{description}</p>
                <div>
                    {hasWifi ? (<span>Wifi Awailable</span>) : (<></>)}
                    {hasParking ? (<span>Parking Awailable</span>) : (<></>)}
                    {servesBreakfast ? (<span>Serves Breakfast</span>) : (<></>)}
                    {allowsPets ? (<span>Pets Allowed</span>) : (<></>)}
                </div>
            </div>
        </section>
    )
}