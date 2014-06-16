var Main = {
  actors: [],

  //
  cameraAngle: 0,
  angle: 0,

  init: function(container) {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById(container).appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    this.scene = new THREE.Scene();

    this.camera.position.x = 256;
    this.camera.position.y = 0;
  },

  animate: function() {
    requestAnimationFrame(Main.animate);

    Main.visData = visualizer.update();
    Main.angle += 0.01;

    for (var i = 0; i < Main.actors.length; i++)
      Main.actors[i].update(i);

    Main.camera.position.x = Math.cos(Main.angle * Util.map(Main.visData[3], 0, 255, -0.05, 0.05)) * 256;
    Main.camera.position.z = Math.sin(Main.angle * Util.map(Main.visData[9], 0, 255, -0.05, 0.05)) * 256;
    if (Main.camera.position.z > 32)
      Main.camera.position.z = 32;

    Main.camera.lookAt(new THREE.Vector3(0, 0, 0));
    Main.render();
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
  setPosition: function(vorx, y, z) {
    if (!y)
      this.mesh.position = vorx;
    else
      this.mesh.position = new THREE.Vector3(vorx, y, z);
  },
  setScale: function(s) {
    this.mesh.scale.x = s;
    this.mesh.scale.y = s;
    this.mesh.scale.z = s;
  }
}

var CubeActor = function() {
  Actor.call(this);

  this.mat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true });
  this.mesh = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), this.mat);

  Main.addToScene(this);
}
CubeActor.prototype = new Actor();
CubeActor.prototype.constructor = CubeActor;
CubeActor.prototype.update = function(i) {
  if (i % 2 == 0)
  {
    var m = 128;
    var n = Util.map(Main.visData[12], 0, 255, -128, 128);
    this.mesh.material.color.setHex(0x0000FF);

    this.mesh.position.y = Math.cos(Main.angle + i) * n;
  }
  else if (i % 3 == 0)
  {
    var m = 384;
    var n = Util.map(Main.visData[4], 0, 255, 0, 256);
    this.mesh.material.color.setHex(0x00FF00);

    this.mesh.position.y = Math.sin(Main.angle + i) * n;
  }
  else
  {
    var m = Util.map(Main.visData[8], 0, 255, 0, 128);
    this.mesh.material.color.setRGB(Main.visData[12], 0, 0);
  }

  this.mesh.position.x = Math.sin(Main.angle + i / 16) * m;
  this.mesh.position.z = Math.cos(Main.angle + i / 16) * m;
}