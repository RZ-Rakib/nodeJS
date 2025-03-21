const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../index');
const query = require('../db/customers');
const should = chai.should();

chai.use(chaihttp); // chai-http plugin with chai library

const testCustomer = {
    firstname: 'Rakib',
    lastname: 'Zaman',
    email: 'rakibzaman@gmail.com',
    phone: '1223'
}

describe('/POST customer', () => {
    beforeEach((done) => {
        query.deleteAllCustomers();
        done();
    });

    it('Add a new customer', (done) => {
        chai.request(app)
            .post('/api/customers')
            .set('Content-Type', 'application/json')
            .send(testCustomer) // Send the object directly (no need for JSON.stringify)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('firstname').eql(testCustomer.firstname);
                res.body.should.have.property('lastname').eql(testCustomer.lastname);
                res.body.should.have.property('email').eql(testCustomer.email);
                res.body.should.have.property('phone').eql(testCustomer.phone);

                // Now check if the customer was added to the database
                query.getCustomerByEmail(testCustomer.email, (dbErr, customer) => {
                    if (dbErr) {
                        return done(dbErr); // Ensure error in the database query is handled
                    }
                    if (!customer) {
                        return done(new Error('Customer not found in database'));
                    }

                    // Assert that the customer returned from the database matches what was sent
                    customer.should.have.property('firstname').eql(testCustomer.firstname);
                    customer.should.have.property('lastname').eql(testCustomer.lastname);
                    customer.should.have.property('email').eql(testCustomer.email);
                    customer.should.have.property('phone').eql(testCustomer.phone);
                    
                    done();
                });
            });
    });
});
