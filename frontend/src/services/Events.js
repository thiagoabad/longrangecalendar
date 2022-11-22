class Events {
    async getAll() {
        try{
            const response = await fetch('http://localhost:3001/api/v1/event');
            return await response.json();
        }catch(error) {
            return {};
        }    
    }
    
    async create(event) {
        try{
            const response = await fetch('http://localhost:3001/api/v1/event', {
                method: 'POST', 
                mode: 'cors', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(event)
            });
            return await response.json();
        }catch(error) {
            return {};
        }    
    }

    async update(event) {
        try{
            const response = await fetch(`http://localhost:3001/api/v1/event/${event.id}`, {
                method: 'PUT', 
                mode: 'cors', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(event)
            });
            return await response.json();
        }catch(error) {
            return {};
        }    
    }

    async delete(eventId) {
        try{
            const response = await fetch(`http://localhost:3001/api/v1/event/${eventId}`, {
                method: 'DELETE', 
                mode: 'cors',
            });
            return response;
        } catch(error) {
            return {};
        }    
    }
}

export default new Events();
