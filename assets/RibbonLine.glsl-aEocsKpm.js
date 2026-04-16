import{r as e}from"./time-b6zIY0im.js";import{t}from"./uid-DXM1oASI.js";import{n}from"./uuid-469JvrnR.js";import{y as r}from"./vec2-fXrlejFD.js";import{l as i}from"./vec4-l6LH68wi.js";import{a,n as o}from"./vec4f64-Bge3Qg6c.js";import{i as s}from"./vec2f64-vR6k7VCu.js";import{n as c,t as l}from"./glsl-CHAh5tEH.js";import{t as u}from"./Float2PassUniform-C0auDrhO.js";import{t as d}from"./FloatPassUniform-BGNunQwI.js";import{t as f}from"./Texture2DPassUniform-DQ1HS8F6.js";import{t as ee}from"./ShaderBuilder-HdHfSgzd.js";import{i as p,s as m}from"./enums-BAaDi5mo.js";import{a as h,t as g}from"./Texture-Cs13pdSK.js";import{t as _}from"./Matrix4BindUniform-o4jYbzYw.js";import{t as v}from"./FloatBindUniform-Dxcf3oBX.js";import{i as y,n as b,t as x}from"./View.glsl-Cp2_MWNu.js";import{t as S}from"./Float4PassUniform-lh-dPatj.js";import{t as C}from"./Float4BindUniform-8ui9MB4P.js";import{n as w}from"./Slice.glsl-DBgCgV7T.js";import{t as T}from"./ObjectAndLayerIdColor.glsl-JVSocln4.js";import{t as E}from"./Float2BindUniform-sYd1gZGw.js";import{t as D}from"./TerrainDepthTest.glsl-BvZ9_Dq8.js";import{t as O}from"./PositionOutsideClipSpace-CEMoNqkh.js";import{t as k}from"./ColorConversion.glsl-CX15PnV2.js";import{t as A}from"./AlphaCutoff-cZu5nT4P.js";import{t as j}from"./PiUtils.glsl-0yHsMTu2.js";import{t as M}from"./MixExternalColor.glsl-D10CKnGR.js";import{t as te}from"./OutputColorHighlightOLID.glsl-C-ItyJSg.js";import{c as N,l as ne,t as re,u as ie}from"./MarkerSizing.glsl-DC7R9zdH.js";var P={dash:[4,3],dot:[1,3],"long-dash":[8,3],"short-dash":[4,1],"short-dot":[1,1]},F={dash:P.dash,"dash-dot":[...P.dash,...P.dot],dot:P.dot,"long-dash":P[`long-dash`],"long-dash-dot":[...P[`long-dash`],...P.dot],"long-dash-dot-dot":[...P[`long-dash`],...P.dot,...P.dot],none:null,"short-dash":P[`short-dash`],"short-dash-dot":[...P[`short-dash`],...P[`short-dot`]],"short-dash-dot-dot":[...P[`short-dash`],...P[`short-dot`],...P[`short-dot`]],"short-dot":P[`short-dot`],solid:null},I=8,L=class{constructor(e,t,r){this.image=e,this.width=t,this.length=r,this.uuid=n()}};function R(e){return e!=null&&`image`in e}function z(e,t){return e==null?e:{pattern:e.slice(),pixelRatio:t}}function B(e){return{pattern:[e,e],pixelRatio:2}}function V(e){switch(e?.type){case`style`:return H(e.style);case`image`:return new L(e.image,e.width,e.length);case void 0:case null:return null}return null}function H(e){return e==null?null:z(F[e],I)}var U=class{constructor(e,n,r){this._createTexture=e,this._parametersKey=n,this._repository=new Map,this._orphanCache=r.newCache(`procedural-texture-repository:${t()}`,e=>e.dispose())}destroy(){for(let{texture:e}of this._repository.values())e.dispose();this._repository.clear(),this._orphanCache.destroy()}swap(e,t=null){let n=this._acquire(e);return this.release(t),n}release(e){if(e==null)return;let t=this._parametersKey(e),n=this._repository.get(t);if(n&&(n.refCount--,n.refCount===0)){this._repository.delete(t);let{texture:e}=n;this._orphanCache.put(t,e)}}_acquire(e){if(e==null)return null;let t=this._parametersKey(e),n=this._repository.get(t);if(n)return n.refCount++,n.texture;let r=this._orphanCache.pop(t)??this._createTexture(e),i=new W(r);return this._repository.set(t,i),r}},W=class{constructor(e){this.texture=e,this.refCount=1}};function G(e,t){return new U(t=>{if(R(t))return ae(e,t.image);let{data:n,textureSize:r}=K(t),i=new h(r,1);return i.dataType=m.FLOAT,i.pixelFormat=6403,i.internalFormat=p.R16F,i.wrapMode=10497,new g(e,i,n)},e=>R(e)?`image-${e.uuid}`:`${e.pattern.join(`,`)}-r${e.pixelRatio}`,t)}function K(e){let t=q(e),n=1/e.pixelRatio,r=J(e),i=[],a=1;for(let e of t){for(let t=0;t<e;t++){let r=a*(Math.min(t,e-1-t)+.5)*n;i.push(r)}a=-a}let o=Math.round(t[0]/2);return{data:new Float32Array([...i.slice(o),...i.slice(0,o)]),textureSize:r}}function q(e){return e.pattern.map(t=>Math.round(t*e.pixelRatio))}function J(e){if(e==null)return 1;let t=q(e);return Math.floor(t.reduce((e,t)=>e+t))}function ae(e,t){let{data:n,width:r,height:i}=t,a=new h(r,i);return a.dataType=m.UNSIGNED_BYTE,a.pixelFormat=6408,a.internalFormat=p.RGBA8,a.wrapMode={s:10497,t:33071},a.hasMipmap=!0,a.samplingMode=9987,new g(e,a,n)}function oe(e){return e==null?o:e.length===4?e:i(se,e[0],e[1],e[2],1)}var se=a();function ce(e,t){if(!t.stippleEnabled)return void e.fragment.code.add(c`float getStippleAlpha(float lineWidth) { return 1.0; }
void discardByStippleAlpha(float stippleAlpha, float threshold) {}
vec4 blendStipple(vec4 color, float stippleAlpha) { return color; }`);let n=!(t.draped&&t.stipplePreferContinuous),{vertex:r,fragment:i}=e;t.draped||(x(r,t),r.uniforms.add(new v(`worldToScreenPerDistanceRatio`,({camera:e})=>1/e.perScreenPixelRatio)).code.add(c`float computeWorldToScreenRatio(vec3 segmentCenter) {
float segmentDistanceToCamera = length(segmentCenter - cameraPosition);
return worldToScreenPerDistanceRatio / segmentDistanceToCamera;
}`)),e.varyings.add(`vStippleDistance`,`float`),e.varyings.add(`vStippleDistanceLimits`,`vec2`),e.varyings.add(`vStipplePatternStretch`,`float`),r.code.add(c`
    float discretizeWorldToScreenRatio(float worldToScreenRatio) {
      float step = ${c.float(le)};

      float discreteWorldToScreenRatio = log(worldToScreenRatio);
      discreteWorldToScreenRatio = ceil(discreteWorldToScreenRatio / step) * step;
      discreteWorldToScreenRatio = exp(discreteWorldToScreenRatio);
      return discreteWorldToScreenRatio;
    }
  `),y(r),r.code.add(c`
    vec2 computeStippleDistanceLimits(float startPseudoScreen, float segmentLengthPseudoScreen, float segmentLengthScreen, float patternLength) {

      // First check if the segment is long enough to support fully screen space patterns.
      // Force sparse mode for segments that are very large in screen space even if it is not allowed,
      // to avoid imprecision from calculating with large floats.
      if (segmentLengthPseudoScreen >= ${n?`patternLength`:`1e4`}) {
        // Round the screen length to get an integer number of pattern repetitions (minimum 1).
        float repetitions = segmentLengthScreen / (patternLength * pixelRatio);
        float flooredRepetitions = max(1.0, floor(repetitions + 0.5));
        float segmentLengthScreenRounded = flooredRepetitions * patternLength;

        float stretch = repetitions / flooredRepetitions;

        // We need to impose a lower bound on the stretch factor to prevent the dots from merging together when there is only 1 repetition.
        // 0.75 is the lowest possible stretch value for flooredRepetitions > 1, so it makes sense as lower bound.
        vStipplePatternStretch = max(0.75, stretch);

        return vec2(0.0, segmentLengthScreenRounded);
      }
      return vec2(startPseudoScreen, startPseudoScreen + segmentLengthPseudoScreen);
    }
  `),i.uniforms.add(new f(`stipplePatternTexture`,e=>e.stippleTexture),new d(`stipplePatternPixelSizeInv`,e=>1/Y(e))),t.stippleOffColorEnabled&&i.uniforms.add(new S(`stippleOffColor`,e=>oe(e.stippleOffColor))),e.include(N),t.worldSizedImagePattern?(e.varyings.add(`vStippleV`,`float`),e.fragment.include(M),i.code.add(c`vec4 getStippleColor(out bool isClamped) {
vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;
float u = vStippleDistance * stipplePatternPixelSizeInv;
float v = vStippleV == -1.0 ? 0.5 : vStippleV;
return texture(stipplePatternTexture, vec2(u, v));
}
vec4 getStippleColor() {
bool ignored;
return getStippleColor(ignored);
}
float getStippleSDF() {
vec4 color = getStippleColor();
return color.a == 0.0 ? -0.5 : 0.5;
}
float getStippleAlpha(float lineWidth) {
return getStippleColor().a;
}
vec4 blendStipple(vec4 color, float stippleAlpha) {
vec4 stippleColor = getStippleColor();
int mixMode  = 1;
vec3 col = mixExternalColor(color.rgb, vec3(1.0), stippleColor.rgb, mixMode);
float opacity = mixExternalOpacity(color.a, 1.0, stippleColor.a, mixMode);
return vec4(col, opacity);
}`)):i.code.add(c`
    float getStippleSDF(out bool isClamped) {
      float stippleDistanceClamped = noPerspectiveRead(clamp(vStippleDistance, vStippleDistanceLimits.x, vStippleDistanceLimits.y));
      float lineSizeInv = noPerspectiveRead(vLineSizeInv);

      vec2 aaCorrectedLimits = vStippleDistanceLimits + vec2(1.0, -1.0) / gl_FragCoord.w;
      isClamped = vStippleDistance < aaCorrectedLimits.x || vStippleDistance > aaCorrectedLimits.y;

      float u = stippleDistanceClamped * stipplePatternPixelSizeInv * lineSizeInv;
      u = fract(u);

      float sdf = texture(stipplePatternTexture, vec2(u, 0.5)).r;

      return (sdf - 0.5) * vStipplePatternStretch + 0.5;
    }

    float getStippleSDF() {
      bool ignored;
      return getStippleSDF(ignored);
    }

    float getStippleAlpha(float lineWidth) {
      bool isClamped;
      float stippleSDF = getStippleSDF(isClamped);
      float antiAliasedResult = clamp(stippleSDF * lineWidth + 0.5, 0.0, 1.0);
      return isClamped ? floor(antiAliasedResult + 0.5) : antiAliasedResult;
    }

    vec4 blendStipple(vec4 color, float stippleAlpha) {
      return ${t.stippleOffColorEnabled?`mix(color, stippleOffColor, stippleAlpha)`:`vec4(color.rgb, color.a * stippleAlpha)`};
    }
  `),i.code.add(c`
    void discardByStippleAlpha(float stippleAlpha, float threshold) {
     ${l(!t.stippleOffColorEnabled,`if (stippleAlpha < threshold) { discard; }`)}
    }
  `)}function Y(e){let t=e.stipplePattern;return R(t)?t.length:t?J(t)/t.pixelRatio:1}var le=.4,X=.1,Z=e(1),Q=e(1),ue=1e3,de=27e6;function fe(e,t){let{hasAnimation:n,animation:i}=t;if(!n)return;let{attributes:a,varyings:o,vertex:s,fragment:l}=e;a.add(`timeStamps`,`vec4`),o.add(`vTimeStamp`,`float`),o.add(`vFirstTime`,`float`),o.add(`vLastTime`,`float`),o.add(`vTransitionType`,`float`),s.main.add(c`vTimeStamp = timeStamps.x;
vFirstTime = timeStamps.y;
vLastTime = timeStamps.z;
vTransitionType = timeStamps.w;`),i===3&&l.constants.add(`decayRate`,`float`,2.3),l.code.add(c`
    float getTrailOpacity(float x) {
      if (x < 0.0) {
        return 0.0;
      }

      ${pe(i)}
    }`),l.uniforms.add(new d(`timeElapsed`,e=>e.timeElapsed),new d(`trailLength`,e=>e.trailLength),new d(`speed`,e=>e.animationSpeed),new u(`startEndTime`,e=>r(me,e.startTime,e.endTime))),l.constants.add(`fadeInTime`,`float`,Q),l.constants.add(`fadeOutTime`,`float`,Z),l.constants.add(`incomingTransition`,`int`,0),l.constants.add(`outgoingTransition`,`int`,2),l.code.add(c`float fadeIn(float x) {
return smoothstep(0.0, fadeInTime, x);
}
float fadeOut(float x) {
return isinf(fadeOutTime) ? 1.0 : smoothstep(fadeOutTime, 0.0, x);
}
void updateAlphaIf(inout float alpha, bool condition, float newAlpha) {
alpha = condition ? min(alpha, newAlpha) : alpha;
}
vec4 animate(vec4 color) {
float startTime = startEndTime[0];
float endTime = startEndTime[1];
float totalTime = vLastTime - vFirstTime;
float actualFadeOutTime = min(fadeOutTime * speed, trailLength);
float longStreamlineThreshold = (fadeInTime + 1.0) * speed + actualFadeOutTime;
bool longStreamline = totalTime > longStreamlineThreshold;
float totalTimeWithFadeOut = longStreamline && actualFadeOutTime != trailLength ? totalTime : totalTime + actualFadeOutTime;
float fadeOutStartTime = longStreamline ? totalTime - actualFadeOutTime : totalTime;
float originTime =  -vFirstTime;
float actualEndTime = int(vTransitionType) == outgoingTransition ? min(endTime, startTime + vLastTime / speed) : endTime;
vec4 animatedColor = color;
if (speed == 0.0) {
float alpha = getTrailOpacity((totalTimeWithFadeOut - (vTimeStamp - vFirstTime)) / trailLength);
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
animatedColor.a *= alpha;
return animatedColor;
}
float relativeStartTime = mod(startTime, totalTimeWithFadeOut);
float shiftedTimeElapsed = timeElapsed - relativeStartTime + originTime;
float headRelativeToFirst = mod(shiftedTimeElapsed * speed, totalTimeWithFadeOut);
float vRelativeToHead = headRelativeToFirst - originTime - vTimeStamp;
float vAbsoluteTime = timeElapsed - vRelativeToHead / speed;
if (startTime > timeElapsed) {
return vec4(0.0);
}
float alpha = getTrailOpacity(vRelativeToHead / trailLength);
updateAlphaIf(alpha, true, fadeIn(timeElapsed - startTime));
updateAlphaIf(alpha, !isinf(actualEndTime), fadeOut(timeElapsed - actualEndTime));
updateAlphaIf(alpha, int(vTransitionType) != incomingTransition, step(startTime, vAbsoluteTime));
updateAlphaIf(alpha, headRelativeToFirst > fadeOutStartTime, fadeOut((headRelativeToFirst - fadeOutStartTime) / speed));
alpha *= fadeIn(vTimeStamp - vFirstTime);
animatedColor.a *= alpha;
return animatedColor;
}`)}function pe(e){switch(e){case 2:return`return x >= 0.0 && x <= 1.0 ? 1.0 : 0.0;`;case 3:return`float cutOff = exp(-decayRate);
        return (exp(-decayRate * x) - cutOff) / (1.0 - cutOff);`;default:return`return 1.0;`}}var me=s(),he=1;function $(e){let t=new ee,{attributes:n,varyings:r,vertex:i,fragment:a}=t,{applyMarkerOffset:o,draped:s,output:u,capType:f,stippleEnabled:p,falloffEnabled:m,roundJoins:h,wireframe:g,innerColorEnabled:x,hasAnimation:M,hasScreenSizePerspective:P,worldSizedImagePattern:F}=e;a.include(j),t.include(ie,e),t.include(ce,e),t.include(T,e),t.include(D,e),t.include(fe,e);let I=o&&!s;I&&(i.uniforms.add(new d(`markerScale`,e=>e.markerScale)),t.include(re,{space:2,hasScreenSizePerspective:P})),b(i,e),i.uniforms.add(new _(`inverseProjectionMatrix`,e=>e.camera.inverseProjectionMatrix),new E(`nearFar`,e=>e.camera.nearFar),new d(`miterLimit`,e=>e.join===`miter`?e.miterLimit:0),new C(`viewport`,e=>e.camera.fullViewport)),i.constants.add(`LARGE_HALF_FLOAT`,`float`,65500),n.add(`position`,`vec3`),n.add(`previousDelta`,`vec4`),n.add(`nextDelta`,`vec4`),n.add(`lineParameters`,`vec2`),n.add(`u0`,`float`),r.add(`vColor`,`vec4`),r.add(`vpos`,`vec3`,{invariant:!0}),r.add(`vLineDistance`,`float`),r.add(`vLineWidth`,`float`);let L=p;L&&r.add(`vLineSizeInv`,`float`);let R=f===2,z=p&&R,B=m||z;B&&r.add(`vLineDistanceNorm`,`float`),R&&(r.add(`vSegmentSDF`,`float`),r.add(`vReverseSegmentSDF`,`float`)),i.code.add(c`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}
float interp(float ncp, vec4 a, vec4 b) {
return (-ncp - a.z) / (b.z - a.z);
}
vec2 rotate(vec2 v, float a) {
float s = sin(a);
float c = cos(a);
mat2 m = mat2(c, -s, s, c);
return m * v;
}`),i.code.add(c`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),i.code.add(c`void clip(
inout vec4 pos,
inout vec4 prev,
inout vec4 next,
bool isStartVertex
) {
float vnp = nearFar[0] * 0.99;
if (pos.z > -nearFar[0]) {
if (!isStartVertex) {
if (prev.z < -nearFar[0]) {
pos = mix(prev, pos, interp(vnp, prev, pos));
next = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
} else {
if (next.z < -nearFar[0]) {
pos = mix(pos, next, interp(vnp, pos, next));
prev = pos;
} else {
pos = vec4(0.0, 0.0, 0.0, 1.0);
}
}
} else {
if (prev.z > -nearFar[0]) {
prev = mix(pos, prev, interp(vnp, pos, prev));
}
if (next.z > -nearFar[0]) {
next = mix(next, pos, interp(vnp, next, pos));
}
}
}`),y(i),i.constants.add(`aaWidth`,`float`,p?0:1).main.add(c`
    // unpack values from vertex type
    bool isStartVertex = abs(abs(lineParameters.y) - 3.0) == 1.0;
    vec3 prevPosition = position + previousDelta.xyz * previousDelta.w;
    vec3 nextPosition = position + nextDelta.xyz * nextDelta.w;

    float coverage = 1.0;

    // Check for special value of lineParameters.y which is used by the Renderer when graphics are removed before the
    // VBO is recompacted. If this is the case, then we just project outside of clip space.
    if (lineParameters.y == 0.0) {
      gl_Position = ${O};
    }
    else {
      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(prevPosition, 1.0);
      vec4 next = view * vec4(nextPosition, 1.0);

      bool isJoin = abs(lineParameters.y) < 3.0;
  `),I&&i.main.add(c`vec4 other = isStartVertex ? next : prev;
bool markersHidden = areWorldMarkersHidden(pos.xyz, other.xyz);
if (!isJoin && !markersHidden) {
pos.xyz += normalize(other.xyz - pos.xyz) * getWorldMarkerSize(pos.xyz) * 0.5;
}`),t.include(ne),i.main.add(c`
      clip(pos, prev, next, isStartVertex);

      vec3 clippedPos = pos.xyz;
      vec3 clippedCenter = mix(pos.xyz, isStartVertex ? next.xyz : prev.xyz, 0.5);

      forwardViewPosDepth(pos.xyz);

      pos = projectAndScale(pos);
      next = projectAndScale(next);
      prev = projectAndScale(prev);

      vec2 left = (pos.xy - prev.xy);
      vec2 right = (next.xy - pos.xy);

      float leftLen = length(left);
      float rightLen = length(right);

      float lineSize = getSize(${l(P,`clippedPos`)});
      ${l(p&&P,`float patternLineSize = getSize(clippedCenter);`)}
      ${l(p&&!P,`float patternLineSize = lineSize;`)}

      ${l(F,c`
          lineSize += aaWidth;
          float lineWidth = lineSize * pixelRatio * worldToScreenRatio;
          if (lineWidth < 1.0) {
            coverage = lineWidth;
            lineWidth = 1.0;
          }
        `,c`
          if (lineSize < 1.0) {
            coverage = lineSize; // convert sub-pixel coverage to alpha
            lineSize = 1.0;
          }

          lineSize += aaWidth;
          float lineWidth = lineSize * pixelRatio;
        `)}

      vLineWidth = noPerspectiveWrite(lineWidth, pos.w);
      ${L?c`vLineSizeInv = noPerspectiveWrite(1.0 / lineSize, pos.w);`:``}
  `),(p||R)&&i.main.add(c`
      float isEndVertex = float(!isStartVertex);
      vec2 segmentOrigin = mix(pos.xy, prev.xy, isEndVertex);
      vec2 segment = mix(right, left, isEndVertex);
      ${R?c`vec2 segmentEnd = mix(next.xy, pos.xy, isEndVertex);`:``}
    `),i.main.add(c`left = (leftLen > 0.001) ? left/leftLen : vec2(0.0, 0.0);
right = (rightLen > 0.001) ? right/rightLen : vec2(0.0, 0.0);
vec2 capDisplacementDir = vec2(0, 0);
vec2 joinDisplacementDir = vec2(0, 0);
float displacementLen = lineWidth;
if (isJoin) {
bool isOutside = (left.x * right.y - left.y * right.x) * lineParameters.y > 0.0;
joinDisplacementDir = normalize(left + right);
joinDisplacementDir = perpendicular(joinDisplacementDir);
if (leftLen > 0.001 && rightLen > 0.001) {
float nDotSeg = dot(joinDisplacementDir, left);
displacementLen /= length(nDotSeg * left - joinDisplacementDir);
if (!isOutside) {
displacementLen = min(displacementLen, min(leftLen, rightLen)/abs(nDotSeg));
}
}
float subdivisionFactor = lineParameters.x;
if (isOutside && (displacementLen > miterLimit * lineWidth)) {`),h?i.main.add(c`
        vec2 startDir = leftLen < 0.001 ? right : left;
        startDir = perpendicular(startDir);

        vec2 endDir = rightLen < 0.001 ? left : right;
        endDir = perpendicular(endDir);

        float factor = ${p?c`min(1.0, subdivisionFactor * ${c.float(3/2)})`:c`subdivisionFactor`};

        float rotationAngle = acos(clamp(dot(startDir, endDir), -1.0, 1.0));
        joinDisplacementDir = rotate(startDir, -sign(lineParameters.y) * factor * rotationAngle);
      `):i.main.add(c`if (leftLen < 0.001) {
joinDisplacementDir = right;
}
else if (rightLen < 0.001) {
joinDisplacementDir = left;
}
else {
joinDisplacementDir = (isStartVertex || subdivisionFactor > 0.0) ? right : left;
}
joinDisplacementDir = perpendicular(joinDisplacementDir);`);let V=f!==0;return i.main.add(c`
        displacementLen = lineWidth;
      }
    } else {
      // CAP handling ---------------------------------------------------
      joinDisplacementDir = isStartVertex ? right : left;
      joinDisplacementDir = perpendicular(joinDisplacementDir);

      ${V?c`capDisplacementDir = isStartVertex ? -right : left;`:``}
    }
  `),i.main.add(c`
    // Displacement (in pixels) caused by join/or cap
    vec2 dpos = joinDisplacementDir * sign(lineParameters.y) * displacementLen + capDisplacementDir * displacementLen;
    float lineDistNorm = noPerspectiveWrite(sign(lineParameters.y), pos.w);

    vLineDistance = lineWidth * lineDistNorm;
    ${B?c`vLineDistanceNorm = lineDistNorm;`:``}

    pos.xy += dpos;
  `),R&&i.main.add(c`vec2 segmentDir = normalize(segment);
vSegmentSDF = noPerspectiveWrite((isJoin && isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentOrigin, segmentDir)), pos.w);
vReverseSegmentSDF = noPerspectiveWrite((isJoin && !isStartVertex) ? LARGE_HALF_FLOAT : (dot(pos.xy - segmentEnd, -segmentDir)), pos.w);`),p&&(s?i.uniforms.add(new v(`worldToScreenRatio`,e=>1/e.screenToPCSRatio)):i.main.add(c`vec3 segmentCenter = mix((nextPosition + position) * 0.5, (position + prevPosition) * 0.5, isEndVertex);
float worldToScreenRatio = computeWorldToScreenRatio(segmentCenter);`),i.main.add(c`float segmentLengthScreenDouble = length(segment);
float segmentLengthScreen = segmentLengthScreenDouble * 0.5;
float discreteWorldToScreenRatio = discretizeWorldToScreenRatio(worldToScreenRatio);
float segmentLengthRender = length(mix(nextPosition - position, position - prevPosition, isEndVertex));
vStipplePatternStretch = worldToScreenRatio / discreteWorldToScreenRatio;`),s?i.main.add(c`float segmentLengthPseudoScreen = segmentLengthScreen / pixelRatio * discreteWorldToScreenRatio / worldToScreenRatio;
float startPseudoScreen = u0 * discreteWorldToScreenRatio - mix(0.0, segmentLengthPseudoScreen, isEndVertex);`):i.main.add(c`float startPseudoScreen = mix(u0, u0 - segmentLengthRender, isEndVertex) * discreteWorldToScreenRatio;
float segmentLengthPseudoScreen = segmentLengthRender * discreteWorldToScreenRatio;`),i.uniforms.add(new d(`stipplePatternPixelSize`,e=>Y(e))),i.main.add(c`
      float patternLength = patternLineSize * stipplePatternPixelSize;

      ${l(F,c`
          float uu = mix(u0, u0 - segmentLengthRender, isEndVertex);
          vStippleDistanceLimits = vec2(uu, uu + segmentLengthRender);
          vStipplePatternStretch = 1.0;

          // The v-coordinate used in case of an image pattern.
          bool isLeft = sign(lineParameters.y) < 0.0;
          vStippleV = isLeft ? 0.0 : 1.0;
        `,c`
          // Compute the coordinates at both start and end of the line segment, because we need both to clamp to in the
          // fragment shader
          vStippleDistanceLimits = computeStippleDistanceLimits(startPseudoScreen, segmentLengthPseudoScreen, segmentLengthScreen, patternLength);
        `)}

      vStippleDistance = mix(vStippleDistanceLimits.x, vStippleDistanceLimits.y, isEndVertex);

      // Adjust the coordinate to the displaced position (the pattern is shortened/overextended on the in/outside of
      // joins)
      if (segmentLengthScreenDouble >= 0.001) {
        // Project the actual vertex position onto the line segment. Note that the resulting factor is within [0..1]
        // at the original vertex positions, and slightly outside of that range at the displaced positions
        vec2 stippleDisplacement = pos.xy - segmentOrigin;
        float stippleDisplacementFactor = dot(segment, stippleDisplacement) / (segmentLengthScreenDouble * segmentLengthScreenDouble);

        // Apply this offset to the actual vertex coordinate (can be screen or pseudo-screen space)
        vStippleDistance += (stippleDisplacementFactor - isEndVertex) * (vStippleDistanceLimits.y - vStippleDistanceLimits.x);
      }

      // Cancel out perspective correct interpolation because we want this length the really represent the screen
      // distance
      vStippleDistanceLimits = noPerspectiveWrite(vStippleDistanceLimits, pos.w);
      vStippleDistance = noPerspectiveWrite(vStippleDistance, pos.w);

      // Disable stipple distance limits on caps
      vStippleDistanceLimits = isJoin ?
                                 vStippleDistanceLimits :
                                 isStartVertex ?
                                  vec2(-1e34, vStippleDistanceLimits.y) :
                                  vec2(vStippleDistanceLimits.x, 1e34);
    `)),i.main.add(c`
      // Convert back into NDC
      pos.xy = (pos.xy / viewport.zw) * pos.w;

      vColor = getColor();
      vColor.a = noPerspectiveWrite(vColor.a * coverage, pos.w);

      ${g&&!s?`pos.z -= 0.001 * pos.w;`:``}

      // transform final position to camera space for slicing
      vpos = (inverseProjectionMatrix * pos).xyz;
      gl_Position = pos;
      forwardObjectAndLayerIdColor();
    }`),t.fragment.include(w,e),t.include(te,e),a.include(k),a.main.add(c`discardBySlice(vpos);
discardByTerrainDepth();`),t.include(N),a.main.add(c`
    float lineWidth = noPerspectiveRead(vLineWidth);
    float lineDistance = noPerspectiveRead(vLineDistance);
    ${l(B,c`float lineDistanceNorm = noPerspectiveRead(vLineDistanceNorm);`)}
  `),g?a.main.add(c`vec4 finalColor = vec4(1.0, 0.0, 1.0, 1.0);`):(R&&a.main.add(c`
        float sdf = noPerspectiveRead(min(vSegmentSDF, vReverseSegmentSDF));
        vec2 fragmentPosition = vec2(min(sdf, 0.0), lineDistance);

        float fragmentRadius = length(fragmentPosition);
        float fragmentCapSDF = (fragmentRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
        float capCoverage = clamp(0.5 - fragmentCapSDF, 0.0, 1.0);

        if (capCoverage < ${c.float(.003913894324853229)}) {
          discard;
        }
      `),z?a.main.add(c`
      vec2 stipplePosition = vec2(
        min(getStippleSDF() * 2.0 - 1.0, 0.0),
        lineDistanceNorm
      );
      float stippleRadius = length(stipplePosition * lineWidth);
      float stippleCapSDF = (stippleRadius - lineWidth) * 0.5; // Divide by 2 to transform from double pixel scale
      float stippleCoverage = clamp(0.5 - stippleCapSDF, 0.0, 1.0);
      float stippleAlpha = step(${c.float(A)}, stippleCoverage);
      `):a.main.add(c`float stippleAlpha = getStippleAlpha(lineWidth);`),u!==9&&a.main.add(c`discardByStippleAlpha(stippleAlpha, ${c.float(.003913894324853229)});`),t.include(N),a.uniforms.add(new S(`intrinsicColor`,e=>e.color)).main.add(c`vec4 color = intrinsicColor * vColor;
color.a = noPerspectiveRead(color.a);`),x&&a.uniforms.add(new S(`innerColor`,e=>e.innerColor??e.color),new d(`innerWidth`,(e,t)=>e.innerWidth*t.camera.pixelRatio)).main.add(c`float distToInner = abs(lineDistance) - innerWidth;
float innerAA = clamp(0.5 - distToInner, 0.0, 1.0);
float innerAlpha = innerColor.a + color.a * (1.0 - innerColor.a);
color = mix(color, vec4(innerColor.rgb, innerAlpha), innerAA);`),a.main.add(c`vec4 finalColor = blendStipple(color, stippleAlpha);`),m&&(a.uniforms.add(new d(`falloff`,e=>e.falloff)),a.main.add(c`finalColor.a *= pow(max(0.0, 1.0 - abs(lineDistanceNorm)), falloff);`)),p||a.main.add(c`float featherStartDistance = max(lineWidth - 2.0, 0.0);
float value = abs(lineDistance);
float feather = (value - featherStartDistance) / (lineWidth - featherStartDistance);
finalColor.a *= 1.0 - clamp(feather, 0.0, 1.0);`),M&&a.main.add(c`
        finalColor = animate(finalColor);

        ${l(u!==9,c`
            if (finalColor.a <= ${c.float(.003913894324853229)}) {
              discard;
            }`)}
      `)),a.main.add(c`outputColorHighlightOLID(applySlice(finalColor, vpos), finalColor.rgb);`),t}var ge=Object.freeze(Object.defineProperty({__proto__:null,build:$,ribbonlineNumRoundJoinSubdivisions:1},Symbol.toStringTag,{value:`Module`}));export{X as a,Q as c,V as d,R as f,ue as i,G as l,he as n,Z as o,B as p,$ as r,de as s,ge as t,U as u};