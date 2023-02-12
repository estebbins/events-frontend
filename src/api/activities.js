import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /activities/:eventId
export const createActivity = (eventId, newActivity) => {
    return axios({
        url: `${apiUrl}/activities/${eventId}`,
        method: 'POST',
        data: { activity: newActivity }
    })
}

// UPDATE
// /activities/:eventId/:activityId
export const updateActivity = (user, eventId, updatedActivity) => {
    return axios({
        url: `${apiUrl}/activities/${eventId}/${updatedActivity._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { activity: updatedActivity }
    })
}

// DELETE
// /activities/:eventId/:activityId
export const deleteActivity = (user, eventId, activityId) => {
    // console.log('this the activityId', activityId)
    return axios({
        url: `${apiUrl}/activities/${eventId}/${activityId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}