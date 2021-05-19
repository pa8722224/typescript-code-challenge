// vim: ts=4 sw=4 et
const args = require('minimist')(process.argv.slice(2))

const inFileName = args.in || 'data.json'
const outFileName = args.out || 'data-transformed.json'

console.log(`Processing file: ${inFileName}, output in ${outFileName}`)

const Transform = require('./lib/Transform');
require('./lib/Transform.js')

var transform = new Transform(inFileName, outFileName);
transform.transform();
