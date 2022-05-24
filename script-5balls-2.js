

(function () {
    // Set our main variables
    let scene,
    renderer,
    camera,
    model, // Our character
    possibleAnims, // Animations found in our file
    mixer, // THREE.js animations mixer
    idle, // Idle, the default state our character returns to
    clock = new THREE.Clock(), // Used for anims, which run to a clock instead of frame rate 
    loaderAnim = document.getElementById('js-loader');
  
  
              scene = new THREE.Scene();
              
        const MODEL_PATH = '5balls.glb';
        const canvas = document.querySelector('#c');
        const backgroundColor = null;
  
              

              //var ambientlight = new THREE.AmbientLight(0xffffff, 1500)
              //scene.add(ambientlight);
              //var ambientlight2 = new THREE.AmbientLight(0xffffff, 200)
              //scene.add(ambientlight2);

              
  
    init();
  
    function init() {
  
    
  
      // Init the scene
      scene.background = null;
      
  
      // Init the renderer
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha:true });
      renderer.shadowMap.enabled = true;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ReinhardToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.receiveShadow = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.physicallyCorrectLights = true;
      var max = renderer.capabilities.getMaxAnisotropy();
      document.body.appendChild(renderer.domElement);
  
      // Add a camera
      camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000);
  
  
      var loader = new THREE.GLTFLoader();
  
      loader.load(
      MODEL_PATH,
      function (gltf) {
        camera = gltf.cameras[ '0' ];
        mixer = new THREE.AnimationMixer( gltf.scene );
        var action = mixer.clipAction( gltf.animations[ 0 ] );
        action.setLoop( THREE.LoopOnce );
        action.startAt(3);
        action.clampWhenFinished = true;
        action.play();
        model = gltf.scene;
        let fileAnimations = gltf.animations;
  
        model.traverse(o => {
  
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            if(o.material.map) o.material.map.anisotropy = 32; 
          }
          // Reference the neck and waist bones
          
        });
  
        scene.add( model );
        loaderAnim.remove();
  
  
  
    var spotLight = new THREE.SpotLight( 0xf5f5f5, 50);
    spotLight.position.set( -10,15,0);
    spotLight.angle = 1;
    spotLight.penumbra = 0.8;
    spotLight.decay = 0.1;
    spotLight.distance = 65;
    spotLight.castShadow = true;
    //spotLight.power = 200;
    //spotLight.shadow.mapSize.width = window.innerWidth;
    //spotLight.shadow.mapSize.height = window.innerHeight;
    spotLight.shadow.camera.near = 0.1;
    spotLight.shadow.camera.far = 5;
    spotLight.shadow.bias = -0.5;
    //spotLight.shadow.radius = 5;
  
    //const axesHelper = new THREE.AxesHelper( 10);
    //scene.add( axesHelper );
    
  
    //spotLight.target.position = new THREE.Object3D( 0, 0, 0 );
    //scene.add( spotLight.target );
    scene.add( spotLight );
    
    var spotLight2 = new THREE.SpotLight( 0xF8F0E3 , 150);
    spotLight2.position.set( 10,10,0);
    spotLight2.angle = 1;
    spotLight2.penumbra = 1;
    spotLight2.decay = 0.1;
    spotLight2.distance = 35;
    spotLight2.castShadow = true;
    //spotLight.power = 200;
    spotLight2.shadow.mapSize.width = 3096;
    spotLight2.shadow.mapSize.height = 3096;
    spotLight2.shadow.camera.near = 1;
    spotLight2.shadow.camera.far = 5;
    //spotLight2.shadow.bias = -0.5;
    scene.add( spotLight2 );

    var ambientlight = new THREE.AmbientLight(0x696969, 15)
    scene.add(ambientlight);

    var light = new THREE.HemisphereLight(0xffffff, 0xd3d3d3, 45)
              light.position.set(15,15,4)
              //scene.add(light);
  
  
    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset;    },
      undefined, // We don't need this function
      function (error) {
        console.error(error);
      });
  
  
    }
  
  
  
    function animate() {
      requestAnimationFrame( animate );
    
      var delta = clock.getDelta();
    
      if ( mixer ) mixer.update( delta );
  
      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
    
      renderer.render( scene, camera );
    
    }
    animate();
  
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      let width = window.innerWidth;
      let height = window.innerHeight;
      let canvasPixelWidth = canvas.width / window.devicePixelRatio;
      let canvasPixelHeight = canvas.height / window.devicePixelRatio;
  
      const needResize =
      canvasPixelWidth !== width || canvasPixelHeight !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
  
  
  
    
  
  })();
