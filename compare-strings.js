var _forEach = require('lodash/forEach');
var _map = require('lodash/map');
var _every = require('lodash/every');
var _maxBy = require('lodash/maxBy');
var _flattenDeep = require('lodash/flattenDeep');

exports.compareTwoStrings = compareTwoStrings;
exports.findBestMatch = findBestMatch;

function compareTwoStrings(str1, str2) {
  var pairs1 = wordLetterPairs(str1.toUpperCase());
  var pairs2 = wordLetterPairs(str2.toUpperCase());
  var intersection = 0;
  var union = pairs1.length + pairs2.length;

  _forEach(pairs1, function (pair1) {
    for(var i = 0; i < pairs2.length; i++) {
      var pair2 = pairs2[i];
      if (pair1 === pair2) {
        intersection++;
        pairs2.splice(i, 1);
        break;
      }
    }
  });

  return (2.0 * intersection) / union;

  // private functions ---------------------------
  function letterPairs(str) {
    var numPairs = str.length - 1;
    var pairs = [];
    for(var i = 0; i < numPairs; i++) {
      pairs[i] = str.substring(i, i + 2);
    }
    return pairs;
  }

  function wordLetterPairs(str) {
    return _flattenDeep(_map(str.split(' '), letterPairs));
  }
}


function findBestMatch(mainString, targetStrings) {
  if (!areArgsValid(mainString, targetStrings)) {
    throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
  }
  var ratings = _map(targetStrings, function (targetString) {
    return {
      target: targetString,
      rating: compareTwoStrings(mainString, targetString)
    };
  });

  return {
    ratings: ratings,
    bestMatch: _maxBy(ratings, 'rating')
  };

  // private functions ---------------------------
  function areArgsValid(mainString, targetStrings) {
    var mainStringIsAString = (typeof mainString === 'string');

    var targetStringsIsAnArrayOfStrings = Array.isArray(targetStrings) &&
      targetStrings.length > 0 &&
      _every(targetStrings, function (targetString) {
        return (typeof targetString === 'string');
      });

    return mainStringIsAString && targetStringsIsAnArrayOfStrings;
  }
}
