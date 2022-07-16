import axios from 'axios'
import { config } from '../config.js'


async function getDate() {
    const response = await axios.get(`${config.PATH_BASE}/Trip/Date`)
    return response.data;
}

async function addTrip(trip) {
    const response = await axios.post(`${config.PATH_BASE}/Trip/Add`, trip)
    return response.data;
}

async function getTrips() {
    const response = await axios.get(`${config.PATH_BASE}/Trip/List`)
    return response.data;
}

async function getTripsFullView() {
    const response = await axios.get(`${config.PATH_BASE}/Trip/FullView`)
    return response.data;
}

async function getTrip(id) {
    const response = await axios.get(`${config.PATH_BASE}/Trip/Get?id=${id}`)
    return response.data;
}

async function saveTrip(trip) {
    const response = await axios.post(`${config.PATH_BASE}/Trip/Save`, trip)
}

async function getExpense(id) {
    const response = await axios.get(`${config.PATH_BASE}/Expense/Get?id=${id}`);
    return response.data
}

async function getTripCurrency(id) {
    const response = await axios.get(`${config.PATH_BASE}/Currency/GetForTrip?tripId=${id}`)
    return response.data;
}

async function saveTripCurrency(tripCurrency) {
    const response = await axios.post(`${config.PATH_BASE}/Currency/AddCurrency`, tripCurrency)
    return response.data;
}

async function getExpenses(id) {
    const response = await axios.get(`${config.PATH_BASE}/Expense/GetList?tripId=${id}`);
    return response.data
}

async function getExpenseFullView(id) {
    const response = await axios.get(`${config.PATH_BASE}/Expense/GetFullView?tripId=${id}`);
    return response.data
}


async function saveExpense(expense) {
    const response = await axios.post(`${config.PATH_BASE}/Expense/Save`, expense)
}

async function addExpense(expense) {
    const response = await axios.post(`${config.PATH_BASE}/Expense/Add`, expense)
}


async function getCurrencyDictionary() {
    const response = await axios.get(`${config.PATH_BASE}/Dictionary/Currencies`)
    return response.data;
}

async function getCategoryDictionary() {
    const response = await axios.get(`${config.PATH_BASE}/Dictionary/Categories`)
    return response.data;
}

const service = {
    getDate,
    addTrip,
    getTrips,
    getTrip,
    getTripsFullView,
    saveTrip,
    getTripCurrency,
    saveTripCurrency,
    getExpenses,
    getExpenseFullView,
    getExpense,
    saveExpense,
    addExpense,
    getCurrencyDictionary,
    getCategoryDictionary
}

export default service;