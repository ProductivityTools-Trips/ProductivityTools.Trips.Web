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

async function deleteExpense(expenseId){
    const response=await axios.delete(`${config.PATH_BASE}/Expense/Delete?expenseId=${expenseId}`,)
    return response;
}


async function getCurrencyDictionary() {
    const response = await axios.get(`${config.PATH_BASE}/Dictionary/Currencies`)
    return response.data;
}

async function getCategoryDictionary() {
    const response = await axios.get(`${config.PATH_BASE}/Dictionary/Categories`)
    return response.data;
}

async function getJournal(journalId){
    const response=await axios.get(`${config.PATH_BASE}/Journal/Get?journalId=${journalId}`)
    return response.data;
}

async function getJournalList(tripId){
    const response=await axios.get(`${config.PATH_BASE}/Journal/GetForTrip?tripId=${tripId}`)
    return response.data;
}

async function addJournal(journal) {
    const response = await axios.post(`${config.PATH_BASE}/Journal/Add`, journal)
    return response.data;
}

async function updateJournal(journal) {
    const response = await axios.post(`${config.PATH_BASE}/Journal/Update`, journal)
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
    deleteExpense,
    getCurrencyDictionary,
    getCategoryDictionary,
    getJournal,
    getJournalList,
    addJournal,
    updateJournal
}

export default service;