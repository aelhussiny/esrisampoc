import{n as e}from"./glsl-CHAh5tEH.js";import{t}from"./ShaderBuilder-HdHfSgzd.js";import{n}from"./View.glsl-Cp2_MWNu.js";import{t as r}from"./Float4PassUniform-lh-dPatj.js";import{n as i}from"./Slice.glsl-DBgCgV7T.js";import{t as a}from"./ObjectAndLayerIdColor.glsl-JVSocln4.js";import{t as o}from"./TerrainDepthTest.glsl-BvZ9_Dq8.js";import{t as s}from"./VisualVariables.glsl-CRqOZp2t.js";import{t as c}from"./ColorConversion.glsl-CX15PnV2.js";import{t as l}from"./Transform.glsl-Dg4lcse9.js";import{t as u}from"./VertexColor.glsl-Xzyi-4gM.js";import{t as d}from"./OutputColorHighlightOLID.glsl-C-ItyJSg.js";function f(f){let p=new t,{vertex:m,fragment:h,attributes:g,varyings:_}=p,{hasVVColor:v,hasVertexColors:y}=f;return n(m,f),p.include(l),p.include(u,f),p.include(s,f),p.include(a,f),h.include(i,f),p.include(d,f),p.include(o,f),g.add(`position`,`vec3`),v&&g.add(`colorFeatureAttribute`,`float`),y||_.add(`vColor`,`vec4`),_.add(`vpos`,`vec3`,{invariant:!0}),m.uniforms.add(new r(`uColor`,e=>e.color)),m.main.add(e`
      vpos = position;
      forwardVertexColor();
      forwardObjectAndLayerIdColor();

      ${y?`vColor *= uColor;`:v?`vColor = uColor * interpolateVVColor(colorFeatureAttribute);`:`vColor = uColor;`}
      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
      gl_Position = transformPosition(proj, view, vpos);`),h.include(c),h.main.add(e`discardBySlice(vpos);
discardByTerrainDepth();
outputColorHighlightOLID(applySlice(vColor, vpos), vColor.rgb);`),p}var p=Object.freeze(Object.defineProperty({__proto__:null,build:f},Symbol.toStringTag,{value:`Module`}));export{p as n,f as t};