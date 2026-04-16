import{n as e}from"./glsl-CHAh5tEH.js";import{t}from"./FloatPassUniform-BGNunQwI.js";import{t as n}from"./SphereIntersect.glsl-DbM9g5WM.js";import{t as r}from"./NoParameters-x88d7FbV.js";import{t as i}from"./Float3BindUniform-D21sCeTc.js";var a=class extends r{constructor(){super(...arguments),this.atmosphereC=1}};function o(r){r.include(n),r.uniforms.add(new t(`atmosphereC`,e=>e.atmosphereC),new i(`cameraPosition`,e=>e.camera.eye)),r.code.add(e`float getDistanceFalloff(float dist, vec3 rayDir, float weight) {
if(dist == -1.0){
dist = 0.055 * sphereIntersect(cameraPosition, rayDir, atmosphereC).y;
}
return (1.0 - exp(-dist * weight));
}`)}export{o as n,a as t};