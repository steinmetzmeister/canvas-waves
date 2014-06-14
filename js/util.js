var Util = {
  map: function(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
  },

  rgbToHex: function(r, g, b) {
    return  "0x" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}
