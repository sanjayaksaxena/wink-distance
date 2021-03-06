//     wink-distance
//     Distance functions for Bag of Words, Strings,
//     Vectors and more.
//
//     Copyright (C) 2017  GRAYPE Systems Private Limited
//
//     This file is part of “wink-distance”.
//
//     “wink-distance” is free software: you can redistribute
//     it and/or modify it under the terms of the GNU Affero
//     General Public License as published by the Free
//     Software Foundation, version 3 of the License.
//
//     “wink-distance” is distributed in the hope that it will
//     be useful, but WITHOUT ANY WARRANTY; without even
//     the implied warranty of MERCHANTABILITY or FITNESS
//     FOR A PARTICULAR PURPOSE.  See the GNU Affero General
//     Public License for more details.
//
//     You should have received a copy of the GNU Affero
//     General Public License along with “wink-distance”.
//     If not, see <http://www.gnu.org/licenses/>.

//
// Because we want to logically group the variables.
/* eslint sort-vars: 0 */

// ## bow

// ### cosine
/**
 *
 * Computes the cosine distance between the input bag of words (bow)
 * `a` and `b` and returns a value between 0 and 1.
 *
 * @name bow.cosine
 * @param {object} a — the first set of bows i.e word (i.e. key) and it's frequency
 * (i.e. value) pairs.
 * @param {object} b — the second set of bows.
 * @return {number} - cosine distance between `a` and `b`.
 *
 * @example
 *
 */
var cosine = function ( a, b ) {
  // `ab` & `ba` additional variables are required as you dont want to corrupt
  // `a` & `b`!
  // Updated `a` with words in `b` set as 0 in `a`.
  var ab = Object.create( null );
  // Updated `b` with words in `a` set as 0 in `b`.
  var ba = Object.create( null );
  var distance;
  var w; // a word!

  // Fill up `ab` and `ba`
  for ( w in a ) { // eslint-disable-line guard-for-in
    ab[ w ] = a[ w ];
    ba[ w ] = 0;
  }
  for ( w in b ) { // eslint-disable-line guard-for-in
    ba[ w ] = b[ w ];
    ab[ w ] = ab[ w ] || 0;
  }
  // With `ab` & `ba` in hand, its easy to transform in to
  // vector: its a frequency of each word found in both strings
  // We do not need to store these vectors in arrays, instead we can perform
  // processing in the same loop.
  var sa2 = 0,  // sum of ai^2
     saxb = 0, // sum of ai x bi
     sb2 = 0,  // sum of bi^2
     va, vb;  // value of ai and bi
  // One could have used `ba`, as both have same words now!
  for ( w in ab ) { // eslint-disable-line guard-for-in
    va = ab[ w ];
    vb = ba[ w ];
    sa2 += va * va;
    sb2 += vb * vb;
    saxb += va * vb;
  }
  // Compute cosine distance; ensure you dont get `NaN i.e. 0/0` by testing for
  // `sa2` and `sb2`.
  distance = 1 - ( ( sa2 && sb2 ) ? ( saxb / ( Math.sqrt( sa2 ) * Math.sqrt( sb2 ) ) ) : 0 );
  return distance;
}; // cosine()

// Export cosine
module.exports = cosine;
