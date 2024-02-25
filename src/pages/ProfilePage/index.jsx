import { shallow } from "zustand/shallow"
import { useEffect, useRef, useState } from 'react'
import { Link } from "react-router-dom"

import cssProfilePage from "./profilePage.module.css"

import useUserStore from "../../stores/useUserStore/index.js"
import useManageVenueStore from "../../stores/useManageVenueStore/index.js"
import noProfile from "../../assets/no_profile.svg"
import wrench from "../../assets/wrench.svg"
import Rating from "../../components/Rating/index.jsx"
import ImgCarusel from "../../components/imgCarusel/index.jsx";
import VenueModal from "../../components/Forms/venueModal/index.jsx";
import ProfileModule from "../../components/Forms/profileModule/index.jsx";

export default () => {
    const ProfileModuleRef = useRef(null)
    const venueModuleRef = "venueModuleMain"
    const [venueCardError, setVenueCardError] = useState({})
    
    const { avatar, name, email, venueManager, refreshUserData, venues, bookings } = useUserStore((state) => ({
        avatar: state.avatar,
        name: state.name,
        email: state.email,
        venueManager: state.venueManager,
        refreshUserData: state.refreshUserData,
        venues: state.venues,
        bookings: state.bookings
    }), shallow)

    const { deleteVenue } = useManageVenueStore(state => ({
        deleteVenue: state.deleteVenue,
    }), shallow)
   
    useEffect(() => {
        document.title = 'Holidaze - Profile page';
        refreshUserData()
    }, [])

    return (
        <>
            <h1 hidden>Profile Page</h1>
            <section className={cssProfilePage.container}>
                <h2 hidden>profile information</h2>
                <div className={cssProfilePage.profileInformation}>
                    <div className={cssProfilePage.profilePicture}>
                        {
                            avatar === null || avatar === ''
                            ?   (<img src={noProfile} alt="you currently have no profile picture" />)
                            :   (<img src={avatar} alt="your profile picture" />)
                        }
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>user name:</td>
                                <td>{name}</td>
                            </tr>
                            <tr>
                                <td>email:</td>
                                <td>{email}</td>
                            </tr>
                            <tr className={cssProfilePage.table_row_venue_manager}>
                                <td>venue manager:</td>
                                <td>{venueManager ? 'Yes' : 'No'}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className={cssProfilePage.changeTool} onClick={() => ProfileModuleRef.current?.showModal()}>
                        <img src={wrench} alt="change image" />
                    </button>
                </div>
                <ProfileModule ref={ProfileModuleRef} />
            </section>
            
            <div className={cssProfilePage.section} style={{"--numberOfRows": `${(bookings.length > venues.length ? bookings.length : venues.length) + 1}`}}>
                { venueManager 
                    ? (<section>
                            <div className={cssProfilePage.venueListTitle} style={{display: "flex", justifyContent: "space-between"}}>
                                <h2>Your venues</h2>
                                <button  className={`primary ${cssProfilePage.venueListTitle_button}`} onClick={() => document.getElementById(venueModuleRef).showModal()}>create venue</button>
                            </div>
                            {venues.map(venue => {
                                const errorMessage = venueCardError[venue.id]
                                const venueCardModuleId = `venueModuleCard${venue.id}`
                            
                                return (
                                    <div key={venue.id} className={cssProfilePage.card}>
                                        <span className={`${cssProfilePage.error} ${errorMessage ? cssProfilePage.hasError : ''}`}>{errorMessage}</span>
                                        <Link to={`/venue/${venue.id}`} className={cssProfilePage.innerCard}>
                                            <ImgCarusel images={venue.media} classNames={cssProfilePage.cardImg}/>
                                            <div>
                                                <h3>{venue.name}</h3>
                                                <span>price per day: ${venue.price}</span>
                                                <Rating givenRating={venue.rating} className={cssProfilePage.cardRating} />
                                            </div>
                                        </Link>
                                        <VenueModal id={venueCardModuleId} venue={venue} />
                                        <div className={cssProfilePage.buttonDiv}>
                                            <button onClick={() => document.getElementById(venueCardModuleId).showModal()} >edit</button>
                                            <button className={cssProfilePage.delBtn} onClick={() => deleteVenue(venue.id, (message) => setVenueCardError({...venueCardError, [venue.id]: message}))}>delete</button>
                                        </div>
                                    </div>
                                )
                            })}
                            <VenueModal id={venueModuleRef} />
                        </section>) 
                    : (<></>)}
                    <section>
                    <h2>Your bookings</h2>
                    {bookings.map(booking => {
                        const {id, guests, dateFrom, dateTo, venue: {media: images, name: venueName, price: basePrice}} = booking
                        const price = basePrice * guests
                        const displayDateFrom = new Date(dateFrom).toDateString().split(' ').slice(1).join(' ')
                        const displayDateTo = new Date(dateTo).toDateString().split(' ').slice(1).join(' ')

                        return (
                            <div key={id} className={cssProfilePage.card}>
                                <div className={cssProfilePage.innerCard}>
                                    <ImgCarusel images={images} classNames={cssProfilePage.cardImg}/>
                                    <div>
                                        <h3>{venueName}</h3>
                                        <span>price per day: ${price}</span>
                                        <span className={cssProfilePage.cardDates} >From: {displayDateFrom}, To: {displayDateTo}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </section>
            </div>
        </>
    )
}