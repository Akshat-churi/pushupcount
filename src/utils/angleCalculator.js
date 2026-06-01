/**
 * Calculates the angle formed by three 2D points.
 * @param {Object} a First point {x, y}
 * @param {Object} b Middle point {x, y} (Vertex)
 * @param {Object} c Last point {x, y}
 * @returns {number} Angle in degrees
 */
export const calculateAngle = (a, b, c) => {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);

  if (angle > 180.0) {
    angle = 360.0 - angle;
  }

  return angle;
};
