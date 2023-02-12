import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ActivityForm from '../shared/ActivityForm'
import { createActivity } from '../../api/activities'
import messages from '../shared/AutoDismissAlert/messages'

const NewActivityModal = (props) => {
    const { event, show, handleClose, msgAlert, triggerRefresh } = props

    const [activity, setActivity] = useState({})

    const onChange = (e) => {
        e.persist()
        
        setActivity(prevActivity => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (updatedName === 'isSqueaky' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isSqueaky' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedActivity = {
                [updatedName] : updatedValue
            }
            
            console.log('the activity', updatedActivity)
            console.log('the activity (state)', activity)

            return {
                ...prevActivity, ...updatedActivity
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createActivity(event._id, activity)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createActivitySuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.createActivityFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ActivityForm 
                    activity={activity}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${event.name} an activity!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewActivityModal