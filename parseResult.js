const fs = require('fs');

const nodeData = fs.readFileSync('./temp/box.1.node', { encoding:'utf8', flag:'r' })
    .replace(/\s/g, ' ').split('#')[0].split(' ').filter(value => value !== '').map(value => Math.round(parseFloat(value) * 10000) / 10000);
const triangleData = fs.readFileSync('./temp/box.1.ele', { encoding:'utf8', flag:'r' })
    .replace(/\s/g, ' ').split('#')[0].split(' ').filter(value => value !== '').map(value => Math.round(parseFloat(value) * 10000) / 10000);

const nodeCount = nodeData[0];
nodeData.shift();
let nodeItemsInARow = 1;
for (let index = 0; index < 3; index++) {
    const value = nodeData[0];
    nodeItemsInARow += value;
    nodeData.shift();
}
console.log({nodeCount, length: nodeData.length, rows: nodeData.length / nodeItemsInARow, nodeItemsInARow})
if (nodeCount !== nodeData.length / nodeItemsInARow) {
    throw new Error('NodeCount/ItemsInARow mismatch.')
}

const nodes = [];
for (let row = 0; row < nodeCount; row++) {
    const x = nodeData[row * nodeItemsInARow + 1];
    const y = nodeData[row * nodeItemsInARow + 2];
    nodes.push([x, y])
}

const triangleCount = triangleData[0];
triangleData.shift();
let triangleItemsInARow = 1;
for (let index = 0; index < 2; index++) {
    const value = triangleData[0];
    triangleItemsInARow += value;
    triangleData.shift();
}
console.log({triangleCount, length: triangleData.length, rows: triangleData.length / triangleItemsInARow, triangleItemsInARow})
if (triangleCount !== triangleData.length / triangleItemsInARow) {
    throw new Error('TriangleCount/ItemsInARow mismatch.')
}

const trianglesAsIndices = [];
for (let row = 0; row < triangleCount; row++) {
    const a = triangleData[row * triangleItemsInARow + 1];
    const b = triangleData[row * triangleItemsInARow + 2];
    const c = triangleData[row * triangleItemsInARow + 3];
    trianglesAsIndices.push([a, b, c])
}

const triangles = trianglesAsIndices.map(triangle => [nodes[triangle[0]], nodes[triangle[1]], nodes[triangle[2]]]);

const json = {
    "type": "FeatureCollection",
    "features": []
}

for (const triangle of triangles) {
    triangle.push(triangle[0]);
    json.features.push({
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Polygon",
            "coordinates": [ triangle ]
        }
    })
}

fs.writeFileSync('./output.geo.json', JSON.stringify(json, null, 2));
fs.writeFileSync('./output.unity.json', JSON.stringify({ vertices: nodes, triangles: trianglesAsIndices }, null, 2));
