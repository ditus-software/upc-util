//
// Copyright (c) DITUS INC with significant portions of this file copyright
// Dominik Lessel. See LICENSE file in the project root for details.
//
// The MIT License (MIT)
//
// Copyright (c) 2014 Dominik Lessel
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

/**
 * Contains static methods for working with Universal Product Codes.
 */
export default class UpcUtil {
  /**
   * Calculates the checksum for the specified UPC.
   *
   * @param {string} upc The UPC.
   * @returns {number} The checksum for the UPC.
   */
  static calculateChecksum(upc) {
    if (!upc || upc.trim() === '') {
      return null;
    }

    // Remove the checksum (the last digit) at the end.
    const digits = upc.slice(0, -1);
    let checksum = 0;

    // Loop through the UPC in reverse order. Note, that this approach is about
    // 18-20% faster than converting the UPC to an array, reversing the array,
    // and using a forEach iterator.
    let j = 0;
    for (let i = digits.length - 1; i >= 0; i -= 1) {
      // - Total the digits in the odd positions and multiple that number by 3.
      // - Total the digits in the even positions, and do not multiple the
      //   number by 3.
      // - Sum the two together.
      checksum += j % 2 ? +digits[i] : +digits[i] * 3;
      j += 1;
    }

    // Round the total calculated above up to the nearest ten and subtract the
    // total from that number. The result will be the checksum.
    checksum %= 10;
    checksum = (checksum === 0) ? 0 : (10 - checksum);

    return checksum;
  }

  /**
   * Generates a random UPC.
   *
   * @returns {string} A random UPC. This UPC should only be used for test
   * purposes.
   */
  static generateTestUpc() {
    // The first six digits will always be 099999, for no other reason than to
    // provide a stable reliable company code that can be searched for when
    // testing. The remaining digits are random, although duplicates are
    // possible. The checksum is also random and replaced with the correct value
    // below.
    let upc = ''.concat('099999', Math.floor(Math.random() * 10000) + 10000, '0');
    upc = upc.slice(0, -1).concat(this.calculateChecksum(upc));

    return upc;
  }

  /**
   * Returns whether the specified UPC is valid.
   *
   * @param {string} upc The UPC.
   * @returns {boolean} Returns true if the UPC is valid; otherwise, false.
   */
  static isValid(upc) {
    if (/^\d{8,14}$/.test(upc)) {
      return this.calculateChecksum(upc) === +upc.slice(-1);
    }

    return false;
  }
}
