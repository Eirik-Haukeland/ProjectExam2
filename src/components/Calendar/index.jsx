import { DateRange } from 'react-date-range'; // date picker
import 'react-date-range/dist/styles.css'; // main css file for date picker
import 'react-date-range/dist/theme/default.css'; // theme css file for date picker

import { useCurrentVenue, useNewBooking } from '../../store';
import { useState } from "react";

export default function Calendar({className}) {
    const today = new Date()
    const setDates = useNewBooking(state => state.setDates)
    const bookedDates = useCurrentVenue(state => state.bookingDates)

    const [ranges, setRanges] = useState([{
      startDate: today,
      endDate: today,
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

    return (<>
        <DateRange 
            editableDateInputs={true}
            onChange={item => updateCalendar(item.selection)}
            moveRangeOnFirstSelection={false}
            ranges={ranges}
            minDate={today}
            disabledDates={bookedDates}
            className={className}
        />
    </>)  
}
