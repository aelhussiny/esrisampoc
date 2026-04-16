import{a as e}from"./vec4f64-Bge3Qg6c.js";import{n as t,t as n}from"./glsl-CHAh5tEH.js";import{t as r}from"./FloatPassUniform-BGNunQwI.js";import{t as i}from"./ShaderBuilder-HdHfSgzd.js";import{t as a}from"./Float3PassUniform-DL2u3U8R.js";import{t as o}from"./FloatBindUniform-Dxcf3oBX.js";import{n as s,r as c,t as l}from"./View.glsl-Cp2_MWNu.js";import{t as u}from"./Float4PassUniform-lh-dPatj.js";import{n as d}from"./Slice.glsl-DBgCgV7T.js";import{t as f}from"./TerrainDepthTest.glsl-BvZ9_Dq8.js";import{t as p}from"./ColorConversion.glsl-CX15PnV2.js";import{t as m}from"./Transform.glsl-Dg4lcse9.js";import{t as h}from"./OutputColorHighlightOLID.glsl-C-ItyJSg.js";function g(e,n){if(!n.screenSizeEnabled)return;let i=e.vertex;l(i,n),i.uniforms.add(new o(`perScreenPixelRatio`,e=>e.camera.perScreenPixelRatio),new r(`screenSizeScale`,e=>e.screenSizeScale)).code.add(t`float computeRenderPixelSizeAt( vec3 pWorld ){
vec3 viewForward = - vec3(view[0][2], view[1][2], view[2][2]);
float viewDirectionDistance = abs(dot(viewForward, pWorld - cameraPosition));
return viewDirectionDistance * perScreenPixelRatio;
}
vec3 screenSizeScaling(vec3 position, vec3 anchor){
return position * screenSizeScale * computeRenderPixelSizeAt(anchor) + anchor;
}`)}function _(e){let r=new i;r.include(m),r.include(g,e),r.fragment.include(d,e),r.include(h,e),r.include(f,e);let{vertex:o,fragment:l}=r;return l.include(p),s(o,e),l.uniforms.add(new u(`uColor`,e=>e.color)),r.attributes.add(`position`,`vec3`),r.varyings.add(`vWorldPosition`,`vec3`),e.screenSizeEnabled&&r.attributes.add(`offset`,`vec3`),e.shadingEnabled&&(c(o),r.attributes.add(`normal`,`vec3`),r.varyings.add(`vViewNormal`,`vec3`),l.uniforms.add(new a(`shadingDirection`,e=>e.shadingDirection)),l.uniforms.add(new u(`shadedColor`,e=>v(e.shadingTint,e.color)))),o.main.add(t`
    vWorldPosition = ${e.screenSizeEnabled?t`screenSizeScaling(offset, position)`:t`position`};
    ${n(e.shadingEnabled,t`vec3 worldNormal = normal;
           vViewNormal = (viewNormal * vec4(worldNormal, 1)).xyz;`)}
    forwardViewPosDepth((view * vec4(vWorldPosition, 1.0)).xyz);
    gl_Position = transformPosition(proj, view, vWorldPosition);
  `),l.main.add(t`
      discardBySlice(vWorldPosition);
      discardByTerrainDepth();
      ${e.shadingEnabled?t`vec3 viewNormalNorm = normalize(vViewNormal);
             float shadingFactor = 1.0 - clamp(-dot(viewNormalNorm, shadingDirection), 0.0, 1.0);
             vec4 finalColor = mix(uColor, shadedColor, shadingFactor);`:t`vec4 finalColor = uColor;`}
      outputColorHighlightOLID(applySlice(finalColor, vWorldPosition), finalColor.rgb);`),r}function v(e,t){let n=1-e[3],r=e[3]+t[3]*n;return r===0?(y[3]=r,y):(y[0]=(e[0]*e[3]+t[0]*t[3]*n)/r,y[1]=(e[1]*e[3]+t[1]*t[3]*n)/r,y[2]=(e[2]*e[3]+t[2]*t[3]*n)/r,y[3]=t[3],y)}var y=e(),b=Object.freeze(Object.defineProperty({__proto__:null,build:_},Symbol.toStringTag,{value:`Module`}));export{_ as n,b as t};