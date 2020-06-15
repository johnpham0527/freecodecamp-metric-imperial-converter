/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('Routing Tests', function() {
    
    suite('GET /api/convert => conversion object', function() {
      
      test('Convert 10L (valid input)', function(done) {
       chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
      });
      
      test('Convert 32g (invalid input unit)', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: '32g'})
          .end(function(err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.text, 'invalid unit');
            done();
        })
      });
      
      test('Convert 3/7.2/4kg (invalid number)', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: '3/7.2/4kg'})
          .end(function(err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.text, 'invalid number');
            done();
        })
      });  
      
      test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: '3/7.2/4kilomegagram'})
          .end(function(err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.text, 'invalid number and unit');
            done();
        })
      });
      
      test('Convert kg (no number)', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: 'kg'})
          .end(function(err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.text, 'invalid number');
            done();
        })
      });
      
      test('Convert 3.1mi (valid input, limit 5 decimal places)', function(done) {
       chai.request(server)
        .get('/api/convert')
        .query({input: '3.1mi'})
        .end(function(err, res){
          assert.equal(res.body.returnNum.toString().split('.')[1].length, 5);
          done();
        });
      });
      
    });

  });

});