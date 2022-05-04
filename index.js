
import * as THREE from 'https://cdn.skypack.dev/three@0.121.0/build/three.module.js';

import { Water } from 'https://cdn.skypack.dev/three@0.121.0/examples/jsm/objects/Water.js';
import { Sky } from 'https://cdn.skypack.dev/three@0.121.0/examples/jsm/objects/Sky.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.0/examples/jsm/loaders/GLTFLoader.js";


const height_path_1 = './src/height_1.jpeg'
const height_path_2 = './src/height_2.jpg'
const height_path_3 = './src/height_3.jpeg'
const alpha_path ='https://gitcdn.link/cdn/aditisspatil/Interactive-Scenery/main/src/alpha.png' 
const text_path = 'https://gitcdn.link/cdn/aditisspatil/Interactive-Scenery/main/src/m_tex.jpg'

const tree_path = './src/source/shapespark-low-poly-plants-kit.gltf'
const mountain_path = './model/terrain/scene.gltf'
const mountain_2_path = './model/terrain_2/scene.gltf'
const fish_1_path = './model/fish_1/scene.gltf'
const peacock_path = './model/peacock/scene.gltf'
const duck_path = './model/duck/scene.gltf'
const duck_2_path = './model/duck_2/scene.gltf'
const dodo_path = './model/dodo/scene.gltf'
const h_bird_path = './model/h_bird/scene.gltf'
const bfly_path = "https://gitcdn.link/cdn/aditisspatil/Interactive-Scenery/main/model/butterfly/scene.gltf" //'./model/butterfly/scene.gltf'
const fox_path = './model/fox/scene.gltf'
const rhino_path = './model/rhino/scene.gltf'
const shark_path = './model/shark/scene.gltf'
const ebaby_path = './model/elephant_baby/scene.gltf'



var clock = new THREE.Clock();
var fox_mixer, rhino_mixer, h_bird_mixer, bfly_mixer, ele_mixer, shark_mixer;
var ele_animate, bfly_animate, fox_animate, hbird_animate, rhino_animate, shark_animate;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();



