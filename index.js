'use strict';
const voronoi = require('./voronoi');

const numSeeds = 10;
const height = 16;
const width = 16;
const map = voronoi(height, width, numSeeds);
map.forEach(arr => console.log(arr.join('')));

