import axios from 'axios'
import { config } from '../config.js'
import * as wrapper from './apiServiceWrappers.js'


async function getDate() {

    let call = async (header) => {
        const response = await axios.get(`${config.PATH_BASE}/Debug/Date`)
        return response.data;
    }

    var result = wrapper.invokeCallWithToast(call, "DateTime", "DateTime end")
    return result;
}

async function getServerName() {

    let call = async (header) => {
        const response = await axios.get(`${config.PATH_BASE}/Debug/ServerName`)
        return response.data;
    }

    var result = wrapper.invokeCallWithToast(call, "ServerName", "ServerName end")
    return result;

}

async function getAppName() {

    let call = async (header) => {
        const response = await axios.get(`${config.PATH_BASE}/Debug/AppName`)
        return response.data;
    }

    var result = wrapper.invokeCallWithToast(call, "AppName", "AppName end")
    return result;

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
    let call = async (header) => {
        const response = await axios.get(`${config.PATH_BASE}/Trip/FullView`, header)
        return response.data;
    }
    var result = wrapper.invokeCallWithToast(call, "getTripsFullView", "getTripsFullView end")
    return result;
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

async function deleteTripCurrency(tripCurrencyId) {
    const response = await axios.get(`${config.PATH_BASE}/Currency/DeleteTripCurrency?tripCurrencyId=${tripCurrencyId}`)
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

async function deleteExpense(expenseId) {
    const response = await axios.delete(`${config.PATH_BASE}/Expense/Delete?expenseId=${expenseId}`,)
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

async function getJournal(journalId) {
    const response = await axios.get(`${config.PATH_BASE}/Journal/Get?journalId=${journalId}`)
    return response.data;
}

async function getJournalList(tripId) {
    const response = await axios.get(`${config.PATH_BASE}/Journal/GetForTrip?tripId=${tripId}`)
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
    getServerName,
    getAppName,
    addTrip,
    getTrips,
    getTrip,
    getTripsFullView,
    saveTrip,
    getTripCurrency,
    saveTripCurrency,
    deleteTripCurrency,
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
    updateJournal,
}

export default service;