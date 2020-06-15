/*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  //Helper Functions
  const isNumeric = input => {
    return (input - 0) == input && input.length > 0;
  }
  
  const isDecimal = input => {
    return input === '.';
  }
  
  const isFractionSign = input => {
    return input === '/';
  }
  
  //Handler Functions
  this.getNum = function(input) {
    let result = '';  //this is the result string
    let i = 0;
    let fractionSignCount = 0;
    
    while (isNumeric(input[i]) || isDecimal(input[i]) || isFractionSign(input[i])) { //build the string if the character is a numeric, decimal or fraction sign
      if (isFractionSign(input[i])) {
        fractionSignCount++;
      }
      if (fractionSignCount === 2) { //Check for invalid input - double fraction
        return 'invalid number';
      }
      else {
        result += input[i++];
      }
      
    }
    
    if (result === '') { //there was no numerical input
      return 'invalid number';
    }

    return result;
  };
  
  this.getUnit = function(input) {
    const validInput = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    let result = "";
    let i = 0;
    
    for (let i in input) {
      let currentChar = input[i];
      if ((isNumeric(currentChar) || isFractionSign(currentChar) || isDecimal(currentChar)) && result.length === 0 ) {
        continue; //disregard any character that is presumably part of the number input
      }
      result += currentChar;
    }
    
    
    if (validInput.includes(result)) {
      return result;
    }
    
    return 'invalid unit'; //the unit input was not found in the validInput array
    
  };
  
  this.getReturnUnit = function(initUnit) {
    const unitHash = {
      'gal': 'l',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    }
    
    let result = unitHash[initUnit.toLowerCase()];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    const unitHash = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    }
    var result = unitHash[unit.toLowerCase()];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    switch(initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        result = 'invalid unit'
        break;
    }
  
  
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
