// this form will take several props and be used both to create and update events
// the action will be dependent upon the parent component
// but the form will look the same on both Create and Update
import { Form, Button, Container } from 'react-bootstrap'

const EventForm = (props) => {
    // we need several props for a working, reusable form
    // the object itself(event), some handleChange fn, some handleSubmit fn
    // and in this case, we'll add a custom heading
    const { event, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is your event's name?"
                        name="name"
                        id="name"
                        value={ event.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control 
                        placeholder="Enter a description for this event"
                        name="description"
                        id="description"
                        value={ event.description }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Setting:</Form.Label>
                    <Form.Control 
                        type="string"
                        placeholder="Where will this event be held?"
                        name="setting"
                        id="setting"
                        value={ event.setting }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Particpants:</Form.Label>
                    <Form.Control 
                        type="number"
                        name="participants"
                        id="participants"
                        value={ event.participants }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default EventForm