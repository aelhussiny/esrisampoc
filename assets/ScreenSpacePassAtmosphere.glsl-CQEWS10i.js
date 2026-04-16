import{t as e}from"./mat4f64-DRhfuvl3.js";import{y as t}from"./mat4-B0U6qRAd.js";import{n,t as r}from"./glsl-CHAh5tEH.js";import{t as i}from"./Matrix4BindUniform-o4jYbzYw.js";function a(e,a={needUVs:!0,needEyeDirection:!0}){e.attributes.add(`position`,`vec2`),e.varyings.add(`worldRay`,`vec3`);let{needUVs:s,needEyeDirection:c}=a;s&&e.varyings.add(`uv`,`vec2`),c&&e.varyings.add(`eyeDir`,`vec3`),e.vertex.uniforms.add(new i(`inverseProjectionMatrix`,e=>e.camera.inverseProjectionMatrix),new i(`inverseViewMatrix`,e=>t(o,e.camera.viewMatrix))),e.vertex.main.add(n`
    vec3 posViewNear = (inverseProjectionMatrix * vec4(position, -1.0, 1.0)).xyz;
    ${r(c,`eyeDir = posViewNear;`)}
    worldRay = (inverseViewMatrix * vec4(posViewNear, 0)).xyz;
    ${r(s,`uv = position * 0.5 + vec2(0.5);`)}
    gl_Position = vec4(position, 1, 1);
  `)}var o=e();export{a as t};