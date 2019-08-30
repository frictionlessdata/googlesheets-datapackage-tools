import {expect} from 'chai';

import * as helper from '../src/helper';

describe('The helper', function() {

  describe('md5', function() {
  
    it('converts a byte array into a hex string', function() {
      const digest = [12, -68, 102, 17, -11, 84, 11, -48, -128, -102, 56, -115, -55, 90, 97, 91];
      const expectedHash = '0cbc6611f5540bd0809a388dc95a615b';
      expect(helper.md5(digest)).to.equal(expectedHash);
    });

  });

  describe('slugify', function() {
  
    it('replaces whitespace with hyphens', function() {
      const name = 't e   s   t';
      const expectedSlug = 't-e-s-t';
      expect(helper.slugify(name)).to.equal(expectedSlug);
    });

    it('converts everything to lower case', function() {
      const name = 'TeSt';
      const expectedSlug = 'test';
      expect(helper.slugify(name)).to.equal(expectedSlug);
    });

    it('preserves special characters', function() {
      const name = 't-e_s.t';
      const expectedSlug = 't-e_s.t';
      expect(helper.slugify(name)).to.equal(expectedSlug);
    });

  });

});
