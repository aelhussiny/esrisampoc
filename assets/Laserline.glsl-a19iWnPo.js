import{w as e}from"./mathUtils-Cm7mZRa8.js";import{y as t}from"./vec2-fXrlejFD.js";import{c as n}from"./vec3f64-C-UKe46_.js";import{g as r}from"./vec4-l6LH68wi.js";import{a as i}from"./vec4f64-Bge3Qg6c.js";import{A as a,S as o,b as s,k as c,r as l,u,v as d,y as f}from"./vec3-FZKRIO1K.js";import{i as p}from"./vec2f64-vR6k7VCu.js";import{s as m}from"./lineSegment-Dbe2Blfx.js";import{S as h,h as g}from"./plane-D-ZGzbKm.js";import{n as _}from"./glsl-CHAh5tEH.js";import{t as v}from"./ScreenSpacePass.glsl-BQuyCpqA.js";import{t as y}from"./Float2PassUniform-C0auDrhO.js";import{t as b}from"./FloatPassUniform-BGNunQwI.js";import{t as x}from"./ShaderBuilder-HdHfSgzd.js";import{t as S}from"./Float3BindUniform-D21sCeTc.js";import{t as C}from"./Float3PassUniform-DL2u3U8R.js";import{t as w}from"./FloatBindUniform-Dxcf3oBX.js";import{t as T}from"./Float4PassUniform-lh-dPatj.js";import{t as E}from"./Laserline.glsl-CIg_CC-o.js";var D=e(6);function O(e){let t=new x;t.include(v),t.include(E,e);let n=t.fragment;if(e.lineVerticalPlaneEnabled||e.heightManifoldEnabled)if(n.uniforms.add(new b(`maxPixelDistance`,(t,n)=>e.heightManifoldEnabled?2*n.camera.computeScreenPixelSizeAt(t.heightManifoldTarget):2*n.camera.computeScreenPixelSizeAt(t.lineVerticalPlaneSegment.origin))),n.code.add(_`float planeDistancePixels(vec4 plane, vec3 pos) {
float dist = dot(plane.xyz, pos) + plane.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`),e.spherical){let e=(e,t,n)=>l(e,t.heightManifoldTarget,n.camera.viewMatrix),t=(e,t)=>l(e,[0,0,0],t.camera.viewMatrix);n.uniforms.add(new T(`heightManifoldOrigin`,(n,r)=>(e(I,n,r),t(z,r),o(z,z,I),d(L,z),L[3]=f(z),L)),new S(`globalOrigin`,e=>t(I,e)),new b(`cosSphericalAngleThreshold`,(e,t)=>1-Math.max(2,a(t.camera.eye,e.heightManifoldTarget)*t.camera.perRenderPixelRatio)/f(e.heightManifoldTarget))),n.code.add(_`float globeDistancePixels(float posInGlobalOriginLength) {
float dist = abs(posInGlobalOriginLength - heightManifoldOrigin.w);
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}
float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
vec3 posInGlobalOriginNorm = normalize(globalOrigin - pos);
float cosAngle = dot(posInGlobalOriginNorm, heightManifoldOrigin.xyz);
vec3 posInGlobalOrigin = globalOrigin - pos;
float posInGlobalOriginLength = length(posInGlobalOrigin);
float sphericalDistance = globeDistancePixels(posInGlobalOriginLength);
float planarDistance = planeDistancePixels(heightPlane, pos);
return cosAngle < cosSphericalAngleThreshold ? sphericalDistance : planarDistance;
}`)}else n.code.add(_`float heightManifoldDistancePixels(vec4 heightPlane, vec3 pos) {
return planeDistancePixels(heightPlane, pos);
}`);if(e.pointDistanceEnabled&&(n.uniforms.add(new b(`maxPixelDistance`,(e,t)=>2*t.camera.computeScreenPixelSizeAt(e.pointDistanceTarget))),n.code.add(_`float sphereDistancePixels(vec4 sphere, vec3 pos) {
float dist = distance(sphere.xyz, pos) - sphere.w;
float width = fwidth(dist);
dist /= min(width, maxPixelDistance);
return abs(dist);
}`)),e.intersectsLineEnabled&&n.uniforms.add(new w(`perScreenPixelRatio`,e=>e.camera.perScreenPixelRatio)).code.add(_`float lineDistancePixels(vec3 start, vec3 dir, float radius, vec3 pos) {
float dist = length(cross(dir, pos - start)) / (length(pos) * perScreenPixelRatio);
return abs(dist) - radius;
}`),(e.lineVerticalPlaneEnabled||e.intersectsLineEnabled)&&n.code.add(_`bool pointIsWithinLine(vec3 pos, vec3 start, vec3 end) {
vec3 dir = end - start;
float t2 = dot(dir, pos - start);
float l2 = dot(dir, dir);
return t2 >= 0.0 && t2 <= l2;
}`),n.main.add(_`vec3 pos;
vec3 normal;
float angleCutoffAdjust;
float depthDiscontinuityAlpha;
if (!laserlineReconstructFromDepth(pos, normal, angleCutoffAdjust, depthDiscontinuityAlpha)) {
fragColor = vec4(0.0);
return;
}
vec4 color = vec4(0.0);`),e.heightManifoldEnabled){n.uniforms.add(new y(`angleCutoff`,e=>k(e)),new T(`heightPlane`,(e,t)=>P(e.heightManifoldTarget,e.renderCoordsHelper.worldUpAtPosition(e.heightManifoldTarget,I),t.camera.viewMatrix)));let t=e.spherical?_`normalize(globalOrigin - pos)`:_`heightPlane.xyz`;n.main.add(_`
      vec2 angleCutoffAdjusted = angleCutoff - angleCutoffAdjust;
      // Fade out laserlines on flat surfaces
      float heightManifoldAlpha = 1.0 - smoothstep(angleCutoffAdjusted.x, angleCutoffAdjusted.y, abs(dot(normal, ${t})));
      vec4 heightManifoldColor = laserlineProfile(heightManifoldDistancePixels(heightPlane, pos));
      color = max(color, heightManifoldColor * heightManifoldAlpha);`)}return e.pointDistanceEnabled&&(n.uniforms.add(new y(`angleCutoff`,e=>k(e)),new T(`pointDistanceSphere`,(e,t)=>A(e,t))),n.main.add(_`float pointDistanceSphereDistance = sphereDistancePixels(pointDistanceSphere, pos);
vec4 pointDistanceSphereColor = laserlineProfile(pointDistanceSphereDistance);
float pointDistanceSphereAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, normalize(pos - pointDistanceSphere.xyz))));
color = max(color, pointDistanceSphereColor * pointDistanceSphereAlpha);`)),e.lineVerticalPlaneEnabled&&(n.uniforms.add(new y(`angleCutoff`,e=>k(e)),new T(`lineVerticalPlane`,(e,t)=>j(e,t)),new C(`lineVerticalStart`,(e,t)=>M(e,t)),new C(`lineVerticalEnd`,(e,t)=>N(e,t))),n.main.add(_`if (pointIsWithinLine(pos, lineVerticalStart, lineVerticalEnd)) {
float lineVerticalDistance = planeDistancePixels(lineVerticalPlane, pos);
vec4 lineVerticalColor = laserlineProfile(lineVerticalDistance);
float lineVerticalAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, abs(dot(normal, lineVerticalPlane.xyz)));
color = max(color, lineVerticalColor * lineVerticalAlpha);
}`)),e.intersectsLineEnabled&&(n.uniforms.add(new y(`angleCutoff`,e=>k(e)),new C(`intersectsLineStart`,(e,t)=>l(I,e.lineStartWorld,t.camera.viewMatrix)),new C(`intersectsLineEnd`,(e,t)=>l(I,e.lineEndWorld,t.camera.viewMatrix)),new C(`intersectsLineDirection`,(e,t)=>(c(L,e.intersectsLineSegment.vector),L[3]=0,d(I,r(L,L,t.camera.viewMatrix)))),new b(`intersectsLineRadius`,e=>e.intersectsLineRadius)),n.main.add(_`if (pointIsWithinLine(pos, intersectsLineStart, intersectsLineEnd)) {
float intersectsLineDistance = lineDistancePixels(intersectsLineStart, intersectsLineDirection, intersectsLineRadius, pos);
vec4 intersectsLineColor = laserlineProfile(intersectsLineDistance);
float intersectsLineAlpha = 1.0 - smoothstep(angleCutoff.x, angleCutoff.y, 1.0 - abs(dot(normal, intersectsLineDirection)));
color = max(color, intersectsLineColor * intersectsLineAlpha);
}`)),n.main.add(_`fragColor = laserlineOutput(color * depthDiscontinuityAlpha);`),t}function k(n){return t(F,Math.cos(n.angleCutoff),Math.cos(Math.max(0,n.angleCutoff-e(2))))}function A(e,t){return l(H,e.pointDistanceOrigin,t.camera.viewMatrix),H[3]=a(e.pointDistanceOrigin,e.pointDistanceTarget),H}function j(e,t){let n=m(e.lineVerticalPlaneSegment,.5,I),r=u(I,e.renderCoordsHelper.worldUpAtPosition(n,R),d(z,e.lineVerticalPlaneSegment.vector));return d(r,r),P(e.lineVerticalPlaneSegment.origin,r,t.camera.viewMatrix)}function M(e,t){let n=c(I,e.lineVerticalPlaneSegment.origin);return e.renderCoordsHelper.setAltitude(n,0),l(n,n,t.camera.viewMatrix)}function N(e,t){let n=s(I,e.lineVerticalPlaneSegment.origin,e.lineVerticalPlaneSegment.vector);return e.renderCoordsHelper.setAltitude(n,0),l(n,n,t.camera.viewMatrix)}function P(e,t,n){return l(B,e,n),c(L,t),L[3]=0,r(L,L,n),g(B,L,V)}var F=p(),I=n(),L=i(),R=n(),z=n(),B=n(),V=h(),H=i(),U=Object.freeze(Object.defineProperty({__proto__:null,build:O,defaultAngleCutoff:D},Symbol.toStringTag,{value:`Module`}));export{U as n,O as r,D as t};