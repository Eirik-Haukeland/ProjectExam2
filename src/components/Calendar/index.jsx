import { DateRange } from 'react-date-range'; // date picker
import 'react-date-range/dist/styles.css'; // main css file for date picker
import 'react-date-range/dist/theme/default.css'; // theme css file for date picker

import useCreateBookingStore from  "../../stores/useCreateBookingStore/index.js"
import useCurrentVenueStore from '../../stores/useCurrentVenueStore/index.js';
import { useEffect, useState } from "react";

function earliestAvailableDate(notAvailableDates) {
  //not available dates in order first to latest
  const sortedDates = notAvailableDates.map((date) => date.toISOString().split('T')[0]).sort()
  const returnDate = new Date()
  // you can't make a booking for today
  returnDate.setUTCDate(returnDate.getUTCDate() + 1);

  for (let i = 0; i < sortedDates.length + 1; i++) {   
    if (!(sortedDates.includes(returnDate.toISOString().split('T')[0]))) {
      break
    }

    // https://stackoverflow.com/questions/9989382/how-can-i-add-1-day-to-current-date
    returnDate.setUTCDate(returnDate.getUTCDate() + 1);
  }

  return returnDate
}

export default function Calendar({className}) {
  const setDates = useCreateBookingStore(state => state.setDates)
  const bookedDates = useCurrentVenueStore(state => state.bookingDates)
  let earliestAvailable = earliestAvailableDate(bookedDates)

  const [ranges, setRanges] = useState([{
    startDate: earliestAvailable,
    endDate: earliestAvailable,
    key: 'selection'
  }])

  function updateCalendar(datesObj) {
    setRanges([{
      startDate: datesObj.startDate,
      endDate: datesObj.endDate,
      key: 'selection'
    }])

    setDates({
      dateFrom: datesObj.startDate,
      dateTo: datesObj.endDate
    })
  }

  useEffect(() => {
    earliestAvailable = earliestAvailableDate(bookedDates)
    setRanges([{
      startDate: earliestAvailable,
      endDate: earliestAvailable,
      key: 'selection'
    }])
  }, [bookedDates])

  return (
      <DateRange 
          editableDateInputs={true}
          onChange={item => updateCalendar(item.selection)}
          moveRangeOnFirstSelection={false}
          ranges={ranges}
          minDate={earliestAvailable}
          disabledDates={bookedDates}
          className={className}
      />)  
}
