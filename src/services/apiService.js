import axios from 'axios'
import {config} from '../config.js'


async function getDate(){
    const response=await axios.get(`${config.PATH_BASE}/Trip/Date`)
    return response.data;
}

async function getTrips(){
    const response=await axios.get(`${config.PATH_BASE}/Trip/List`)
    return response.data;
}

async function getTrip(id){
    const response=await axios.get(`${config.PATH_BASE}/Trip/Get?id=${id}`)
    return response.data;
}

const service={
    getDate,
    getTrips,
    getTrip
}

export default service;