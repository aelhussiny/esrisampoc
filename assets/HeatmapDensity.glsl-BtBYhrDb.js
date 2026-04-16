import{n as e}from"./glsl-CHAh5tEH.js";import{t}from"./FloatPassUniform-BGNunQwI.js";import{t as n}from"./ShaderBuilder-HdHfSgzd.js";import{n as r}from"./View.glsl-Cp2_MWNu.js";function i(i){let a=new n,{vertex:o,fragment:s,attributes:c,varyings:l}=a;r(o,i);let{isAttributeDriven:u,usesHalfFloat:d}=i;return c.add(`position`,`vec3`),c.add(`uv0`,`vec2`),u&&(c.add(`featureAttribute`,`float`),l.add(`attributeValue`,`float`)),d&&s.constants.add(`compressionFactor`,`float`,.25),l.add(`unitCirclePos`,`vec2`),o.uniforms.add(new t(`radius`,({resolutionForScale:e,searchRadius:t},{camera:n,screenToWorldRatio:r,overlayStretch:i})=>2*t*(e===0?1:e/r)*n.pixelRatio/n.fullViewport[2]/i)),o.main.add(e`
    unitCirclePos = uv0;

    vec4 posProj = proj * (view * vec4(${`position`}, 1.0));
    vec4 quadOffset = vec4(unitCirclePos * radius, 0.0, 0.0);

    ${u?e`attributeValue = ${`featureAttribute`};`:``}
    gl_Position = posProj + quadOffset;
  `),s.main.add(e`
    float radiusRatioSquared = dot(unitCirclePos, unitCirclePos);
    if (radiusRatioSquared > 1.0) {
      fragColor = vec4(0.0);
    }
    else {
      float oneMinusRadiusRatioSquared = 1.0 - radiusRatioSquared;
      float density = oneMinusRadiusRatioSquared * oneMinusRadiusRatioSquared ${u?e` * attributeValue`:``} ${d?e` * compressionFactor`:``};
      fragColor = vec4(density);
    }
  `),a}var a=Object.freeze(Object.defineProperty({__proto__:null,build:i},Symbol.toStringTag,{value:`Module`}));export{i as n,a as t};