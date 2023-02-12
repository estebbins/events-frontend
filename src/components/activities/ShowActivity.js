import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteActivity } from '../../api/activities'
import EditActivityModal from './EditActivityModal'
import messages from '../shared/AutoDismissAlert/messages'

const ShowActivity = (props) => {
    const { activity, user, event, msgAlert, triggerRefresh } = props

    // here's our hook to display the EditActivityModal
    const [editModalShow, setEditModalShow] = useState(false)
    // console.log('this is the activity in showActivity', activity

    // delete, similar to delete for events, all we have to do is ensure that the user is the event's owner, and make the api call passing in the right args.
    const destroyActivity = () => {
        // this is the api call file function
        // it requires three args, user, eventId, & activityId
        deleteActivity(user, event._id, activity._id)
            // upon success, we want to send a message
            .then(() => {
                msgAlert({
                    heading: 'Activity Deleted',
                    message: messages.deleteActivitySuccess,
                    variant: 'success'
                })
            })
            // then trigger a refresh of the parent component
            .then(() => triggerRefresh())
            // upon failure send an appropriate message
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.deleteActivityFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2">
                <Card.Header>{activity.name}</Card.Header>
                <Card.Body>
                    <small>{activity.description}</small><br/>
                </Card.Body>
                <Card.Footer>
                    <small>Duration: {activity.duration}</small><br/>
                    {
                        user && event.owner && user._id === event.owner._id
                        ?
                        <>
                            <Button
                                onClick={() => setEditModalShow(true)}
                                variant="warning"
                                className="m-2"
                            >
                                Edit Activity
                            </Button>
                            <Button 
                                onClick={() => destroyActivity()} 
                                variant="danger"
                                className="m-2"
                            >
                                Delete Activity
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditActivityModal
                user={user}
                event={event}
                activity={activity}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowActivity