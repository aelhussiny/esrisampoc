import{_ as e,a as t,k as n}from"./aaBoundingRect-Cy5BmKRp.js";import{a as r}from"./vec4f64-Bge3Qg6c.js";import{n as i}from"./glsl-CHAh5tEH.js";import{t as a}from"./Uniform-DlzXRq0m.js";import{t as o}from"./FloatPassUniform-BGNunQwI.js";import{t as s}from"./Texture2DPassUniform-DQ1HS8F6.js";import{o as c}from"./ShaderOutput-DU78wUba.js";import{t as l}from"./OutputHighlight.glsl-DTZ8zYnI.js";import{n as u,r as d}from"./MainLighting.glsl-BAv0DWEY.js";import{t as f}from"./Texture2DUintPassUniform-KJSCg93M.js";import{t as p}from"./WaterColor.glsl-BnglnqE2.js";var m=class extends a{constructor(e,t,n){super(e,`vec4`,2,(r,i,a)=>r.setUniform4fv(e,t(i,a),n))}};function h(e,t){let{vertex:n,fragment:r}=e;n.uniforms.add(new m(`overlayTexOffset`,(e,n)=>x(t.spherical,e,n)),new m(`overlayTexScale`,(e,n)=>S(t.spherical,e,n))),r.uniforms.add(new m(`overlayTexOffset`,(e,n)=>x(t.spherical,e,n)),new m(`overlayTexScale`,(e,n)=>S(t.spherical,e,n))),r.constants.add(`overlayOpacity`,`float`,1),r.uniforms.add(new s(`ovColorTex`,(e,t)=>g(e,t))),y(e,t)}function g(e,t){return e.identifier===0&&c(e.output)?e.occludedGround?t.overlay?.allSourcesOccluders?t.overlay?.getTexture(1):t.overlay?.getTexture(4):t.overlay?.getTexture(1):e.identifier===0&&e.output===9?t.overlay?.getTexture(5):e.identifier===2?t.overlay?.getTexture(2):null}function _(e,t){let{vertex:n,fragment:r}=e;n.uniforms.add(new w(`overlayTexOffset`),new w(`overlayTexScale`)),r.uniforms.add(new o(`overlayOpacity`,e=>e.overlayOpacity)),t.output!==8&&r.uniforms.add(new s(`ovColorTex`,(e,t)=>t.overlay?.getTexture(e.overlayContent))),y(e,t)}function v(e,t){switch(e){case 0:return t.slot!==10||t.overlay?.allSourcesOccluders?0:4;case 1:case 2:return 0;case 8:return 2;case 3:case 5:case 6:case 7:return null;case 9:return 5}return null}function y(e,t){let{hasWater:n,output:r}=t;n&&e.include(p,t);let{vertex:a,fragment:o,varyings:s}=e;s.add(`vtcOverlay`,`vec4`);let c=r===8;a.code.add(i`void setOverlayVTC(in vec2 uv) {
vtcOverlay = vec4(uv, uv) * overlayTexScale + overlayTexOffset;
}`),o.code.add(i`bool isValid(vec2 uv, vec2 dxdy) {
return (uv.x >= 0.0 + dxdy.x) && (uv.x <= 1.0 - dxdy.x) && (uv.y >= 0.0 + dxdy.y) && (uv.y <= 1.0 - dxdy.y);
}
vec4 getOverlayColor(sampler2D ov0Tex, vec4 texCoords) {
vec4 color0 = texture(ov0Tex, vec2(texCoords.x * 0.5, texCoords.y));
vec4 color1 = texture(ov0Tex, vec2(texCoords.z * 0.5 + 0.5, texCoords.w));
bool isValid0 = isValid(texCoords.xy, fwidth(texCoords.xy));
bool isValid1 = isValid(texCoords.zw, vec2(0.0, 0.0));
return mix(color1 * float(isValid1), color0, float(isValid0));
}`),c?o.uniforms.add(new f(`overlayHighlightTexture`,(e,t)=>t.overlay?.getTexture(2))).code.add(i`uvec2 getAllOverlayHighlightValuesEncoded() {
vec4 texCoords = vtcOverlay;
vec2 uvInner = texCoords.xy;
vec2 uvOuter = texCoords.zw;
bool isValidInner = isValid(uvInner, fwidth(uvInner));
bool isValidOuter = isValid(uvOuter, vec2(0.0, 0.0));
vec2 texelCoordInner = uvInner * vec2(0.5, 1.0);
vec2 texelCoordOuter = uvOuter * vec2(0.5, 1.0) + vec2(0.5,0.0);
vec2 texDim =  vec2(textureSize(overlayHighlightTexture, 0));
uvec2 texelValueInner = texelFetch(overlayHighlightTexture, ivec2(texelCoordInner * texDim), 0).rg;
uvec2 texelValueOuter = texelFetch(overlayHighlightTexture, ivec2(texelCoordOuter * texDim), 0).rg;
return
isValidInner ? texelValueInner :
isValidOuter ? texelValueOuter :
uvec2(0);
}`):(o.code.add(i`vec4 getCombinedOverlayColor() {
return overlayOpacity * getOverlayColor(ovColorTex, vtcOverlay);
}`),o.code.add(i`vec4 getOverlayColorTexel() {
vec4 texCoords = vtcOverlay;
vec2 texDim =  vec2(textureSize(ovColorTex, 0));
vec4 color0 = texelFetch(ovColorTex, ivec2(vec2(texCoords.x * 0.5, texCoords.y) * texDim), 0);
vec4 color1 = texelFetch(ovColorTex, ivec2(vec2(texCoords.z * 0.5 + 0.5, texCoords.w) * texDim), 0);
bool isValid0 = isValid(texCoords.xy, fwidth(texCoords.xy));
bool isValid1 = isValid(texCoords.zw, vec2(0.0, 0.0));
return mix(color1 * float(isValid1), color0, float(isValid0));
}`)),n&&(d(o),u(o),o.code.add(i`vec4 getOverlayWaterColor(vec4 maskInput, vec4 colorInput, vec3 vposEyeDir,
float shadow, vec3 localUp, mat3 tbn, vec3 position, vec3 positionWorld) {
vec3 n = normalize(tbn *  (2.0 * maskInput.rgb - vec3(1.0)));
vec3 v = vposEyeDir;
vec3 final = getWaterColor(n, v, mainLightDirection, colorInput.rgb, mainLightIntensity, localUp, 1.0 - shadow, maskInput.w, position, positionWorld);
return vec4(final, colorInput.w);
}`))}function b(e,t){return e.overlay?.overlays[t]?.extent}function x(r,i,a){let o=C,s=r&&!i.useENUForGlobalOverlayUV,c=s?0:i.toMapSpace[0],l=s?0:i.toMapSpace[1],u=(r,i)=>{let s=b(a,i);t(s)&&(o[r+0]=(c-s[0])/n(s),o[r+1]=(l-s[1])/e(s))};return u(0,0),u(2,1),o}function S(r,i,a){let o=C,s=r&&!i.useENUForGlobalOverlayUV,c=s?1:i.toMapSpace[2],l=s?1:i.toMapSpace[3],u=(r,i)=>{let s=b(a,i);t(s)&&(o[r+0]=c/n(s),o[r+1]=l/e(s))};return u(0,0),u(2,1),o}var C=r(),w=class extends a{constructor(e){super(e,`vec4`)}};function T(e,t){t.output===8&&(e.include(l,t),e.fragment.code.add(i`
    void calculateOcclusionAndOutputHighlight(uvec2 highlightToAdd) {
      uint levelBits = readLevelBits(highlightToAdd, highlightLevel);
      if ((levelBits & 1u) == 0u) discard;
      outputHighlight(isHighlightOccluded());
    }
  `))}export{m as a,h as i,_ as n,v as r,T as t};