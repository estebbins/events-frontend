import { useState, useEffect } from 'react'

// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneEvent, removeEvent, updateEvent } from '../../api/events'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditEventModal from './EditEventModal'

// we need to get the event's id from the route parameters
// then we need to make a request to the api
// when we retrieve a event from the api, we'll render the data on the screen

const ShowEvent = (props) => {
    const [event, setEvent] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    // console.log('user in ShowEvent props', user)
    // console.log('msgAlert in ShowEvent props', msgAlert)

    useEffect(() => {
        getOneEvent(id)
            .then(res => setEvent(res.data.event))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting event',
                    message: messages.getOneEventFailure,
                    variant: 'danger'
                })
            })
    }, [updated])

     // here's where our removeEvent function will be called
     const deleteEvent = () => {
        removeEvent(user, event._id)
            // upon success, send the appropriate message and redirect users
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeEventSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            // upon failure, just send a message, no navigation required
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removeEventFailure,
                    variant: 'danger'
                })
            })
    }

    if(!event) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container>
                <Card>
                    <Card.Header>{ event.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <span><small>Description: { event.description }</small></span>
                            <span><small>Setting: { event.setting }</small></span>
                            <span>
                                <small>
                                    Participants: { event.participants }
                                </small>
                            </span>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {/* <Button 
                            className="m-2" variant="info"
                            onClick={() => setActivityModalShow(true)}
                        >
                            Add an activity to {event.name}!
                        </Button> */}
                        {
                            event.owner && user && event.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit {event.name}
                                </Button>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => deleteEvent()}
                                >
                                    Cancel {event.name}
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditEventModal 
                user={user}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                updateEvent={updateEvent}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                event={event}
            />
            {/* <NewToyModal 
                event={event}
                show={toyModalShow}
                handleClose={() => setToyModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            /> */}
        </>
    )
}

export default ShowEvent