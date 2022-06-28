import axios from 'axios'
import {config} from '../config.js'


async function getDate(){
    const response=await axios.get(`${config.PATH_BASE}/Trip/Date`)
    return response.data;
}

const service={
    getDate
}

export default service;