import { Form, Button, Container } from 'react-bootstrap'

const ActivityForm = (props) => {
    const { activity, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is the activity's name?"
                        name="name"
                        id="name"
                        value={ activity.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control 
                        placeholder="What kind of activity is this?"
                        name="description"
                        id="description"
                        value={ activity.description }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Duration:</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="How long is this activity in hours?"
                        name="duration"
                        id="duration"
                        value={ activity.duration }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ActivityForm