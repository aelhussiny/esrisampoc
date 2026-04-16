import{n as e,t}from"./glsl-CHAh5tEH.js";import{t as n}from"./FloatPassUniform-BGNunQwI.js";import{t as r}from"./Texture2DPassUniform-DQ1HS8F6.js";import{o as i}from"./ShaderOutput-DU78wUba.js";import{t as a}from"./Float3PassUniform-DL2u3U8R.js";import{t as o}from"./Float3DrawUniform-CQvYVn43.js";import{t as s}from"./FloatDrawUniform-BR6iVXLq.js";import{t as c}from"./Texture2DDrawUniform-BDXvI_a4.js";import{t as l}from"./Gamma.glsl-emcdhrPb.js";function u(t,n){switch(n.textureCoordinateType){case 1:t.attributes.add(`uv0`,`vec2`),t.varyings.add(`vuv0`,`vec2`),t.vertex.code.add(e`void forwardTextureCoordinates() { vuv0 = uv0; }`);return;case 2:t.attributes.add(`uv0`,`vec2`),t.attributes.add(`uvRegion`,`vec4`),t.varyings.add(`vuv0`,`vec2`),t.varyings.add(`vuvRegion`,`vec4`),t.vertex.code.add(e`void forwardTextureCoordinates() {
vuv0 = uv0;
vuvRegion = uvRegion;
}`);return;default:n.textureCoordinateType;case 0:t.vertex.code.add(e`void forwardTextureCoordinates() {}`);return;case 3:return}}function d(t){t.fragment.code.add(e`vec4 textureAtlasLookup(sampler2D tex, vec2 textureCoordinates, vec4 atlasRegion) {
vec2 atlasScale = atlasRegion.zw - atlasRegion.xy;
vec2 uvAtlas = fract(textureCoordinates) * atlasScale + atlasRegion.xy;
float maxdUV = 0.125;
vec2 dUVdx = clamp(dFdx(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
vec2 dUVdy = clamp(dFdy(textureCoordinates), -maxdUV, maxdUV) * atlasScale;
return textureGrad(tex, uvAtlas, dUVdx, dUVdy);
}`)}function f(t,n){let{textureCoordinateType:r}=n;if(r===0||r===3)return;t.include(u,n);let i=r===2;i&&t.include(d),t.fragment.code.add(e`
    vec4 textureLookup(sampler2D tex, vec2 uv) {
      return ${i?`textureAtlasLookup(tex, uv, vuvRegion)`:`texture(tex, uv)`};
    }
  `)}function p(u,d){if(!i(d.output))return;u.fragment.include(l);let{emissionSource:p,hasEmissiveTextureTransform:m,bindType:h}=d,g=p===3||p===4||p===5;g&&(u.include(f,d),u.fragment.uniforms.add(h===1?new r(`texEmission`,e=>e.textureEmissive):new c(`texEmission`,e=>e.textureEmissive)));let _=p===2||g;_&&u.fragment.uniforms.add(h===1?new a(`emissiveBaseColor`,e=>e.emissiveBaseColor):new o(`emissiveBaseColor`,e=>e.emissiveBaseColor));let v=p!==0;v&&!(p===7||p===6||p===4||p===5)&&u.fragment.uniforms.add(h===1?new n(`emissiveStrength`,e=>e.emissiveStrength??0):new s(`emissiveStrength`,e=>e.emissiveStrength??0));let y=p===7,b=p===5,x=p===1||p===6||y;u.fragment.code.add(e`
    vec4 getEmissions(vec3 symbolColor) {
      vec4 emissions = ${_?b?`emissiveSource == 0 ? vec4(emissiveBaseColor, 1.0): vec4(linearizeGamma(symbolColor), 1.0)`:`vec4(emissiveBaseColor, 1.0)`:x?y?`emissiveSource == 0 ? vec4(0.0): vec4(linearizeGamma(symbolColor), 1.0)`:`vec4(linearizeGamma(symbolColor), 1.0)`:`vec4(0.0)`};
      ${t(g,`${t(b,`if(emissiveSource == 0) {\n              vec4 emissiveFromTex = textureLookup(texEmission, ${m?`emissiveUV`:`vuv0`});\n              emissions *= vec4(linearizeGamma(emissiveFromTex.rgb), emissiveFromTex.a);\n           }`,`vec4 emissiveFromTex = textureLookup(texEmission, ${m?`emissiveUV`:`vuv0`});\n           emissions *= vec4(linearizeGamma(emissiveFromTex.rgb), emissiveFromTex.a);`)}\n        emissions.w = emissions.rgb == vec3(0.0) ? 0.0: emissions.w;`)}
      ${t(v,`emissions.rgb *= emissiveStrength * ${e.float(1)};`)}
      return emissions;
    }
  `)}export{f as n,u as r,p as t};