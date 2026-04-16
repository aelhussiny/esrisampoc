import{n as e}from"./glsl-CHAh5tEH.js";import{t}from"./ScreenSpacePass.glsl-BQuyCpqA.js";import{t as n}from"./FloatPassUniform-BGNunQwI.js";import{t as r}from"./Texture2DPassUniform-DQ1HS8F6.js";import{t as i}from"./ShaderBuilder-HdHfSgzd.js";import{t as a}from"./ReadDepth.glsl-D6wl0lUV.js";import{t as o}from"./Float2DrawUniform-C9F65We4.js";import{t as s}from"./Texture2DDrawUniform-BDXvI_a4.js";var c=4;function l(){let l=new i,u=l.fragment;l.include(t);let d=(c+1)/2,f=1/(2*d*d);return u.include(a),u.uniforms.add(new r(`depthMap`,e=>e.depthTexture),new s(`tex`,e=>e.colorTexture),new o(`blurSize`,e=>e.blurSize),new n(`projScale`,(e,t)=>{let n=t.camera.distance;return n>5e4?Math.max(0,e.projScale-(n-5e4)):e.projScale})),u.code.add(e`
    void blurFunction(vec2 uv, float r, float center_d, float sharpness, inout float wTotal, inout float bTotal) {
      float c = texture(tex, uv).r;
      float d = linearDepthFromTexture(depthMap, uv);

      float ddiff = d - center_d;

      float w = exp(-r * r * ${e.float(f)} - ddiff * ddiff * sharpness);
      wTotal += w;
      bTotal += w * c;
    }
  `),l.outputs.add(`fragBlur`,`float`),u.main.add(e`
    float b = 0.0;
    float w_total = 0.0;

    float center_d = linearDepthFromTexture(depthMap, uv);

    float sharpness = -0.05 * projScale / center_d;
    for (int r = -${e.int(c)}; r <= ${e.int(c)}; ++r) {
      float rf = float(r);
      vec2 uvOffset = uv + rf * blurSize;
      blurFunction(uvOffset, rf, center_d, sharpness, w_total, b);
    }
    fragBlur = b / w_total;`),l}var u=Object.freeze(Object.defineProperty({__proto__:null,build:l},Symbol.toStringTag,{value:`Module`}));export{l as n,u as t};