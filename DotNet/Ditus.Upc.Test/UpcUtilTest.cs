// Copyright (c) DITUS INC. All rights reserved. See LICENSE file in the project
// root for details.
namespace Ditus.Upc.Test;

using Microsoft.VisualStudio.TestTools.UnitTesting;

/// <summary>
/// Contains methods for testing the <see cref="UpcUtil"/> class.
/// </summary>
[TestClass]
public class UpcUtilTest
{
  /// <summary>
  /// Tests <see cref="UpcUtil.CalculateChecksum(string)"/>.
  /// </summary>
  [TestMethod]
  public void CalculateChecksumTest()
  {
    Assert.IsNull(UpcUtil.CalculateChecksum(null), "Returns null when the UPC is null.");
    Assert.IsNull(UpcUtil.CalculateChecksum(string.Empty), "Returns null when the UPC is an empty string.");
    Assert.IsNull(UpcUtil.CalculateChecksum(" "), "Returns null when the UPC is whitespace.");
    Assert.AreEqual(3, UpcUtil.CalculateChecksum("9501101530003"), "Returns the expected checksum for EAN-13 codes.");
    Assert.AreEqual(6, UpcUtil.CalculateChecksum("614141000036"), "Returns the expected checksum for UPC-A codes.");
    Assert.AreEqual(3, UpcUtil.CalculateChecksum("95050003"), "Returns the expected checksum for EAN-8 codes.");
    Assert.AreEqual(0, UpcUtil.CalculateChecksum("06107420"), "Returns the expected checksum for UPC-E codes.");
  }

  /// <summary>
  /// Tests <see cref="UpcUtil.IsValid(string)"/>.
  /// </summary>
  [TestMethod]
  public void IsValidTest()
  {
    Assert.IsFalse(UpcUtil.IsValid(null), "Returns false when the UPC is null.");
    Assert.IsFalse(UpcUtil.IsValid(string.Empty), "Returns false when the UPC is an empty string.");
    Assert.IsFalse(UpcUtil.IsValid(" "), "Returns false when the UPC is whitespace.");
    Assert.IsTrue(UpcUtil.IsValid("9501101530003"), "Returns true when a valid EAN-13 code is specified.");
    Assert.IsTrue(UpcUtil.IsValid("614141000036"), "Returns true when a valid UPC-A code is specified.");
    Assert.IsTrue(UpcUtil.IsValid("95050003"), "Returns true when a valid EAN-8 code is specified");
    Assert.IsTrue(UpcUtil.IsValid("06107420"), "Returns true when a valid UPC-E code is specified");
  }
}
