import{c as e}from"./vec3f64-C-UKe46_.js";import{l as t}from"./vec4-l6LH68wi.js";import{a as n}from"./vec4f64-Bge3Qg6c.js";import{N as r}from"./vec3-FZKRIO1K.js";import{n as i}from"./glsl-CHAh5tEH.js";import{t as a}from"./Float3BindUniform-D21sCeTc.js";import{t as o}from"./Float4BindUniform-8ui9MB4P.js";function s(e,n){let s=n.lightingSphericalHarmonicsOrder===void 0?2:n.lightingSphericalHarmonicsOrder;s===0?(e.uniforms.add(new a(`lightingAmbientSH0`,({lighting:e})=>r(c,e.sh.r[0],e.sh.g[0],e.sh.b[0]))),e.code.add(i`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
return ambientLight * (1.0 - ambientOcclusion);
}`)):s===1?(e.uniforms.add(new o(`lightingAmbientSH_R`,({lighting:e})=>t(l,e.sh.r[0],e.sh.r[1],e.sh.r[2],e.sh.r[3])),new o(`lightingAmbientSH_G`,({lighting:e})=>t(l,e.sh.g[0],e.sh.g[1],e.sh.g[2],e.sh.g[3])),new o(`lightingAmbientSH_B`,({lighting:e})=>t(l,e.sh.b[0],e.sh.b[1],e.sh.b[2],e.sh.b[3]))),e.code.add(i`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec4 sh0 = vec4(
0.282095,
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y
);
vec3 ambientLight = vec3(
dot(lightingAmbientSH_R, sh0),
dot(lightingAmbientSH_G, sh0),
dot(lightingAmbientSH_B, sh0)
);
return ambientLight * (1.0 - ambientOcclusion);
}`)):s===2&&(e.uniforms.add(new a(`lightingAmbientSH0`,({lighting:e})=>r(c,e.sh.r[0],e.sh.g[0],e.sh.b[0])),new o(`lightingAmbientSH_R1`,({lighting:e})=>t(l,e.sh.r[1],e.sh.r[2],e.sh.r[3],e.sh.r[4])),new o(`lightingAmbientSH_G1`,({lighting:e})=>t(l,e.sh.g[1],e.sh.g[2],e.sh.g[3],e.sh.g[4])),new o(`lightingAmbientSH_B1`,({lighting:e})=>t(l,e.sh.b[1],e.sh.b[2],e.sh.b[3],e.sh.b[4])),new o(`lightingAmbientSH_R2`,({lighting:e})=>t(l,e.sh.r[5],e.sh.r[6],e.sh.r[7],e.sh.r[8])),new o(`lightingAmbientSH_G2`,({lighting:e})=>t(l,e.sh.g[5],e.sh.g[6],e.sh.g[7],e.sh.g[8])),new o(`lightingAmbientSH_B2`,({lighting:e})=>t(l,e.sh.b[5],e.sh.b[6],e.sh.b[7],e.sh.b[8]))),e.code.add(i`vec3 calculateAmbientIrradiance(vec3 normal, float ambientOcclusion) {
vec3 ambientLight = 0.282095 * lightingAmbientSH0;
vec4 sh1 = vec4(
0.488603 * normal.x,
0.488603 * normal.z,
0.488603 * normal.y,
1.092548 * normal.x * normal.y
);
vec4 sh2 = vec4(
1.092548 * normal.y * normal.z,
0.315392 * (3.0 * normal.z * normal.z - 1.0),
1.092548 * normal.x * normal.z,
0.546274 * (normal.x * normal.x - normal.y * normal.y)
);
ambientLight += vec3(
dot(lightingAmbientSH_R1, sh1),
dot(lightingAmbientSH_G1, sh1),
dot(lightingAmbientSH_B1, sh1)
);
ambientLight += vec3(
dot(lightingAmbientSH_R2, sh2),
dot(lightingAmbientSH_G2, sh2),
dot(lightingAmbientSH_B2, sh2)
);
return ambientLight * (1.0 - ambientOcclusion);
}`),n.pbrMode!==1&&n.pbrMode!==2||e.code.add(i`const vec3 skyTransmittance = vec3(0.9, 0.9, 1.0);
vec3 calculateAmbientRadiance(float ambientOcclusion)
{
vec3 ambientLight = 1.2 * (0.282095 * lightingAmbientSH0) - 0.2;
return ambientLight *= (1.0 - ambientOcclusion) * skyTransmittance;
}`))}var c=e(),l=n();export{s as t};