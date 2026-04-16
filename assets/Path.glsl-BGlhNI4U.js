import{o as e}from"./vec2f64-vR6k7VCu.js";import{n as t,t as n}from"./glsl-CHAh5tEH.js";import{t as r}from"./Float2PassUniform-C0auDrhO.js";import{t as i}from"./FloatPassUniform-BGNunQwI.js";import{t as a}from"./ShaderBuilder-HdHfSgzd.js";import{o}from"./ShaderOutput-DU78wUba.js";import{t as s}from"./Float3PassUniform-DL2u3U8R.js";import{n as c,t as l}from"./VisualVariablePassParameters-BOBtYkZy.js";import{n as u,r as d,t as f}from"./View.glsl-Cp2_MWNu.js";import{t as p}from"./Float4PassUniform-lh-dPatj.js";import{n as m}from"./Slice.glsl-DBgCgV7T.js";import{t as h}from"./ObjectAndLayerIdColor.glsl-JVSocln4.js";import{t as g}from"./TerrainDepthTest.glsl-BvZ9_Dq8.js";import{t as _}from"./OutputHighlight.glsl-DTZ8zYnI.js";import{t as v}from"./FloatsPassUniform-BGlxT3as.js";import{t as y}from"./ColorConversion.glsl-CX15PnV2.js";import{n as b}from"./ForwardLinearDepthToWriteShadowMap.glsl-t_cH3_yp.js";import{t as x}from"./Transform.glsl-Dg4lcse9.js";import{t as S}from"./OutputDepth.glsl-C5pfga22.js";import{i as C,n as w,r as T,t as E}from"./EvaluateSceneLighting.glsl-DBOQi6Gp.js";import{n as D}from"./MainLighting.glsl-BAv0DWEY.js";import{t as O}from"./Normals.glsl-YdGw7t9A.js";import{n as k,t as A}from"./SnowCover.glsl-CPagf_-_.js";import{t as j}from"./ReadShadowMap.glsl-D-O_pV41.js";import{t as M}from"./OutputColorHighlightOLID.glsl-C-ItyJSg.js";import{bt as N}from"./index-gOtVMHtj.js";var P=8;function F(e,a){let{attributes:o,vertex:l}=e;o.add(`position`,`vec3`),o.add(`profileVertexAndNormal`,`vec4`),o.add(`profileAuxData`,`vec3`),o.add(`profileRight`,`vec2`),o.add(`profileUp`,`vec2`),l.code.add(t`bool isCapVertex() {
return profileAuxData.z == 1.0;
}`),l.uniforms.add(new r(`size`,e=>e.size));let{hasVVSize:u,hasVVColor:d,hasVVOpacity:f}=a;u?(o.add(`sizeFeatureAttribute`,`float`),l.uniforms.add(new s(`vvSizeMinSize`,e=>e.vvSize.minSize),new s(`vvSizeMaxSize`,e=>e.vvSize.maxSize),new s(`vvSizeOffset`,e=>e.vvSize.offset),new s(`vvSizeFactor`,e=>e.vvSize.factor),new s(`vvSizeFallback`,e=>e.vvSize.fallback)),l.code.add(t`vec2 getSize() {
float value = sizeFeatureAttribute;
if (isnan(value)) {
return vvSizeFallback.xz;
}
return size * clamp(vvSizeOffset + value * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).xz;
}`)):l.code.add(t`vec2 getSize(){
return size;
}`),f?(o.add(`opacityFeatureAttribute`,`float`),l.constants.add(`vvOpacityNumber`,`int`,P),l.uniforms.add(new v(`vvOpacityValues`,P,e=>e.vvOpacity.values),new v(`vvOpacityOpacities`,P,e=>e.vvOpacity.opacityValues),new i(`vvOpacityFallback`,e=>e.vvOpacity.fallback,{supportsNaN:!0})),l.code.add(t`
    vec4 applyOpacity(vec4 color) {
      // if we encounter NaN in the color it means the color is in the fallback case where the symbol color
      // is not defined and there is no valid color visual variable override. In this case just return a fully
      // transparent color
      if (isnan(color.r)) {
        return vec4(0);
      }

      float value = opacityFeatureAttribute;

      if (isnan(value)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${n(d,`color`,`vec4(color.rgb, vvOpacityFallback)`)};
      }

      if (value <= vvOpacityValues[0]) {
        return vec4(color.rgb, vvOpacityOpacities[0]);
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return vec4(color.rgb, mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f));
        }
      }

      return vec4( color.rgb, vvOpacityOpacities[vvOpacityNumber - 1]);
    }
    `)):l.code.add(t`vec4 applyOpacity(vec4 color){
return color;
}`),d?(o.add(`colorFeatureAttribute`,`float`),l.constants.add(`vvColorNumber`,`int`,8),l.uniforms.add(new v(`vvColorValues`,8,e=>e.vvColor.values),new c(`vvColorColors`,8,e=>e.vvColor.colors),new p(`vvColorFallback`,e=>e.vvColor.fallback)),l.code.add(t`vec4 getColor() {
float value = colorFeatureAttribute;
if (isnan(value)) {
return applyOpacity(vvColorFallback);
}
if (value <= vvColorValues[0]) {
return applyOpacity(vvColorColors[0]);
}
for (int i = 1; i < vvColorNumber; ++i) {
if (vvColorValues[i] >= value) {
float f = (value - vvColorValues[i-1]) / (vvColorValues[i] - vvColorValues[i-1]);
return applyOpacity(mix(vvColorColors[i-1], vvColorColors[i], f));
}
}
return applyOpacity(vvColorColors[vvColorNumber - 1]);
}`)):l.code.add(t`vec4 getColor(){
return applyOpacity(vec4(1, 1, 1, 1));
}`),l.code.add(t`vec3 decompressAxis(vec2 axis) {
float z = 1.0 - abs(axis.x) - abs(axis.y);
return normalize(vec3(axis + sign(axis) * min(z, 0.0), z));
}
vec3 calculateVPos() {
vec2 size = getSize();
vec3 origin = position;
vec3 right = decompressAxis(profileRight);
vec3 up = decompressAxis(profileUp);
vec2 profileVertex = profileVertexAndNormal.xy * size;`),l.code.add(t`if(isCapVertex()) {
float positionOffsetAlongProfilePlaneNormal = profileAuxData.x * size[0];
vec3 forward = cross(up, right);
vec3 offset = right * profileVertex.x + up * profileVertex.y + forward * positionOffsetAlongProfilePlaneNormal;
return origin + offset;
}
vec2 rotationRight = vec2(profileAuxData.x, profileAuxData.y);
float maxDistance = length(rotationRight);`),l.code.add(t`rotationRight = maxDistance > 0.0 ? normalize(rotationRight) : vec2(0, 0);
float rx = dot(profileVertex, rotationRight);
if (abs(rx) > maxDistance) {
vec2 rotationUp = vec2(-rotationRight.y, rotationRight.x);
float ry = dot(profileVertex, rotationUp);
profileVertex = rotationRight * maxDistance * sign(rx) + rotationUp * ry;
}
vec3 offset = right * profileVertex.x + up * profileVertex.y;
return origin + offset;
}`),l.code.add(t`vec3 localNormal() {
vec3 right = decompressAxis(profileRight);
vec3 up = decompressAxis(profileUp);
vec3 normal = right * profileVertexAndNormal.z + up * profileVertexAndNormal.w;
if(isCapVertex()) {
vec3 forward = cross(up, right);
normal += forward * profileAuxData.y;
}
return normal;
}`)}var I=class extends l{constructor(){super(...arguments),this.size=e(1,1)}};function L(e){let r=new a,{vertex:c,fragment:l,varyings:p}=r;u(c,e),p.add(`vpos`,`vec3`,{invariant:!0}),r.include(F,e);let{output:v,spherical:P,pbrMode:I,snowCover:L}=e;switch((o(v)||v===9)&&(r.include(x),r.include(j,e),r.include(h,e),r.include(g,e),p.add(`vnormal`,`vec3`),p.add(`vcolor`,`vec4`),c.main.add(t`vpos = calculateVPos();
vnormal = normalize(localNormal());
forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);
forwardObjectAndLayerIdColor();
vcolor = getColor();
forwardLinearDepthToReadShadowMap();`)),v){case 0:r.include(k,e),l.include(T,e),l.include(C,e),r.include(O,e),l.include(m,e),r.include(M,e),f(l,e),w(l),E(l),l.uniforms.add(c.uniforms.get(`localOrigin`),new s(`ambient`,e=>e.ambient),new s(`diffuse`,e=>e.diffuse),new i(`opacity`,e=>e.opacity)),l.include(y),l.include(A,e),D(l),l.main.add(t`
        discardBySlice(vpos);
        discardByTerrainDepth();

        shadingParams.viewDirection = normalize(vpos - cameraPosition);
        shadingParams.normalView = vnormal;
        vec3 normal = shadingNormal(shadingParams);
        float ssao = evaluateAmbientOcclusionInverse();

        vec3 posWorld = vpos + localOrigin;
        vec3 normalGround = ${P?`normalize(posWorld);`:`vec3(0.0, 0.0, 1.0);`}

        vec3 albedo = vcolor.rgb * max(ambient, diffuse); // combine the old material parameters into a single one
        float combinedOpacity = vcolor.a * opacity;

        ${n(L,t`float snow = getSnow(normal, normalGround);
                 albedo = mix(albedo, vec3(1), snow);
                 ssao = mix(ssao, 1.0, snow);`)}

        float additionalAmbientScale = additionalDirectedAmbientLight(posWorld);
        vec3 additionalLight = ssao * mainLightIntensity * additionalAmbientScale * ambientBoostFactor * lightingGlobalFactor;
        float shadow = readShadow(additionalAmbientScale, vpos);

        ${n(I===2,`float additionalAmbientIrradiance = additionalAmbientIrradianceFactor * mainLightIntensity[2];\n           ${n(L,`mrr = applySnowToMRR(mrr, snow);`)}`)}

        vec3 shadedColor = ${I===2?`evaluateSceneLightingPBR(normal, albedo, shadow, 1.0 - ssao, additionalLight, shadingParams.viewDirection, normalGround, mrr, additionalAmbientIrradiance);`:`evaluateSceneLighting(normal, albedo, shadow, 1.0 - ssao, additionalLight);`}
        vec4 finalColor = vec4(shadedColor, combinedOpacity);
        outputColorHighlightOLID(applySlice(finalColor, vpos), albedo ${n(L,`, snow`)});`);break;case 1:r.include(x),c.main.add(t`vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);`),r.fragment.include(m,e),l.main.add(t`discardBySlice(vpos);`);break;case 3:case 4:case 5:case 6:r.include(x),b(r),p.add(`depth`,`float`),c.main.add(t`vpos = calculateVPos();
gl_Position = transformPositionWithDepth(proj, view, vpos, nearFar, depth);`),r.fragment.include(m,e),r.include(S,e),l.main.add(t`discardBySlice(vpos);
outputDepth(depth);`);break;case 9:r.fragment.include(m,e),l.main.add(t`discardBySlice(vpos);
outputObjectAndLayerIdColor();`);break;case 2:r.include(x),r.include(N,e),d(c),p.add(`vnormal`,`vec3`),c.main.add(t`vpos = calculateVPos();
vnormal = normalize((viewNormal * vec4(localNormal(), 1.0)).xyz);
gl_Position = transformPosition(proj, view, vpos);`),r.fragment.include(m,e),l.main.add(t`discardBySlice(vpos);
vec3 normal = normalize(vnormal);
if (gl_FrontFacing == false) normal = -normal;
fragColor = vec4(vec3(0.5) + 0.5 * normal, 1.0);`);break;case 8:r.include(x),r.include(N,e),p.add(`vnormal`,`vec3`),c.main.add(t`vpos = calculateVPos();
gl_Position = transformPosition(proj, view, vpos);`),r.fragment.include(m,e),r.include(_,e),l.main.add(t`discardBySlice(vpos);
calculateOcclusionAndOutputHighlight();`)}return r}var R=Object.freeze(Object.defineProperty({__proto__:null,build:L},Symbol.toStringTag,{value:`Module`}));export{R as n,I as r,L as t};