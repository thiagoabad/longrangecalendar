import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function MainScreenCard(props) {
    const {title, text} = props;
    const texts = {
        button: "Edit"
    }
    return (
        <Card style={{ width: '18rem' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title style={{ color: 'black' }}>
                    {title}
                </Card.Title>
                <Card.Text style={{ color: 'black' }}>
                    {text}
                </Card.Text>
                <Button variant="primary">{texts.button}</Button>
            </Card.Body>
        </Card>
    )
}

export default MainScreenCard;
