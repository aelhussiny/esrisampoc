import{n as e,t}from"./glsl-CHAh5tEH.js";import{t as n}from"./ScreenSpacePass.glsl-BQuyCpqA.js";import{t as r}from"./Texture2DPassUniform-DQ1HS8F6.js";import{t as i}from"./NoParameters-x88d7FbV.js";import{t as a}from"./ShaderBuilder-HdHfSgzd.js";import{t as o}from"./EmissionDimming.glsl-sCVwsfpW.js";var s=class extends i{};function c(i){let s=new a;s.include(n);let{hasEmission:c}=i,l=s.fragment;return c&&l.include(o),l.uniforms.add(new r(`colorTexture`,e=>e.color),new r(`splatOutputColor`,e=>e.splatColor)),c&&l.uniforms.add(new r(`emissionTexture`,e=>e.emission)),s.outputs.add(`fragColor`,`vec4`,0),c&&s.outputs.add(`fragEmission`,`vec4`,1),s.fragment.main.add(e`
      vec4 color = texture(colorTexture, uv);
      vec4 splatColor = texture(splatOutputColor, uv);

      fragColor = splatColor + color * (1.0 - splatColor.a);
      ${t(c,e`
          vec4 emission = texture(emissionTexture, uv);
          float srcAlpha = splatColor.a;

          if (srcAlpha == 0.0) {
            fragEmission = emission;
            return;
          }

          vec3 oitDimming = emissionDimming(splatColor.rgb, srcAlpha);
          float opaqueSuppression = smoothstep(0.95, 1.0, srcAlpha);
          vec3 dimming = mix(oitDimming, vec3(0.0), opaqueSuppression);

          fragEmission = vec4(emission.rgb * dimming, emission.a);
        `)}
    `),s}var l=Object.freeze(Object.defineProperty({__proto__:null,GaussianSplatCompositionPassParameters:s,build:c},Symbol.toStringTag,{value:`Module`}));export{l as n,c as r,s as t};