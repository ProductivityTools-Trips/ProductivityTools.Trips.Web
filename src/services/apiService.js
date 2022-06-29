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

const service={
    getDate,
    getTrips
}

export default service;