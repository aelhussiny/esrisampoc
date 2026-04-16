import{n as e}from"./glsl-CHAh5tEH.js";import{t}from"./ScreenSpacePass.glsl-BQuyCpqA.js";import{t as n}from"./Texture2DPassUniform-DQ1HS8F6.js";import{t as r}from"./NoParameters-x88d7FbV.js";import{t as i}from"./ShaderBuilder-HdHfSgzd.js";import{t as a}from"./RgbNormalizedDepthEncoding.glsl-n9yHevrf.js";var o=class extends r{};function s(){let r=new i;r.include(t);let o=r.fragment;return o.uniforms.add(new n(`splatOutputDepth`,e=>e.splatDepth)),o.include(a),o.main.add(e`vec4 splatDepth = texture(splatOutputDepth, uv);
float depth = decodeRGBToNormalizedDepth(splatDepth.xyz);
if(splatDepth.a < 1.0) {
discard;
}
gl_FragDepth = depth;`),r}var c=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatDepthCompositionPassParameters:o,build:s},Symbol.toStringTag,{value:`Module`}));export{s as n,c as r,o as t};