import{r as e}from"./tslib.es6-CQo_GpaT.js";import{c as t,r as n}from"./vec3f64-C-UKe46_.js";import{t as r}from"./mat4f64-DRhfuvl3.js";import{C as i}from"./mat4-B0U6qRAd.js";import{N as a,S as o,b as s,r as c}from"./vec3-FZKRIO1K.js";import{n as l}from"./glsl-CHAh5tEH.js";import{t as u}from"./NoParameters-x88d7FbV.js";import{n as d,t as f}from"./ShaderTechniqueConfiguration-CH-PemgK.js";import{t as p}from"./Float3PassUniform-DL2u3U8R.js";import{t as m}from"./Float3DrawUniform-CQvYVn43.js";var h=class extends f{constructor(){super(...arguments),this.output=0,this.hasEmission=!1}};e([d({count:10})],h.prototype,`output`,void 0),e([d()],h.prototype,`hasEmission`,void 0);var g=class extends h{constructor(){super(...arguments),this.instancedDoublePrecision=!1,this.hasModelTransformation=!1}},_=class extends g{constructor(){super(...arguments),this.hasSlicePlane=!1,this.hasSliceTranslatedView=!1}};e([d()],_.prototype,`hasSlicePlane`,void 0);var v=class extends u{constructor(e){super(),this.slicePlaneLocalOrigin=e}};function y(e,t){w(e,t,new p(`slicePlaneOrigin`,(e,n)=>O(t,e,n)),new p(`slicePlaneBasis1`,(e,n)=>k(t,e,n,n.slicePlane?.basis1)),new p(`slicePlaneBasis2`,(e,n)=>k(t,e,n,n.slicePlane?.basis2)))}function b(e,t){w(e,t,new m(`slicePlaneOrigin`,(e,n)=>O(t,e,n)),new m(`slicePlaneBasis1`,(e,n)=>k(t,e,n,n.slicePlane?.basis1)),new m(`slicePlaneBasis2`,(e,n)=>k(t,e,n,n.slicePlane?.basis2)))}function x(e,t){C(e,t,new m(`slicePlaneOrigin`,(e,n)=>O(t,e,n)),new m(`slicePlaneBasis1`,(e,n)=>k(t,e,n,n.slicePlane?.basis1)),new m(`slicePlaneBasis2`,(e,n)=>k(t,e,n,n.slicePlane?.basis2)))}var S=l`struct SliceFactors {
float front;
float side0;
float side1;
float side2;
float side3;
};
SliceFactors calculateSliceFactors(vec3 pos) {
vec3 rel = pos - slicePlaneOrigin;
vec3 slicePlaneNormal = -cross(slicePlaneBasis1, slicePlaneBasis2);
float slicePlaneW = -dot(slicePlaneNormal, slicePlaneOrigin);
float basis1Len2 = dot(slicePlaneBasis1, slicePlaneBasis1);
float basis2Len2 = dot(slicePlaneBasis2, slicePlaneBasis2);
float basis1Dot = dot(slicePlaneBasis1, rel);
float basis2Dot = dot(slicePlaneBasis2, rel);
return SliceFactors(
dot(slicePlaneNormal, pos) + slicePlaneW,
-basis1Dot - basis1Len2,
basis1Dot - basis1Len2,
-basis2Dot - basis2Len2,
basis2Dot - basis2Len2
);
}
bool sliceByFactors(SliceFactors factors) {
return factors.front < 0.0
&& factors.side0 < 0.0
&& factors.side1 < 0.0
&& factors.side2 < 0.0
&& factors.side3 < 0.0;
}
bool sliceEnabled() {
return dot(slicePlaneBasis1, slicePlaneBasis1) != 0.0;
}
bool rejectBySlice(vec3 pos) {
return sliceEnabled() && sliceByFactors(calculateSliceFactors(pos));
}`;function C(e,t,...n){t.hasSlicePlane?(e.uniforms.add(...n),e.code.add(S)):e.code.add(`bool rejectBySlice(vec3 pos) { return false; }`)}function w(e,t,...n){e.constants.add(`groundSliceOpacity`,`float`,.2),C(e,t,...n),t.hasSlicePlane?e.code.add(`
    void discardBySlice(vec3 pos) {
      if (rejectBySlice(pos)) {
        discard;
      }
    }

    vec4 applySliceOutline(vec4 color, vec3 pos) {
      SliceFactors factors = calculateSliceFactors(pos);

      factors.front /= 2.0 * fwidth(factors.front);
      factors.side0 /= 2.0 * fwidth(factors.side0);
      factors.side1 /= 2.0 * fwidth(factors.side1);
      factors.side2 /= 2.0 * fwidth(factors.side2);
      factors.side3 /= 2.0 * fwidth(factors.side3);

      // return after calling fwidth, to avoid aliasing caused by discontinuities in the input to fwidth
      if (sliceByFactors(factors)) {
        return color;
      }

      float outlineFactor = (1.0 - step(0.5, factors.front))
        * (1.0 - step(0.5, factors.side0))
        * (1.0 - step(0.5, factors.side1))
        * (1.0 - step(0.5, factors.side2))
        * (1.0 - step(0.5, factors.side3));

      return mix(color, vec4(vec3(0.0), color.a), outlineFactor * 0.3);
    }

    vec4 applySlice(vec4 color, vec3 pos) {
      return sliceEnabled() ? applySliceOutline(color, pos) : color;
    }
  `):e.code.add(l`void discardBySlice(vec3 pos) { }
vec4 applySlice(vec4 color, vec3 pos) { return color; }`)}function T(e,t,n){return e.instancedDoublePrecision?a(A,n.camera.viewInverseTransposeMatrix[3],n.camera.viewInverseTransposeMatrix[7],n.camera.viewInverseTransposeMatrix[11]):t.slicePlaneLocalOrigin}function E(e,t){return e==null?t.origin:o(j,t.origin,e)}function D(e,t,n){return e.hasSliceTranslatedView?t==null?n.camera.viewMatrix:i(N,n.camera.viewMatrix,t):null}function O(e,t,r){if(r.slicePlane==null)return n;let i=T(e,t,r),a=E(i,r.slicePlane),o=D(e,i,r);return o==null?a:c(j,a,o)}function k(e,t,r,i){if(i==null||r.slicePlane==null)return n;let a=T(e,t,r),l=E(a,r.slicePlane),u=D(e,a,r);return u==null?i:(s(M,i,l),c(j,l,u),c(M,M,u),o(M,M,j))}var A=t(),j=t(),M=t(),N=r();export{x as a,y as i,b as n,g as o,_ as r,h as s,v as t};