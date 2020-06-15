/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '3.2L';
      assert.equal(convertHandler.getNum(input),'3.2');
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '1/2L';
      assert.equal(convertHandler.getNum(input),'1/2');
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '2.5/6L';
      assert.equal(convertHandler.getNum(input),'2.5/6');
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '2.5/6/8L';
      assert.equal(convertHandler.getNum(input),'invalid number');
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'L';
      assert.equal(convertHandler.getNum(input),'invalid number');
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(ele),ele);
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = ['ABC'];
      assert.equal(convertHandler.getUnit(input),'invalid unit');
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      //see above example for hint
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [3.78541, 'l'];
      var expected = 1;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [5, 'mi'];
      var expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [8.0467, 'km'];
      var expected = 5;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [1, 'lbs'];
      var expected = 0.453592;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [2, 'kg'];
      var expected = 4.409249;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    test('For Each Valid Unit Inputs Regardless of Casing', function(done) {
      var input = ['GAL','L','mI','Km','LbS','KG'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('Valid Unit Input, But Invalid Number Input', function(done) {
      var input = '3/7.2/4kg';
      var expect = 'kg';
      assert.equal(convertHandler.getUnit(input), expect);
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input = ['ABC'];
      assert.equal(convertHandler.getUnit(input),'invalid unit');
      done();
    });  
    
  });
  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs Regardless of Casing', function(done) {
      //see above example for hint
      var input = ['GAl','L','Mi','kM','lBs','KG'];
      var expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.getString(initNum, initUnit, returnNum, returnUnit)', function() {
    test('Get string', function(done) {
      let input = [3.1, 'mi', 5.00002, 'km'];
      let expected = '3.1 miles converts to 5.00002 kilometers';
      let result = convertHandler.getString(input[0], input[1], input[2], input[3]);
      assert.equal(convertHandler.getString(input[0], input[1], input[2], input[3]),expected);
      done();
    })
  });
});