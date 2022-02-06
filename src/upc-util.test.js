//
// Copyright (c) DITUS INC. All rights reserved. See LICENSE file in the project
// root for details.
//
import UpcUtil from './upc-util';

describe('UpcUtil', () => {
  describe('calculateChecksum', () => {
    it('returns null if the UPC is null, undefined, or an empty string.', () => {
      expect(UpcUtil.calculateChecksum(null)).toBe(null);
      expect(UpcUtil.calculateChecksum(undefined)).toBe(null);
      expect(UpcUtil.calculateChecksum('')).toBe(null);
      expect(UpcUtil.calculateChecksum(' ')).toBe(null);
    });

    it('returns the expected checksum for EAN-13 codes.', () => {
      expect(UpcUtil.calculateChecksum('9501101530003')).toBe(3);
    });

    it('returns the expected checksum for UPC-A codes.', () => {
      expect(UpcUtil.calculateChecksum('614141000036')).toBe(6);
    });

    it('returns the expected checksum for EAN-8 codes.', () => {
      expect(UpcUtil.calculateChecksum('95050003')).toBe(3);
    });

    it('returns the expected checksum for UPC-E codes.', () => {
      expect(UpcUtil.calculateChecksum('06107420')).toBe(0);
    });
  });

  describe('generateTestUpc', () => {
    it('returns a UPC where the first six digits are 099999.', () => {
      expect(UpcUtil.generateTestUpc().substring(0, 6)).toBe('099999');
    });

    it('returns a UPC where the length is 12 digits.', () => {
      expect(UpcUtil.generateTestUpc().length).toBe(12);
    });

    it('returns a UPC that is different with each call.', () => {
      for (let i = 1; i <= 100; i += 1) {
        const first = UpcUtil.generateTestUpc();
        const second = UpcUtil.generateTestUpc();
        expect(first).not.toBe(second);
      }
    });

    it('returns a UPC that is a valid UPC.', () => {
      for (let i = 1; i <= 100; i += 1) {
        expect(UpcUtil.isValid(UpcUtil.generateTestUpc())).toBeTruthy();
      }
    });
  });

  describe('isValid', () => {
    it('returns false if the UPC is null, undefined, or an empty string.', () => {
      expect(UpcUtil.isValid(null)).toBeFalsy();
      expect(UpcUtil.isValid(undefined)).toBeFalsy();
      expect(UpcUtil.isValid('')).toBeFalsy();
      expect(UpcUtil.isValid(' ')).toBeFalsy();
    });

    it('returns true for valid EAN-13 codes.', () => {
      expect(UpcUtil.isValid('9501101530003')).toBeTruthy();
    });

    it('returns true for valid UPC-A codes.', () => {
      expect(UpcUtil.isValid('614141000036')).toBeTruthy();
      expect(UpcUtil.isValid('099999109955')).toBeTruthy();
    });

    it('returns true for valid EAN-8 codes.', () => {
      expect(UpcUtil.isValid('95050003')).toBeTruthy();
    });

    it('returns true for valid UPC-E codes.', () => {
      expect(UpcUtil.isValid('06107420')).toBeTruthy();
    });
  });
});
