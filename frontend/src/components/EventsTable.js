import Table from 'react-bootstrap/Table';
import Events from '../services/Events';
import React, { useState, useEffect } from 'react';
import EventsTableRow from './EventsTableRow';
import Alert from 'react-bootstrap/Alert';

function EventsTable(props) {

  const [events, setEvents] = useState({rows: [<tr key={1}></tr>]});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const updateEvents = () => {
    Events.getAll().then((res) => {
      setEvents(res);
      setLoading(false);
      setErrorMessage("");
    });
  }

  const deleteLine = async (eventId) => {
    const response = await Events.delete(eventId);
    if (response.status === 200) {
      updateEvents();
    } else {
      setErrorMessage(`Erro ao apagar o registro ${eventId}`);
    }
  }

  const editLine = async (event) => {
    props.fillForm(event);
  }

  if (loading) {
    updateEvents();
  }

  useEffect(() => {
    props.refreshTableObserver.subscribe(updateEvents)
  }, [props.refreshTableObserver]);

  const records = events.rows.map(event => 
    <EventsTableRow 
      key={event.id}
      event={event}
      deleteLine={deleteLine}
      editLine={editLine}
    />
  )

  return (
    <div>
      {
        errorMessage ?
        <Alert variant={'danger'}>{errorMessage}</Alert>
        :
        <div></div>
      }
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='TableHeader'>#</th>
            <th className='TableHeader'>Nome</th>
            <th className='TableHeader'>Data</th>
            <th className='TableHeader'>Ações</th>
          </tr>
        </thead>
        <tbody>
          {records}
        </tbody>
      </Table>
    </div>
  );
}

export default EventsTable;
