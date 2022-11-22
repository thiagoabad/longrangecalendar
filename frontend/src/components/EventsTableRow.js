import React from 'react';
import { TrashFill, PenFill } from 'react-bootstrap-icons';

function EventsTableRow(props) {

    const event = props.event;
    const date = (new Date(event.maintenanceDate))

    const deleteLine = () => {
        props.deleteLine(event.id)
    }

    const editLine = () => {
        props.editLine(event)
    }

    return(
      <tr key={`event${event.id}`}>
        <td className='TableRow'>{event.id}</td>
        <td className='TableRow'>{event.name}</td>
        <td className='TableRow'>{date.toLocaleDateString("pt")}</td>
        <td className='TableRow'>
            <PenFill onClick={editLine}/>
            {" "}
            <TrashFill onClick={deleteLine}/>
        </td>
      </tr>
    )
}

export default EventsTableRow;
