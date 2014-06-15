var Main = {
  actors: [],

  angle: 0,
  visData: null,

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

    Main.angle += 0.0025;
    Main.camera.position.x = Math.sin(Main.angle) * 25;
    Main.camera.position.y = Math.cos(Main.angle) * 25;
    Main.camera.position.z = Math.cos(Main.angle) * 25;
    Main.camera.lookAt(new THREE.Vector3(0, 12.5, 0));

    Main.visData = visualizer.update();
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

  if (Math.random() < 0.5)
    var c = 0x00EE00;
  else
    var c = 0xEE00EE;

  this.mat = new THREE.MeshBasicMaterial({ color: c, wireframe: true });
  this.mesh = new THREE.Mesh(geo, this.mat);

  Main.addToScene(this);
}
CubeActor.prototype = new Actor();
CubeActor.prototype.constructor = CubeActor;
CubeActor.prototype.update = function() {
  var x = Math.abs(Main.camera.position.x + this.mesh.position.x) * 0.1;
  var y = Math.abs(Main.camera.position.y + this.mesh.position.y) * 0.1;
  var z = Math.abs(Main.camera.position.z + this.mesh.position.z) * 0.1;
  var a = Perlin.noise(
    x * 0.5, 
    y * 0.5,
    z * 0.5);

  if (!Main.visData)
    return;

  this.setScale(Math.abs(a));
  this.mesh.rotation.x += 0.001 * Util.map(Main.visData[256], 0, 255, 0, 50);
  this.mesh.rotation.y += 0.01 * Util.map(Main.visData[512 + 128], 0, 255, 0, 75);
  this.mesh.rotation.z += 0.01 * Util.map(Main.visData[512 + 256], 0, 255, 0, 100);
}
