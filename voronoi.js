function voronoi(height, width, seeds) {
  const map = createEmptyMap(height, width);
  const seedbag = [];

  for (let i = 0; i < seeds; i++) {
    const val = i;
    const seed = getSeed(map, val);
    seedbag.push(seed);
    map[seed.x][seed.y] = val;
  }

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (!map[x][y]) {
        const point = { x, y };
        const nearestSeed = seedbag
          .map(e => {
            e.distance = findDistance(point, e);
            return e;
          })
          .reduce((acc, el) => {
            if (!acc) {
              return el;
            }

            return el.distance > acc.distance ? acc : el;
          });

        map[x][y] = nearestSeed.val;
      }
    }
  }

  return map;
}

/**
 * Find a random unfilled point on a given map
 * @param {Array} map
 * @param {Number} val
 * @returns {Seed} seed
 */
function getSeed(map, val) {
  const width = map.length;
  const height = map[0].length;
  const x = Math.random() * width | 0;
  const y = Math.random() * height | 0;
  if (map[x][y]) {
    return getSeed(map, val);
  }
  return { x, y, val };
}

/**
 * Create an empty 2D array of a height and width
 * @param {Number} height 
 * @param {Number} width 
 * @returns {Array} table
 */
function createEmptyMap(height, width) {
  return Array.from({ length: width })
    .map(e => Array.from({ length: height }));
}

/**
 * Find the distance between two points
 * @param {Point} p1 
 * @param {Point} p2 
 * returns {Number} distance
 */
function findDistance(p1, p2) {
    const x = Math.pow(p2.x-p1.x, 2);
    const y = Math.pow(p2.y-p1.y, 2);
    const d = Math.sqrt(x + y);
    return Math.round(d);
}

module.exports = voronoi;

