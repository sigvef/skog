/* smoothstep interpolaties between a and b, at time t from 0 to 1 */
function smoothstep(a, b, t) {
	var v = t * t * (3 - 2 * t);
	return b * v + a * (1 - v);
};