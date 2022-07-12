import * as THREE from "three";
import { ConeBufferGeometry } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.x = 1;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0001;
  camera.position.y = t * -0.0001;
}
document.body.onscroll = moveCamera;

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function animate() {
  requestAnimationFrame(animate);

  //cube.rotation.x += 0.01;
  //cube.rotation.y += 0.01;

  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();
