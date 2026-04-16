import{a as e}from"./vec4f64-Bge3Qg6c.js";import{n as t}from"./glsl-CHAh5tEH.js";import{t as n}from"./ScreenSpacePass.glsl-BQuyCpqA.js";import{t as r}from"./FloatPassUniform-BGNunQwI.js";import{t as i}from"./Texture2DPassUniform-DQ1HS8F6.js";import{t as a}from"./NoParameters-x88d7FbV.js";import{t as o}from"./ShaderBuilder-HdHfSgzd.js";import{t as s}from"./Float4PassUniform-lh-dPatj.js";var c=class extends a{constructor(){super(...arguments),this.borderColor=e()}};function l(){let e=new o;return e.include(n),e.outputs.add(`fragColor`,`vec4`,0),e.fragment.uniforms.add(new i(`colorTexture`,e=>e.color),new i(`cutFillVolumes`,e=>e.cutFillVolumes),new i(`cutFillMask`,e=>e.cutFillMask),new r(`pixelRatio`,(e,t)=>t.camera.pixelRatio),new s(`borderColor`,e=>e.borderColor)).main.add(t`vec4 color = texture(colorTexture, uv, 0.0);
vec4 volumesColor = texture(cutFillVolumes, uv, 0.0);
ivec2 iuv = ivec2(uv * vec2(textureSize(cutFillMask, 0)));
vec2 m0 = texelFetch(cutFillMask, iuv, 0).rg;
vec2 m1 = texelFetch(cutFillMask, iuv + ivec2(-1, 0), 0).rg;
vec2 m2 = texelFetch(cutFillMask, iuv + ivec2(1, 0), 0).rg;
vec2 m3 = texelFetch(cutFillMask, iuv + ivec2(0, -1), 0).rg;
vec2 m4 = texelFetch(cutFillMask, iuv + ivec2(0, 1), 0).rg;
float d = (
step(1.5, abs(m0.r - m1.r) + abs(m0.g - m1.g))
+ step(1.5, abs(m0.r - m2.r) + abs(m0.g - m2.g))
+ step(1.5, abs(m0.r - m3.r) + abs(m0.g - m3.g))
+ step(1.5, abs(m0.r - m4.r) + abs(m0.g - m4.g))
) * 0.25 * pixelRatio;
vec4 base = mix(color, volumesColor, max(m0.r, m0.g) * volumesColor.a);
fragColor = mix(base, borderColor, d);`),e}var u=Object.freeze(Object.defineProperty({__proto__:null,CutFillCompositionPassParameters:c,build:l},Symbol.toStringTag,{value:`Module`}));export{c as n,u as r,l as t};