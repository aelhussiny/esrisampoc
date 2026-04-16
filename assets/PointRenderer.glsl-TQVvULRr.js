import{S as e}from"./mathUtils-Cm7mZRa8.js";import{y as t}from"./vec2-fXrlejFD.js";import{c as n}from"./vec3f64-C-UKe46_.js";import{t as r}from"./mat4f64-DRhfuvl3.js";import{d as i,k as a}from"./aaBoundingBox-DdgoVcbt.js";import{A as o,_ as s}from"./mat4-B0U6qRAd.js";import{N as c}from"./vec3-FZKRIO1K.js";import{i as l}from"./vec2f64-vR6k7VCu.js";import{n as u,t as d}from"./glsl-CHAh5tEH.js";import{t as f}from"./Float2PassUniform-C0auDrhO.js";import{t as p}from"./NoParameters-x88d7FbV.js";import{t as m}from"./ShaderBuilder-HdHfSgzd.js";import{o as h}from"./ShaderOutput-DU78wUba.js";import{t as g}from"./Matrix4BindUniform-o4jYbzYw.js";import{t as _}from"./Float3DrawUniform-CQvYVn43.js";import{t as v}from"./Matrix4DrawUniform-vp36U-0Y.js";import{a as y,t as b}from"./Slice.glsl-DBgCgV7T.js";import{t as x}from"./OutputHighlight.glsl-DTZ8zYnI.js";import{t as S}from"./PositionOutsideClipSpace-CEMoNqkh.js";import{t as C}from"./Float2DrawUniform-C9F65We4.js";var w=class extends p{constructor(){super(...arguments),this.clipBox=a(i),this.useFixedSizes=!1,this.useRealWorldSymbolSizes=!1,this.scaleFactor=1,this.minSizePx=0,this.size=0,this.sizePx=0}get fixedSize(){return this.drawScreenSpace?this.sizePx:this.size}get screenMinSize(){return this.useFixedSizes?0:this.minSizePx}get drawScreenSpace(){return this.useFixedSizes&&!this.useRealWorldSymbolSizes}},T=class extends b{constructor(e,t,n){super(e),this.origin=e,this.isLeaf=t,this.splatSize=n}};function E(n){let r=new m,i=h(n.output),{vertex:a,fragment:l}=r;r.vertex.include(y,n),r.attributes.add(`position`,`vec3`),r.attributes.add(`color`,`vec3`),a.uniforms.add(new v(`modelView`,(e,t)=>s(O,t.camera.viewMatrix,o(O,e.origin))),new g(`proj`,e=>e.camera.projectionMatrix),new C(`screenMinMaxSize`,(e,n,r)=>t(A,r.useFixedSizes?0:r.minSizePx*n.camera.pixelRatio,D(e.isLeaf)*n.camera.pixelRatio)),n.useFixedSizes?new f(`pointScale`,(e,n)=>t(A,e.fixedSize*n.camera.pixelRatio,n.camera.fullHeight)):new C(`pointScale`,(e,n,r)=>t(A,e.splatSize*r.scaleFactor*n.camera.pixelRatio,n.camera.fullHeight/n.camera.pixelRatio))),n.clippingEnabled?a.uniforms.add(new _(`clipMin`,(e,t,n)=>c(k,n.clipBox[0]-e.origin[0],n.clipBox[1]-e.origin[1],n.clipBox[2]-e.origin[2])),new _(`clipMax`,(e,t,n)=>c(k,n.clipBox[3]-e.origin[0],n.clipBox[4]-e.origin[1],n.clipBox[5]-e.origin[2]))):(a.constants.add(`clipMin`,`vec3`,[-e,-e,-e]),a.constants.add(`clipMax`,`vec3`,[e,e,e])),i&&r.varyings.add(`vColor`,`vec3`),a.main.add(u`
    // Move clipped points outside of clipspace
    if (position.x < clipMin.x || position.y < clipMin.y || position.z < clipMin.z ||
      position.x > clipMax.x || position.y > clipMax.y || position.z > clipMax.z) {
      gl_Position = ${S};
      gl_PointSize = 0.0;
      return;
    }

    if (rejectBySlice(position)) {
      gl_Position = ${S};
      gl_PointSize = 0.0;
      return;
    }

    // Position in camera space
    vec4 camera = modelView * vec4(position, 1.0);

    float pointSize = pointScale.x;
    vec4 position = proj * camera;
    ${n.drawScreenSize?u`float clampedScreenSize = pointSize;`:u`float pointRadius = 0.5 * pointSize;
           vec4 cameraOffset = camera + vec4(0.0, pointRadius, 0.0, 0.0);
           vec4 positionOffset = proj * cameraOffset;
           float radius = abs(positionOffset.y - position.y);
           float viewHeight = pointScale.y;
           // screen diameter = (2 * r / w) * (h / 2)
           float screenPointSize = (radius / position.w) * viewHeight;
           float clampedScreenSize = clamp(screenPointSize, screenMinMaxSize.x, screenMinMaxSize.y);
           // Shift towards camera, to move rendered point out of terrain i.e. to
           // the camera-facing end of the virtual point when considering it as a
           // 3D sphere.
           camera.xyz -= normalize(camera.xyz) * pointRadius * clampedScreenSize / screenPointSize;
           position = proj * camera;`}

    gl_PointSize = clampedScreenSize;
    gl_Position = position;
    ${i?u`vColor = color;`:``}`),r.include(x,n);let p=0;return i&&n.hasEmission&&(r.outputs.add(`fragColor`,`vec4`,p++),r.outputs.add(`fragEmission`,`vec4`,p++)),l.main.add(u`
    vec2 vOffset = gl_PointCoord - vec2(0.5, 0.5);
    float r2 = dot(vOffset, vOffset);

    if (r2 > 0.25) {
      discard;
    }
    calculateOcclusionAndOutputHighlight();
    ${d(i,`fragColor = vec4(vColor, 1.0);\n      ${d(n.hasEmission,`fragEmission = vec4(vec3(0.0), 1.0);`)}`)}
  `),r}function D(e){return e?256:64}var O=r(),k=n(),A=l(),j=Object.freeze(Object.defineProperty({__proto__:null,PointRendererDrawParameters:T,PointRendererPassParameters:w,build:E,getMaxPointSizeScreenspace:D},Symbol.toStringTag,{value:`Module`}));export{E as a,w as i,D as n,T as r,j as t};