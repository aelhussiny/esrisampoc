function e(e){e.code.add(`
    vec3 emissionDimming(vec3 srcColor, float srcAlpha) {
      srcColor = clamp(srcColor, vec3(0.0), srcColor);

      return srcAlpha > 1.0
        ? mix(vec3(1.0), srcColor, 1.0 / srcAlpha)
        : mix(vec3(1.0), srcColor, srcAlpha);
    }
  `)}export{e as t};