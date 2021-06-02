const input = require('./input.geo.json');
const fs = require('fs');

const output = [];

output.push('# .poly file to be used with triangle http://www.cs.cmu.edu/~quake/triangle.html');
output.push(`# run with 'triangle -pq file.poly'`);

const vertices = [];
const segments = [];
let indexStart = 0;
for (const feature of input.features) {
    const polygon = feature.geometry.coordinates[0];
    const length = polygon.length;

    for (let index = 0; index < length; index++) {
        const totalIndex = indexStart + index;
        // Following lines:  <vertex #> <x> <y> [attributes] [boundary marker]
        const coordinate = polygon[index];
        vertices.push(`  ${totalIndex} ${coordinate[0]} ${coordinate[1]}`);
        // Following lines:  <segment #> <endpoint> <endpoint> [boundary marker]
        if (index === length - 1) { // special case for last segment
            segments.push(`  ${totalIndex} ${totalIndex} ${indexStart}`);
        } else {
            segments.push(`  ${totalIndex} ${totalIndex} ${totalIndex + 1}`);
        }
    }
    indexStart += length;
}

// First line:  <# of vertices> <dimension (must be 2)> <# of attributes>
//                                            <# of boundary markers (0 or 1)>
output.push('');
output.push(`# --- Vertices ---`);
output.push(`${vertices.length} 2 0 0`);
output.push(...vertices);

// One line:  <# of segments> <# of boundary markers (0 or 1)>
output.push('');
output.push(`# --- Segments ---`);
output.push(`${segments.length} 0`);
output.push(...segments);

// One line:  <# of holes>
output.push('');
output.push(`# --- Holes ---`);
output.push(`0`);

// Following lines:  <hole #> <x> <y>
//output.push(`  1 0 0`);

// Optional line:  <# of regional attributes and/or area constraints>
// Optional following lines:  <region #> <x> <y> <attribute> <max area>

if (!fs.existsSync('./temp')){
    fs.mkdirSync('./temp');
}
fs.writeFileSync('./temp/box.poly', output.join('\n'));
