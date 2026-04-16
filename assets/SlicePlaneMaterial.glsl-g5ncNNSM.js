import{n as e}from"./glsl-CHAh5tEH.js";import{t}from"./FloatPassUniform-BGNunQwI.js";import{t as n}from"./ShaderBuilder-HdHfSgzd.js";import{n as r}from"./View.glsl-Cp2_MWNu.js";import{t as i}from"./Float4PassUniform-lh-dPatj.js";function a(a){let o=new n,{vertex:s,fragment:c,attributes:l,varyings:u}=o;return r(s,a),l.add(`position`,`vec3`),l.add(`uv0`,`vec2`),u.add(`vUV`,`vec2`),s.main.add(e`vUV = uv0;
gl_Position = proj * view * vec4(position, 1.0);`),c.uniforms.add(new i(`backgroundColor`,e=>e.backgroundColor),new i(`gridColor`,e=>e.gridColor),new t(`gridWidth`,e=>e.gridWidth)).main.add(e`const float LINE_WIDTH = 1.0;
vec2 uvScaled = vUV * gridWidth;
vec2 gridUV = (fract(uvScaled + 0.5) - 0.5) / (LINE_WIDTH * fwidth(uvScaled));
vec2 grid = (1.0 - step(0.5, gridUV)) * step(-0.5, gridUV);
grid.x *= step(0.5, uvScaled.x) * step(uvScaled.x, gridWidth - 0.5);
grid.y *= step(0.5, uvScaled.y) * step(uvScaled.y, gridWidth - 0.5);
float gridFade = max(grid.x, grid.y);
float gridAlpha = gridColor.a * gridFade;
fragColor =
vec4(backgroundColor.rgb * backgroundColor.a, backgroundColor.a) * (1.0 - gridAlpha) +
vec4(gridColor.rgb, 1.0) * gridAlpha;`),o}var o=Object.freeze(Object.defineProperty({__proto__:null,build:a},Symbol.toStringTag,{value:`Module`}));export{o as n,a as t};