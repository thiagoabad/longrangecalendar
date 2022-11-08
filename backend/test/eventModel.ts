import serverApp, { port } from '../src/index'
import http from 'http'
import request from 'supertest'
import chai from 'chai'

const expect = chai.expect

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
  let id: number = 0
  let id2: number = 0
  let id3: number = 0
  const maintenanceDate = (new Date).toISOString()
  const dateAt = maintenanceDate.split('T')[0]

  // Health
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

  // Post
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

  // Post Id
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
        done()
      })
  })

  // Get 
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
        const expected = {
          "id": id,
          "name": "test",
          "maintenanceDate": maintenanceDate,
          "user": "userTest",
          "createdAt": dateAt,
          "updatedAt": dateAt
        }
        expect(row).to.be.deep.equal(expected);
        done()
      })
  })

  // Get Id
  it('should return the created event', (done) => {
    request(server)
      .get(`/api/v1/event/${id}`)
      .expect(200)
      .end(
        function (err: any, res: { body: { count: number, rows: Array<any> } }) {
        if (err) {
          console.log(`Error: ${err.message}`)
          done()
        }
        const body = res.body
        const expected = {
          "id": id,
          "name": "test",
          "maintenanceDate": maintenanceDate,
          "user": "userTest",
          "createdAt": dateAt,
          "updatedAt": dateAt
        }
        expect(body).to.be.deep.equal(expected);
        done()
      })
  })

  // Put
  it('should response with status code 6', (done) => {
    request(server)
      .put(`/api/v1/event`)
      .set('Content-Type', 'application/json')
      .send({
        "name": "test",
        "maintenanceDate": maintenanceDate,
        "user": "userTest"	
      })
      .expect(405)
      .end(function(err: any, res: any) {
        done()
      })
  })

  // Put Id
  it('should response with status code 200', (done) => {
    request(server)
      .put(`/api/v1/event/${id}`)
      .set('Content-Type', 'application/json')
      .send({
        "id": id,
        "name": "test",
        "maintenanceDate": maintenanceDate,
        "user": "userTest"	
      })
      .expect(200)
      .end(function(err: any, res: any) {
        done()
      })
  })

  // Put Id New
  it('should response with status code 201', (done) => {
    id2 = id + 1
    request(server)
      .put(`/api/v1/event/${id}`)
      .set('Content-Type', 'application/json')
      .send({
        "id": id2,
        "name": "test",
        "maintenanceDate": maintenanceDate,
        "user": "userTest"	
      })
      .expect(201)
      .end(function(err: any, res: any) {
        done()
      })
  })

  // Patch
  it('should response with status code 405', (done) => {
    request(server)
      .put(`/api/v1/event`)
      .set('Content-Type', 'application/json')
      .send({
        "name": "test",
        "maintenanceDate": maintenanceDate,
        "user": "userTest"	
      })
      .expect(405)
      .end(function(err: any, res: any) {
        done()
      })
  })

  // Patch Id
  it('should response with status code 405', (done) => {
    request(server)
      .put(`/api/v1/event/${id}`)
      .set('Content-Type', 'application/json')
      .send({
        "name": "test",
        "maintenanceDate": maintenanceDate,
        "user": "userTest"	
      })
      .expect(405)
      .end(function(err: any, res: any) {
        done()
      })
  })

  // Delete
  it('should response with status code 405', (done) => {
    request(server)
      .delete(`/api/v1/event`)
      .set('Content-Type', 'application/json')
      .send()
      .expect(405)
      .end(function(err: any, res: any) {
        done()
      })
  })

  // Delete
  it('should response with status code 200', (done) => {
    request(server)
      .delete(`/api/v1/event/${id}`)
      .set('Content-Type', 'application/json')
      .send()
      .expect(200)
      .end(function(err: any, res: any) {
        done()
      })
  })

  // Delete -- Just cleaning
  it('should response with status code 200', (done) => {
    request(server)
      .delete(`/api/v1/event/${id2}`)
      .set('Content-Type', 'application/json')
      .send()
      .expect(200)
      .end(function(err: any, res: any) {
        done()
      })
  })

  // Delete
  it('should response with status code 404', (done) => {
    id3 = id + 2 
    request(server)
    .delete(`/api/v1/event/${id3}`)
    .set('Content-Type', 'application/json')
    .send()
    .expect(404)
    .end(function(err: any, res: any) {
        done()
      })
  })

  after((done) => {
    server.close(done);
    console.log('App has closed');
  });
})
