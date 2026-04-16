import{t as e}from"./mat3f64-CwJ0v42Q.js";import{c as t}from"./vec3f64-C-UKe46_.js";import{n,t as r}from"./glsl-CHAh5tEH.js";import{t as i}from"./Matrix3PassUniform-XxFQzHVr.js";import{t as a}from"./NoParameters-x88d7FbV.js";import{t as o}from"./Float3PassUniform-DL2u3U8R.js";import{t as s}from"./Matrix4BindUniform-o4jYbzYw.js";import{t as c}from"./Float3DrawUniform-CQvYVn43.js";import{n as l,t as u}from"./Matrix3DrawUniform-Cuc97_0t.js";function d(e,t){let{attributes:a,vertex:d,varyings:f,fragment:p}=e;d.include(l,t),a.add(`position`,`vec3`),f.add(`vPositionWorldCameraRelative`,`vec3`),f.add(`vPosition_view`,`vec3`,{invariant:!0}),d.uniforms.add(new o(`transformWorldFromViewTH`,e=>e.transformWorldFromViewTH),new o(`transformWorldFromViewTL`,e=>e.transformWorldFromViewTL),new i(`transformViewFromCameraRelativeRS`,e=>e.transformViewFromCameraRelativeRS),new s(`transformProjFromView`,e=>e.camera.projectionMatrix),new c(`transformWorldFromModelTH`,e=>e.transformWorldFromModelTH),new c(`transformWorldFromModelTL`,e=>e.transformWorldFromModelTL));let{hasModelRotationScale:m}=t;m&&d.uniforms.add(new u(`transformWorldFromModelRS`,e=>e.transformWorldFromModelRS)),d.code.add(n`
      vec3 positionWorldCameraRelative() {
      vec3 rotatedModelPosition = ${r(m,n`transformWorldFromModelRS * `)} position;

      vec3 transform_CameraRelativeFromModel = dpAdd(
        transformWorldFromModelTL,
        transformWorldFromModelTH,
        -transformWorldFromViewTL,
        -transformWorldFromViewTH
      );

      return transform_CameraRelativeFromModel + rotatedModelPosition;
    }
  `),d.code.add(n`
    void forwardPosition(float fOffset) {
      vPositionWorldCameraRelative = positionWorldCameraRelative();
      if (fOffset != 0.0) {
        vPositionWorldCameraRelative += fOffset * ${t.spherical?n`normalize(transformWorldFromViewTL + vPositionWorldCameraRelative)`:n`vec3(0.0, 0.0, 1.0)`};
      }

      vPosition_view = transformViewFromCameraRelativeRS * vPositionWorldCameraRelative;
      gl_Position = transformProjFromView * vec4(vPosition_view, 1.0);
    }
  `),p.uniforms.add(new o(`transformWorldFromViewTL`,e=>e.transformWorldFromViewTL)),d.code.add(n`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`),p.code.add(n`vec3 positionWorld() {
return transformWorldFromViewTL + vPositionWorldCameraRelative;
}`)}var f=class extends a{constructor(){super(...arguments),this.transformWorldFromViewTH=t(),this.transformWorldFromViewTL=t(),this.transformViewFromCameraRelativeRS=e()}},p=class extends a{constructor(){super(...arguments),this.transformWorldFromModelRS=e(),this.transformWorldFromModelTH=t(),this.transformWorldFromModelTL=t()}};export{d as n,f as r,p as t};