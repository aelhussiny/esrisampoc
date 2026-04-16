import{t as e}from"./mat4f64-DRhfuvl3.js";import{C as t,S as n}from"./mat4-B0U6qRAd.js";import{r}from"./vec4f64-Bge3Qg6c.js";import{n as i,t as a}from"./glsl-CHAh5tEH.js";import{t as o}from"./FloatPassUniform-BGNunQwI.js";import{i as s,s as c}from"./enums-BAaDi5mo.js";import{a as l,t as u}from"./Texture-Cs13pdSK.js";import{t as d}from"./Float3PassUniform-DL2u3U8R.js";import{n as f,r as p}from"./ScreenSizePerspective.glsl-kukqaq0s.js";import{t as m}from"./FloatBindUniform-Dxcf3oBX.js";import{t as h}from"./Matrix4DrawUniform-vp36U-0Y.js";import{i as g,t as _}from"./View.glsl-Cp2_MWNu.js";import{t as v}from"./VisualVariables.glsl-CRqOZp2t.js";import{t as y}from"./FloatsPassUniform-BGlxT3as.js";import{t as b}from"./ManagedTexture-DxnrYlsL.js";var x=8;function S(e,r){let{vertex:s,attributes:c}=e;s.uniforms.add(new o(`intrinsicWidth`,e=>e.width));let{hasScreenSizePerspective:l,spherical:u}=r;l?(e.include(f,r),p(s),_(s,r),s.uniforms.add(new h(`inverseViewMatrix`,(e,r)=>n(C,t(C,r.camera.viewMatrix,e.origin)))),s.code.add(i`
      float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
        vec3 worldPos = (inverseViewMatrix * vec4(pos, 1)).xyz;
        vec3 groundUp = ${u?i`normalize(worldPos + localOrigin)`:i`vec3(0.0, 0.0, 1.0)`};
        float absCosAngle = abs(dot(groundUp, normalize(worldPos - cameraPosition)));

        return screenSizePerspectiveScaleFloat(size, absCosAngle, length(pos), screenSizePerspective);
      }
    `)):s.code.add(i`float applyLineSizeScreenSizePerspective(float size, vec3 pos) {
return size;
}`),r.hasVVSize?(c.add(`sizeFeatureAttribute`,`float`),s.uniforms.add(new d(`vvSizeMinSize`,e=>e.vvSize.minSize),new d(`vvSizeMaxSize`,e=>e.vvSize.maxSize),new d(`vvSizeOffset`,e=>e.vvSize.offset),new d(`vvSizeFactor`,e=>e.vvSize.factor),new d(`vvSizeFallback`,e=>e.vvSize.fallback)),s.code.add(i`
    float getSize(${a(l,`vec3 pos`)}) {
      float size = isnan(sizeFeatureAttribute)
        ? vvSizeFallback.x
        : intrinsicWidth * clamp(vvSizeOffset + sizeFeatureAttribute * vvSizeFactor, vvSizeMinSize, vvSizeMaxSize).x;

      return ${a(l,`applyLineSizeScreenSizePerspective(size, pos)`,`size`)};
    }
    `)):(c.add(`size`,`float`),s.code.add(i`
    float getSize(${a(l,`vec3 pos`)}) {
      float fullSize = intrinsicWidth * size;
      return ${a(l,`applyLineSizeScreenSizePerspective(fullSize, pos)`,`fullSize`)};
    }
    `)),r.hasVVOpacity?(c.add(`opacityFeatureAttribute`,`float`),s.constants.add(`vvOpacityNumber`,`int`,8),s.uniforms.add(new y(`vvOpacityValues`,x,e=>e.vvOpacity.values),new y(`vvOpacityOpacities`,x,e=>e.vvOpacity.opacityValues),new o(`vvOpacityFallback`,e=>e.vvOpacity.fallback,{supportsNaN:!0})),s.code.add(i`
    float interpolateOpacity(float value) {
      if (value <= vvOpacityValues[0]) {
        return vvOpacityOpacities[0];
      }

      for (int i = 1; i < vvOpacityNumber; ++i) {
        if (vvOpacityValues[i] >= value) {
          float f = (value - vvOpacityValues[i-1]) / (vvOpacityValues[i] - vvOpacityValues[i-1]);
          return mix(vvOpacityOpacities[i-1], vvOpacityOpacities[i], f);
        }
      }

      return vvOpacityOpacities[vvOpacityNumber - 1];
    }

    vec4 applyOpacity(vec4 color) {
      if (isnan(opacityFeatureAttribute)) {
        // If there is a color vv then it will already have taken care of applying the fallback
        return ${a(r.hasVVColor,`color`,`vec4(color.rgb, vvOpacityFallback)`)};
      }

      return vec4(color.rgb, interpolateOpacity(opacityFeatureAttribute));
    }
    `)):s.code.add(i`vec4 applyOpacity(vec4 color) {
return color;
}`),r.hasVVColor?(e.include(v,r),c.add(`colorFeatureAttribute`,`float`),s.code.add(i`vec4 getColor() {
vec4 color = interpolateVVColor(colorFeatureAttribute);
if (isnan(color.r)) {
return vec4(0);
}
return applyOpacity(color);
}`)):(c.add(`color`,`vec4`),s.code.add(i`vec4 getColor() {
return applyOpacity(color);
}`))}var C=e();function w(e){e.vertex.code.add(`#define noPerspectiveWrite(x, w) (x * w)`)}function T(e){e.fragment.code.add(`#define noPerspectiveRead(x) (x * gl_FragCoord.w)`)}var E=.5,D=r(E/2,E/2,1-E/2,1-E/2);function O(e){return e===`cross`||e===`x`}function k(e,t=128,n=t*E,r=0){let{data:i,parameters:a}=A(e,t,n,r);return new b(i,a)}function A(e,t=128,n=t*E,r=0){return{data:j(e,t,n,r),parameters:{mipmap:!1,wrap:{s:33071,t:33071},width:t,height:t,noUnpackFlip:!0,dataType:c.FLOAT,pixelFormat:6403,internalFormat:s.R16F,reloadable:!0}}}function j(e,t=128,n=t*E,r=0){switch(e){case`circle`:default:return M(t,n);case`square`:return N(t,n);case`cross`:return F(t,n,r);case`x`:return I(t,n,r);case`kite`:return P(t,n);case`triangle`:return L(t,n);case`arrow`:return R(t,n)}}function M(e,t){let n=e/2-.5;return U(e,V(n,n,t/2))}function N(e,t){return z(e,t,!1)}function P(e,t){return z(e,t,!0)}function F(e,t,n=0){return B(e,t,!1,n)}function I(e,t,n=0){return B(e,t,!0,n)}function L(e,t){return U(e,H(e/2,t,t/2))}function R(e,t){let n=t,r=t/2,i=e/2,a=.8*n,o=V(i,(e-t)/2-a,Math.sqrt(a*a+r*r)),s=H(i,n,r);return U(e,(e,t)=>Math.max(s(e,t),-o(e,t)))}function z(e,t,n){return n&&(t/=Math.SQRT2),U(e,(r,i)=>{let a=r-.5*e+.25,o=.5*e-i-.75;if(n){let e=(a+o)/Math.SQRT2;o=(o-a)/Math.SQRT2,a=e}return Math.max(Math.abs(a),Math.abs(o))-.5*t})}function B(e,t,n,r=0){t-=r,n&&(t*=Math.SQRT2);let i=.5*t;return U(e,(t,a)=>{let o,s=t-.5*e,c=.5*e-a-1;if(n){let e=(s+c)/Math.SQRT2;c=(c-s)/Math.SQRT2,s=e}return s=Math.abs(s),c=Math.abs(c),o=s>c?s>i?Math.sqrt((s-i)*(s-i)+c*c):c:c>i?Math.sqrt(s*s+(c-i)*(c-i)):s,o-=r/2,o})}function V(e,t,n){return(r,i)=>{let a=r-e,o=i-t;return Math.sqrt(a*a+o*o)-n}}function H(e,t,n){let r=Math.sqrt(t*t+n*n);return(i,a)=>{let o=Math.abs(i-e)-n,s=a-e+t/2+.75,c=(t*o+n*s)/r,l=-s;return Math.max(c,l)}}function U(e,t){let n=new Float32Array(e*e);for(let r=0;r<e;r++)for(let i=0;i<e;i++)n[i+e*r]=t(i,r)/e;return n}var W=32/5;64/W;var G=.25;function K(e,t){let n=j(e,64,32,W),r=new l(64);return r.internalFormat=s.R16F,r.dataType=c.FLOAT,r.pixelFormat=6403,r.wrapMode=33071,new u(t,r,n)}function q(e,t){let n=e.vertex,r=t.hasScreenSizePerspective;g(n),n.uniforms.get(`markerScale`)??n.constants.add(`markerScale`,`float`,1),n.constants.add(`markerSizePerLineWidth`,`float`,10).code.add(i`
  float getLineWidth(${a(r,`vec3 pos`)}) {
     return max(getSize(${a(r,`pos`)}), 1.0) * pixelRatio;
  }

  float getScreenMarkerSize(float lineWidth) {
    return markerScale * markerSizePerLineWidth * lineWidth;
  }
  `),t.space===2&&(n.constants.add(`maxSegmentLengthFraction`,`float`,.45),n.uniforms.add(new m(`perRenderPixelRatio`,e=>e.camera.perRenderPixelRatio)),n.code.add(i`
  bool areWorldMarkersHidden(vec3 pos, vec3 other) {
    vec3 midPoint = mix(pos, other, 0.5);
    float distanceToCamera = length(midPoint);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    float worldMarkerSize = getScreenMarkerSize(getLineWidth(${a(r,`pos`)})) * screenToWorldRatio;
    float segmentLen = length(pos - other);
    return worldMarkerSize > maxSegmentLengthFraction * segmentLen;
  }

  float getWorldMarkerSize(vec3 pos) {
    float distanceToCamera = length(pos);
    float screenToWorldRatio = perRenderPixelRatio * distanceToCamera * 0.5;
    return getScreenMarkerSize(getLineWidth(${a(r,`pos`)})) * screenToWorldRatio;
  }
  `))}export{E as a,T as c,O as i,w as l,G as n,k as o,K as r,D as s,q as t,S as u};