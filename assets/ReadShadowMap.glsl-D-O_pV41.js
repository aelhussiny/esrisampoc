import{c as e}from"./vec3f64-C-UKe46_.js";import{n as t,t as n}from"./glsl-CHAh5tEH.js";import{t as r}from"./NoParameters-x88d7FbV.js";import{o as i}from"./ShaderOutput-DU78wUba.js";import{t as a}from"./FloatBindUniform-Dxcf3oBX.js";import{a as o}from"./ForwardLinearDepthToWriteShadowMap.glsl-t_cH3_yp.js";import{i as s,n as c,r as l,t as u}from"./Texture2DShadowBindUniform-Co6lhunb.js";function d(e,r){let a=i(r.output)&&r.receiveShadows;a&&o(e,!0),e.vertex.code.add(t`
    void forwardLinearDepthToReadShadowMap() { ${n(a,`forwardLinearDepth(gl_Position.w);`)} }
  `)}var f=class extends r{constructor(){super(...arguments),this.origin=e()}};function p(e,t){t.receiveShadows&&e.include(l),h(e,t)}function m(e,t){t.receiveShadows&&e.include(s),h(e,t)}function h(e,r){e.fragment.uniforms.add(new a(`lightingGlobalFactor`,e=>e.lighting.globalFactor));let{receiveShadows:i,spherical:o}=r;e.include(d,r),i&&g(e),e.fragment.code.add(t`
    float readShadow(float additionalAmbientScale, vec3 vpos) {
      return ${i?`max(lightingGlobalFactor * (1.0 - additionalAmbientScale), readShadowMap(vpos, linearDepth))`:n(o,`lightingGlobalFactor * (1.0 - additionalAmbientScale)`,`0.0`)};
    }
  `)}function g(e){e.include(c),e.fragment.uniforms.add(new u(`shadowMap`,({shadowMap:e})=>e.depthTexture)).code.add(t`float readShadowMap(const in vec3 _worldPos, float _linearDepth) {
vec3 uvzShadow = calculateUVZShadow(_worldPos, _linearDepth, textureSize(shadowMap,0));
if (uvzShadow.z < 0.0) {
return 0.0;
}
return readShadowMapUVZ(uvzShadow, shadowMap);
}`)}export{f as n,p as r,m as t};