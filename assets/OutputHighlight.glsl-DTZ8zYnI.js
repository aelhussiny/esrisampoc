import{n as e}from"./glsl-CHAh5tEH.js";import{t}from"./Uniform-DlzXRq0m.js";import{t as n}from"./Texture2DBindUniform-PM77Echq.js";import{t as r}from"./HighlightReadBitmap.glsl-B7iuFBch.js";import{t as i}from"./IntegerBindUniform-MpNNNNo4.js";var a=class extends t{constructor(e,t){super(e,`ivec2`,0,(n,r)=>n.setUniform2iv(e,t(r)))}},o=class extends t{constructor(e,t){super(e,`usampler2D`,0,(n,r)=>n.bindTexture(e,t(r)))}};function s(t,s){let{fragment:c}=t,{output:l,draped:u,hasHighlightMixTexture:d}=s;l===8?(c.uniforms.add(new i(`highlightLevel`,e=>e.highlightLevel??0),new a(`highlightMixOrigin`,e=>e.highlightMixOrigin)),t.outputs.add(`fragHighlight`,`uvec2`,0),t.include(r),d?c.uniforms.add(new o(`highlightMixTexture`,e=>e.highlightMixTexture)).code.add(e`uvec2 getAccumulatedHighlight() {
return texelFetch(highlightMixTexture, ivec2(gl_FragCoord.xy) - highlightMixOrigin, 0).rg;
}
void outputHighlight(bool occluded) {
if (highlightLevel == 0) {
uint bits = occluded ? 3u : 1u;
fragHighlight = uvec2(bits, 0);
} else {
int ll = (highlightLevel & 3) << 1;
int li = (highlightLevel >> 2) & 3;
uint bits;
if (occluded) {
bits = 3u << ll;
} else {
bits = 1u << ll;
}
uvec2 combinedHighlight = getAccumulatedHighlight();
combinedHighlight[li] |= bits;
fragHighlight = combinedHighlight;
}
}`):c.code.add(e`void outputHighlight(bool occluded) {
uint bits = occluded ? 3u : 1u;
fragHighlight = uvec2(bits, 0);
}`),u?c.code.add(e`bool isHighlightOccluded() {
return false;
}`):c.uniforms.add(new n(`depthTexture`,e=>e.mainDepth)).code.add(e`bool isHighlightOccluded() {
float sceneDepth = texelFetch(depthTexture, ivec2(gl_FragCoord.xy), 0).x;
return gl_FragCoord.z > sceneDepth + 5e-7;
}`),c.code.add(e`void calculateOcclusionAndOutputHighlight() {
outputHighlight(isHighlightOccluded());
}`)):c.code.add(e`void calculateOcclusionAndOutputHighlight() {}`)}export{s as t};