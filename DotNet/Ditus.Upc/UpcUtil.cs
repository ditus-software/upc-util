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
namespace Ditus.Upc;

using System;
using System.Globalization;
using System.Text.RegularExpressions;

/// <summary>
/// Contains static methods for working with Universal Product Codes.
/// </summary>
public static class UpcUtil
{
  /// <summary>
  /// Calculates the checksum for the specified UPC.
  /// </summary>
  /// <param name="upc">The UPC.</param>
  /// <returns>The checksum for the UPC.</returns>
  public static int? CalculateChecksum(string upc)
  {
    if (string.IsNullOrWhiteSpace(upc))
    {
      return null;
    }

    // Remove the checksum (the last digit) at the end.
    var digits = upc[..^1];
    var checksum = 0;

    // Loop through the UPC in reverse order. Note, that this approach is about
    // 18-20% faster than converting the UPC to an array, reversing the array,
    // and using a forEach iterator.
    var j = 0;
    for (var i = digits.Length - 1; i >= 0; --i)
    {
      // - Total the digits in the odd positions and multiple that number by 3.
      // - Total the digits in the even positions, and do not multiple the
      //   number by 3.
      // - Sum the two together.
      checksum += Convert.ToInt32(digits[i].ToString(), CultureInfo.InvariantCulture) * (j % 2 == 1 ? 1 : 3);
      j++;
    }

    // Round the total calculated above up to the nearest ten and subtract the
    // total from that number. The result will be the checksum.
    checksum %= 10;
    return checksum == 0 ? 0 : (10 - checksum);
  }

  /// <summary>
  /// Returns whether the specified UPC is valid.
  /// </summary>
  /// <param name="upc">The UPC.</param>
  /// <returns>true if the UPC is valid; otherwise, false.</returns>
  public static bool IsValid(string upc)
  {
    if (string.IsNullOrWhiteSpace(upc))
    {
      return false;
    }

    if (Regex.IsMatch(upc, @"^\d{8,14}$"))
    {
      return CalculateChecksum(upc) == Convert.ToInt32(upc[^1].ToString(), CultureInfo.InvariantCulture);
    }

    return false;
  }
}
