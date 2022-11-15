import Table from 'react-bootstrap/Table';

function EventsTable(props) {

  const records = props.records.map(record => {
    return(
        <tr key={record.id}>
            <td className='TableRow'>{record.id}</td>
            <td className='TableRow'>{record.name}</td>
            <td className='TableRow'>{record.date}</td>
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