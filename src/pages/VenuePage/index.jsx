import { useParams } from "react-router-dom"

import useUserStore from "../../stores/useUserStore/index.js"
import useCreateBookingStore from  "../../stores/useCreateBookingStore/index.js"
import useCurrentVenueStore from "../../stores/useCurrentVenueStore/index.js"

import { useEffect, useState } from "react"
import { shallow } from "zustand/shallow"
import ImgCarusel from "../../components/imgCarusel/index.jsx"
import cssVenuePage from "./venuePage.module.css"
import Calendar from "../../components/Calendar/index.jsx"
import Rating from "../../components/Rating/index.jsx"
import noPageImg from "../../assets/404_error_img.jpeg"

export default () => {
    const { venueId } = useParams()

    const { name, description, media, price, maxGuests, hasWifi, hasParking, servesBreakfast, allowsPets, address, loadVenue, venueNotFound, fetchError, ownerName, bookings } = useCurrentVenueStore(
        (state) => ({
            name: state.name,
            description: state.description,
            media: state.media,
            price: state.price,
            maxGuests: state.maxGuests,
            hasWifi: state.hasWifi,
            hasParking: state.hasParking,
            servesBreakfast: state.servesBreakfast,
            allowsPets: state.allowsPets,
            address: state.address,
            loadVenue: state.loadVenue,
            venueNotFound: state.venueNotFound,
            fetchError: state.fetchError,
            ownerName: state.ownerName,
            bookings: state.bookings,
        }),
        shallow
    )
    const { setVenueIdForBooking, clearBooking, setGuestNumberForBooking, numberOfGuests, numberOfDates, createABooking, bookingErrors } = useCreateBookingStore(state => ({
            setVenueIdForBooking: state.setVenueId,
            clearBooking: state.clearBooking,
            setGuestNumberForBooking: state.setGuests,
            numberOfGuests: state.guests,
            numberOfDates: state.numberOfDates,
            createABooking: state.createABooking,
            bookingErrors: state.bookingErrors
        }),
        shallow
    )

    const {isLoggedIn, username} = useUserStore(state => ({
            isLoggedIn: state.isLoggedIn,
            username: state.name
        }),
        shallow
    )
    
    useEffect(() => {document.title = `Holidaze - Venue: ${name}`}, [])

    useEffect(() => {
        clearBooking()
        loadVenue(venueId)
        setVenueIdForBooking(venueId)
    }, [ venueId ])

    const [totalPrice, setTotalPrice] = useState(0)
    useEffect(() => {
        setTotalPrice( price * numberOfGuests * numberOfDates )
    }, [ price, numberOfGuests, numberOfDates ])

    return venueNotFound 
    ? (<img className="notFoundImg" src={noPageImg} alt={fetchError} />) 
    : (
        <section className={cssVenuePage.container}>
            <div className={cssVenuePage.titleArea}>
                <h1>{name}</h1>
                <Rating/>
            </div>
            <ImgCarusel images={media} classNames={cssVenuePage.img}/>
            { 
                username === ownerName
                ? (
                    <div className={cssVenuePage.bookings}>
                        <h2>Bookings</h2>
                        {
                            bookings.length >= 1
                            ?   bookings.map(({dateFrom, dateTo, guests}) => {
                                    if (new Date().valueOf() > new Date(dateTo).valueOf()) {
                                        return
                                    }

                                    return (
                                        <div className={cssVenuePage.bookingCard}>
                                            <span>Guests: {guests}</span>
                                            <span>Arrival: {new Date(dateFrom).toLocaleDateString()}</span>
                                            <span>Departure: {new Date(dateTo).toLocaleDateString()}</span>
                                        </div>
                                    )
                                })
                            : (<div className={cssVenuePage.noBookingsCard}>There are currently no bookings for this venue</div>)
                        }
                    </div>
                )
                : (
                    <div className={cssVenuePage.order}>
                        <Calendar></Calendar>
                        <div className={cssVenuePage.numberOfGuests}>
                            <label htmlFor="numberOfGuests">How many people:</label>
                            <select name="numberOfGuests" id="numberOfGuests" onChange={({target: {value}}) => {setGuestNumberForBooking(Number(value))}}>
                            {
                                Array.apply(null, Array(maxGuests)).map((_, index) => (<option key={index} value={index + 1} default={index === 0}>{index + 1} person</option>))
                            }
                            </select>
                        </div>
                        <div className={cssVenuePage.priceAndButton}>
                            <span>Total: ${totalPrice}</span>
                            <button className="primary" disabled={!isLoggedIn} onClick={createABooking}>Book a room</button>
                        </div>
                        {bookingErrors? (<span>{bookingErrors}</span>): (<></>)}
                    </div>
                )
            }
            <div className={cssVenuePage.desc}>
                <h2>Description</h2>
                <p>{description}</p>
            </div>
            <table className={cssVenuePage.infoTable}>
                <tbody>
                    {   address !== "" && (
                            <tr>
                                <td>Address</td>
                                <td>{address}</td>
                            </tr>
                        )
                    }
                    <tr>
                        <td>Wifi</td>
                        <td>
                            {hasWifi ? (<span>Available</span>) : (<span>Not available</span>)}
                        </td>
                    </tr>
                    <tr>
                        <td>Parking</td>
                        <td>
                            {hasParking ? (<span>Available</span>) : (<span>Not available</span>)}
                        </td>
                    </tr>
                    <tr>
                        <td>Breakfast</td>
                        <td>
                            {servesBreakfast ? (<span>Available</span>) : (<span>Not available</span>)}
                        </td>
                    </tr>
                    <tr>
                        <td>Pets</td>
                        <td>
                            {allowsPets ? (<span>Allowed</span>) : (<span>Not allowed</span>)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}