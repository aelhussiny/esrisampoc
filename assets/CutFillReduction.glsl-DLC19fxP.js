import{n as e,t}from"./glsl-CHAh5tEH.js";import{t as n}from"./ScreenSpacePass.glsl-BQuyCpqA.js";import{t as r}from"./Texture2DPassUniform-DQ1HS8F6.js";import{t as i}from"./NoParameters-x88d7FbV.js";import{t as a}from"./ShaderBuilder-HdHfSgzd.js";var o=class extends i{};function s(i){let{reductionPass:o}=i,s=new a;return s.include(n),s.fragment.uniforms.add(new r(`cutFillDepthTexture`,e=>e.depthTexture)),s.fragment.main.add(e`
    ivec2 iuv = ivec2(gl_FragCoord.xy) * 2;

    vec2 t0 = texelFetch(cutFillDepthTexture, iuv + ivec2(0, 0), 0).rg;
    vec2 t1 = texelFetch(cutFillDepthTexture, iuv + ivec2(1, 0), 0).rg;
    vec2 t2 = texelFetch(cutFillDepthTexture, iuv + ivec2(0, 1), 0).rg;
    vec2 t3 = texelFetch(cutFillDepthTexture, iuv + ivec2(1, 1), 0).rg;

    ${t(o===0,`
        vec2 totalDepth = t0 + t1 + t2 + t3;

        fragColor = vec4(totalDepth, 0.0, 0.0);
      `)}

    ${t(o===1,`       
        float min01 = min(t0.r, t1.r);
        float minCoordsPacked01 = mix(t0.g, t1.g, float(t1.r < t0.r));

        float min23 = min(t2.r, t3.r);
        float minCoordsPacked23 = mix(t2.g, t3.g, float(t3.r < t2.r));

        float minValue = min(min01, min23);
        float minCoordsPacked = mix(minCoordsPacked01, minCoordsPacked23, float(min23 < min01));

        fragColor = vec4(minValue, minCoordsPacked, 0.0, 0.0);
      `)}

    ${t(o===2,`
        float max01 = max(t0.r, t1.r);
        float maxCoordsPacked01 = mix(t0.g, t1.g, float(t1.r > t0.r));

        float max23 = max(t2.r, t3.r);
        float maxCoordsPacked23 = mix(t2.g, t3.g, float(t3.r > t2.r));

        float maxValue = max(max01, max23);
        float maxCoordsPacked = mix(maxCoordsPacked01, maxCoordsPacked23, float(max23 > max01));

        fragColor = vec4(maxValue, maxCoordsPacked, 0.0, 0.0);
      `)}
  `),s}var c=Object.freeze(Object.defineProperty({__proto__:null,CutFillReductionParameters:o,build:s},Symbol.toStringTag,{value:`Module`}));export{s as n,c as r,o as t};