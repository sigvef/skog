/* smoothstep interpolaties between a and b, at time t from 0 to 1 */
function smoothstep(a, b, t) {
	var v = t*t*t*(t*(t*6.0-15.0)+10.0);
	return b * v + a * (1 - v);
};