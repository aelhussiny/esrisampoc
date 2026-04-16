import{n as e,t}from"./glsl-CHAh5tEH.js";import{c as n}from"./ShaderOutput-DU78wUba.js";import{t as r}from"./Float2BindUniform-sYd1gZGw.js";import{n as i}from"./VertexPosition.glsl-Bso56q_D.js";function a(e){e.varyings.add(`linearDepth`,`float`,{invariant:!0})}function o(n,r){r&&a(n),n.vertex.code.add(e`
    void forwardLinearDepth(float _linearDepth) { ${t(r,`linearDepth = _linearDepth;`)} }
  `)}function s(e){e.vertex.uniforms.add(new r(`nearFar`,e=>e.camera.nearFar))}function c(t){t.vertex.code.add(e`float calculateLinearDepth(vec2 nearFar,float z) {
return (-z - nearFar[0]) / (nearFar[1] - nearFar[0]);
}`)}function l(r,a){let{vertex:l}=r,u=n(a.output);u&&(r.include(i,a),o(r,!0),s(r),c(r)),l.code.add(e`
    void forwardLinearDepthToWriteShadowMap() {
      ${t(u,`forwardLinearDepth(calculateLinearDepth(nearFar, vPosition_view.z));`)}
    }
  `)}export{o as a,a as i,s as n,l as r,c as t};