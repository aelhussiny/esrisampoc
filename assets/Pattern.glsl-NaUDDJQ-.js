import{r as e}from"./tslib.es6-CQo_GpaT.js";import{n as t,t as n}from"./glsl-CHAh5tEH.js";import{t as r}from"./ShaderBuilder-HdHfSgzd.js";import{n as i}from"./ShaderTechniqueConfiguration-CH-PemgK.js";import{n as a}from"./InterleavedLayout-VhqIsOY7.js";import{t as o}from"./olidUtils-DjPQ0Lrs.js";import{t as s}from"./FloatBindUniform-Dxcf3oBX.js";import{n as c,t as l}from"./View.glsl-Cp2_MWNu.js";import{t as u}from"./Float4PassUniform-lh-dPatj.js";import{n as d}from"./Slice.glsl-DBgCgV7T.js";import{t as f}from"./DefaultTechniqueConfiguration-DgQ6WplS.js";import{t as p}from"./ObjectAndLayerIdColor.glsl-JVSocln4.js";import{t as m}from"./TerrainDepthTest.glsl-BvZ9_Dq8.js";import{t as h}from"./VisualVariables.glsl-CRqOZp2t.js";import{t as g}from"./ColorConversion.glsl-CX15PnV2.js";import{t as _}from"./Transform.glsl-Dg4lcse9.js";import{t as v}from"./VertexColor.glsl-Xzyi-4gM.js";import{t as y}from"./OutputColorHighlightOLID.glsl-C-ItyJSg.js";import{t as b}from"./TextureBackedBufferLayout-RMP2h5dM.js";import{G as x,K as S}from"./index-gOtVMHtj.js";var C=class extends f{constructor(){super(...arguments),this.cullFace=0,this.style=0,this.hasVertexColors=!1,this.polygonOffset=!1,this.hasOccludees=!1,this.enableOffset=!0,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.hasVVColor=!1,this.draped=!1,this.textureCoordinateType=0,this.emissionSource=0,this.discardInvisibleFragments=!0,this.writeDepth=!0,this.occlusionPass=!1,this.hasVVInstancing=!1,this.hasVVSize=!1,this.hasVVOpacity=!1,this.overlayEnabled=!1,this.snowCover=!1}};function w(e,t,n,r){return e.draped?null:e.hasVVColor?r:e.hasVertexColors?n:t}e([i({count:3})],C.prototype,`cullFace`,void 0),e([i({count:6})],C.prototype,`style`,void 0),e([i()],C.prototype,`hasVertexColors`,void 0),e([i()],C.prototype,`polygonOffset`,void 0),e([i()],C.prototype,`hasOccludees`,void 0),e([i()],C.prototype,`enableOffset`,void 0),e([i()],C.prototype,`terrainDepthTest`,void 0),e([i()],C.prototype,`cullAboveTerrain`,void 0),e([i()],C.prototype,`hasVVColor`,void 0),e([i()],C.prototype,`draped`,void 0);function T(e){let t=a().vec3f(`position`).vec4f(`uvMapSpace`);return e.draped?e.hasVVColor?t.f32(`colorFeatureAttribute`):e.hasVertexColors&&t.vec4u8(`color`,{glNormalized:!0}):t.u32(`textureElementIndex`,{integer:!0}),o()&&t.vec4u8(`olidColor`),t.freeze()}var E=[{type:`mat3f32`,name:`boundingRect`}],D=new b(E),O=new b([...E,{type:`vec4unorm8`,name:`color`}]),k=new b([...E,{type:`f32`,name:`colorFeatureAttribute`}]);function A(e){return w(e,D,O,k)}var j=new x(`componentTextureBuffer`,e=>e.textureBuffer),M=new S({layout:D,itemIndexAttribute:`textureElementIndex`,bufferUniform:j}),N=new S({layout:O,itemIndexAttribute:`textureElementIndex`,bufferUniform:j}),P=new S({layout:k,itemIndexAttribute:`textureElementIndex`,bufferUniform:j,enableNaNSupport:!0});function F(e){return w(e,M,N,P)}var I=.70710678118,L=I,R=.08715574274,z=10,B=1;function V(e){let i=F(e),a=i!=null,o=new r;a&&o.include(i.TextureBackedBufferModule,e);let{vertex:f,fragment:b,attributes:x,varyings:S}=o,C=e.output===8;c(f,e),o.include(_);let w=``;a?(e.hasVVColor&&(w=i.getTextureAttribute(`colorFeatureAttribute`)),e.hasVertexColors?(o.varyings.add(`vColor`,`vec4`),o.vertex.code.add(t`void forwardVertexColor() { vColor = ${i.getTextureAttribute(`color`)}; }`)):o.vertex.code.add(t`void forwardVertexColor() {}`),x.add(`textureElementIndex`,`uint`)):(o.include(v,e),e.hasVVColor&&(x.add(`colorFeatureAttribute`,`float`),w=`colorFeatureAttribute`)),o.include(h,e),o.include(p,e),o.fragment.include(d,e),o.include(y,e),o.include(m,e),e.draped&&f.uniforms.add(new s(`worldToScreenRatio`,e=>1/e.screenToPCSRatio)),x.add(`position`,`vec3`),x.add(`uvMapSpace`,`vec4`),e.hasVertexColors||S.add(`vColor`,`vec4`),S.add(`vpos`,`vec3`,{invariant:!0}),S.add(`vuv`,`vec2`),f.uniforms.add(new u(`uColor`,e=>e.color));let T=e.style===3||e.style===4||e.style===5;return T&&f.code.add(t`
      const mat2 rotate45 = mat2(${t.float(I)}, ${t.float(-L)},
                                 ${t.float(L)}, ${t.float(I)});
    `),!e.draped&&a&&(l(f,e),f.uniforms.add(new s(`worldToScreenPerDistanceRatio`,e=>1/e.camera.perScreenPixelRatio)),f.code.add(t`vec3 projectPointToLineSegment(vec3 center, vec3 halfVector, vec3 point) {
float projectedLength = dot(halfVector, point - center) / dot(halfVector, halfVector);
return center + halfVector * clamp(projectedLength, -1.0, 1.0);
}`),f.code.add(t`vec3 intersectRayPlane(vec3 rayDir, vec3 rayOrigin, vec3 planeNormal, vec3 planePoint) {
float d = dot(planeNormal, planePoint);
float t = (d - dot(planeNormal, rayOrigin)) / dot(planeNormal, rayDir);
return rayOrigin + t * rayDir;
}`),f.code.add(t`
      float boundingRectDistanceToCamera() {
        vec3 center = ${i.getTextureAttribute(`boundingRect`)}[0];
        vec3 halfU = ${i.getTextureAttribute(`boundingRect`)}[1];
        vec3 halfV = ${i.getTextureAttribute(`boundingRect`)}[2];
        vec3 n = normalize(cross(halfU, halfV));

        vec3 viewDir = - vec3(view[0][2], view[1][2], view[2][2]);

        float viewAngle = dot(viewDir, n);
        float minViewAngle = ${t.float(R)};

        if (abs(viewAngle) < minViewAngle) {
          // view direction is (almost) parallel to plane -> clamp it to min angle
          float normalComponent = sign(viewAngle) * minViewAngle - viewAngle;
          viewDir = normalize(viewDir + normalComponent * n);
        }

        // intersect view direction with infinite plane that contains bounding rect
        vec3 planeProjected = intersectRayPlane(viewDir, cameraPosition, n, center);

        // clip to bounds by projecting to u and v line segments individually
        vec3 uProjected = projectPointToLineSegment(center, halfU, planeProjected);
        vec3 vProjected = projectPointToLineSegment(center, halfV, planeProjected);

        // use to calculate the closest point to camera on bounding rect
        vec3 closestPoint = uProjected + vProjected - center;

        return length(closestPoint - cameraPosition);
      }
    `)),f.code.add(t`
    vec2 scaledUV() {
      vec2 uv = uvMapSpace.xy ${n(T,` * rotate45`)};
      vec2 uvCellOrigin = uvMapSpace.zw ${n(T,` * rotate45`)};

      ${n(!e.draped,t`float distanceToCamera = boundingRectDistanceToCamera();
               float worldToScreenRatio = worldToScreenPerDistanceRatio / distanceToCamera;`)}

      // Logarithmically discretize ratio to avoid jittering
      float step = 0.1;
      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);

      vec2 uvOffset = mod(uvCellOrigin * discreteWorldToScreenRatio, ${t.float(z)});
      return uvOffset + (uv * discreteWorldToScreenRatio);
    }
  `),f.main.add(t`
    vuv = scaledUV();
    vpos = position;
    forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);
    forwardVertexColor();
    forwardObjectAndLayerIdColor();
    ${e.hasVertexColors?`vColor *= uColor;`:e.hasVVColor?t`vColor = uColor * interpolateVVColor(${w});`:`vColor = uColor;`}
    gl_Position = transformPosition(proj, view, vpos);
  `),b.include(g),e.draped&&b.uniforms.add(new s(`texelSize`,e=>1/e.camera.pixelRatio)),C||(b.code.add(t`
      const float lineWidth = ${t.float(B)};
      const float spacing = ${t.float(z)};
      const float spacingINV = ${t.float(1/z)};

      float coverage(float p, float txlSize) {
        p = mod(p, spacing);

        float halfTxlSize = txlSize / 2.0;

        float start = p - halfTxlSize;
        float end = p + halfTxlSize;

        float coverage = (ceil(end * spacingINV) - floor(start * spacingINV)) * lineWidth;
        coverage -= min(lineWidth, mod(start, spacing));
        coverage -= max(lineWidth - mod(end, spacing), 0.0);

        return coverage / txlSize;
      }
    `),e.draped||b.code.add(t`const int maxSamples = 5;
float sampleAA(float p) {
vec2 dxdy = abs(vec2(dFdx(p), dFdy(p)));
float fwidth = dxdy.x + dxdy.y;
ivec2 samples = 1 + ivec2(clamp(dxdy, 0.0, float(maxSamples - 1)));
vec2 invSamples = 1.0 / vec2(samples);
float accumulator = 0.0;
for (int j = 0; j < maxSamples; j++) {
if(j >= samples.y) {
break;
}
for (int i = 0; i < maxSamples; i++) {
if(i >= samples.x) {
break;
}
vec2 step = vec2(i,j) * invSamples - 0.5;
accumulator += coverage(p + step.x * dxdy.x + step.y * dxdy.y, fwidth);
}
}
accumulator /= float(samples.x * samples.y);
return accumulator;
}`)),b.main.add(t`
    discardBySlice(vpos);
    discardByTerrainDepth();
    vec4 color = vColor;
    ${n(!C,t`color.a *= ${H(e)};`)}
    outputColorHighlightOLID(applySlice(color, vpos), color.rgb);
  `),o}function H(e){function n(n){return e.draped?t`coverage(vuv.${n}, texelSize)`:t`sampleAA(vuv.${n})`}switch(e.style){case 3:case 0:return n(`y`);case 4:case 1:return n(`x`);case 5:case 2:return t`1.0 - (1.0 - ${n(`x`)}) * (1.0 - ${n(`y`)})`;default:return`0.0`}}var U=Object.freeze(Object.defineProperty({__proto__:null,build:V},Symbol.toStringTag,{value:`Module`}));export{C as a,T as i,V as n,A as r,U as t};