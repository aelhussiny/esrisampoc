import{n as e,t}from"./glsl-CHAh5tEH.js";import{t as n}from"./FloatPassUniform-BGNunQwI.js";import{t as r}from"./Texture2DPassUniform-DQ1HS8F6.js";import{t as i}from"./NoParameters-x88d7FbV.js";import{t as a}from"./ShaderBuilder-HdHfSgzd.js";import{n as o}from"./View.glsl-Cp2_MWNu.js";import{n as s}from"./Slice.glsl-DBgCgV7T.js";import{t as c}from"./TerrainDepthTest.glsl-BvZ9_Dq8.js";import{t as l}from"./ColorConversion.glsl-CX15PnV2.js";import{t as u}from"./Transform.glsl-Dg4lcse9.js";import{t as d}from"./OutputColorHighlightOLID.glsl-C-ItyJSg.js";var f=class extends i{};function p(i){let f=new a,{vertex:p,fragment:m,varyings:h}=f,{output:g,perspectiveInterpolation:_}=i;return o(p,i),f.include(u),f.include(c,i),f.fragment.include(s,i),f.fragment.code.add(e`void outputObjectAndLayerIdColor() {
    ${t(g===9,`fragColor = vec4(0, 0, 0, 1);`)}
    }`),f.include(d,i),f.attributes.add(`position`,`vec3`),f.attributes.add(`uv0`,`vec2`),_&&f.attributes.add(`perspectiveDivide`,`float`),p.main.add(e`
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    vTexCoord = uv0;
    gl_Position = transformPosition(proj, view, vpos);
    ${t(_,`gl_Position *= perspectiveDivide;`)}`),h.add(`vpos`,`vec3`,{invariant:!0}),h.add(`vTexCoord`,`vec2`),m.include(l),m.uniforms.add(new n(`opacity`,e=>e.opacity),new r(`tex`,e=>e.texture)).main.add(e`discardBySlice(vpos);
discardByTerrainDepth();
vec4 finalColor = texture(tex, vTexCoord) * opacity;
outputColorHighlightOLID(applySlice(finalColor, vpos), finalColor.rgb);`),f}var m=Object.freeze(Object.defineProperty({__proto__:null,ImageMaterialPassParameters:f,build:p},Symbol.toStringTag,{value:`Module`}));export{m as n,f as r,p as t};