import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../App.css';

const texts = {
    insertFormTitle: "Inserir um novo evento",
    nameForm: "Nome",
    nameFormPlaceholder: "No-break Intime",
    dateForm: "Data",
    buttonText: "Gravar",
  }

function InsertForm() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text className="form-title">
                    {texts.insertFormTitle}
                </Form.Text>
            </Form.Group>
            <Form.Group className='InsertFormField'>
                <Form.Label className='InsertFormFieldLabel'>{texts.nameForm}</Form.Label>
                <Form.Control type="text" placeholder={texts.nameFormPlaceholder} />
            </Form.Group>
            <Form.Group  className='InsertFormField'>
                <Form.Label className='InsertFormFieldLabel'>{texts.dateForm}</Form.Label>
                <Form.Control type="date" />
            </Form.Group>
            <Button variant="primary" type="submit">
                {texts.buttonText}
            </Button>
        </Form>
    )
}

export default InsertForm;
