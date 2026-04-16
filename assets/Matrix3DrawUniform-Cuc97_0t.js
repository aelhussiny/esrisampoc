import{n as e}from"./glsl-CHAh5tEH.js";import{t}from"./Uniform-DlzXRq0m.js";import{t as n}from"./FloatBindUniform-Dxcf3oBX.js";function r({code:t,uniforms:r},i){r.add(new n(`dpDummy`,()=>1)),t.add(e`vec3 dpAdd(vec3 hiA, vec3 loA, vec3 hiB, vec3 loB) {
vec3 hiD = hiA + hiB;
vec3 loD = loA + loB;
return  dpDummy * hiD + loD;
}`)}var i=class extends t{constructor(e,t,n){super(e,`mat3`,2,(r,i,a)=>r.setUniformMatrix3fv(e,t(i,a),n))}};export{r as n,i as t};