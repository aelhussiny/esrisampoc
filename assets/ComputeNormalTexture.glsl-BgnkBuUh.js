import{r as e}from"./mat3f64-CwJ0v42Q.js";import{n as t}from"./vec2f64-vR6k7VCu.js";import{n}from"./glsl-CHAh5tEH.js";import{t as r}from"./Float2PassUniform-C0auDrhO.js";import{t as i}from"./Matrix3PassUniform-XxFQzHVr.js";import{t as a}from"./Texture2DPassUniform-DQ1HS8F6.js";import{n as o}from"./Emissions.glsl-DIBswxV8.js";import{t as s}from"./Float2DrawUniform-C9F65We4.js";import{t as c}from"./Texture2DDrawUniform-BDXvI_a4.js";function l(e,t){return d(e,t)}function u(e,t){return d(e,t)}function d(l,u){let d=l.fragment,{hasVertexTangents:f,doubleSidedMode:p,hasNormalTexture:m,textureCoordinateType:h,bindType:g,hasNormalTextureTransform:_}=u;f?(l.attributes.add(`tangent`,`vec4`),l.varyings.add(`vTangent`,`vec4`),p===2?d.code.add(n`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = gl_FrontFacing ? vTangent.w : -vTangent.w;
vec3 tangent = normalize(gl_FrontFacing ? vTangent.xyz : -vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`):d.code.add(n`mat3 computeTangentSpace(vec3 normal) {
float tangentHeadedness = vTangent.w;
vec3 tangent = normalize(vTangent.xyz);
vec3 bitangent = cross(normal, tangent) * tangentHeadedness;
return mat3(tangent, bitangent, normal);
}`)):d.code.add(n`mat3 computeTangentSpace(vec3 normal, vec3 pos, vec2 st) {
vec3 Q1 = dFdx(pos);
vec3 Q2 = dFdy(pos);
vec2 stx = dFdx(st);
vec2 sty = dFdy(st);
float det = stx.t * sty.s - sty.t * stx.s;
vec3 T = stx.t * Q2 - sty.t * Q1;
T = T - normal * dot(normal, T);
T *= inversesqrt(max(dot(T,T), 1.e-10));
vec3 B = sign(det) * cross(normal, T);
return mat3(T, B, normal);
}`),m&&h!==0&&(l.include(o,u),d.uniforms.add(g===1?new a(`normalTexture`,e=>e.textureNormal):new c(`normalTexture`,e=>e.textureNormal)),_&&(d.uniforms.add(g===1?new r(`scale`,e=>e.scale??t):new s(`scale`,e=>e.scale??t)),d.uniforms.add(new i(`normalTextureTransformMatrix`,t=>t.normalTextureTransformMatrix??e))),d.code.add(n`vec3 computeTextureNormal(mat3 tangentSpace, vec2 uv) {
vec3 rawNormal = textureLookup(normalTexture, uv).rgb * 2.0 - 1.0;`),_&&d.code.add(n`mat3 normalRotation = mat3(normalTextureTransformMatrix[0][0]/scale[0], normalTextureTransformMatrix[0][1]/scale[1], 0.0,
normalTextureTransformMatrix[1][0]/scale[0], normalTextureTransformMatrix[1][1]/scale[1], 0.0,
0.0, 0.0, 0.0 );
rawNormal.xy = (normalRotation * vec3(rawNormal.x, rawNormal.y, 1.0)).xy;`),d.code.add(n`return tangentSpace * rawNormal;
}`))}export{l as n,u as t};