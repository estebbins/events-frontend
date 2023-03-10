// this activity modal shows up on a ShowActivity component
// has the ability to edit individual activities, one at a time
// will need to call the api,
// send a message,
// refresh the parent.
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ActivityForm from '../shared/ActivityForm'
import { updateActivity } from '../../api/activities'
import messages from '../shared/AutoDismissAlert/messages'

const EditActivityModal = (props) => {
    const { user, event, show, handleClose, msgAlert, triggerRefresh } = props

    const [activity, setActivity] = useState(props.activity)

    const onChange = (e) => {
        e.persist()
        
        setActivity(prevActivity => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
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
        updateActivity(user, event._id, activity)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.editActivitySuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.editActivityFailure,
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
                    heading="Update The Activity"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditActivityModal
