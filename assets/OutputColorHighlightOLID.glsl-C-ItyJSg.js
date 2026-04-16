import{n as e,t}from"./glsl-CHAh5tEH.js";import{o as n}from"./ShaderOutput-DU78wUba.js";import{t as r}from"./OutputHighlight.glsl-DTZ8zYnI.js";import{t as i}from"./ColorConversion.glsl-CX15PnV2.js";import{t as a}from"./AlphaCutoff-cZu5nT4P.js";import{t as o}from"./Emissions.glsl-DIBswxV8.js";function s(s,c){s.include(r,c),s.include(o,c),s.fragment.include(i);let{output:l,oitPass:u,hasEmission:d,discardInvisibleFragments:f,oitPremultipliedAlpha:p,snowCover:m}=c,h=l===9,g=n(l)&&u===1,_=n(l)&&u===2,v=n(l)&&u!==1,y=0;(v||g)&&s.outputs.add(`fragColor`,`vec4`,y++),d&&s.outputs.add(`fragEmission`,`vec4`,y++),g&&s.outputs.add(`fragAlpha`,`float`,y++),s.fragment.code.add(e`
    void outputColorHighlightOLID(vec4 finalColor, vec3 emissiveSymbolColor ${t(m,`, float snow`)}) {
      ${t(h,`finalColor.a = 1.0;`)}
      ${t(f,`if (finalColor.a < ${e.float(a)}) { discard; }`)}

      ${t(g,`${t(p,`fragColor = finalColor;`,`fragColor = premultiplyAlpha(finalColor);`)}\n           fragAlpha = finalColor.a;`)}
      ${t(_&&p&&f,`finalColor.rgb /= finalColor.a;`)}
      ${t(v,`fragColor = finalColor;`)}
      ${t(d,`fragEmission = ${t(m,`mix(finalColor.a * getEmissions(emissiveSymbolColor), vec4(0.0), snow);`,`finalColor.a * getEmissions(emissiveSymbolColor);`)}`)}
      calculateOcclusionAndOutputHighlight();
      ${t(h,`outputObjectAndLayerIdColor();`)}
    }
  `)}export{s as t};