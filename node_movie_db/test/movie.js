const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../index');
const should = chai.should();
const query = require('../db/movies');

//using the chai-http plugin with the chai library
chai.use(chaihttp);

const testMovie = {
  title: 'The Godfather',
  director: 'Francis Ford Coppola',
  year: "1972"
}

// test for post method
describe('/POST movies', () => {
    beforeEach((done) => {
        query.deleteAllMovies();
        done();
    });
    it('Add new movie', (done) => {
        chai.request(app)
          .post('/api/movies')
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(testMovie))
          .end((req, res) => {
            res.should.have.status(200); // assertion
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            done();
          });
    });
});
// test for get method
describe('/GET movies', () => {
  it('Fetch all movies', (done) => {
    chai.request(app)
      .get('/api/movies') 
      .end((err, res) => {
         res.should.have.status(200);
         res.body.should.be.a('array');
         res.body.length.should.be.eql(1);
         done();
      });
  });
});