import EventsIndex from './events/EventsIndex'
import Container from 'react-bootstrap/Container'

const Home = (props) => {
	// const { msgAlert, user } = props
	// console.log('props in home', props)

	return (
		<>
            <Container className="m-2" style={{textAlign: 'center'}}>
                <h2>Home Page</h2>
                <EventsIndex msgAlert={ props.msgAlert } />
            </Container>
		</>
	)
}

export default Home
