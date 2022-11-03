import serverApp, { port } from '../src/index'
import http from 'http'
var request = require('supertest')
var expect = require('chai').expect

describe('EventModel', function () {
  console.log('Test start!');
  this.timeout(10000);
  let server: http.Server;
  before((done) => {
    serverApp((app: any) => { //Fix this any
      server = app.listen(port, () => {
        done()
      });
    })
  });
  let id: number
  const maintenanceDate = (new Date).toISOString()
  const dateAt = maintenanceDate.split('T')[0]

  it('should check health', (done) => {
    request(server)
      .get('/api/v1/health')
      .expect(200)
      .end(
        function (err: any, res: { body: { message: string } }) {
        if (err) {
          console.log(err.message)
          done()
        }
        const body = res.body
        expect(body.message).to.equal('live')
        done()
      })
  })

  it('should create a event and return the id in the body and in the header', (done) => {
    request(server)
      .post('/api/v1/event')
      .set('Content-Type', 'application/json')
      .send({
        "name": "test",
        "maintenanceDate": maintenanceDate,
        "user": "userTest"	
      })
      .expect(201)
      .end(
        function (err: any, res: { body: { status: string, id: number } }) {
        if (err) {
          console.log(`Error: ${err.message}`)
          done()
        }
        const body = res.body
        expect(body.status).to.equal('created')
        expect(body.id).to.be.a('number')
        id = body.id
        done()
      })
  })

  it('should response with status code 405', (done) => {
    request(server)
      .post(`/api/v1/event/${id}`)
      .set('Content-Type', 'application/json')
      .send({
        "id": id,
        "name": "test",
        "maintenanceDate": maintenanceDate,
        "user": "userTest"	
      })
      .expect(405)
      .end(function(err: any, res: any) {
        console.log({err})
        console.log({res})
        done()
      })
  })

  it('should have count greater than 0 and rows with created event', (done) => {
    request(server)
      .get('/api/v1/event')
      .expect(200)
      .end(
        function (err: any, res: { body: { count: number, rows: Array<any> } }) {
        if (err) {
          console.log(`Error: ${err.message}`)
          done()
        }
        const body = res.body
        expect(body.count).to.be.above(0)
        const row = body.rows.find(event => event.id === id)
        expect(row).to.be.equal({			
          "id": id,
          "name": "test",
          "maintenanceDate": maintenanceDate,
          "user": "userTest",
          "createdAt": dateAt,
          "updatedAt": dateAt
        });
        done()
      })
  })

  after((done) => {
    server.close(done);
    console.log('App has closed');
  });
})
