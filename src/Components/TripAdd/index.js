// import { useState } from "react";
// import service from "../../services/apiService";
// import { useNavigate } from 'react-router-dom'

// import moment from 'moment';


// import TextField from '@mui/material/TextField';
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// moment.locale('en', { week: { dow: 1 } })

// function TripAdd() {

//     const [trip, setTrip] = useState({ start: moment().format('yyyy-MM-DD'), end: moment().format('yyyy-MM-DD') });
//     const navigate = useNavigate();


//     const handleChange = (e) => {
//         console.log(e);
//         const { name, value } = e.target;
//         console.log(name);
//         console.log(value);
//         setTrip(prevState => ({
//             ...prevState, [name]: value
//         }))

//         console.log(trip);
//     }


//     const addTrip = async () => {
//         await service.addTrip(trip);
//         navigate('/', { replace: true })
//     }

//     const calculateDays = async (s1, e1) => {

//         // let s = moment(trip.start)
//         // console.log('start', s);
//         // console.log(s1);
//         // let e = moment(trip.end)
//         // console.log('end', e);
//         // console.log(e1);
//         let n = e1.diff(s1, 'days');
//         let d = n + 1;

//         console.log('dff', d);
//         setTrip(prevState => ({
//             ...prevState, 'days': d
//         }))
//         setTrip(prevState => ({
//             ...prevState, 'nights': n
//         }))
//         console.log(trip);
//     }


//     return (
//         <div>
//             <p><TextField label="Trip Name" name="name" value={trip && trip.name || ''} onChange={handleChange}></TextField></p>
//             <LocalizationProvider dateAdapter={AdapterMoment}>
//                 <p><DatePicker
//                     label="From"
//                     value={trip.start}
//                     inputFormat='yyyy.MM.DD'
//                     onChange={(newValue) => {
//                         console.log(newValue.format());
//                         setTrip(prevState => ({
//                             ...prevState, start: newValue.format('yyyy-MM-DD')
//                         }));

//                         calculateDays(newValue, trip.end);

//                     }}
//                     renderInput={(params) => <TextField {...params} />}
//                 /></p>
//                 <p><DatePicker
//                     label="To"
//                     value={trip.end}
//                     inputFormat='yyyy.MM.DD'
//                     onChange={(newValue) => {
//                         console.log(newValue.format());
//                         setTrip(prevState => ({
//                             ...prevState, end: newValue.format('yyyy-MM-DD')
//                         }));
//                         console.log(trip);
//                         calculateDays(trip.start, newValue);
//                     }}
//                     renderInput={(params) => <TextField {...params} />}
//                 />
//                 </p>
//             </LocalizationProvider>
//             <p><TextField label="Days" type="number" name="days" onChange={handleChange} value={trip.days || 0}></TextField></p>
//             <p><TextField label="Nights" type="number" name="nights" onChange={handleChange} value={trip.nights || 0}></TextField></p>
//             <input type="button" value="Add" onClick={addTrip}></input>
//         </div>
//     )
// }

// export default TripAdd;