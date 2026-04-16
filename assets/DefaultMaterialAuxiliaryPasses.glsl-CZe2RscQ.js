import{l as e}from"./mat3-eAg4nQa7.js";import{t}from"./mat3f64-CwJ0v42Q.js";import{c as n}from"./vec3f64-C-UKe46_.js";import{r}from"./mat4f64-DRhfuvl3.js";import{N as i}from"./vec3-FZKRIO1K.js";import{n as a,t as o}from"./glsl-CHAh5tEH.js";import{t as s}from"./Matrix3PassUniform-XxFQzHVr.js";import{t as c}from"./Texture2DPassUniform-DQ1HS8F6.js";import"./NoParameters-x88d7FbV.js";import{t as l}from"./Float3BindUniform-D21sCeTc.js";import{n as u}from"./MaterialUtil-DBlHbxc-.js";import{n as d,r as f}from"./View.glsl-Cp2_MWNu.js";import{n as p}from"./Slice.glsl-DBgCgV7T.js";import{t as m}from"./ObjectAndLayerIdColor.glsl-JVSocln4.js";import{t as h}from"./OutputHighlight.glsl-DTZ8zYnI.js";import{a as g,n as _,r as v,t as y}from"./VisualVariables.glsl-CRqOZp2t.js";import{t as b}from"./NormalAttribute.glsl-C4P9fuJc.js";import{n as x}from"./Matrix3DrawUniform-Cuc97_0t.js";import{i as S,t as C}from"./DiscardOrAdjustAlpha.glsl-ZD6aPTPh.js";import{n as w}from"./ForwardLinearDepthToWriteShadowMap.glsl-t_cH3_yp.js";import{t as T}from"./Transform.glsl-Dg4lcse9.js";import{t as E}from"./Matrix4PassUniform-Ce18jt8Q.js";import{n as D,t as O}from"./doublePrecisionUtils-62fTZZqc.js";import{t as k}from"./IntegerPassUniform-sGDjJlpd.js";import{r as A}from"./Emissions.glsl-DIBswxV8.js";import{t as j}from"./OutputDepth.glsl-C5pfga22.js";function M(e){e.vertex.code.add(a`vec4 offsetBackfacingClipPosition(vec4 posClip, vec3 posWorld, vec3 normalWorld, vec3 camPosWorld) {
vec3 camToVert = posWorld - camPosWorld;
bool isBackface = dot(camToVert, normalWorld) > 0.0;
if (isBackface) {
posClip.z += 0.0000003 * posClip.w;
}
return posClip;
}`)}function N(e,t){t.instancedColor?(e.attributes.add(`instanceColor`,`vec4`),e.vertex.include(g),e.vertex.include(v),e.vertex.include(_),e.vertex.code.add(a`
      MaskedColor applyInstanceColor(MaskedColor color) {
        return multiplyMaskedColors( color, createMaskedFromUInt8NaNColor(${`instanceColor`}));
      }
    `)):e.vertex.code.add(a`MaskedColor applyInstanceColor(MaskedColor color) {
return color;
}`)}var P=t();function F(t,n){let{hasModelTransformation:o,instancedDoublePrecision:c,instanced:u,output:d,hasVertexTangents:p}=n;o&&(t.vertex.uniforms.add(new E(`model`,e=>e.modelTransformation??r)),t.vertex.uniforms.add(new s(`normalLocalOriginFromModel`,t=>(e(P,t.modelTransformation??r),P)))),u&&c&&(t.attributes.add(`instanceModelOriginHi`,`vec3`),t.attributes.add(`instanceModelOriginLo`,`vec3`),t.attributes.add(`instanceModel`,`mat3`),t.attributes.add(`instanceModelNormal`,`mat3`));let m=t.vertex;c&&(m.include(x,n),m.uniforms.add(new l(`viewOriginHi`,e=>O(i(I,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]),I)),new l(`viewOriginLo`,e=>D(i(I,e.camera.viewInverseTransposeMatrix[3],e.camera.viewInverseTransposeMatrix[7],e.camera.viewInverseTransposeMatrix[11]),I)))),m.code.add(a`
    vec3 getVertexInLocalOriginSpace() {
      return ${o?c?`(model * vec4(instanceModel * localPosition().xyz, 1.0)).xyz`:`(model * localPosition()).xyz`:c?`instanceModel * localPosition().xyz`:`localPosition().xyz`};
    }

    vec3 subtractOrigin(vec3 _pos) {
      ${c?a`
          // Issue: (should be resolved now with invariant position) https://devtopia.esri.com/WebGIS/arcgis-js-api/issues/56280
          vec3 originDelta = dpAdd(viewOriginHi, viewOriginLo, -instanceModelOriginHi, -instanceModelOriginLo);
          return _pos - originDelta;`:`return vpos;`}
    }
    `),m.code.add(a`
    vec3 dpNormal(vec4 _normal) {
      return normalize(${o?c?`normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz)`:`normalLocalOriginFromModel * _normal.xyz`:c?`instanceModelNormal * _normal.xyz`:`_normal.xyz`});
    }
    `),d===2&&(f(m),m.code.add(a`
    vec3 dpNormalView(vec4 _normal) {
      return normalize((viewNormal * ${o?c?`vec4(normalLocalOriginFromModel * (instanceModelNormal * _normal.xyz), 1.0)`:`vec4(normalLocalOriginFromModel * _normal.xyz, 1.0)`:c?`vec4(instanceModelNormal * _normal.xyz, 1.0)`:`_normal`}).xyz);
    }
    `)),p&&m.code.add(a`
    vec4 dpTransformVertexTangent(vec4 _tangent) {
      ${o?c?`return vec4(normalLocalOriginFromModel * (instanceModelNormal * _tangent.xyz), _tangent.w);`:`return vec4(normalLocalOriginFromModel * _tangent.xyz, _tangent.w);`:c?`return vec4(instanceModelNormal * _tangent.xyz, _tangent.w);`:`return _tangent;`}
    }`)}var I=n();function L(e,t){e.varyings.add(`colorMixMode`,`int`),e.varyings.add(`opacityMixMode`,`int`),e.vertex.uniforms.add(new k(`symbolColorMixMode`,e=>u[e.colorMixMode])),t.hasSymbolColors?(e.vertex.include(g),e.vertex.include(v),e.vertex.include(_),e.attributes.add(`symbolColor`,`vec4`),e.vertex.code.add(a`
    MaskedColor applySymbolColor(MaskedColor color) {
      return multiplyMaskedColors(color, createMaskedFromUInt8NaNColor(${`symbolColor`}));
    }
  `)):e.vertex.code.add(a`MaskedColor applySymbolColor(MaskedColor color) {
return color;
}`),e.vertex.code.add(a`
    void forwardColorMixMode(bvec4 mask) {
      colorMixMode = mask.r ? ${a.int(u.ignore)} : symbolColorMixMode;
      opacityMixMode = mask.a ? ${a.int(u.ignore)} : symbolColorMixMode;
    }
  `)}function R(e,t){let{vertex:n,fragment:r,varyings:i}=e,{hasColorTexture:s,alphaDiscardMode:l}=t,u=s&&l!==1,{output:f,normalType:g,hasColorTextureTransform:_}=t;switch(f){case 1:d(n,t),e.include(T),r.include(p,t),e.include(A,t),u&&r.uniforms.add(new c(`tex`,e=>e.texture)),n.main.add(a`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),e.include(C,t),r.main.add(a`
        discardBySlice(vpos);
        ${o(u,a`vec4 texColor = texture(tex, ${_?`colorUV`:`vuv0`});
                discardOrAdjustAlpha(texColor);`)}`);break;case 3:case 4:case 5:case 6:case 9:d(n,t),e.include(T),e.include(A,t),e.include(y,t),e.include(j,t),r.include(p,t),e.include(m,t),w(e),i.add(`depth`,`float`,{invariant:!0}),u&&r.uniforms.add(new c(`tex`,e=>e.texture)),n.main.add(a`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);
forwardTextureCoordinates();
forwardObjectAndLayerIdColor();`),e.include(C,t),r.main.add(a`
        discardBySlice(vpos);
        ${o(u,a`vec4 texColor = texture(tex, ${_?`colorUV`:`vuv0`});
               discardOrAdjustAlpha(texColor);`)}
        ${f===9?a`outputObjectAndLayerIdColor();`:a`outputDepth(depth);`}`);break;case 2:{d(n,t),e.include(T),e.include(b,t),e.include(S,t),e.include(A,t),e.include(y,t),u&&r.uniforms.add(new c(`tex`,e=>e.texture)),g===2&&i.add(`vPositionView`,`vec3`,{invariant:!0});let s=g===0||g===1;n.main.add(a`
        vpos = getVertexInLocalOriginSpace();
        ${s?a`vNormalWorld = dpNormalView(vvLocalNormal(normalModel()));`:a`vPositionView = (view * vec4(vpos, 1.0)).xyz;`}
        vpos = subtractOrigin(vpos);
        vpos = addVerticalOffset(vpos, localOrigin);
        gl_Position = transformPosition(proj, view, vpos);
        forwardTextureCoordinates();`),r.include(p,t),e.include(C,t),r.main.add(a`
        discardBySlice(vpos);
        ${o(u,a`vec4 texColor = texture(tex, ${_?`colorUV`:`vuv0`});
                discardOrAdjustAlpha(texColor);`)}

        ${g===2?a`vec3 normal = screenDerivativeNormal(vPositionView);`:a`vec3 normal = normalize(vNormalWorld);
                    if (gl_FrontFacing == false){
                      normal = -normal;
                    }`}
        fragColor = vec4(0.5 + 0.5 * normal, 1.0);`);break}case 8:d(n,t),e.include(T),e.include(A,t),e.include(y,t),u&&r.uniforms.add(new c(`tex`,e=>e.texture)),n.main.add(a`vpos = getVertexInLocalOriginSpace();
vpos = subtractOrigin(vpos);
vpos = addVerticalOffset(vpos, localOrigin);
gl_Position = transformPosition(proj, view, vpos);
forwardTextureCoordinates();`),r.include(p,t),e.include(C,t),e.include(h,t),r.main.add(a`
        discardBySlice(vpos);
        ${o(u,a`vec4 texColor = texture(tex, ${_?`colorUV`:`vuv0`});
                discardOrAdjustAlpha(texColor);`)}
        calculateOcclusionAndOutputHighlight();`)}}export{M as a,N as i,L as n,F as r,R as t};