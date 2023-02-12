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
export const createEvent = (user, newEvent) => {
    // console.log('this is the user', user)
    // console.log('this is the newEvent', newEvent)
    return axios({
        url: `${apiUrl}/events`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { event: newEvent }
    })
}

// Update (update an event)
export const updateEvent = (user, updatedEvent) => {
    return axios({
        url: `${apiUrl}/events/${updatedEvent._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { event: updatedEvent }
    })
}

// Delete (delete an event)
export const removeEvent = (user, eventId) => {
    return axios({
        url: `${apiUrl}/events/${eventId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}