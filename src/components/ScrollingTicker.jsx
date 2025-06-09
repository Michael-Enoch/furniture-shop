import { useEffect, useState } from "react";

const Ticker = () =>{
      
    
  let currentDateTime = new Date()

  let Current = {
    year : currentDateTime.getFullYear(),
    month: currentDateTime.getMonth(),
    day: currentDateTime.getDay(),
    hours: currentDateTime.getHours(),
    minutes: currentDateTime.getMinutes(),
    seconds: currentDateTime.getSeconds()
  }
  let convertedHr = Current.hours > 12 ? Current.hours - 12 : Current.hours
  let AMOrPM = convertedHr >= 12 ? 'AM' : 'PM'
  let convertedMins = Current.minutes < 10 ? '0' + Current.minutes : Current.minutes
  let convertedSecs = Current.seconds < 10 ? '0' + Current.seconds : Current.seconds

  let currentTime = convertedHr + ' ' + AMOrPM + ' '+ ':' + ' ' + convertedMins + ' ' + ':' + ' ' + convertedSecs

  let dayOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  let monthOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
    
    const [location, setLocation] = useState({Latitude : null, Longitude : null});
    const [error, setError] = useState(null)
    
    const getLocation = () => {
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(
            (position) =>{
              const lat = position.coords.latitude
              const long = position.coords.longitude
              setLocation({Latitude: lat, Longitude : long })
            },
            (err) =>{
              setError(err.message);
            }
          )
        }else{
            setError('Geolocation is not supoported by this brower.')
        }

    }

    useEffect(()=>{
      getLocation();
    }, []);

    return(
        <>
        <section>
           <div className="px-20 py-6 bg-black">
              <span className='flex gap-4 animate-scroll'>
                <p className='text-xl text-white'>
                {
                `Date : ${dayOfWeek[Current.day]} , 
                ${monthOfYear[Current.month]} ${Current.year} . 
                  Time : ${currentTime}`
                }
              </p>
              <p className='text-xl text-white'>
              {
                error ? {error} :
                `Location : n/latitude : ${location.Latitude} , n/longitude : ${location.Longitude}`
              }
              </p>
              </span>
            </div>
        </section>
        </>
    )
}

export default Ticker