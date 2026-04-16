import{n as e,t}from"./glsl-CHAh5tEH.js";import{t as n}from"./ScreenSpacePass.glsl-BQuyCpqA.js";import{t as r}from"./Texture2DPassUniform-DQ1HS8F6.js";import{t as i}from"./NoParameters-x88d7FbV.js";import{t as a}from"./ShaderBuilder-HdHfSgzd.js";import{t as o}from"./ReadDepth.glsl-D6wl0lUV.js";var s=class extends i{};function c(i){let{preparePass:s}=i,c=new a;return c.include(n),c.fragment.include(o),c.fragment.uniforms.add(new r(`cutFillReferenceDepthTexture`,e=>e.referenceDepthTexture),new r(`cutFillTargetDepthTexture`,e=>e.targetDepthTexture)),c.fragment.code.add(e`bool outsideFar(float depth) {
return depth >= 1.0;
}`),c.fragment.main.add(e`
    float referenceDepth = depthFromTexture(cutFillReferenceDepthTexture, uv);
    float targetDepth = depthFromTexture(cutFillTargetDepthTexture, uv);

    if (outsideFar(targetDepth)) {
      discard;
    }

    ${t(s===0,`
        float depth = referenceDepth - targetDepth;
        fragColor = vec4(min(0.0, depth), max(0.0, depth), 0.0, 0.0);
    `)}

    ${t(s===1,`
        ivec2 texSize = textureSize(cutFillReferenceDepthTexture, 0);
        ivec2 coords = ivec2(gl_FragCoord.xy);
        float packedCoords = float(coords.x) + float(coords.y) * float(texSize.x);

        fragColor = vec4(referenceDepth, packedCoords, 0.0, 0.0);
    `)}
  `),c}var l=Object.freeze(Object.defineProperty({__proto__:null,CutFillDepthParameters:s,build:c},Symbol.toStringTag,{value:`Module`}));export{l as n,s as r,c as t};