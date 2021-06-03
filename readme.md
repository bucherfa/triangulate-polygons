# Triangulate Polygons

> Convert GeoJSON Polygons into Meshes for Unity with Triangle (Delaunay Triangulator)

## Requirements

* [Triangle](https://www.cs.cmu.edu/~quake/triangle.html)
* node
* bash

## Usage

1. Place a file `input.geo.json` which contains a GeoJSON.
2. Run the following command:
    ```bash
    ./run.sh
    ```
3. You will find two new files
   * `output.unity.json` which contains all triangles and vertices ready to be read into unity and
   * `output.geo.json` which contains all triangles as a GeoJSON.

## Example input

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 0],
            [0, 0]
          ]
        ]
      }
    }
  ]
}
```

Add more features with geometry type "Polygon" into the "features" array. 

View the input/output on [geojson.io](https://geojson.io/) and read your output into any programming language with [quicktype](https://app.quicktype.io/).
