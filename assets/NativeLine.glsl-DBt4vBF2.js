import{n as e}from"./glsl-CHAh5tEH.js";import{t}from"./ShaderBuilder-HdHfSgzd.js";import{n}from"./View.glsl-Cp2_MWNu.js";import{t as r}from"./Float4PassUniform-lh-dPatj.js";import{n as i}from"./Slice.glsl-DBgCgV7T.js";import{t as a}from"./Transform.glsl-Dg4lcse9.js";import{t as o}from"./VertexColor.glsl-Xzyi-4gM.js";import{t as s}from"./OutputColorHighlightOLID.glsl-C-ItyJSg.js";function c(c){let l=new t,{vertex:u,fragment:d,varyings:f}=l;return l.fragment.include(i,c),l.include(a),l.include(o,c),l.include(s,c),n(u,c),l.attributes.add(`position`,`vec3`),f.add(`vpos`,`vec3`,{invariant:!0}),u.main.add(e`vpos = position;
forwardVertexColor();
gl_Position = transformPosition(proj, view, vpos);`),c.hasVertexColors||d.uniforms.add(new r(`constantColor`,e=>e.color)),d.main.add(e`
    discardBySlice(vpos);
    vec4 color = ${c.hasVertexColors?`vColor`:`constantColor`};
    outputColorHighlightOLID(applySlice(color, vpos), color.rgb);
  `),l}var l=Object.freeze(Object.defineProperty({__proto__:null,build:c},Symbol.toStringTag,{value:`Module`}));export{l as n,c as t};