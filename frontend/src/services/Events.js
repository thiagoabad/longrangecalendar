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
                body: event
            });
            debugger
            return await response.json();
        }catch(error) {
            return {};
        }    
    }
}

export default new Events();
