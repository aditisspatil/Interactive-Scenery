
import * as THREE from 'https://cdn.skypack.dev/three@0.128.0/build/three.module.js';

import { Water } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/objects/Water.js';
import { Sky } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/objects/Sky.js';


const height_path = 'https://gitcdn.link/cdn/aditisspatil/Interactive-Scenery/f21f92dda3fc727b39ebb2ff66395677ab2c06ca/src/height.jpg'
const alpha_path ='https://gitcdn.link/cdn/aditisspatil/Interactive-Scenery/main/src/m_tex.jpg' 
const text_path = 'https://gitcdn.link/cdn/aditisspatil/Interactive-Scenery/main/src/m_tex.jpg'

function SceneManager(canvas) {

    const scene = buildScene();
    const renderer = buildRenderer(canvas);
    const camera = buildCamera();

    var terrain, terrain_tex, terrain_height, alpha;

    const loader = new THREE.TextureLoader()
    
    

    add_lights()
    loadTextures();
    const sky = buildSky();
    const sun = buildSun();
    const water = buildWater();
    renderer.render(scene, camera);

    // const orbitCon = setOrbitControls();

    renderer.render(scene, camera);


    function add_lights() {
        const pointLight = new THREE.PointLight(0x046B41, 2)
        pointLight.position.set(20, 50, 5)
        scene.add(pointLight)

        const pointLight2 = new THREE.PointLight(0x573A04, 5)
        pointLight2.position.set(0, 50, 5)
        scene.add(pointLight2)

        const pointLight3 = new THREE.PointLight(0xffffff, 2)
        pointLight3.position.set(30, 50, 50)
        // scene.add(pointLight3)
    }

    function buildTerrain() {
        // const height = loader.load('src/height.jpeg')
        const plane_geometry = new THREE.PlaneBufferGeometry(300,200,500,20);
        const plane_mat = new THREE.MeshStandardMaterial({
            color: 0x394D04,
            map: terrain_tex,
            displacementMap: terrain_height,
            displacementScale: 80,
            alphaMap: alpha,
            // transparent: true,
            // depthTest: false
        })
        const plane = new THREE.Mesh( plane_geometry, plane_mat)
        plane.rotation.x = 181
        plane.position.set(-50, -20, -200)
        scene.add(plane)
        return plane;
    }

    function buildScene() {
        const scene = new THREE.Scene();
        return scene;
    }

    function buildRenderer(canvas) {
        const renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvas.appendChild(renderer.domElement);
        return renderer;
    }

    function buildCamera() {
        const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
        camera.position.set(30, 30, 100);
        return camera;
    }

    // Objects
    function buildSky() {
        const sky = new Sky();
        sky.scale.setScalar(1000);
        scene.add(sky);
        return sky;
    }

    function buildSun() {
        const pmremGenerator = new THREE.PMREMGenerator( renderer );
        
        const sun = new THREE.Vector3();

        const theta = Math.PI * (0.49 - 0.5);
        const phi = 2 * Math.PI * (0.205 - 0.5);

        sun.x = Math.cos(phi);
        sun.y = Math.sin(phi) * Math.sin(theta);
        sun.z = Math.sin(phi) * Math.cos(theta);

        sky.material.uniforms['sunPosition'].value.copy(sun);

        scene.environment = pmremGenerator.fromScene(sky).texture;
        return sun;
    }

    function buildWater() {
        const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
        const water = new Water(
          waterGeometry,
          {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg', function ( texture ) {
              texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            }),
            alpha: 1.0,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
          }
        );
        water.rotation.x =- Math.PI / 2;
        scene.add(water);
        
        const waterUniforms = water.material.uniforms;
        return water;
    }
  
    function buildSphere() {
        const geometry = new THREE.SphereGeometry(20, 20, 20);
        const material = new THREE.MeshStandardMaterial( {
            color: 0xfcc742} );

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);
        return sphere;
    }

    function setOrbitControls() {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.maxPolarAngle = Math.PI * 0.495;
        controls.target.set(0, 10, 0);
        controls.minDistance = 40.0;
        controls.maxDistance = 200.0;
        controls.update();
        return controls;
    }

    function loadTextures() {
        loader.load(text_path, function ( tex ) {
            terrain_tex = tex
            loader.load(height_path, function ( height ) {
                terrain_height = height
                loader.load(alpha_path, function ( a ) {
                    alpha = a
                    terrain = buildTerrain()
                    renderer.render(scene, camera);
                });
            });
        });

        
    }

    this.update = function() {
        const time = performance.now() * 0.001;

        // Animates water
        if ( water != null) {
            water.material.uniforms[ 'time' ].value += 1.0 / 200.0;
        }
        if( terrain != null) {
            // terrain.rotation.z = time * 0.3;
        }
        renderer.render(scene, camera);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }
    window.addEventListener('resize', onWindowResize);
}

const canvas = document.getElementById("canvas");
const sceneManager = new SceneManager(canvas);

function animate() {
    requestAnimationFrame(animate);
    sceneManager.update();
}
animate();