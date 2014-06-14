var Visualizer = function(el) {
  this.context = new (window.AudioContext || window.webkitAudioContext)();
  this.element = document.getElementById(el);

  this.analyser = this.context.createAnalyser();

  this.source = this.context.createMediaElementSource(this.element);
  this.source.connect(this.analyser);

  this.analyser.connect(this.context.destination);

  this.data = new Uint8Array(this.analyser.frequencyBinCount);
}
Visualizer.prototype = {
  setFft: function(size) {
    this.analyser.fftSize = size;
  },

  update: function() {
    this.analyser.getByteFrequencyData(this.data);
    return this.data;
  }
}
