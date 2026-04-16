import{y as e}from"./vec2-fXrlejFD.js";import{i as t,o as n}from"./vec2f64-vR6k7VCu.js";import{n as r,t as i}from"./glsl-CHAh5tEH.js";import{t as a}from"./Uniform-DlzXRq0m.js";import{t as o}from"./FloatPassUniform-BGNunQwI.js";import{t as s}from"./Matrix3PassUniform-XxFQzHVr.js";import"./NoParameters-x88d7FbV.js";import{t as c}from"./ShaderBuilder-HdHfSgzd.js";import{t as l}from"./Float3PassUniform-DL2u3U8R.js";import{t as u}from"./Matrix4BindUniform-o4jYbzYw.js";import{t as d}from"./Float3DrawUniform-CQvYVn43.js";import{t as f}from"./FloatBindUniform-Dxcf3oBX.js";import{t as p}from"./Float4BindUniform-8ui9MB4P.js";import{n as m}from"./Slice.glsl-DBgCgV7T.js";import{t as h}from"./Float2BindUniform-sYd1gZGw.js";import{t as g}from"./TerrainDepthTest.glsl-BvZ9_Dq8.js";import{t as _}from"./NormalAttribute.glsl-C4P9fuJc.js";import{n as v,t as y}from"./Matrix3DrawUniform-Cuc97_0t.js";import{t as b}from"./FloatDrawUniform-BR6iVXLq.js";import{t as x}from"./Texture2DDrawUniform-BDXvI_a4.js";import{G as S,K as C}from"./index-gOtVMHtj.js";import{r as w}from"./bufferLayouts-C31u2mZv.js";function T(e){let t=r`bool isNaN( float val )
{
return ( val < 0.0 || 0.0 < val || val == 0.0 ) ? false : true;
}`;e.code.add(t)}var E=n(.5,-4e-4);function D(e,t){let n=e.vertex;n.include(T),n.constants.add(`depthBias`,`vec2`,E),n.uniforms.add(new h(`inverseViewport`,e=>e.inverseViewport)),t.legacy?(n.uniforms.add(new u(`proj`,e=>e.camera.projectionMatrix)),n.code.add(r`vec2 calculateProjectedBiasXY(vec4 projPos, vec3 globalNormal) {
float offsetXY = depthBias.x;
vec4 projNormal = proj * localView * vec4(globalNormal, 0.0);
return offsetXY * projPos.w * 2.0 * inverseViewport * normalize(projNormal.xyz).xy;
}`)):(n.uniforms.add(new s(`transformNormalViewFromGlobal`,e=>e.transformNormalViewFromGlobal),new u(`transformProjFromView`,e=>e.camera.projectionMatrix)),n.code.add(r`vec2 calculateProjectedBiasXY(vec4 projPos, vec3 globalNormal) {
float offsetXY = depthBias.x;
vec4 projNormal = transformProjFromView * vec4(transformNormalViewFromGlobal * globalNormal, 0.0);
return offsetXY * projPos.w * 2.0 * inverseViewport * normalize(projNormal.xyz).xy;
}`)),n.code.add(r`float _calculateProjectedBiasZ(vec4 projPos) {
float offsetZ = depthBias.y;
return sqrt(max(projPos.z,0.0)) * offsetZ;
}
vec4 adjustProjectedPosition(vec4 projPos, vec3 worldNormal, float lineWidth) {
vec2 offsetXY = calculateProjectedBiasXY(projPos, worldNormal);
if (!isNaN(offsetXY.x) && !isNaN(offsetXY.y)) {
projPos.xy += offsetXY;
}
projPos.z += _calculateProjectedBiasZ(projPos);
return projPos;
}`)}function O(e,t){let n=e.vertex;t.silhouette?(n.code.add(r`bool isSilhouetteEdge(vec3 viewDir, vec3 normalA, vec3 normalB) {
float faceAVisible = dot(viewDir, normalA);
float faceBVisible = dot(viewDir, normalB);
return faceAVisible * faceBVisible < 0.0;
}`),t.legacy?n.code.add(r`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
vec3 viewNormalA = _modelToViewNormal(data.normal);
vec3 viewNormalB = _modelToViewNormal(data.normal2);
vec3 viewDir = -viewPos;
if (isSilhouetteEdge(viewDir, viewNormalA, viewNormalB)) {
return false;
}
gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
return true;
}`):n.code.add(r`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
vec3 worldNormalA = _modelToWorldNormal(data.normal);
vec3 worldNormalB = _modelToWorldNormal(data.normal2);
vec3 viewDir = -worldPos;
if (isSilhouetteEdge(viewDir, worldNormalA, worldNormalB)) {
return false;
}
gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
return true;
}`)):n.code.add(r`bool discardNonSilhouetteEdges(vec3 viewPos, vec3 worldPos, ComponentData data) {
return false;
}`)}function k(e){let t=e.vertex;t.uniforms.add(new o(`distanceFalloffFactor`,e=>e.distanceFalloffFactor)),t.code.add(r`float distanceBasedPerspectiveFactor(float distance) {
return clamp(sqrt(distanceFalloffFactor / distance), 0.0, 1.0);
}`)}var A=new C({layout:w,itemIndexAttribute:`componentIndex`,bufferUniform:new S(`componentTextureBuffer`,e=>e.componentDataTextureBuffer?.texture)});function j(e,t){let{vertex:n}=e;e.include(_,t);let{silhouette:a,legacy:o,spherical:c,hasModelRotationScale:f}=t;e.attributes.add(`componentIndex`,`uint`);let{getTextureAttribute:p,TextureBackedBufferModule:m}=A;e.include(m),n.constants.add(`lineWidthFractionFactor`,`float`,8),n.constants.add(`extensionLengthOffset`,`float`,128),n.code.add(r`
    struct ComponentData {
      vec4 color;
      vec3 normal;
      vec3 normal2;
      float lineWidth;
      float extensionLength;
      float type;
      float verticalOffset;
    };

    ComponentData readComponentData() {
      vec3 normal = normalModel();
      vec3 normal2 = ${a?r`decompressNormal(normal2Compressed)`:r`normal`};

      vec4 colorValue = ${p(`color`)};
      float lineWidth = float(${p(`lineWidth`)}) / lineWidthFractionFactor;
      float extensionLength = float(${p(`extensionLength`)}) - extensionLengthOffset;
      // SOLID (=0/255) needs to be > 0.0, SKETCHY (=1/255) needs to be <= 0;
      float type = -(float(${p(`materialType`)})) + 0.5;
      float opacity = ${p(`opacity`)};

      float verticalOffset = ${p(`elevationOffset`)};

      return ComponentData(
        vec4(colorValue.rgb, colorValue.a * opacity),
        normal, normal2,
        lineWidth,
        extensionLength,
        type,
        verticalOffset
      );
    }
  `),o?n.code.add(r`vec3 _modelToWorldNormal(vec3 normal) {
return (model * vec4(normal, 0.0)).xyz;
}
vec3 _modelToViewNormal(vec3 normal) {
return (localView * model * vec4(normal, 0.0)).xyz;
}`):(f&&n.uniforms.add(new y(`transformNormalGlobalFromModel`,e=>e.transformNormalGlobalFromModel)),n.code.add(r`
      vec3 _modelToWorldNormal(vec3 normal) {
        return ${i(f,r`transformNormalGlobalFromModel * `)}normal;
      }
    `)),a?(e.attributes.add(`normal2Compressed`,`vec2`),n.code.add(r`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(normalize(data.normal + data.normal2));
}`)):n.code.add(r`vec3 worldNormal(ComponentData data) {
return _modelToWorldNormal(data.normal);
}`),o?n.code.add(r`void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {
worldPos = (model * vec4(modelPos, 1.0)).xyz;
viewPos = (localView * vec4(worldPos, 1.0)).xyz;
}`):(n.include(v,t),n.uniforms.add(new s(`transformViewFromCameraRelativeRS`,e=>e.transformViewFromCameraRelativeRS),new d(`transformWorldFromModelTL`,e=>e.transformWorldFromModelTL),new d(`transformWorldFromModelTH`,e=>e.transformWorldFromModelTH),new l(`transformWorldFromViewTL`,e=>e.transformWorldFromViewTL),new l(`transformWorldFromViewTH`,e=>e.transformWorldFromViewTH)),f&&n.uniforms.add(new y(`transformWorldFromModelRS`,e=>e.transformWorldFromModelRS)),n.code.add(r`
      void worldAndViewFromModelPosition(vec3 modelPos, float verticalOffset, out vec3 worldPos, out vec3 viewPos) {

        vec3 rotatedModelPosition = ${i(f,r`transformWorldFromModelRS * `)}modelPos;

        vec3 transformCameraRelativeFromModel = dpAdd(
          transformWorldFromModelTL,
          transformWorldFromModelTH,
          -transformWorldFromViewTL,
          -transformWorldFromViewTH
        );

        worldPos = transformCameraRelativeFromModel + rotatedModelPosition;

        if (verticalOffset != 0.0) {
          vec3 vUp = ${c?`normalize(transformWorldFromModelTL + rotatedModelPosition);`:`vec3(0.0, 0.0, 1.0);`}
          worldPos += verticalOffset * vUp;
        }

        viewPos = transformViewFromCameraRelativeRS * worldPos;
      }
    `)),n.uniforms.add(new u(`transformProjFromView`,e=>e.camera.projectionMatrix)).code.add(r`vec4 projFromViewPosition(vec3 position) {
return transformProjFromView * vec4(position, 1.0);
}`),n.code.add(r`float calculateExtensionLength(float extensionLength, float lineLength) {
return extensionLength / (log2(max(1.0, 256.0 / lineLength)) * 0.2 + 1.0);
}`)}function M(e){return e===1||e===2}function N(e,t){let n=t.type===2,a=t.type===0;e.attributes.add(`sideness`,`vec2`),e.vertex.code.add(r`
    struct UnpackedAttributes {
      vec2 sideness;
      vec2 sidenessNorm;
      float lineWidthPixels;
      float extensionLengthPixels;
      ${i(n,`float type;`)}
    };
  `).code.add(r`
    UnpackedAttributes unpackAttributes(ComponentData component) {
      vec2 sidenessNorm = sideness;
      vec2 sideness = sidenessNorm * 2.0 - 1.0;
      float extensionLengthPixels = component.extensionLength;
      float lineWidth = component.lineWidth;
      ${i(n,`if (component.type <= 0.0) {`)}
      ${i(!a,`extensionLengthPixels *= variantExtension * 2.0 - 1.0;`)}
      ${i(n,`}`)}
      return UnpackedAttributes(sideness, sidenessNorm, lineWidth, extensionLengthPixels ${i(n,`, component.type`)});
    }
  `)}function P(e,t){let n=e.vertex;switch(e.include(N,t),t.type){case 0:n.code.add(r`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return 0.0;
}`);break;case 1:n.uniforms.add(new b(`strokesAmplitude`,e=>e.strokesTexture.amplitude)).code.add(r`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
return strokesAmplitude;
}`);break;case 2:n.uniforms.add(new b(`strokesAmplitude`,e=>e.strokesTexture.amplitude)).code.add(r`float calculateLineAmplitude(UnpackedAttributes unpackedAttributes) {
float type = unpackedAttributes.type;
if (type <= 0.0) {
return strokesAmplitude;
}
return 0.0;
}`);break;case 3:break;default:t.type}}function F(e,t){e.include(N,t);let{vertex:n,fragment:i}=e;switch(M(t.type)&&(e.varyings.add(`vStrokeUV`,`vec2`),n.uniforms.add(new x(`strokesTexture`,e=>e.strokesTexture.texture),new b(`strokesLog2Resolution`,e=>Math.log2(e.strokesTexture.resolution)),new b(`strokeVariants`,e=>e.strokesTexture.variants)).code.add(r`void calculateStyleOutputsSketch(float lineLength, UnpackedAttributes unpackedAttributes) {
vec2 sidenessNorm = unpackedAttributes.sidenessNorm;
float lineIndex = clamp(ceil(log2(lineLength)), 0.0, strokesLog2Resolution);
vStrokeUV = vec2(exp2(lineIndex) * sidenessNorm.y, lineIndex * strokeVariants + variantStroke + 0.5) / vec2(textureSize(strokesTexture, 0));
vStrokeUV.x += variantOffset;
}`),i.uniforms.add(new x(`strokesTexture`,e=>e.strokesTexture.texture)).code.add(r`float calculateLineOffsetSketch() {
return texture(strokesTexture, vStrokeUV).r;
}
float calculateLinePressureSketch() {
return texture(strokesTexture, vStrokeUV + vec2(0.0, 0.5)).r;
}`)),t.type){case 0:n.code.add(r`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes) {}`),i.code.add(r`float calculateLineOffset() {
return 0.0;
}
float calculateLinePressure() {
return 1.0;
}`);break;case 1:n.code.add(r`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes)
{
calculateStyleOutputsSketch(vLineLengthPixels, unpackedAttributes);
}`),i.code.add(r`float calculateLineOffset() {
return calculateLineOffsetSketch();
}
float calculateLinePressure() {
return calculateLinePressureSketch();
}`);break;case 2:e.varyings.add(`vType`,`float`),n.code.add(r`void calculateStyleOutputs(UnpackedAttributes unpackedAttributes)
{
vType = unpackedAttributes.type;
if (unpackedAttributes.type <= 0.0) {
calculateStyleOutputsSketch(vLineLengthPixels, unpackedAttributes);
}
}`),i.code.add(r`float calculateLineOffset() {
if (vType <= 0.0) {
return calculateLineOffsetSketch();
}
else {
return 0.0;
}
}
float calculateLinePressure() {
if (vType <= 0.0) {
return calculateLinePressureSketch();
}
else {
return 1.0;
}
}`);break;case 3:break;default:t.type}}function I(t){let n=new c,{vertex:a,fragment:o,varyings:s,attributes:l}=n;t.legacy&&a.uniforms.add(new R(`model`),new R(`localView`)),n.include(D,t),n.include(j,t),n.include(P,t),n.include(N,t),n.include(F,t),o.include(m,t),n.include(O,t),n.include(g,t),n.include(k,t),s.add(`vColor`,`vec4`),s.add(`vRadius`,`float`),s.add(`vPosition`,`vec3`,{invariant:!0}),s.add(`vWorldPosition`,`vec3`,{invariant:!0}),s.add(`vLineLengthPixels`,`float`),s.add(`vSizeFalloffFactor`,`float`),a.uniforms.add(new h(`pixelToNDC`,({camera:t})=>e(L,2/t.fullViewport[2],2/t.fullViewport[3])),new p(`viewport`,e=>e.camera.fullViewport),new f(`pixelRatio`,e=>e.camera.pixelRatio)),l.add(`position0`,`vec3`),l.add(`position1`,`vec3`),l.add(`variantOffset`,`float`),l.add(`variantStroke`,`float`),l.add(`variantExtension`,`float`);let u=t.type===1,d=t.type===2;return a.code.add(r`
    void calculateGeometricOutputs(vec3 viewPosV0, vec3 viewPosV1, vec3 worldPosV0, vec3 worldPosV1, vec3 worldNormal, UnpackedAttributes unpackedAttributes) {
      vec2 sideness = unpackedAttributes.sideness;
      vec2 sidenessNorm = unpackedAttributes.sidenessNorm;

      vWorldPosition = mix(worldPosV0, worldPosV1, sidenessNorm.y).xyz;

      vec3 viewPos = mix(viewPosV0, viewPosV1, sidenessNorm.y);
      forwardViewPosDepth(viewPos);

      vec4 projPosV0 = projFromViewPosition(viewPosV0);
      vec4 projPosV1 = projFromViewPosition(viewPosV1);
      vec4 projPos = projFromViewPosition(viewPos);

      vec3 screenSpaceLineNDC = (projPosV1.xyz / projPosV1.w - projPosV0.xyz / projPosV0.w);
      vec2 ndcToPixel = viewport.zw * 0.5;
      vec2 screenSpaceLinePixels = screenSpaceLineNDC.xy * ndcToPixel;
      float lineLengthPixels = length(screenSpaceLinePixels);

      float dzPerPixel = screenSpaceLineNDC.z / lineLengthPixels;
      vec2 screenSpaceDirection = screenSpaceLinePixels / lineLengthPixels;
      vec2 perpendicularScreenSpaceDirection = vec2(screenSpaceDirection.y, -screenSpaceDirection.x) * sideness.x;

      float falloffFactor = distanceBasedPerspectiveFactor(-viewPos.z) * pixelRatio;
      float lineWidthPixels = unpackedAttributes.lineWidthPixels * falloffFactor;

      float extensionLengthPixels = calculateExtensionLength(unpackedAttributes.extensionLengthPixels, lineLengthPixels) * falloffFactor;
      float lineAmplitudePixels = calculateLineAmplitude(unpackedAttributes) * pixelRatio;

      vSizeFalloffFactor = falloffFactor;

      float lineWidthAndAmplitudePixels = lineWidthPixels + lineAmplitudePixels + lineAmplitudePixels;
      float extendedLineLengthPixels = lineLengthPixels + extensionLengthPixels + extensionLengthPixels;

      // Line size with padding
      float halfAAPaddedLineWidthAndAmplitudePixels = lineWidthAndAmplitudePixels * 0.5 + ${r.float(1)};
      float aaPaddedRoundedCapSizePixels = lineWidthPixels * 0.5 + ${r.float(1)};

      // Half line width in NDC including padding for anti aliasing
      vec2 halfAAPaddedLineWidthAndAmplitudeNDC = halfAAPaddedLineWidthAndAmplitudePixels * pixelToNDC;
      vec2 aaPaddedRoundedCapSizeNDC = aaPaddedRoundedCapSizePixels * pixelToNDC;
      vec2 extensionLengthNDC = extensionLengthPixels * pixelToNDC;

      // Compute screen space position of vertex, offsetting for line size and end caps
      vec2 ndcOffset = (
          screenSpaceDirection * sideness.y * (aaPaddedRoundedCapSizeNDC + extensionLengthNDC)
        + perpendicularScreenSpaceDirection * halfAAPaddedLineWidthAndAmplitudeNDC
      );

      projPos.xy += ndcOffset * projPos.w;
      projPos.z += (dzPerPixel * (aaPaddedRoundedCapSizePixels + extensionLengthPixels)) * sideness.y * projPos.w;

      projPos = adjustProjectedPosition(projPos, worldNormal, 1.0 + max((lineWidthAndAmplitudePixels - 1.0) * 0.5, 0.0));

      // Line length with end caps
      float aaPaddedLineWithCapsLengthPixels = extendedLineLengthPixels + aaPaddedRoundedCapSizePixels + aaPaddedRoundedCapSizePixels;

      float pixelPositionAlongLine = aaPaddedLineWithCapsLengthPixels * sidenessNorm.y - aaPaddedRoundedCapSizePixels;

      // Position in pixels with origin at first vertex of line segment
      vPosition = vec3(
        halfAAPaddedLineWidthAndAmplitudePixels * sideness.x,
        pixelPositionAlongLine,
        pixelPositionAlongLine / extendedLineLengthPixels
      );

      // The line width radius in pixels
      vRadius = lineWidthPixels * 0.5;
      vLineLengthPixels = extendedLineLengthPixels;

      // discard short edges below a certain length threshold
      ${i(u||d,r`if (lineLengthPixels <= 3.0 ${i(d,` && unpackedAttributes.type <= 0.0`)}) {
                gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
                return;
             }`)}
      gl_Position = projPos;
    }`),a.main.add(r`
    ComponentData component = readComponentData();
    UnpackedAttributes unpackedAttributes = unpackAttributes(component);

    vec3 worldPosV0, worldPosV1, viewPosV0, viewPosV1;
    worldAndViewFromModelPosition(position0, component.verticalOffset, worldPosV0, viewPosV0);
    worldAndViewFromModelPosition(position1, component.verticalOffset, worldPosV1, viewPosV1);

    // Component color
    vColor = component.color;

    // Discard fully transparent edges
    if (vColor.a < ${r.float(.00392156862745098)}) {
      gl_Position = vec4(10.0, 10.0, 10.0, 1.0);
      return;
    }

    if (discardNonSilhouetteEdges(viewPosV0, worldPosV0, component)) {
      return;
    }

    // General geometric computation for all types of edges
    calculateGeometricOutputs(viewPosV0, viewPosV1, worldPosV0, worldPosV1, worldNormal(component), unpackedAttributes);

    // Specific computation for different edge styles
    calculateStyleOutputs(unpackedAttributes);`),o.code.add(r`float lineWithCapsDistance(float radius, vec2 position, float lineLength) {
float positionX = position.x - calculateLineOffset();
if (radius < 1.0) {
float coverageX = clamp(min(radius, positionX + 0.5) - max(-radius, positionX - 0.5), 0.0, 1.0);
float coverageY = clamp(min(lineLength, position.y + 0.5) - max(0.0, position.y - 0.5), 0.0, 1.0);
return 0.5 - min(coverageX, coverageY);
}
else {
float positionOnCap = position.y - clamp(position.y, 0.0, lineLength);
return length(vec2(positionX, positionOnCap)) - radius;
}
}`),o.main.add(r`discardByTerrainDepth();
float radius = vRadius * calculateLinePressure();
float distance = lineWithCapsDistance(radius, vPosition.xy, vLineLengthPixels);
float coverage = clamp(0.5 - distance, 0.0, 1.0);
discardBySlice(vWorldPosition);
fragColor = vec4(vColor.rgb, vColor.a * coverage);`),n}var L=t(),R=class extends a{constructor(e){super(e,`mat4`)}},z=Object.freeze(Object.defineProperty({__proto__:null,build:I},Symbol.toStringTag,{value:`Module`}));export{I as n,z as t};