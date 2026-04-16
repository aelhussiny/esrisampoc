import{n as e}from"./glsl-CHAh5tEH.js";import{t}from"./FloatPassUniform-BGNunQwI.js";import{t as n}from"./ShaderBuilder-HdHfSgzd.js";import{n as r}from"./View.glsl-Cp2_MWNu.js";import{t as i}from"./Float4PassUniform-lh-dPatj.js";import{t as a}from"./AlphaCutoff-cZu5nT4P.js";function o(o){let s=new n,{vertex:c,fragment:l}=s;r(c,o),c.uniforms.add(new t(`width`,e=>e.width)),s.attributes.add(`position`,`vec3`),s.attributes.add(`normal`,`vec3`),s.attributes.add(`uv0`,`vec2`),s.attributes.add(`length`,`float`),s.varyings.add(`vtc`,`vec2`),s.varyings.add(`vlength`,`float`),s.varyings.add(`vradius`,`float`),c.main.add(e`vec3 bitangent = normal;
vtc = uv0;
vlength = length;
vradius = 0.5 * width;
vec4 pos = view * vec4(position + vradius * bitangent * uv0.y, 1.0);
gl_Position = proj * pos;`),l.uniforms.add(new t(`outlineSize`,e=>e.outlineSize),new i(`outlineColor`,e=>e.outlineColor),new t(`stripeLength`,e=>e.stripeLength),new i(`stripeEvenColor`,e=>e.stripeEvenColor),new i(`stripeOddColor`,e=>e.stripeOddColor));let u=1/Math.sqrt(2);return l.code.add(e`
    const float INV_SQRT2 = ${e.float(u)};

    vec4 arrowColor(vec2 tc, float len) {
      float d = INV_SQRT2 * (tc.x - abs(tc.y));
      d = min(d, INV_SQRT2 * (len - tc.x - abs(tc.y)));
      d = min(d, 1.0 - abs(tc.y));

      if (d < 0.0) {
        return vec4(0.0);
      }
      if (d < outlineSize) {
        return outlineColor;
      }
      return fract(0.5 / stripeLength * tc.x * vradius) >= 0.5 ? stripeOddColor : stripeEvenColor;
    }`),l.main.add(e`
    vec2 ntc = vec2(vtc.x / vradius, vtc.y);
    vec4 color = arrowColor(ntc, vlength / vradius);
    if (color.a < ${e.float(a)}) {
      discard;
    }
    fragColor = color;`),s}var s=Object.freeze(Object.defineProperty({__proto__:null,build:o},Symbol.toStringTag,{value:`Module`}));export{o as n,s as t};