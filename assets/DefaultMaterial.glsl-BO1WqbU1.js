import{r as e}from"./mat3f64-CwJ0v42Q.js";import{n as t,t as n}from"./glsl-CHAh5tEH.js";import{t as r}from"./FloatPassUniform-BGNunQwI.js";import{t as i}from"./Matrix3PassUniform-XxFQzHVr.js";import{t as a}from"./Texture2DPassUniform-DQ1HS8F6.js";import{t as o}from"./ShaderBuilder-HdHfSgzd.js";import{o as s}from"./ShaderOutput-DU78wUba.js";import{t as c}from"./Float3PassUniform-DL2u3U8R.js";import{n as ee}from"./MaterialUtil-DBlHbxc-.js";import{n as te,t as l}from"./View.glsl-Cp2_MWNu.js";import{t as ne}from"./Float4PassUniform-lh-dPatj.js";import{r as u}from"./VerticalOffset.glsl-Dw6FRjLi.js";import{n as d}from"./Slice.glsl-DBgCgV7T.js";import{t as f}from"./TerrainDepthTest.glsl-BvZ9_Dq8.js";import{a as re,i as ie,t as ae}from"./VisualVariables.glsl-CRqOZp2t.js";import{t as oe}from"./AlphaCutoff-cZu5nT4P.js";import{t as se}from"./NormalAttribute.glsl-C4P9fuJc.js";import{i as p,t as m}from"./DiscardOrAdjustAlpha.glsl-ZD6aPTPh.js";import{a as h,i as g,n as _,r as v,t as y}from"./DefaultMaterialAuxiliaryPasses.glsl-CZe2RscQ.js";import{t as b}from"./Transform.glsl-Dg4lcse9.js";import{r as x}from"./Emissions.glsl-DIBswxV8.js";import{t as S}from"./VertexColor.glsl-Xzyi-4gM.js";import{n as C}from"./ComputeNormalTexture.glsl-BgnkBuUh.js";import{n as w}from"./PhysicallyBasedRendering.glsl-CJToe4Bf.js";import{i as T,n as E,r as D,t as O}from"./EvaluateSceneLighting.glsl-DBOQi6Gp.js";import{n as k}from"./MainLighting.glsl-BAv0DWEY.js";import{t as A}from"./Normals.glsl-YdGw7t9A.js";import{n as j,t as M}from"./SnowCover.glsl-CPagf_-_.js";import{r as N,t as P}from"./ReadShadowMap.glsl-D-O_pV41.js";import{t as F}from"./MixExternalColor.glsl-D10CKnGR.js";import{t as ce}from"./OutputColorHighlightOLID.glsl-C-ItyJSg.js";function I(n,r){r.hasColorTextureTransform?(n.varyings.add(`colorUV`,`vec2`),n.vertex.uniforms.add(new i(`colorTextureTransformMatrix`,t=>t.colorTextureTransformMatrix??e)).code.add(t`void forwardColorUV(){
colorUV = (colorTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):n.vertex.code.add(t`void forwardColorUV(){}`)}function L(n,r){r.hasNormalTextureTransform&&r.textureCoordinateType!==0?(n.varyings.add(`normalUV`,`vec2`),n.vertex.uniforms.add(new i(`normalTextureTransformMatrix`,t=>t.normalTextureTransformMatrix??e)).code.add(t`void forwardNormalUV(){
normalUV = (normalTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):n.vertex.code.add(t`void forwardNormalUV(){}`)}function R(n,r){r.hasEmissionTextureTransform&&r.textureCoordinateType!==0?(n.varyings.add(`emissiveUV`,`vec2`),n.vertex.uniforms.add(new i(`emissiveTextureTransformMatrix`,t=>t.emissiveTextureTransformMatrix??e)).code.add(t`void forwardEmissiveUV(){
emissiveUV = (emissiveTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):n.vertex.code.add(t`void forwardEmissiveUV(){}`)}function z(n,r){r.hasOcclusionTextureTransform&&r.textureCoordinateType!==0?(n.varyings.add(`occlusionUV`,`vec2`),n.vertex.uniforms.add(new i(`occlusionTextureTransformMatrix`,t=>t.occlusionTextureTransformMatrix??e)).code.add(t`void forwardOcclusionUV(){
occlusionUV = (occlusionTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):n.vertex.code.add(t`void forwardOcclusionUV(){}`)}function B(n,r){r.hasMetallicRoughnessTextureTransform&&r.textureCoordinateType!==0?(n.varyings.add(`metallicRoughnessUV`,`vec2`),n.vertex.uniforms.add(new i(`metallicRoughnessTextureTransformMatrix`,t=>t.metallicRoughnessTextureTransformMatrix??e)).code.add(t`void forwardMetallicRoughnessUV(){
metallicRoughnessUV = (metallicRoughnessTextureTransformMatrix * vec3(vuv0, 1.0)).xy;
}`)):n.vertex.code.add(t`void forwardMetallicRoughnessUV(){}`)}function V(e){let i=new o,{attributes:V,vertex:H,fragment:U,varyings:W}=i,{output:G,normalType:K,offsetBackfaces:q,spherical:le,snowCover:J,pbrMode:Y,textureAlphaPremultiplied:ue,instancedDoublePrecision:de,hasVertexColors:X,hasVertexTangents:Z,hasColorTexture:Q,hasNormalTexture:fe,hasNormalTextureTransform:pe,hasColorTextureTransform:me}=e;if(te(H,e),V.add(`position`,`vec3`),W.add(`vpos`,`vec3`,{invariant:!0}),i.include(ae,e),i.include(v,e),i.include(u,e),i.include(I,e),!s(G))return i.include(y,e),i;i.include(L,e),i.include(R,e),i.include(z,e),i.include(B,e),l(H,e),i.include(se,e),i.include(b);let $=K===0||K===1;return $&&q&&i.include(h),i.include(C,e),i.include(p,e),i.include(g,e),W.add(`vPositionLocal`,`vec3`),i.include(x,e),i.include(_,e),i.include(S,e),H.uniforms.add(new ne(`externalColor`,e=>e.externalColor,{supportsNaN:!0})),W.add(`vcolorExt`,`vec4`),i.include(f,e),H.include(re),H.include(ie),i.include(de?N:P,e),H.main.add(t`
    forwardVertexColor();

    MaskedColor maskedColor =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColor.color;
    forwardColorMixMode(maskedColor.mask);

    vpos = getVertexInLocalOriginSpace();
    vPositionLocal = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    ${n($,`vNormalWorld = dpNormal(vvLocalNormal(normalModel()));`)}
    vpos = addVerticalOffset(vpos, localOrigin);
    ${n(Z,`vTangent = dpTransformVertexTangent(tangent);`)}
    gl_Position = transformPosition(proj, view, vpos);
    ${n($&&q,`gl_Position = offsetBackfacingClipPosition(gl_Position, vpos, vNormalWorld, cameraPosition);`)}

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardColorUV();
    forwardNormalUV();
    forwardEmissiveUV();
    forwardOcclusionUV();
    forwardMetallicRoughnessUV();

    if (opacityMixMode != ${t.int(ee.ignore)} && vcolorExt.a < ${t.float(oe)}) {
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
    }
    forwardLinearDepthToReadShadowMap();
  `),U.include(D,e),U.include(T,e),i.include(m,e),U.include(d,e),i.include(ce,e),l(U,e),U.uniforms.add(H.uniforms.get(`localOrigin`),new c(`ambient`,e=>e.ambient),new c(`diffuse`,e=>e.diffuse),new r(`opacity`,e=>e.opacity),new r(`layerOpacity`,e=>e.layerOpacity)),Q&&U.uniforms.add(new a(`tex`,e=>e.texture)),i.include(j,e),U.include(w,e),U.include(F),i.include(A,e),U.include(M,e),E(U),O(U),k(U),U.main.add(t`
    discardBySlice(vpos);
    discardByTerrainDepth();
    ${Q?t`
            vec4 texColor = texture(tex, ${me?`colorUV`:`vuv0`});
            ${n(ue,`texColor.rgb /= texColor.a;`)}
            discardOrAdjustAlpha(texColor);`:t`vec4 texColor = vec4(1.0);`}
    shadingParams.viewDirection = normalize(vpos - cameraPosition);
    ${K===2?t`vec3 normal = screenDerivativeNormal(vPositionLocal);`:t`shadingParams.normalView = vNormalWorld;
                vec3 normal = shadingNormal(shadingParams);`}
    applyPBRFactors();
    float ssao = evaluateAmbientOcclusionInverse() * getBakedOcclusion();

    vec3 posWorld = vpos + localOrigin;

    float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
    float shadow = readShadow(additionalAmbientScale, vpos);

    vec3 matColor = max(ambient, diffuse);
    vec3 albedo = mixExternalColor(${n(X,`vColor.rgb *`)} matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
    float opacity_ = layerOpacity * mixExternalOpacity(${n(X,`vColor.a * `)} opacity, texColor.a, vcolorExt.a, opacityMixMode);

    ${fe?`mat3 tangentSpace = computeTangentSpace(${Z?`normal`:`normal, vpos, vuv0`});\n            vec3 shadingNormal = computeTextureNormal(tangentSpace, ${pe?`normalUV`:`vuv0`});`:`vec3 shadingNormal = normal;`}
    vec3 normalGround = ${le?`normalize(posWorld);`:`vec3(0.0, 0.0, 1.0);`}

    ${n(J,t`
          float snow = getSnow(normal, normalGround);
          albedo = mix(albedo, vec3(1), snow);
          shadingNormal = mix(shadingNormal, normal, snow);
          ssao = mix(ssao, 1.0, snow);`)}

    vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;

    ${Y===1||Y===2?t`
            float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${n(J,`mrr = applySnowToMRR(mrr, snow);`)}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, additionalAmbientIrradiance);`:t`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
    vec4 finalColor = vec4(shadedColor, opacity_);
    outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${n(J,`, snow`)});
  `),i}var H=Object.freeze(Object.defineProperty({__proto__:null,build:V},Symbol.toStringTag,{value:`Module`}));export{H as n,V as t};