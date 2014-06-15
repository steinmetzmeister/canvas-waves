var Main = {
  actors: [],

  angle: 0,

  init: function(container) {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMapEnabled = true;

    console.log(container);
    document.getElementById(container).appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    this.scene = new THREE.Scene();

    this.camera.position.z = 75;
  },

  animate: function() {
    requestAnimationFrame(Main.animate);
    for (var i = 0; i < Main.actors.length; i++)
      Main.actors[i].update();
    Main.render();

    Main.angle += 0.001;
    Main.camera.position.x = Math.sin(Main.angle) * 75;
    Main.camera.position.y = Math.cos(Main.angle) * 75;
    Main.camera.position.z = Math.cos(Main.angle) * 75;
    Main.camera.lookAt(new THREE.Vector3(0, 12.5, 0));
  },

  render: function() {
    this.renderer.render(this.scene, this.camera);
  },

  addToScene: function(actor) {
    this.actors.push(actor);
    this.scene.add(actor.mesh);
  }
}

var Actor = function() {
  // this.position = new THREE.Vector3(0,0,0);
  // this.rotation = new THREE.Vector3(0,0,0);
}
Actor.prototype = {
  setPosition: function(x, y, z) {
    this.mesh.position = new THREE.Vector3(x, y, z);
  },
  setScale: function(s) {
    this.mesh.scale.x = s;
    this.mesh.scale.y = s;
    this.mesh.scale.z = s;
  }
}

var CubeActor = function() {
  Actor.call(this);

  this.mats = [];

  var geo = new THREE.BoxGeometry(50, 50, 50);
  this.mat = new THREE.MeshBasicMaterial({ color: 0x00FF00, wireframe: true });
  this.mesh = new THREE.Mesh(geo, this.mat);

  Main.addToScene(this);
}
CubeActor.prototype = new Actor();
CubeActor.prototype.constructor = CubeActor;
CubeActor.prototype.update = function() {
  var x = Math.abs(this.mesh.position.x) * Main.angle * 0.1;
  var y = Math.abs(this.mesh.position.y) * Main.angle * 0.1;
  var z = Math.abs(this.mesh.position.z) * Main.angle * 0.1;
  var a = noise.perlin3(
    x * 0.1, 
    y * 0.1,
    z * 0.1);

  this.setScale(Math.abs(a));
}
