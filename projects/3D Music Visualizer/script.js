import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

const gui = new dat.GUI();
gui.domElement.id = 'gui';
const controlsContainer = document.querySelector('.controls-container');
//controlsContainer.appendChild(gui);
const canvas = document.getElementById('canvas1');
//const mainContainer = document.querySelector('.main-container');
canvas.width = 1920;
canvas.height = 1080;

///// audio setup /////
const file = document.getElementById('file_upload');
file.addEventListener('change', function(){
     const files = this.files;
     audio1.src = URL.createObjectURL(files[0]);
     audio1.load();
})

let analyser;
let dataArray = [];
let audioSource;
const audioElement = document.getElementById('audio1');
const audioCtx = new AudioContext();
analyser = audioCtx.createAnalyser();
audioSource = audioCtx.createMediaElementSource(audioElement);
audioSource.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 512;
let bufferLength = analyser.frequencyBinCount;
dataArray = new Uint8Array(bufferLength);

const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');
const pauseBtn = document.getElementById('pauseBtn');

playBtn.addEventListener('click', function(e){
e.preventDefault();
audioElement.play();
})
stopBtn.addEventListener('click', (e) => {
e.preventDefault();
audioElement.pause();
})
pauseBtn.addEventListener('click', (e) => {
e.preventDefault();
audioElement.pause();
})

///// video recording ////////
const recordBtn = document.getElementById('recordBtn');
const stopRecordBtn = document.getElementById('stopRecordBtn');
let recording = false;
let mediaRecorder;
let recordedChunks = [];

recordBtn.addEventListener('click', (e) => {
     e.preventDefault();
     let dest = audioCtx.createMediaStreamDestination();
     audioSource.connect(dest);
     let audioTrack = dest.stream.getAudioTracks()[0];
     recording = !recording;
     if(recording){
          recordBtn.innerText = "recordings...";
          const canvasStream = canvas.captureStream(60);
          mediaRecorder = new MediaRecorder(canvasStream, {
               mimeType: 'video/webm;codecs=vp9'
          })
          canvasStream.addTrack(audioTrack);
          mediaRecorder.ondataavailable = e => {
               if(e.data.size > 0){
                    recordedChunks.push(e.data);
               }
          }
          mediaRecorder.start();
     }
})
stopRecordBtn.addEventListener('click', (e) => {
     e.preventDefault();
     recordBtn.innerText = "Start Record";
     mediaRecorder.stop();
     setTimeout((e) => {
          const blob = new Blob(recordedChunks, {
               type: 'video/webm'
          })
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'recording.webm';
          a.click();
          url.revokeObjectURL(url);
     }, 100);
})
/////////////////////////////////////////

///// 3d visualizer three.js /////
const scene = new THREE.Scene();
scene.background = new THREE.TextureLoader().load('../solarSystem3D/images/space4.png');
const camera = new THREE.PerspectiveCamera(
     70,
    1920 / 1080,
     0.1,
     2000
     )
camera.position.set(0, 20, 70);

const renderer = new THREE.WebGLRenderer({
     canvas: canvas,
     antialias: true
})
renderer.setClearColor(0x000000, 1.0);
//mainContainer.appendChild(renderer.domElement);
renderer.setSize(canvas.width, canvas.height);

const orbitCamera = new OrbitControls(camera, canvas);

///// lights /////
const ambientLight = new THREE.AmbientLight(0x555555, 1);
scene.add(ambientLight);
const spotLight = new THREE.SpotLight(0xffffff, 2);
spotLight.position.set(0, 100, 10);
spotLight.angle = Math.PI / 4;
scene.add(spotLight);

///// shaders /////
const uniforms = {
     u_time: {type: 'f', value: 0.0},
     u_data_array: {type: 'f', value: dataArray}
}

const textureLoader = new THREE.TextureLoader();
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
//const cubeMaterial = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//})
const cubeMaterials = [
     new THREE.MeshPhongMaterial({map:textureLoader.load('./assets/2k_saturn.jpg')}),
     new THREE.MeshPhongMaterial({map:textureLoader.load('./assets/2k_earth_daymap.jpg')}),
     new THREE.MeshPhongMaterial({map:textureLoader.load('./assets/2k_jupiter.jpg')}),
     new THREE.MeshPhongMaterial({map:textureLoader.load('./assets/2k_venus_surface.jpg')}),
     new THREE.MeshPhongMaterial({map:textureLoader.load('./assets/2k_neptune.jpg')}),
     new THREE.MeshPhongMaterial({map:textureLoader.load('./assets/2k_mars.jpg')}),

]

///// cubes /////
let cube;
let cubes = [];
let count = 16;
const cubeGroup = new THREE.Object3D();
for(let i = 0; i < count; i++){
     for(let j = 0; j < count; j++){
          cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
          cube.position.x = i * 2;
          cube.position.z = j * 2;
          cube.shininess = 100;
          cubes.push(cube);
          cubeGroup.add(cube);         

     }
}
cubeGroup.position.set(-16, -16, -16);
scene.add(cubeGroup);

///// spheres /////
let sphere;
let spheres = [];
let ringOne = new THREE.Object3D();
let ringTwo = new THREE.Object3D();
let ringThree = new THREE.Object3D();
let ringFour = new THREE.Object3D();
let ringFive = new THREE.Object3D();
function createRing(count, radius, color, group){
     const sphereGeometry = new THREE.SphereGeometry(1, 30, 30);
     const sphereMaterial = new THREE.MeshPhongMaterial({
          color: color,

     })
     for(let i = 0; i < count; i++){
          let angle = Math.PI * 2 / count;
          sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
          sphere.position.x = radius * Math.cos(angle * i);
          sphere.position.y = radius * Math.sin(angle * i);
          sphere.shininess = 100;
          spheres.push(sphere);
          group.add(sphere);
         }
     group.position.set(0,0,0);
     group.rotation.x = -Math.PI / 2;
     scene.add(group);
}
createRing(30, 18, 0x00ff00, ringOne);
createRing(40, 24, 0xa4a8df, ringTwo);
createRing(50, 32, 0xff0000, ringThree);
createRing(60, 42, 0x63a80f, ringFour);
createRing(70, 50, 0xf7a8f6, ringFive);

///// floor setup /////
const floorGeometry = new THREE.PlaneGeometry(200, 200, 20, 20);
const floorMaterial = new THREE.ShaderMaterial({
     wireframe: true,
     transparent: true,
     opacity: 0.2,
     uniforms,
     vertexShader: `
      
      uniform float u_time;
      uniform float[64] u_data_array;
      void main(){
         float x = abs(position.x);
      float floor_x = round(x);
      float multiplier_x = (25.0 - x) / 8.0;
      float y = abs(position.y);
      float floor_y = round(y);
      float multiplier_y = (25.0 - y) / 8.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, sin(u_data_array[int(floor_x)] / 20.0 + u_data_array[int(floor_y)] / 20.0) * 0.5, 1.0 ); 
      }`
      ,
   fragmentShader: `
   varying float x;
    varying float y;
    varying float z;
    varying vec3 vUv;
   uniform float u_time;
   void main(){
      gl_FragColor = vec4(sin(u_time), cos(u_time) + 0.5, 1.0, 1.0);
   }
   `   
})

const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.set(0, -45, 0);
floor.rotation.x = -Math.PI/2;
floor.transparent = true;
floor.opacity = 0.5;
scene.add(floor);


///// polyhedral dice shape /////
let poly;
const verticesOfCube = [
     -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
     -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
 ];
 
 const indicesOfFaces = [
     2,1,0,    0,3,2,
     0,4,7,    7,3,0,
     0,1,5,    5,4,0,
     1,2,6,    6,5,1,
     2,3,7,    7,6,2,
     4,5,6,    6,7,4
 ];
 
 const polyGeometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces, 5, 2 );
