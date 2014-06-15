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

    this.camera = new THREE.PerspectiveCamera(140, window.innerWidth / window.innerHeight, 1, 1000);
    this.scene = new THREE.Scene();

    this.camera.position.z = 75;
  },

  animate: function() {
    requestAnimationFrame(Main.animate);
    for (var i = 0; i < Main.actors.length; i++)
      Main.actors[i].update();
    Main.render();

    Main.angle += 0.01;

    Main.visData = visualizer.update();

    var r = 1;
    var s = Perlin.noise(Main.angle, Main.camera.position.y);
    if (s < 0)
      r = -1;

    if (Main.visData[6] > 175)
      Main.camera.position.z = r * Math.cos(Main.angle) * Util.map(Main.visData[6], 0, 255, 0, 2);

    if (Main.visData[4] > 175)
      Main.camera.position.y = r * Math.cos(Main.angle) * Util.map(Main.visData[4], 0, 255, 0, 2);

    if (Main.visData[1] > 200)
      Main.camera.position.x = r * Math.sin(Main.angle) * Util.map(Main.visData[1], 0, 255, 0, 2);
    
    Main.camera.lookAt(new THREE.Vector3(0, 0, 0));
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

  var c = 0x00FF00;
  if (Math.random() < 0.5)
  {  
    this.flag = false;
    this.mat = new THREE.MeshBasicMaterial({ color: c, opacity: 0.25, transparent: true });
  }
  else
  {
    this.flag = true;
    this.mat = new THREE.MeshBasicMaterial({ color: c, wireframe: true });
  }

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

  var vx = 2;
  var vy = 7;
  var vz = 12;

  var r = 1;
  if (this.flag)
  {
    this.mesh.material.color.setHex(Math.random() * 0xFFFFFF);
    this.mesh.material.opacity = Util.map(Perlin.noise(this.mesh.position.x, Main.camera.position.z), -1, 1, 0, 0.1);
    r = -1;
  }

  if (Main.visData[vx] > 200)
    this.mesh.rotation.x += r * 0.001 * Util.map(Main.visData[vx], 0, 255, 0, 25);

  if (Main.visData[vy] > 150)
    this.mesh.rotation.y += r * 0.001 * Util.map(Main.visData[vy], 0, 255, 0, 50);

  if (Main.visData[vz] > 150)
    this.mesh.rotation.z += r * 0.005 * Util.map(Main.visData[vz], 0, 255, 0, 12.5);
}