import { useState, useEffect } from 'react'

// useParams from react-router-dom allows us to see our route parameters
import { useParams } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'

import { getOneEvent } from '../../api/events'

import messages from '../shared/AutoDismissAlert/messages'

import LoadingScreen from '../shared/LoadingScreen'

// we need to get the event's id from the route parameters
// then we need to make a request to the api
// when we retrieve a event from the api, we'll render the data on the screen

const ShowEvent = (props) => {
    const [event, setEvent] = useState(null)

    const { id } = useParams()

    const { user, msgAlert } = props
    console.log('user in ShowEvent props', user)
    console.log('msgAlert in ShowEvent props', msgAlert)

    useEffect(() => {
        getOneEvent(id)
            .then(res => setEvent(res.data.event))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting events',
                    message: 'Nothing here - uh oh!',
                    variant: 'danger'
                })
            })
    }, [])

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
                            <div><small>Description: { event.description }</small></div>
                            <div><small>Setting: { event.setting }</small></div>
                            <div>
                                <small>
                                    Participants: { event.participants }
                                </small>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ShowEvent