import{y as e}from"./vec2-fXrlejFD.js";import{l as t}from"./vec4-l6LH68wi.js";import{a as n}from"./vec4f64-Bge3Qg6c.js";import{i as r}from"./vec2f64-vR6k7VCu.js";import{n as i}from"./glsl-CHAh5tEH.js";import{t as a}from"./Float2PassUniform-C0auDrhO.js";import{t as o}from"./FloatPassUniform-BGNunQwI.js";import{t as s}from"./Texture2DPassUniform-DQ1HS8F6.js";import{t as c}from"./ShaderBuilder-HdHfSgzd.js";import{o as l}from"./ShaderOutput-DU78wUba.js";import{n as u,t as d}from"./View.glsl-Cp2_MWNu.js";import{t as f}from"./Float4PassUniform-lh-dPatj.js";import{n as p}from"./Slice.glsl-DBgCgV7T.js";import{t as m}from"./ObjectAndLayerIdColor.glsl-JVSocln4.js";import{t as h}from"./TerrainDepthTest.glsl-BvZ9_Dq8.js";import{t as g}from"./OutputHighlight.glsl-DTZ8zYnI.js";import{t as _}from"./ColorConversion.glsl-CX15PnV2.js";import{t as v}from"./AlphaCutoff-cZu5nT4P.js";import{t as y}from"./Transform.glsl-Dg4lcse9.js";import{t as b}from"./EvaluateAmbientLighting.glsl-BPT83FeU.js";import{n as x,r as S}from"./MainLighting.glsl-BAv0DWEY.js";import{t as C}from"./ReadShadowMap.glsl-D-O_pV41.js";import{t as w}from"./OutputColorHighlightOLID.glsl-C-ItyJSg.js";import{n as T,t as E}from"./WaterColor.glsl-BnglnqE2.js";import{bt as D}from"./index-gOtVMHtj.js";function O(n){n.fragment.uniforms.add(new s(`texWaveNormal`,e=>e.waveNormal),new s(`texWavePerturbation`,e=>e.wavePerturbation),new f(`waveParams`,e=>t(k,e.waveStrength,e.waveTextureRepeat,e.flowStrength,e.flowOffset)),new a(`waveDirection`,t=>e(A,t.waveDirection[0]*t.waveVelocity,t.waveDirection[1]*t.waveVelocity))),n.fragment.include(T),n.fragment.code.add(i`const vec2  FLOW_JUMP = vec2(6.0/25.0, 5.0/24.0);
vec2 textureDenormalized2D(sampler2D _tex, vec2 _uv) {
return 2.0 * texture(_tex, _uv).rg - 1.0;
}
float sampleNoiseTexture(vec2 _uv) {
return texture(texWavePerturbation, _uv).b;
}
vec3 textureDenormalized3D(sampler2D _tex, vec2 _uv) {
return 2.0 * texture(_tex, _uv).rgb - 1.0;
}
float computeProgress(vec2 uv, float time) {
return fract(time);
}
float computeWeight(vec2 uv, float time) {
float progress = computeProgress(uv, time);
return 1.0 - abs(1.0 - 2.0 * progress);
}
vec3 computeUVPerturbedWeigth(sampler2D texFlow, vec2 uv, float time, float phaseOffset) {
float flowStrength = waveParams[2];
float flowOffset = waveParams[3];
vec2 flowVector = textureDenormalized2D(texFlow, uv) * flowStrength;
float progress = computeProgress(uv, time + phaseOffset);
float weight = computeWeight(uv, time + phaseOffset);
vec2 result = uv;
result -= flowVector * (progress + flowOffset);
result += phaseOffset;
result += (time - progress) * FLOW_JUMP;
return vec3(result, weight);
}
const float TIME_NOISE_TEXTURE_REPEAT = 0.3737;
const float TIME_NOISE_STRENGTH = 7.77;
vec3 getWaveLayer(sampler2D _texNormal, sampler2D _dudv, vec2 _uv, vec2 _waveDir, float time) {
float waveStrength = waveParams[0];
vec2 waveMovement = time * -_waveDir;
float timeNoise = sampleNoiseTexture(_uv * TIME_NOISE_TEXTURE_REPEAT) * TIME_NOISE_STRENGTH;
vec3 uv_A = computeUVPerturbedWeigth(_dudv, _uv + waveMovement, time + timeNoise, 0.0);
vec3 uv_B = computeUVPerturbedWeigth(_dudv, _uv + waveMovement, time + timeNoise, 0.5);
vec3 normal_A = textureDenormalized3D(_texNormal, uv_A.xy) * uv_A.z;
vec3 normal_B = textureDenormalized3D(_texNormal, uv_B.xy) * uv_B.z;
vec3 mixNormal = normalize(normal_A + normal_B);
mixNormal.xy *= waveStrength;
mixNormal.z = sqrt(1.0 - dot(mixNormal.xy, mixNormal.xy));
return mixNormal;
}
vec4 getSurfaceNormalAndFoam(vec2 _uv, float _time) {
float waveTextureRepeat = waveParams[1];
vec3 normal = getWaveLayer(texWaveNormal, texWavePerturbation, _uv * waveTextureRepeat, waveDirection, _time);
float foam  = normals2FoamIntensity(normal, waveParams[0]);
return vec4(normal, foam);
}`)}var k=n(),A=r();function j(e){let t=new c,{vertex:n,fragment:r,varyings:a}=t,{output:s,draped:T,receiveShadows:k}=e;u(n,e),t.include(y),t.attributes.add(`position`,`vec3`),t.attributes.add(`uv0`,`vec2`);let A=new f(`waterColor`,e=>e.color);if(a.add(`vpos`,`vec3`,{invariant:!0}),n.uniforms.add(A),l(s)){if(T)return n.main.add(i`
      if (waterColor.a < ${i.float(v)}) {
        // Discard this vertex
        gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        return;
      }

      vpos = position;
      gl_Position = transformPosition(proj, view, vpos);`),r.uniforms.add(A),r.main.add(i`fragColor = waterColor;`),t;t.include(D,e),a.add(`vuv`,`vec2`),a.add(`vnormal`,`vec3`),a.add(`vtbnMatrix`,`mat3`),n.main.add(i`
      if (waterColor.a < ${i.float(v)}) {
        // Discard this vertex
        gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
        return;
      }

      vuv = uv0;
      vpos = position;

      vnormal = getLocalUp(vpos, localOrigin);
      vtbnMatrix = getTBNMatrix(vnormal);
      forwardViewPosDepth((view * vec4(vpos, 1.0)).xyz);

      gl_Position = transformPosition(proj, view, vpos);
      forwardLinearDepthToReadShadowMap();`)}switch(t.include(C,e),t.include(h,e),s){case 0:r.include(b,{pbrMode:0,lightingSphericalHarmonicsOrder:2}),t.include(O),t.include(E,e),r.include(p,e),t.include(w,e),r.include(_),d(r,e),S(r),x(r),r.uniforms.add(A,new o(`timeElapsed`,({timeElapsed:e})=>e),n.uniforms.get(`view`),n.uniforms.get(`localOrigin`)).main.add(i`
        discardBySlice(vpos);
        discardByTerrainDepth();
        vec3 localUp = vnormal;
        // the created normal is in tangent space
        vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);

        // we rotate the normal according to the tangent-bitangent-normal-Matrix
        vec3 n = normalize(vtbnMatrix * tangentNormalFoam.xyz);
        vec3 v = -normalize(vpos - cameraPosition);
        float shadow = ${k?i`1.0 - readShadowMap(vpos, linearDepth)`:`1.0`};
        vec4 vPosView = view * vec4(vpos, 1.0);
        vec4 final = vec4(getWaterColor(n, v, mainLightDirection, waterColor.rgb, mainLightIntensity, localUp, shadow, tangentNormalFoam.w, vPosView.xyz, vpos + localOrigin), waterColor.w);

        fragColor = delinearizeGamma(final);
        outputColorHighlightOLID(applySlice(fragColor, vpos), final.rgb);`);break;case 2:t.include(D,e),t.include(O,e),r.include(p,e),a.add(`vuv`,`vec2`),n.main.add(i`
        if (waterColor.a < ${i.float(v)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vuv = uv0;
        vpos = position;

        gl_Position = transformPosition(proj, view, vpos);`),r.uniforms.add(new o(`timeElapsed`,({timeElapsed:e})=>e)).main.add(i`discardBySlice(vpos);
vec4 tangentNormalFoam = getSurfaceNormalAndFoam(vuv, timeElapsed);
tangentNormalFoam.xyz = normalize(tangentNormalFoam.xyz);
fragColor = vec4((tangentNormalFoam.xyz + vec3(1.0)) * 0.5, tangentNormalFoam.w);`);break;case 8:t.include(g,e),n.main.add(i`
        if (waterColor.a < ${i.float(v)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);`),r.include(p,e),r.main.add(i`discardBySlice(vpos);
calculateOcclusionAndOutputHighlight();`);break;case 9:t.include(m,e),n.main.add(i`
        if (waterColor.a < ${i.float(v)}) {
          // Discard this vertex
          gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
          return;
        }

        vpos = position;
        gl_Position = transformPosition(proj, view, vpos);
        forwardObjectAndLayerIdColor();`),r.include(p,e),r.main.add(i`discardBySlice(vpos);
outputObjectAndLayerIdColor();`)}return t}var M=Object.freeze(Object.defineProperty({__proto__:null,build:j},Symbol.toStringTag,{value:`Module`}));export{j as n,M as t};