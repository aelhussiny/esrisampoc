import{n as e,t}from"./glsl-CHAh5tEH.js";import{t as n}from"./FloatPassUniform-BGNunQwI.js";import{t as r}from"./Texture2DPassUniform-DQ1HS8F6.js";import{t as i}from"./ShaderBuilder-HdHfSgzd.js";import{o as a}from"./ShaderOutput-DU78wUba.js";import{t as o}from"./Float3PassUniform-DL2u3U8R.js";import{n as s}from"./MaterialUtil-DBlHbxc-.js";import{n as c,t as l}from"./View.glsl-Cp2_MWNu.js";import{t as u}from"./Float4PassUniform-lh-dPatj.js";import{r as d}from"./VerticalOffset.glsl-Dw6FRjLi.js";import{n as f}from"./Slice.glsl-DBgCgV7T.js";import{t as p}from"./TerrainDepthTest.glsl-BvZ9_Dq8.js";import{a as m,i as h,t as g}from"./VisualVariables.glsl-CRqOZp2t.js";import{t as _}from"./AlphaCutoff-cZu5nT4P.js";import{t as v}from"./NormalAttribute.glsl-C4P9fuJc.js";import{t as y}from"./DiscardOrAdjustAlpha.glsl-ZD6aPTPh.js";import{a as b,i as x,n as S,r as C,t as w}from"./DefaultMaterialAuxiliaryPasses.glsl-CZe2RscQ.js";import{t as T}from"./Transform.glsl-Dg4lcse9.js";import{r as E}from"./Emissions.glsl-DIBswxV8.js";import{t as D}from"./VertexColor.glsl-Xzyi-4gM.js";import{n as O}from"./PhysicallyBasedRendering.glsl-CJToe4Bf.js";import{i as k,n as A,r as j,t as M}from"./EvaluateSceneLighting.glsl-DBOQi6Gp.js";import{n as N,r as P}from"./MainLighting.glsl-BAv0DWEY.js";import{n as ee,t as F}from"./SnowCover.glsl-CPagf_-_.js";import{r as I,t as L}from"./ReadShadowMap.glsl-D-O_pV41.js";import{t as R}from"./MixExternalColor.glsl-D10CKnGR.js";import{t as z}from"./OutputColorHighlightOLID.glsl-C-ItyJSg.js";function B(B){let V=new i,{attributes:H,vertex:U,fragment:W,varyings:G}=V,{output:K,offsetBackfaces:q,pbrMode:J,snowCover:Y,spherical:X}=B,Z=J===1||J===2;if(c(U,B),H.add(`position`,`vec3`),G.add(`vpos`,`vec3`,{invariant:!0}),V.include(g,B),V.include(C,B),V.include(d,B),V.include(p,B),!a(K))return V.include(w,B),V;l(V.vertex,B),V.include(v,B),V.include(T),q&&V.include(b),G.add(`vNormalWorld`,`vec3`),G.add(`localvpos`,`vec3`,{invariant:!0}),V.include(E,B),V.include(S,B),V.include(x,B),V.include(D,B),U.include(m),U.include(h),U.uniforms.add(new u(`externalColor`,e=>e.externalColor,{supportsNaN:!0})),G.add(`vcolorExt`,`vec4`),V.include(B.instancedDoublePrecision?I:L,B),U.main.add(e`
    forwardVertexColor();

    MaskedColor maskedColorExt =
      applySymbolColor(applyVVColor(applyInstanceColor(createMaskedFromNaNColor(externalColor))));

    vcolorExt = maskedColorExt.color;
    forwardColorMixMode(maskedColorExt.mask);

    bool alphaCut = opacityMixMode != ${e.int(s.ignore)} && vcolorExt.a < ${e.float(_)};
    vpos = getVertexInLocalOriginSpace();

    localvpos = vpos - view[3].xyz;
    vpos = subtractOrigin(vpos);
    vNormalWorld = dpNormal(vvLocalNormal(normalModel()));
    vpos = addVerticalOffset(vpos, localOrigin);
    vec4 basePosition = transformPosition(proj, view, vpos);

    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardTextureCoordinates();
    forwardLinearDepthToReadShadowMap();
    gl_Position = alphaCut ? vec4(1e38, 1e38, 1e38, 1.0) :
    ${t(q,`offsetBackfacingClipPosition(basePosition, vpos, vNormalWorld, cameraPosition);`,`basePosition;`)}
  `);let{hasColorTexture:Q,hasColorTextureTransform:$}=B;return W.include(j,B),W.include(k,B),V.include(y,B),W.include(f,B),V.include(z,B),l(W,B),P(W),A(W),M(W),W.uniforms.add(U.uniforms.get(`localOrigin`),U.uniforms.get(`view`),new o(`ambient`,e=>e.ambient),new o(`diffuse`,e=>e.diffuse),new n(`opacity`,e=>e.opacity),new n(`layerOpacity`,e=>e.layerOpacity)),Q&&W.uniforms.add(new r(`tex`,e=>e.texture)),V.include(ee,B),W.include(O,B),W.include(R),W.include(F,B),N(W),W.main.add(e`
      discardBySlice(vpos);
      discardByTerrainDepth();
      vec4 texColor = ${Q?`texture(tex, ${$?`colorUV`:`vuv0`})`:` vec4(1.0)`};
      ${t(Q,`${t(B.textureAlphaPremultiplied,`texColor.rgb /= texColor.a;`)}\n        discardOrAdjustAlpha(texColor);`)}
      vec3 viewDirection = normalize(vpos - cameraPosition);
      applyPBRFactors();
      float ssao = evaluateAmbientOcclusionInverse();
      ssao *= getBakedOcclusion();

      float additionalAmbientScale = additionalDirectedAmbientLight(vpos + localOrigin);
      vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
      float shadow = readShadow(additionalAmbientScale, vpos);
      vec3 matColor = max(ambient, diffuse);
      ${B.hasVertexColors?e`vec3 albedo = mixExternalColor(vColor.rgb * matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(vColor.a * opacity, texColor.a, vcolorExt.a, opacityMixMode);`:e`vec3 albedo = mixExternalColor(matColor, texColor.rgb, vcolorExt.rgb, colorMixMode);
             float opacity_ = layerOpacity * mixExternalOpacity(opacity, texColor.a, vcolorExt.a, opacityMixMode);`}

      vec3 shadingNormal = normalize(vNormalWorld);
      vec3 groundNormal = ${X?`normalize(vpos + localOrigin)`:`vec3(0.0, 0.0, 1.0)`};

      ${t(Y,`vec3 faceNormal = screenDerivativeNormal(vpos);
         float snow = getRealisticTreeSnow(faceNormal, shadingNormal, groundNormal);
         albedo = mix(albedo, vec3(1), snow);`)}

      ${e`albedo *= 1.2;
             vec3 viewForward = vec3(view[0][2], view[1][2], view[2][2]);
             float alignmentLightView = clamp(dot(viewForward, -mainLightDirection), 0.0, 1.0);
             float transmittance = 1.0 - clamp(dot(viewForward, shadingNormal), 0.0, 1.0);
             float treeRadialFalloff = vColor.r;
             float backLightFactor = 0.5 * treeRadialFalloff * alignmentLightView * transmittance * (1.0 - shadow);
             additionalLight += backLightFactor * mainLightIntensity;`}

      ${Z?e`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];
            ${t(Y,`mrr = applySnowToMRR(mrr, snow);`)}
            vec3 shadedColor = evaluateSceneLightingPBR(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight, viewDirection, groundNormal, mrr, additionalAmbientIrradiance);`:e`vec3 shadedColor = evaluateSceneLighting(shadingNormal, albedo, shadow, 1.0 - ssao, additionalLight);`}
      vec4 finalColor = vec4(shadedColor, opacity_);
      outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${t(Y,`, 1.0`)});`),V}var V=Object.freeze(Object.defineProperty({__proto__:null,build:B},Symbol.toStringTag,{value:`Module`}));export{V as n,B as t};