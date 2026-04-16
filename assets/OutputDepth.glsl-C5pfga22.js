import{n as e}from"./glsl-CHAh5tEH.js";function t(t,n){switch(n.output){case 3:case 4:case 5:case 6:t.fragment.code.add(e`float _calculateFragDepth(const in float depth) {
const float SLOPE_SCALE = 2.0;
const float BIAS = 20.0 * .000015259;
float m = max(abs(dFdx(depth)), abs(dFdy(depth)));
return depth + SLOPE_SCALE * m + BIAS;
}
void outputDepth(float _linearDepth){
float fragDepth = _calculateFragDepth(_linearDepth);
gl_FragDepth = fragDepth;
}`);break;case 7:t.fragment.code.add(e`void outputDepth(float _linearDepth){
gl_FragDepth = _linearDepth;
}`)}}export{t};