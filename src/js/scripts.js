import * as THREE from 'three';
import { LoadingManager } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const ev1 = new URL('../assets/environment/sky_pano_ev1.glb', import.meta.url);
const ev2 = new URL('../assets/environment/sky_pano_ev2.glb', import.meta.url);
const ev3 = new URL('../assets/environment/sky_pano_ev3.glb', import.meta.url);
const ev4 = new URL('../assets/environment/stylised_sky_ev4.glb', import.meta.url);
const ev5 = new URL('../assets/elements/3d_character_ev5.glb', import.meta.url);
const ev6 = new URL('../assets/environment/night_sky_ev6.glb', import.meta.url);
const ev7 = new URL('../assets/environment/dieselpunk_challenge_ev7.glb', import.meta.url);

//text
const text1 = new URL('../assets/text/INTRO.glb', import.meta.url);
const text2 = new URL('../assets/text/SKILLS.glb', import.meta.url);
const text3 = new URL('../assets/text/A.glb', import.meta.url);
const text4 = new URL('../assets/text/Contact.glb', import.meta.url);




const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

renderer.setClearColor(0xA3A3A3);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(100,100,100);
orbit.update();


//import from html
const pb = document.getElementById('p-b');
const pbc = document.querySelector('.p-b-c');
const lm = new THREE.LoadingManager();


//loading manage
lm.onProgress = function (url, loaded, total) {
    pb.value = (loaded / total) * 100;
}
lm.onLoad = function () {
    pbc.style.display = 'none';
}


const gltfLoader = new GLTFLoader(lm);

const axelp = new THREE.AxesHelper(100000, 100000, 100000);
scene.add(axelp);



//adding environment

let first;
gltfLoader.load(ev1.href, function (gltf) {
    const model = gltf.scene;
    first = model;
    model.position.set(0, 0, 3000);
    model.scale.set(50, 50, 50);
    scene.add(model);
});
let second;
gltfLoader.load(ev2.href, function (gltf) {
    const model = gltf.scene;
    second = model;
    model.position.set(0, 0, -3000);
    model.scale.set(50, 50, 50);
    scene.add(model);
});

let third;
gltfLoader.load(ev3.href, function (gltf) {
    const model = gltf.scene;
    third = model;
    model.position.set(-3000, 0, 0);
    model.scale.set(50, 50, 50);
    scene.add(model);
});

gltfLoader.load(ev4.href, function (gltf) {
    const model = gltf.scene;//actual en
    model.position.set(1000, 0, 0);
    model.scale.set(2, 2, 2);;
    console.log("its actual environ and pos is ", model.position)
    scene.add(model);
});
let carac;
gltfLoader.load(ev5.href, function (gltf) {
    const model = gltf.scene;//caracter
    carac = model;
    model.position.set(1000, 40, 10);
    model.scale.set(100, 100, 100);
    scene.add(model);
});

let gub;
gltfLoader.load(ev6.href, function (gltf) {
    gub = gltf.scene;//gubbara
    gub.position.set(3000, 1000, 1000);
    gub.scale.set(50, 50, 50);
    scene.add(gub);



});

gltfLoader.load(ev7.href, function (gltf) {
    const model = gltf.scene;//actual en
    model.position.set(0, -100, 0);
    model.scale.set(150, 150, 150);
    scene.add(model);
});


const ambientLight = new THREE.AmbientLight(0xffffffff);
ambientLight.position.set(1100, 194, 300);
scene.add(ambientLight);


///Adding 3d TEXT

gltfLoader.load(text1.href, function (gltf) {
    const model = gltf.scene;//introduction
    model.rotation.y = -1.5;
    model.position.set(-3000, 80, 78.51);
    model.scale.set(120, 120, 120);
    scene.add(model);
});

gltfLoader.load(text2.href, function (gltf) {
    const model = gltf.scene;//introduction
    model.rotation.y = 3.2;
    model.position.set(50, 0, -2850);
    model.scale.set(250, 250, 250);
    scene.add(model);
});

gltfLoader.load(text3.href, function (gltf) {
    const model = gltf.scene;//introduction
    //model.rotation.y=3.2;
    model.position.set(-10.41, 10, 3000);
    model.scale.set(250, 250, 250);
    scene.add(model);
});

gltfLoader.load(text4.href, function (gltf) {
    const model = gltf.scene;//introduction
    //model.rotation.y=3.2;
    model.position.set(0, -2000, 0);
    model.scale.set(2500, 2500, 2500);
    scene.add(model);

    //starting
    // create an invisible plane for the icon
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const planeMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);

    // set the position and rotation of the plane to face the camera
    plane.position.set(0, -1000, 0);
    plane.lookAt(camera.position);

    // add a click event to the canvas
    renderer.domElement.addEventListener('click', function (event) {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(plane);
        if (intersects.length > 0) {
            window.open('https://heylink.me/tosif1/'); // replace with your link URL
        }
    });
});

//event listener
/*
document.addEventListener("", function (event) {
    camera.position.set(100,100,100);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "s" || event.key === "S") {
        camera.position.set(24, -22, -3100);
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "A" || event.key === "a") {
        camera.position.set(1200, 157, 5700);
        camera.position.set(-9, 42, 3200);
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "T" || event.key === "t") {
        camera.position.set(1154, 187, 35);
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "b" || event.key === "B") {
        camera.position.set(3125, 913, 1095);
    }
});
*/

let t=-10;

function animate() {
    //console.log(camera.position);
    //console.log(camera.rotation);
    requestAnimationFrame(animate);
    t+=0.002;
    if(t<1){
        camera.position.set(-3100, 103, 56)
        camera.rotation.set(-0.7,-1.5,-7.0);
    }
    if(t<2 && t>1 ){
        camera.position.set(24, -22, -3100);
        camera.rotation.set(-3.2,0.2,-3.2);
    }
    if(t<3 && t>2){
        camera.position.set(-9, 42, 3200);
        camera.rotation.set(0,0,0);
    }
    if(t<4 && t>3){
        camera.position.set(1154, 187, 35);
        camera.rotation.set(-1,1.5,1);
    }
    if(t>4 && t<5){
        camera.position.set(2900, 900, 900);
        camera.rotation.set(-1,1,1);
    }
    if(t>5 && t<6){
        camera.position.set(-2500, 1500, 2300);
        camera.rotation.set(-0.5,-0.7,-0.4);
    }
    first.rotation.y += 0.001;
    second.rotation.y += 0.001;
    third.rotation.y += 0.001;
    gub.rotation.y += 0.001;
    carac.rotation.y += 0.0001;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});