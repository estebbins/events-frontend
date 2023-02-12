// this is where our api calls for the events resource will live
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllEvents = () => {
    return axios(`${apiUrl}/events`)
}

// READ -> Show
export const getOneEvent = (id) => {
    return axios(`${apiUrl}/events/${id}`)
}

// Create (create an event)

// Update (update an event)

// Delete (delete an event)