import{t as e}from"./signal-D8PC1hBG.js";import{n as t}from"./glsl-CHAh5tEH.js";import{t as n}from"./ScreenSpacePass.glsl-BQuyCpqA.js";import{t as r}from"./FloatPassUniform-BGNunQwI.js";import{t as i}from"./Texture2DPassUniform-DQ1HS8F6.js";import{t as a}from"./NoParameters-x88d7FbV.js";import{t as o}from"./ShaderBuilder-HdHfSgzd.js";import{t as s}from"./IntegerPassUniform-sGDjJlpd.js";var c=class extends a{constructor(){super(...arguments),this.effect=0,this.fadeFactor=e(1)}};function l(){let e=new o;return e.include(n),e.outputs.add(`fragColor`,`vec4`,0),e.fragment.uniforms.add(new i(`colorTexture`,e=>e.color),new i(`focusArea`,e=>e.focusArea),new s(`focusAreaEffectMode`,e=>e.effect),new r(`fadeFactor`,e=>e.fadeFactor.value)).main.add(t`
      float mask = texture( focusArea, uv, 0.0 ).r;
      vec4 color = texture( colorTexture, uv, 0.0 );
      vec4 colorDeSaturate = vec4(color.r * 0.25 + color.g * 0.5 + color.b * 0.25);
      if (focusAreaEffectMode == ${t.int(0)}) {
        fragColor = mask > 0.0 ? color : mix(color, 0.55 * colorDeSaturate + 0.45, fadeFactor);
      } else {
        fragColor = mask > 0.0 ? color : mix(color, 0.33 * color, fadeFactor);
      }
  `),e}var u=Object.freeze(Object.defineProperty({__proto__:null,FocusAreaColorPassParameters:c,build:l},Symbol.toStringTag,{value:`Module`}));export{l as n,u as r,c as t};