function SceneManager(canvas) {
    const x_factor = 1000;
    const segments = x_factor/10;
    const scene = buildScene();
    const renderer = buildRenderer(canvas);
    const camera = buildCamera();
    const controls = setOrbitControls();
    var terrain_1, terrain_2, terrain_3, terrain_4, terrain_5;
    var terrain_height_1, terrain_height_2, terrain_height_3;
    var terrain_tex, alpha;
    var river;
    var flag_tree = false;

    var gltfloader = new GLTFLoader()
    const loader = new THREE.TextureLoader()
    var flag_h1, flag_h2, flag_h3, flag_tx1, flag_a1 = false;
    
    buildRiver();
    buildMountain();
    add_lights();
    buildFish();
    buildBird()
    buildAnimals()
    
    const sky = buildSky();
    const sun = buildSun();
    const water = buildWater();
    renderer.render(scene, camera);

    function onDocumentMouseDown( event ) {
        event.preventDefault();
        mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( scene.children, true ); 
        if ( intersects.length > 0 ) {
            for (var i =0; i < intersects.length ; i++){
                if ( typeof intersects[i].object.callback === "function" ) {
                    intersects[i].object.callback();
                }
            }
        }
    }
    
    window.addEventListener('click', onDocumentMouseDown, false);

    function add_lights() {
        let color = 0xfca65f
        var pointLight = new THREE.PointLight(color, 5, 1000)
        pointLight.position.set(-100, 500, 200)
        scene.add(pointLight)

        pointLight = new THREE.PointLight(color, 5, 1000)
        pointLight.position.set(-1000, 500, 200)
        scene.add(pointLight)

        pointLight = new THREE.PointLight(color, 5, 1000)
        pointLight.position.set(1000, 500, 300)
        scene.add(pointLight)

        pointLight = new THREE.PointLight(color, 5, 1000)
        pointLight.position.set(-1000, 300, -300)
        scene.add(pointLight)

        pointLight = new THREE.PointLight(color, 5, 1000)
        pointLight.position.set(-2000, 500, -300)
        scene.add(pointLight)
        
        const pointLight2 = new THREE.PointLight(color,3, 1000)
        pointLight2.position.set(1000, 300, -220)
        scene.add(pointLight2)

        const pointLight4 = new THREE.PointLight(color,5, 1000)
        pointLight4.position.set(100, 400, 100)
        scene.add(pointLight4)

        const pointLight3 = new THREE.PointLight(0xffffff, 2)
        pointLight3.position.set(-100, 200, -100)
        scene.add(pointLight3)
    }

    function buildTrees() {
        const gltfloader = new GLTFLoader();
        gltfloader.load(
            tree_path,
            function ( gltf ) {
                var s1;
                flag_tree = true
                // x = 0 - 2*x_factor
                // z = -x_factor , x
                let points = [ 
                    [20, 4, 80], [25, 3, 80], [20, 4, 90], [24, 3, 90],
                    [30, 4, 80], [35, 3, 80], [30, 4, 90], [34, 3, 90],
                    [40, 4, 80], [45, 3, 80], [40, 4, 90], [44, 3, 90],
                    [40, 4, 100], [45, 3, 100], [40, 4, 100], [44, 3, 100],
                    [40, 4, 120], [45, 3, 120], [40, 4, 120], [44, 3, 120],
                    [40, 4, 150], [45, 5, 150], [40, 4, 160], [44, 3, 170],
                    [20, 4, 150], [25, 3, 150], [20, 4, 160], [24, 3, 160],
                ];
                for (let i = 0; i < points.length; i++) { 
                    let x = points[i][0]
                    let y = points[i][1]
                    let z = points[i][2]
                    let angle = toRad(Math.floor(Math.random()*180));
                    let scale = Math.ceil(Math.random() * 3);

                    s1 = gltf.scene.clone();
                    s1.scale.set(scale, scale, scale);
                    s1.rotation.y = angle;
                    s1.position.set(x, y, z);
                    scene.add( s1 );
                    s1.animations; // Array<THREE.AnimationClip>
                    s1.scene; // THREE.Group
                    s1.scenes; // Array<THREE.Group>
                    s1.cameras; // Array<THREE.Camera>
                    s1.asset; // Object
                }
                
            },
            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ); },
            function ( error ) { console.log( 'Tree An error happened' );  }
        );
    }

    function buildRiver() {
        gltfloader.load(
            mountain_path,
            function ( gltf ) {
                var scale = 500
                gltf.scene.scale.set(scale, scale, scale);
                var s1 = gltf.scene.clone();
                s1.position.set(-50, 0, -50);
                scene.add( s1 );

                s1 = s1.clone();
                s1.position.set(-1800, 0, -50);
                scene.add( s1 );

                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
            },
            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% River loaded' ); },
            function ( error ) { console.log( 'river terrain An error happened' ); }
        );
    }

    function buildMountain() {
        gltfloader.load(
            mountain_2_path,
            function ( gltf ) {
                var scale = 10000
                var s1 = gltf.scene.clone();
                s1.scale.set(scale, scale, scale);
                s1.position.set(1500, -200, -1500);
                scene.add( s1 );

                var scale = 20000
                s1 = gltf.scene.clone();
                // s1.rotation.y= toRad(180);
                s1.scale.set(scale, scale, scale);
                s1.position.set(-7000, -300, -1500);
                scene.add( s1 );

                s1 = gltf.scene.clone();
                scale = 4000
                s1.scale.set(scale, scale, scale);
                s1.rotation.y= toRad(90);
                s1.position.set(-1000, -80, -1500);
                scene.add( s1 );

                s1 = gltf.scene.clone();
                scale = 8000
                s1.scale.set(scale, scale, scale);
                s1.rotation.y= toRad(90);
                s1.position.set(-1500, -150, 5500);
                scene.add( s1 );

                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
            },
            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% Mountain loaded' ); },
            function ( error ) { console.log( 'Mountain terrain An error happened' ); }
        );
    }

    function buildAnimals() {
        gltfloader.load(
            fox_path,
            function ( gltf ) {
                var scale = 0.2
                gltf.scene.scale.set(scale, scale, scale);
                gltf.scene.rotation.y= toRad(180);
                gltf.scene.position.set(10, 25, 140);
                scene.add(  gltf.scene );
                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
                fox_mixer = new THREE.AnimationMixer( gltf.scene );
                gltf.animations.forEach( ( clip ) => {
                    fox_mixer.clipAction( clip ).play();
                } );

                gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[2].name = "FOx 0";
                gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[2].callback = function() { 
                    console.log( "FOx 0 clicked" ); 
                    fox_animate = true;
                }
                gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[3].name = "FOx 1";
                gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[3].callback = function() { 
                    console.log( "FOx 1 clicked" ); 
                    fox_animate = true;
                }
            },
            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% fox loaded' ); },
            function ( error ) { console.log( 'fox An error happened' ); }
        );

        gltfloader.load(
            rhino_path,
            function ( gltf ) {
                var scale = 70;
                gltf.scene.scale.set(scale, scale, scale);
                gltf.scene.rotation.y= toRad(90);

                gltf.scene.position.set(-1000, 0, -200);
                scene.add(  gltf.scene );
                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
                rhino_mixer = new THREE.AnimationMixer( gltf.scene );
                gltf.animations.forEach( ( clip ) => {
                    rhino_mixer.clipAction( clip ).play();
                } );

                gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[2].name = "Rhino";
                gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[2].callback = function() { 
                    console.log( "Rhino clicked" ); 
                    rhino_animate = true;
                }
            },
            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% rhino loaded' ); },
            function ( error ) { console.log( 'rhino An error happened' ); }
        );
        gltfloader.load(
            ebaby_path,
            function ( gltf ) {
                var scale = 50;
                gltf.scene.scale.set(scale, scale, scale);
                gltf.scene.rotation.y= toRad(150);

                gltf.scene.position.set(300, 24, 250);
                scene.add(  gltf.scene );
                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
                ele_mixer = new THREE.AnimationMixer( gltf.scene );
                gltf.scene.children[0].children[0].children[0].children[0].children[0].children[2].name = "elephant 0";
                gltf.scene.children[0].children[0].children[0].children[0].children[0].children[2].callback = function() { 
                    console.log( "ele clicked" ); 
                    ele_animate = true;
                }
                gltf.animations.forEach( ( clip ) => {
                    ele_mixer.clipAction( clip ).play();
                } );
            },
            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% elephant loaded' ); },
            function ( error ) { console.log( 'elephant An error happened' ); }
        );
    }

    function buildFish() {
        gltfloader.load(
            shark_path,
            function ( gltf ) {
                var scale = 2
                gltf.scene.scale.set(scale, scale, scale);
                gltf.scene.rotation.y= toRad(-60);
                gltf.scene.position.set(200, -2, -90);
                scene.add(  gltf.scene );
                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
                shark_mixer = new THREE.AnimationMixer( gltf.scene );
                gltf.animations.forEach( ( clip ) => {
                    shark_mixer.clipAction( clip ).play();
                } );

                gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[2].name = "Shark";
                gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[2].callback = function() { 
                    console.log( "Shark clicked" ); 
                    shark_animate = true;
                }
            },
            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% Shark loaded' ); },
            function ( error ) { console.log( 'Shark An error happened' ); }
        );
    }

    function buildBird() {
        gltfloader.load(
            peacock_path,
            function ( gltf ) {
                var scale = 2
                gltf.scene.scale.set(scale, scale, scale);
                var s1 = gltf.scene.clone();
                s1.rotation.y= toRad(150);
                s1.position.set(40, 5, -140);
                scene.add( s1 );
                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
            },
            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% peacock loaded' ); },
            function ( error ) { console.log( 'peacock An error happened' ); }
        );

        gltfloader.load(
            duck_path,
            function ( gltf ) {
                addDuck_1(gltf)                
            },
            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% duck 1 loaded' ); },
            function ( error ) { console.log( 'duck 1 An error happened' ); }
        );

        gltfloader.load(
            duck_2_path,
            function ( gltf ) {
                addDuck_2(gltf)
            },
            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% duck 2 loaded' ); },
            function ( error ) { console.log( 'duck 2 An error happened' ); }
        );
        gltfloader.load(
            dodo_path,
            function ( gltf ) {
               addDodo(gltf)
            },
            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% dodo loaded' ); },
            function ( error ) { console.log( 'dodo An error happened' ); }
        );

        gltfloader.load(
            h_bird_path,
            function ( gltf ) {
                var scale = 200;
                gltf.scene.scale.set(scale, scale, scale);
                gltf.scene.rotation.y= toRad(90);

                gltf.scene.position.set(-20, 55, 100);
                scene.add(  gltf.scene );
                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
                h_bird_mixer = new THREE.AnimationMixer( gltf.scene );
                gltf.animations.forEach( ( clip ) => {
                    h_bird_mixer.clipAction( clip ).play();
                } );

                gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[2].name = "H bird";
                gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[2].callback = function() { 
                    console.log( "Hbird clicked" ); 
                    hbird_animate = true;
                }
            },
            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% humming bird loaded' ); },
            function ( error ) { console.log( 'humming bird An error happened' ); }
        );

        gltfloader.load(
            bfly_path,
            function ( gltf ) {
                var scale = 100;
                gltf.scene.scale.set(scale, scale, scale);
                gltf.scene.rotation.y= toRad(0);

                gltf.scene.position.set(0, 7, -140);
                scene.add(  gltf.scene );
                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
                bfly_mixer = new THREE.AnimationMixer( gltf.scene );
                gltf.animations.forEach( ( clip ) => {
                    bfly_mixer.clipAction( clip ).play();
                } );

                gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[2].name = "Butterfly";
                gltf.scene.children[0].children[0].children[0].children[0].children[0].children[0].children[2].callback = function() { 
                    console.log( "Butterfly clicked" ); 
                    bfly_animate = true;
                }
            },
            function ( xhr ) { console.log( ( xhr.loaded / xhr.total * 100 ) + '% Butterfly loaded' ); },
            function ( error ) { console.log( 'Butterfly An error happened' ); }
        );
    }

    function addDuck_2(gltf) {
        var scale = 0.15
        var d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(20);
        d1.position.set(20, 0, -40);
        scene.add( d1 );

        scale = 0.15
        d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(30);
        d1.position.set(30, 0, -20);
        scene.add( d1 );
        scale = 0.1

        d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(-50);
        d1.position.set(50, 0, -30);
        scene.add( d1 );

        d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(50);
        d1.position.set(-80, 0, -80);
        scene.add( d1 );

        d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(20);
        d1.position.set(-90, 0, -80);
        scene.add( d1 );
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
    }

    function addDodo(gltf) {
        var scale = 10
        var d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(20);
        d1.position.set(80, -3, -30);
        scene.add( d1 );

        scale = 8
        d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(30);
        d1.position.set(90, 7, -60);
        scene.add( d1 );

        scale = 8
        d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(90);
        d1.position.set(70, 7, -80);
        scene.add( d1 );
        
        scale = 8
        d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(30);
        d1.position.set(-90, 7, -150);
        scene.add( d1 );
        
        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
    }

    function addDuck_1(gltf) {
        var scale = 200
        var d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(20);
        d1.position.set(0, -1, -20);
        scene.add( d1 );

        scale = 250
        d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(-50);
        d1.position.set(10, -1, -20);
        scene.add( d1 );

        scale = 200
        d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(20);
        d1.position.set(-20, -1, -35);
        scene.add( d1 );

        scale = 200
        d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(20);
        d1.position.set(-20, -1, -85);
        scene.add( d1 );

        scale = 300
        d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(180);
        d1.position.set(-80, -1, -50);
        scene.add( d1 );

        scale = 300
        d1 = gltf.scene.clone()
        d1.scale.set(scale, scale, scale);
        d1.rotation.y= toRad(70);
        d1.position.set(-120, -1, -80);
        scene.add( d1 );

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
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
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 20000);
        camera.lookAt(new THREE.Vector3(0,100,0)); // Set look at coordinate like this
        camera.position.set(100, 300, -1000);
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
        const phi = 2 * Math.PI * (0.25 - 0.5);
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
            sunColor: 0xfca65f,
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

    function setOrbitControls() {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.movementSpeed = 500;
        controls.maxPolarAngle = Math.PI * 0.495;
        controls.target.set(0, 10, 0);
        controls.minDistance = 40.0;
        controls.maxDistance = 200.0;
        
        controls.update();
        return controls;
    }

    this.update = function() {
        const time = performance.now() * 0.001;

        // Animates water
        if ( water != null) {
            water.material.uniforms[ 'time' ].value += 1.0 / 200.0;
        }
        if( terrain_2 != null && flag_tree == false) {
            flag_tree = true
            buildTrees();
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
    var delta = clock.getDelta();
  
    if ( fox_animate && fox_mixer ) fox_mixer.update( delta );
    if ( rhino_animate && rhino_mixer ) rhino_mixer.update( delta );
    if ( hbird_animate && h_bird_mixer ) h_bird_mixer.update( delta );
    if ( bfly_animate && bfly_mixer ) bfly_mixer.update( delta );
    if ( ele_animate && ele_mixer ) ele_mixer.update( delta );
    if ( shark_animate && shark_mixer ) shark_mixer.update( delta );

    sceneManager.update();
}
animate();



function toRad(angle) {
    return angle * Math.PI / 180;
}