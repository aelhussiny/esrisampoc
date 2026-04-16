import{n as e}from"./glsl-CHAh5tEH.js";import{t}from"./ScreenSpacePass.glsl-BQuyCpqA.js";import{t as n}from"./ShaderBuilder-HdHfSgzd.js";import{t as r}from"./Texture2DBindUniform-PM77Echq.js";import{n as i,t as a}from"./Texture2DShadowBindUniform-Co6lhunb.js";import{t as o}from"./calculateUVZShadowFromDepth.glsl-DGXfZqr9.js";var s=255,c=1/255;function l(s){let l=new n,{fragment:u}=l;l.include(t),l.include(o),l.include(i),u.uniforms.add(new a(`shadowMap`,e=>e.shadowMap.depthTexture),new r(`depthMap`,e=>e.depth?.attachment)),u.constants.add(`sampleValue`,`float`,c);let d=s.index===1?`vec2`:`float`;return l.outputs.add(`sampleCount`,d),u.main.add(e`
    sampleCount = ${d}(0.0);

    vec3 uvzShadow = calculateUVZShadowFromDepth(uv, textureSize(shadowMap,0), depthMap);
    if (uvzShadow.z < 0.0) {
      return;
    }

    // The shadow map sampler returns a value between 0 and 1, we take the midpoint as we count discrete samples
    bool shadow = readShadowMapUVZ(uvzShadow, shadowMap) > 0.5;

    if (shadow) {
      sampleCount = ${d}(sampleValue); // Add 1 to the sample count
    }
  `),l}var u=Object.freeze(Object.defineProperty({__proto__:null,ShadowCastMaxSamples:255,build:l},Symbol.toStringTag,{value:`Module`}));export{s as n,u as r,l as t};