const polyMaterial = new THREE.ShaderMaterial({
     color: 0x00ff00,
     wireframe: true,
     uniforms,
    /*  fragmentShader: `
   varying float x;
    varying float y;
    varying float z;
    varying vec3 vUv;
   uniform float u_time;
   void main(){
      gl_FragColor = vec4(sin(u_time), cos(u_time) + 0.5, 1.0, 1.0); 
   }
   ` */  
})
poly = new THREE.Mesh(polyGeometry, polyMaterial);
poly.position.set(0, 0, 0);
scene.add(poly);

///// gui setup /////

const polyFolder = gui.addFolder('Poly');
polyFolder.add(poly.position, "y", -10, 10, 0.1);
polyFolder.add(poly.rotation, "x", 0.0, Math.PI * 2, 0.001);
polyFolder.add(poly.rotation, "z", 0.0, Math.PI * 2, 0.001);
//polyFolder.add(poly.scale, "radius", 0.0, 10.00, 0.01);
polyFolder.add(poly.material, "wireframe");
polyFolder.open();
const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, "x", 0, 100, 0.1);
cameraFolder.add(camera.position, "y", 0, 100, 0.1);
cameraFolder.add(camera.position, "z", 0, 100, 0.1);
cameraFolder.open();
const floorFolder = gui.addFolder('Floor');
floorFolder.add(floor.scale, "x", 0, 10, 0.1);
floorFolder.add(floor.scale, "y", 0, 10, 0.1);
//floorFolder.add(floor.floorGeometry, 'widthSegments', 5, 50, 1);
floorFolder.add(floor.material, "linewidth", 0.0, 10.0, 0.01);
floorFolder.add(floor.material, "wireframe");
floorFolder.open();

const sphereFolder = gui.addFolder('Sphere');
//sphereFolder.add(sphere.scale, "radius", 0.0, 2.0, 0.1);

var conf = { color : '#ffae23' };    
sphereFolder.addColor(conf, 'color').onChange( function(colorValue) {
    sphere.material.color.set(colorValue);
});
sphereFolder.open();

///// animation /////\
const clock = new THREE.Clock();
function animate(){
     uniforms.u_time.value = clock.getElapsedTime();
     uniforms.u_data_array.value = dataArray; 
     cubes.forEach(cube => {
          cube.rotation.x += 0.004;
     cube.rotation.y += 0.001;
     })
     ringOne.rotation.y += 0.004;
     ringOne.rotation.x += 0.004;
     ringTwo.rotation.x -= 0.002;
     ringTwo.rotation.y -= 0.002;
     ringThree.rotation.y += 0.006;
     ringThree.rotation.x += 0.006;
     ringFour.rotation.y -= 0.008;
     ringFour.rotation.x -= 0.008;
     ringFive.rotation.y += 0.001;
     ringFive.rotation.x += 0.005;

     poly.rotation.y += 0.001;
     floor.rotation.z -= 0.0003;
     /// visualizer 
     analyser.getByteFrequencyData(dataArray);
     for(let i = 0; i < 256; i++){
          const pitch = dataArray[i];
          const s = cubes[i];
          const z = s.position;
          TweenMax.to(z, 0.2, {
               y: pitch/12, 
               ease:Power2.easeOut
          })
     }
     for(let i = 0; i < 250; i++){
          const pitch = dataArray[i];
          const s = spheres[i];
          const z = s.position;
          TweenMax.to(z, 0.2, {
               z: pitch/24, 
               ease:Power2.easeOut
          })
     }

     orbitCamera.update();
     renderer.render(scene, camera);
     requestAnimationFrame(animate);


}
animate();

window.addEventListener('resize', function(){
     camera.aspect = canvas.width/canvas.height;
     camera.updateProjectionMatrix();
     renderer.setSize(canvas.width, canvas.height);
})
