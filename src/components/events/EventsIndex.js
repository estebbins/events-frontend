import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'

// api function from our api file
import { getAllEvents } from '../../api/events'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object. they're a quick easy way add focused css properties to our react components
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// EventsIndex will make a request to the API for all events
// once it receives a response, display a card for each event
const EventsIndex = (props) => {
    const [events, setEvents] = useState(null)
    const [error, setError] = useState(false)

    // pull the message alert (msgAlert) from props
    const { msgAlert } = props

    // get our events from the api when the component mounts
    useEffect(() => {
        getAllEvents()
            .then(res => setEvents(res.data.events))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting events',
                    message: messages.getEventsFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, [])

    // if error, display an error
    if (error) {
        return <p>Error!</p>
    }

    if (!events) {
        // if no events loaded yet, display 'loading'
        return <LoadingScreen />
    } else if (events.length === 0) {
        // otherwise if there ARE no events, display that message
        return <p>No events yet, go add some!</p>
    }

    // once we have an array of events, loop over them
    // produce one card for every event
    events.forEach(event => console.log('event id', event._id))

    const eventCards = events.map(event => (
        <Card key={ event._id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ event.name }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/events/${event._id}`} className="btn btn-info">View { event.name }</Link>
                </Card.Text>
                { event.owner ?
                <Card.Footer>
                    owner: {event.owner.email}
                </Card.Footer>
                : null }
            </Card.Body>
        </Card>
    ))

    // return some jsx, a container with all the eventcards
    return (
        <div className="container-md" style={ cardContainerStyle }>
            { eventCards }
        </div>
    )
}

// export our component
export default EventsIndex