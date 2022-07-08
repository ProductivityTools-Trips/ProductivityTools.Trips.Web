import axios from 'axios'
import { config } from '../config.js'


async function getDate() {
    const response = await axios.get(`${config.PATH_BASE}/Trip/Date`)
    return response.data;
}

async function getTrips() {
    const response = await axios.get(`${config.PATH_BASE}/Trip/List`)
    return response.data;
}

async function getTrip(id) {
    const response = await axios.get(`${config.PATH_BASE}/Trip/Get?id=${id}`)
    return response.data;
}

async function saveTrip(trip) {
    const response = await axios.post(`${config.PATH_BASE}/Trip/Save`, trip)
}

async function getExpenses(id){
    const response=await axios.get(`${config.PATH_BASE}/Expense/GetList?tripId=${id}`);
    return response.data
}

async function getExpense(id){
    const response=await axios.get(`${config.PATH_BASE}/Expense/Get?id=${id}`);
    return response.data
}

async function saveExpense(trip) {
    const response = await axios.post(`${config.PATH_BASE}/Expense/Save`, trip)
}

async function getCurrencyDictionary(){
    const response=await axios.get(`${config.PATH_BASE}/Dictionary/Currencies`)
    return response.data;
}

async function getCategoryDictionary(){
    const response=await axios.get(`${config.PATH_BASE}/Dictionary/Categories`)
    return response.data;
}

const service = {
    getDate,
    getTrips,
    getTrip,
    saveTrip,
    getExpenses,
    getExpense,
    saveExpense,
    getCurrencyDictionary,
    getCategoryDictionary
}

export default service;