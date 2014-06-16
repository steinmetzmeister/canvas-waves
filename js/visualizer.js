var Visualizer = function(el) {
  this.context = new (window.AudioContext || window.webkitAudioContext)();
  this.element = document.getElementById(el);

  this.analyser = this.context.createAnalyser();

  this.source = this.context.createMediaElementSource(this.element);

  this.gainNode = this.context.createGain();

  this.source.connect(this.gainNode);
  this.source.connect(this.context.destination);
  
  this.source.connect(this.gainNode);
  this.gainNode.connect(this.analyser);

  this.gainNode.gain.value = 0.75;

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
