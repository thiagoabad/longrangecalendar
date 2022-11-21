import Table from 'react-bootstrap/Table';
import Events from '../services/Events';
import React, { useState, useEffect } from 'react';

function EventsTable(props) {

  const [events, setEvents] = useState({rows: [<tr key={1}></tr>]});
  const [loading, setLoading] = useState(true);

  const updateEvents = () => {
    Events.getAll().then((res) => {
      setEvents(res)
      setLoading(false)
    });
  }

  if (loading) {
    updateEvents()
  }

  useEffect(() => {
    props.refreshTableObserver.subscribe(updateEvents)
  }, [props.refreshTableObserver]);

  const records = events.rows.map(event => {
    const date = (new Date(event.maintenanceDate))
    return(
      <tr key={`event${event.id}`}>
        <td className='TableRow'>{event.id}</td>
        <td className='TableRow'>{event.name}</td>
        <td className='TableRow'>{date.toLocaleDateString("pt")}</td>
        <td className='TableRow'></td>
      </tr>
    )
  })

  return (
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
  );
}

export default EventsTable;