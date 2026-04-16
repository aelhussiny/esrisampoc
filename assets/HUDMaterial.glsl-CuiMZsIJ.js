import{S as e,y as t}from"./vec2-fXrlejFD.js";import{n}from"./vec4f64-Bge3Qg6c.js";import{i as r}from"./vec2f64-vR6k7VCu.js";import{n as i,t as a}from"./glsl-CHAh5tEH.js";import{t as o}from"./Float2PassUniform-C0auDrhO.js";import{t as s}from"./FloatPassUniform-BGNunQwI.js";import{t as c}from"./Texture2DPassUniform-DQ1HS8F6.js";import{t as l}from"./ShaderBuilder-HdHfSgzd.js";import{n as u,r as d,t as f}from"./ScreenSizePerspective.glsl-kukqaq0s.js";import{i as p}from"./View.glsl-Cp2_MWNu.js";import{t as m}from"./Float4PassUniform-lh-dPatj.js";import{t as h}from"./Float4BindUniform-8ui9MB4P.js";import{n as g,r as _,t as v}from"./HUDVisibility.glsl-CYzWmRWG.js";import{a as ee}from"./Slice.glsl-DBgCgV7T.js";import{t as y}from"./ObjectAndLayerIdColor.glsl-JVSocln4.js";import{t as b}from"./ReadDepth.glsl-D6wl0lUV.js";import{t as x}from"./Texture2DBindUniform-PM77Echq.js";import{t as S}from"./TerrainDepthTest.glsl-BvZ9_Dq8.js";import{t as C}from"./OutputHighlight.glsl-DTZ8zYnI.js";import{t as w}from"./PositionOutsideClipSpace-CEMoNqkh.js";import{t as T}from"./VisualVariables.glsl-CRqOZp2t.js";import{t as E}from"./ColorConversion.glsl-CX15PnV2.js";import{t as D}from"./AlphaCutoff-cZu5nT4P.js";function O(e,t){let{vertex:n,fragment:r}=e;e.include(S,t),n.include(g),n.main.add(i`vec4 posProjCenter;
if (dot(position, position) > 0.0) {
ProjectHUDAux projectAux;
vec4 posProj = projectPositionHUD(projectAux);
posProjCenter = alignToPixelCenter(posProj, viewport.zw);
forwardViewPosDepth(projectAux.posView);
vec3 vpos = projectAux.posModel;
if (rejectBySlice(vpos)) {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
} else {
posProjCenter = vec4(1e038, 1e038, 1e038, 1.0);
}
gl_Position = posProjCenter;
gl_PointSize = 1.0;`),r.main.add(i`fragColor = vec4(1);
if(discardByTerrainDepth()) {
fragColor.g = 0.5;
}`)}function k(e){let r=new l;if(r.include(_,e),r.vertex.include(ee,e),e.occlusionPass)return r.include(O,e),r;let{output:S,oitPass:k,hasOcclusionTexture:N,signedDistanceFieldEnabled:P,useVisibilityPixel:I,pixelSnappingEnabled:L,hasEmission:R,hasScreenSizePerspective:z,debugDrawLabelBorder:B,hasVVSize:V,hasVVColor:H,hasRotation:U,occludedFragmentFade:W,sampleSignedDistanceFieldTexelCenter:G}=e;r.include(u),r.include(T,e),r.include(y,e),I&&r.include(v);let{vertex:K,fragment:q}=r;q.include(E),r.varyings.add(`vcolor`,`vec4`),r.varyings.add(`vtc`,`vec2`),r.varyings.add(`vsize`,`vec2`);let J=S===8,Y=J&&I;Y&&r.varyings.add(`voccluded`,`float`),K.uniforms.add(new h(`viewport`,e=>e.camera.fullViewport),new o(`screenOffset`,(e,n)=>t(M,2*e.screenOffset[0]*n.camera.pixelRatio,2*e.screenOffset[1]*n.camera.pixelRatio)),new o(`anchorPosition`,e=>j(e)),new m(`materialColor`,({color:e})=>e),new s(`materialRotation`,e=>e.rotation),new c(`tex`,e=>e.texture)),p(K),P&&(K.uniforms.add(new m(`outlineColor`,e=>e.outlineColor)),q.uniforms.add(new m(`outlineColor`,e=>A(e)?e.outlineColor:n),new s(`outlineSize`,e=>A(e)?e.outlineSize:0))),L&&K.include(g),z&&(d(K),f(K)),B&&r.varyings.add(`debugBorderCoords`,`vec4`),r.attributes.add(`uv0`,`vec2`),r.attributes.add(`uvi`,`vec4`),r.attributes.add(`color`,`vec4`),r.attributes.add(`size`,`vec2`),r.attributes.add(`rotation`,`float`),(V||H)&&r.attributes.add(`featureAttribute`,`vec4`),K.main.add(i`
    ProjectHUDAux projectAux;
    vec4 posProj = projectPositionHUD(projectAux);
    forwardObjectAndLayerIdColor();

    if (rejectBySlice(projectAux.posModel)) {
      gl_Position = ${w};
      return;
    }

    vec2 inputSize;
    ${a(z,i`
        inputSize = screenSizePerspectiveScaleVec2(size, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspective);
        vec2 screenOffsetScaled = screenSizePerspectiveScaleVec2(screenOffset, projectAux.absCosAngle, projectAux.distanceToCamera, screenSizePerspectiveAlignment);`,i`
        inputSize = size;
        vec2 screenOffsetScaled = screenOffset;`)}
    ${a(V,i`inputSize *= vvScale(featureAttribute).xx;`)}

    vec2 combinedSize = inputSize * pixelRatio;
    vec4 quadOffset = vec4(0.0);

    ${a(I,i`
        bool visible = testHUDVisibility(posProj);
        if (!visible) {
          vtc = vec2(0.0);
          ${a(B,`debugBorderCoords = vec4(0.5, 0.5, 1.5 / combinedSize);`)}
          return;
        }
      `)}
    ${a(Y,i`voccluded = visible ? 0.0 : 1.0;`)}
  `);let X=i`
    vec2 uv = mix(uvi.xy, uvi.zw, bvec2(uv0));
    vec2 texSize = vec2(textureSize(tex, 0));
    uv = mix(vec2(1.0), uv / texSize, lessThan(uv, vec2(${F})));
    quadOffset.xy = (uv0 - anchorPosition) * 2.0 * combinedSize;

    ${a(U,i`
        float angle = radians(materialRotation + rotation);
        float cosAngle = cos(angle);
        float sinAngle = sin(angle);
        mat2 rotate = mat2(cosAngle, -sinAngle, sinAngle,  cosAngle);

        quadOffset.xy = rotate * quadOffset.xy;
      `)}

    quadOffset.xy = (quadOffset.xy + screenOffsetScaled) / viewport.zw * posProj.w;
  `,Z=L?P?i`posProj = alignToPixelOrigin(posProj, viewport.zw) + quadOffset;`:i`posProj += quadOffset;
if (inputSize.x == size.x) {
posProj = alignToPixelOrigin(posProj, viewport.zw);
}`:i`posProj += quadOffset;`;K.main.add(i`
    ${X}
    ${H?`vcolor = interpolateVVColor(featureAttribute.y) * materialColor;`:`vcolor = color * materialColor;`}

    ${a(S===9,i`vcolor.a = 1.0;`)}

    bool alphaDiscard = vcolor.a < ${i.float(D)};
    ${a(P,`alphaDiscard = alphaDiscard && outlineColor.a < ${i.float(D)};`)}
    if (alphaDiscard) {
      // "early discard" if both symbol color (= fill) and outline color (if applicable) are transparent
      gl_Position = vec4(1e38, 1e38, 1e38, 1.0);
      return;
    } else {
      ${Z}
      gl_Position = posProj;
    }

    vtc = uv;

    ${a(B,i`debugBorderCoords = vec4(uv0, 1.5 / combinedSize);`)}
    vsize = inputSize;
  `),q.uniforms.add(new c(`tex`,e=>e.texture)),W&&!J&&(q.include(b),q.uniforms.add(new x(`depthMap`,e=>e.mainDepth),new s(`occludedOpacity`,e=>e.occludedFragmentOpacity?.value??1))),N&&q.uniforms.add(new x(`texOcclusion`,e=>e.hudOcclusion?.attachment));let Q=B?i`(isBorder > 0.0 ? 0.0 : ${i.float(D)})`:i.float(D),$=i`
    ${a(B,i`float isBorder = float(any(lessThan(debugBorderCoords.xy, debugBorderCoords.zw)) || any(greaterThan(debugBorderCoords.xy, 1.0 - debugBorderCoords.zw)));`)}

    vec2 samplePos = vtc;

    ${a(G,i`
      float txSize = float(textureSize(tex, 0).x);
      float texelSize = 1.0 / txSize;

      // Calculate how much we have to add/subtract to/from each texel to reach the size of an onscreen pixel
      vec2 scaleFactor = (vsize - txSize) * texelSize;
      samplePos += (vec2(1.0, -1.0) * texelSize) * scaleFactor;`)}

    ${P?i`
      vec4 fillPixelColor = vcolor;

      // Get distance in output units (i.e. pixels)

      float sdf = texture(tex, samplePos).r;
      float pixelDistance = sdf * vsize.x;

      // Create smooth transition from the icon into its outline
      float fillAlphaFactor = clamp(0.5 - pixelDistance, 0.0, 1.0);
      fillPixelColor.a *= fillAlphaFactor;

      if (outlineSize > 0.25) {
        vec4 outlinePixelColor = outlineColor;
        float clampedOutlineSize = min(outlineSize, 0.5*vsize.x);

        // Create smooth transition around outline
        float outlineAlphaFactor = clamp(0.5 - (abs(pixelDistance) - 0.5*clampedOutlineSize), 0.0, 1.0);
        outlinePixelColor.a *= outlineAlphaFactor;

        if (
          outlineAlphaFactor + fillAlphaFactor < ${Q} ||
          fillPixelColor.a + outlinePixelColor.a < ${i.float(D)}
        ) {
          discard;
        }

        // perform un-premultiplied over operator (see https://en.wikipedia.org/wiki/Alpha_compositing#Description)
        float compositeAlpha = outlinePixelColor.a + fillPixelColor.a * (1.0 - outlinePixelColor.a);
        vec3 compositeColor = vec3(outlinePixelColor) * outlinePixelColor.a +
                              vec3(fillPixelColor) * fillPixelColor.a * (1.0 - outlinePixelColor.a);

        ${a(!J,i`fragColor = vec4(compositeColor, compositeAlpha);`)}
      } else {
        if (fillAlphaFactor < ${Q}) {
          discard;
        }

        ${a(!J,i`fragColor = premultiplyAlpha(fillPixelColor);`)}
      }

      // visualize SDF:
      // fragColor = vec4(clamp(-pixelDistance/vsize.x*2.0, 0.0, 1.0), clamp(pixelDistance/vsize.x*2.0, 0.0, 1.0), 0.0, 1.0);
      `:i`
          vec4 texColor = texture(tex, samplePos, -0.5);
          if (texColor.a < ${Q}) {
            discard;
          }
          ${a(!J,i`fragColor = texColor * premultiplyAlpha(vcolor);`)}
          `}

    ${a(W&&!J,i`
        float zSample = -linearizeDepth(texelFetch(depthMap, ivec2(gl_FragCoord.xy), 0).x);
        float zFragment = -linearizeDepth(gl_FragCoord.z);
        if (zSample < ${i.float(1-te)} * zFragment) {
          fragColor *= occludedOpacity;
        }
      `)}
    ${a(N,i`fragColor *= texelFetch(texOcclusion, ivec2(gl_FragCoord.xy), 0).r;`)}

    ${a(!J&&B,i`fragColor = mix(fragColor, vec4(1.0, 0.0, 1.0, 1.0), isBorder * 0.5);`)}

    ${a(k===2,i`
    if (fragColor.a < ${i.float(D)}) {
      discard;
    }`)}
  `;switch(S){case 0:r.outputs.add(`fragColor`,`vec4`,0),R&&r.outputs.add(`fragEmission`,`vec4`,1),k===1&&r.outputs.add(`fragAlpha`,`float`,R?2:1),q.main.add(i`
        ${$}
        // Unlike other materials, the fragment shader outputs premultiplied colors.
        // Disable this for front face rendering for correct OIT compositing.
        ${a(k===2,i`fragColor.rgb /= fragColor.a;`)}
        ${a(R,i`fragEmission = vec4(0.0);`)}
        ${a(k===1,i`fragAlpha = fragColor.a;`)}`);break;case 9:q.main.add(i`
        ${$}
        outputObjectAndLayerIdColor();`);break;case 8:r.include(C,e),q.main.add(i`
        ${$}
        outputHighlight(${a(Y,i`voccluded == 1.0`,i`false`)});`)}return r}function A(e){return e.outlineColor[3]>0&&e.outlineSize>0}function j(t){return t.textureIsSignedDistanceField?N(t.anchorPosition,t.distanceFieldBoundingBox,M):e(M,t.anchorPosition),M}var M=r();function N(e,n,r){t(r,e[0]*(n[2]-n[0])+n[0],e[1]*(n[3]-n[1])+n[1])}var te=.08,P=32e3,F=i.float(P),I=Object.freeze(Object.defineProperty({__proto__:null,build:k,calculateAnchorPosition:j,fullUV:P},Symbol.toStringTag,{value:`Module`}));export{P as i,I as n,k as r,j as t};