// vim: ts=4 sw=4 et
var expect = require('chai').expect;
var assert = require('chai').assert;

const Transform = require('./lib/Transform');
require('./lib/Transform.js')

describe('#transform()', function() {

  beforeEach(function() {
  })
  
  // Test that data is transformed correctly
  it('should transform', function() {
    var transform = new Transform('data.json','data-transform.json');
    transform.transform();
    var transformed = fs.readFileSync('data-transformed.json')
    var expected = fs.readFileSync('expected.json')
    expect(transformed).to.equal(expected);
  })
  
})








