import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../App.css';
import React, { useState, useEffect } from 'react';
import Events from '../services/Events';

const texts = {
    insertFormTitle: "Inserir um novo evento",
    nameForm: "Nome",
    nameFormPlaceholder: "No-break Intime",
    dateForm: "Data",
    buttonText: "Gravar",
}

function InsertForm(props) {

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props.event) {
            Events.update({
                id: props.event.id,
                name,
                maintenanceDate,
                user: "placeHolder"
            }).then(() => {
                setName("");
                setMaintenanceDate((new Date()).toISOString().slice(0, 10));
                props.clearEvent(null);
                props.refreshTableObserver.notify();
            });
        } else {
            Events.create({
                name,
                maintenanceDate,
                user: "placeHolder"
            }).then(() => {
                setName("");
                setMaintenanceDate((new Date()).toISOString().slice(0, 10));
                props.refreshTableObserver.notify();
            });
        }
    }

    const [name, setName] = useState("");
    const [maintenanceDate, setMaintenanceDate] = useState((new Date()).toISOString().slice(0, 10));

    useEffect(() => {
        if (props.event) {
            console.log(props.event)
            setName(props.event.name)
            setMaintenanceDate(props.event.date)
        }
    }, [props.event])

    return (
        <Form  onSubmit={ e => {handleSubmit(e)} }>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Text className="form-title">
                    {texts.insertFormTitle}
                </Form.Text>
            </Form.Group>
            <Form.Group className='InsertFormField'>
                <Form.Label className='InsertFormFieldLabel'>{texts.nameForm}</Form.Label>
                <Form.Control type="text" placeholder={texts.nameFormPlaceholder} value={name} onChange={e => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group  className='InsertFormField'>
                <Form.Label className='InsertFormFieldLabel'>{texts.dateForm}</Form.Label>
                <Form.Control type="date" value={maintenanceDate} onChange={e => setMaintenanceDate(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                {texts.buttonText}
            </Button>
        </Form>
    )
}

export default InsertForm;
