import{n as e,t}from"./glsl-CHAh5tEH.js";import{t as n}from"./Texture2DPassUniform-DQ1HS8F6.js";import"./NoParameters-x88d7FbV.js";import{t as r}from"./Float3PassUniform-DL2u3U8R.js";import{t as i}from"./Float3DrawUniform-CQvYVn43.js";import{t as a}from"./FloatBindUniform-Dxcf3oBX.js";import"./pbrUtils-DO1qJrDY.js";import{n as o}from"./Emissions.glsl-DIBswxV8.js";import{t as s}from"./Texture2DDrawUniform-BDXvI_a4.js";function c(a,c){let l=c.pbrMode,u=a.fragment;if(l!==2&&l!==0&&l!==1)return void u.code.add(e`void applyPBRFactors() {}`);if(l===0)return void u.code.add(e`void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);if(l===2)return void u.code.add(e`vec3 mrr = vec3(0.0, 0.6, 0.2);
float occlusion = 1.0;
void applyPBRFactors() {}
float getBakedOcclusion() { return 1.0; }`);let{hasMetallicRoughnessTexture:d,hasMetallicRoughnessTextureTransform:f,hasOcclusionTexture:p,hasOcclusionTextureTransform:m,bindType:h}=c;(d||p)&&a.include(o,c),u.code.add(e`vec3 mrr;
float occlusion;`),d&&u.uniforms.add(h===1?new n(`texMetallicRoughness`,e=>e.textureMetallicRoughness):new s(`texMetallicRoughness`,e=>e.textureMetallicRoughness)),p&&u.uniforms.add(h===1?new n(`texOcclusion`,e=>e.textureOcclusion):new s(`texOcclusion`,e=>e.textureOcclusion)),u.uniforms.add(h===1?new r(`mrrFactors`,e=>e.mrrFactors):new i(`mrrFactors`,e=>e.mrrFactors)),u.code.add(e`
    ${t(d,e`void applyMetallicRoughness(vec2 uv) {
            vec3 metallicRoughness = textureLookup(texMetallicRoughness, uv).rgb;
            mrr[0] *= metallicRoughness.b;
            mrr[1] *= metallicRoughness.g;
          }`)}

    ${t(p,`void applyOcclusion(vec2 uv) { occlusion *= textureLookup(texOcclusion, uv).r; }`)}

    float getBakedOcclusion() {
      return ${p?`occlusion`:`1.0`};
    }

    void applyPBRFactors() {
      mrr = mrrFactors;
      occlusion = 1.0;

      ${t(d,`applyMetallicRoughness(${f?`metallicRoughnessUV`:`vuv0`});`)}
      ${t(p,`applyOcclusion(${m?`occlusionUV`:`vuv0`});`)}
    }
  `)}function l(t,n){n.snowCover&&(t.uniforms.add(new a(`snowCover`,e=>e.snowCover)).code.add(e`float getSnow(vec3 normal, vec3 groundNormal) {
return smoothstep(0.5, 0.55, dot(normal, groundNormal)) * snowCover;
}
float getRealisticTreeSnow(vec3 faceNormal, vec3 shadingNormal, vec3 groundNormal) {
float snow = min(1.0, smoothstep(0.5, 0.55, dot(faceNormal, groundNormal)) +
smoothstep(0.5, 0.55, dot(-faceNormal, groundNormal)) +
smoothstep(0.0, 0.1, dot(shadingNormal, groundNormal)));
return snow * snowCover;
}`),t.code.add(e`vec3 applySnowToMRR(vec3 mrr, float snow) {
return mix(mrr, vec3(0.0, 1.0, 0.04), snow);
}`))}export{c as n,l as t};