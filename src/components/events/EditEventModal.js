// this modal is rendered by ShowEvent
// The state that controls whether this is open or not live in ShowEvent
// the state and the updaterfunction associated with that state is passed here as a prop.
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import EventForm from '../shared/EventForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditEventModal = (props) => {
    // destructure our props
    const { user, show, handleClose, updateEvent, msgAlert, triggerRefresh } = props

    const [event, setEvent] = useState(props.event)

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

        updateEvent(user, event)
            // first we'll handle closing the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateEventSuccess,
                    variant: 'success'
                })
            })
            // if everything goes according to plan, we need a refresh of the show page.
            // we'll build a function in the ShowEvent component that does this for us, and we'll import that here as a prop
            // this triggers a refresh of the parent(ShowEvent) by changing the value of the updated piece of state which lives in useEffect's dependency array.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.updateEventFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <EventForm 
                    event={event} 
                    handleChange={onChange} 
                    handleSubmit={onSubmit} 
                    heading="Update Event"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditEventModal