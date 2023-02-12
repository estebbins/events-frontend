// CreateEvent renders a form
import { useState } from 'react'
import { createEvent } from '../../api/events'
import { createEventSuccess, createEventFailure } from '../shared/AutoDismissAlert/messages'
import EventForm from '../shared/EventForm'

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'

const CreateEvent = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    // set up(pull our navigate function from useNavigate)
    const navigate = useNavigate()
    console.log('this is navigate', navigate)

    const [event, setEvent] = useState({
        name: '',
        description: '',
        setting: '',
        participants: ''
    })

    const onChange = (e) => {
        e.persist()
        
        setEvent(prevEvent => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // console.log('this is the input type', e.target.type)

            // to handle a number, we look at the type, and parse a string to an integer
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            const updatedEvent = {
                [updatedName] : updatedValue
            }

            return {
                ...prevEvent, ...updatedEvent
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createEvent(user, event)
            // first we'll nav to the show page
            .then(res => { navigate(`/events/${res.data.event._id}`)})
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createEventSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: createEventFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <EventForm 
            event={event}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new event!"
        />
    )
}

export default CreateEvent