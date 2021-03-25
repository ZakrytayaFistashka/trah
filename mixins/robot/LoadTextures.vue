<script>
export default{
  methods: {
    loadTextures() {
      const loader = new this.THREE.TextureLoader();
      loader.load(require('~/assets/static/tfdiff.png'), (texture) => {
        this.loadTexture2(texture);
      });
    },

    loadTexture2(tex) {
      const loader = new this.THREE.TextureLoader();
      loader.load(require('~/assets/static/tfspec.jpg'), (texture) => {
        this.loadTexture3(tex, texture);
      });
    },

    loadTexture3(tex, tex2) {
      const loader = new this.THREE.TextureLoader();
      loader.load(require('~/assets/static/tfnorm.jpg'), (texture) => {
        this.loadTexture4(tex, tex2, texture);
      });
    },

    loadTexture4(tex, tex2, tex3) {
      const loader = new this.THREE.TextureLoader();
      loader.load(require('~/assets/static/tfglo.jpg'), (texture) => {
        this.loadTexture5(tex, tex2, tex3, texture);
      });
    },

    loadTexture5(tex, tex2, tex3, tex4) {
      const loader = new this.THREE.TextureLoader();
      loader.load(require('~/assets/static/mata.jpg'), (texture) => {
        this.langit(tex, tex2, tex3, tex4, texture);
      });
    },

    langit(tex, tex2, tex3, tex4, tex5) {
      const path = '/static/';
      const format = '.jpg';
      const urls = [
        `${path}posx${format}`, `${path}negx${format}`,
        `${path}posy${format}`, `${path}negy${format}`,
        `${path}posz${format}`, `${path}negz${format}`,
      ];
      const rCube = new this.THREE.CubeTextureLoader().load(urls);

      rCube.format = this.THREE.RGBFormat;
      rCube.mapping = this.THREE.CubeReflectionMapping;

      this.uLoad(tex, tex2, tex3, tex4, tex5, rCube);
    },

    uLoad(tex1, tex2, tex3, tex4, tex5, ref) {
      const floorPosY = -24;
      const loadO = new this.THREE.OBJLoader();
      loadO.load('/static/teenf.obj', (object) => {
        const mater = new this.THREE.MeshPhongMaterial({
          shininess: 50,
          map: tex1,
          specularMap: tex2,
          normalMap: tex3,
          aoMap: tex4,
          aoMapIntensity: 0.6,
          lightMap: tex4,
          lightMapIntensity: 2.6,
          transparent: true,
          fog: false,
          morphTargets: true,
        });

        object.children[0].geometry = new this.THREE.Geometry().fromBufferGeometry(object.children[0].geometry);
        this.genMorphT(object.children[0].geometry);

        this.face = new this.THREE.Mesh(object.children[0].geometry, mater);
        this.face.position.y = floorPosY;
        this.scene.add(this.face);

        const geometry = new this.THREE.SphereGeometry(1.86, 24, 24, 0, Math.PI);
        const eyes = new this.THREE.MeshPhongMaterial({
          map: tex5,
          envMap: ref,
          combine: this.THREE.AddOperation,
          reflectivity: 0.26,
          fog: false,
        });

        this.eyeLeft = new this.THREE.Mesh(geometry, eyes);
        this.eyeLeft.position.set(-4.3, floorPosY + 28.5, 10.56);
        this.scene.add(this.eyeLeft);

        this.eyeRight = new this.THREE.Mesh(geometry, eyes);
        this.eyeRight.position.set(4.3, floorPosY + 28.5, 10.56);
        this.scene.add(this.eyeRight);

        this.animate();
        this.loaded = true;

        // loadO.load('/img/models/shirt-2.obj', (shirt) => {
        //   const shirtMaterial = new this.THREE.MeshPhongMaterial({
        //     color: 0x0000ff,
        //     fog: false,
        //   });
        //   const shirtObj = new this.THREE.Mesh(shirt.children[0].geometry, shirtMaterial);
        //   shirtObj.scale.set(1.2, 1.2, 1.2);
        //   shirtObj.position.y = -69;
        //   shirtObj.position.z = 2;
        //   this.scene.add(shirtObj);
        //   loadO.load('/img/models/hat.obj', (hat) => {
        //     const hatMaterial = new this.THREE.MeshPhongMaterial({
        //       color: 0x0000ff,
        //       fog: false,
        //     });
        //     const hatObj = new this.THREE.Mesh(hat.children[1].geometry, hatMaterial);
        //     hatObj.position.y = 9;
        //     hatObj.position.z = 6;
        //     hatObj.scale.set(10, 10, 10);
        //     this.scene.add(hatObj);
        //     this.animate();
        //     this.loaded = true;
        //   });
        // });
      });
    },

    genMorphT(geom) {
      const facial2 = window.facialParams.ex2;
      const facial3 = window.facialParams.ex3;
      const facial4 = window.facialParams.ex4;
      const facial5 = window.facialParams.ex5;

      const vertices1 = [];
      const vertices2 = [];
      const vertices3 = [];
      const vertices4 = [];
      for (let i = 0; i < geom.vertices.length; i++) {
        vertices1.push(geom.vertices[i].clone());
        vertices2.push(geom.vertices[i].clone());
        vertices3.push(geom.vertices[i].clone());
        vertices4.push(geom.vertices[i].clone());
        vertices1[vertices1.length - 1].x = facial2[i * 3];
        vertices1[vertices1.length - 1].y = facial2[(i * 3) + 1];
        vertices1[vertices1.length - 1].z = facial2[(i * 3) + 2];
        vertices2[vertices2.length - 1].x = facial3[i * 3];
        vertices2[vertices2.length - 1].y = facial3[(i * 3) + 1];
        vertices2[vertices2.length - 1].z = facial3[(i * 3) + 2];
        vertices3[vertices3.length - 1].x = facial4[i * 3];
        vertices3[vertices3.length - 1].y = facial4[(i * 3) + 1];
        vertices3[vertices3.length - 1].z = facial4[(i * 3) + 2];
        vertices4[vertices4.length - 1].x = facial5[i * 3];
        vertices4[vertices4.length - 1].y = facial5[(i * 3) + 1];
        vertices4[vertices4.length - 1].z = facial5[(i * 3) + 2];
      }
      geom.morphTargets.push({ name: 't1', vertices: vertices1 });
      geom.morphTargets.push({ name: 't2', vertices: vertices2 });
      geom.morphTargets.push({ name: 't3', vertices: vertices3 });
      geom.morphTargets.push({ name: 't4', vertices: vertices4 });
    },
  },
};
</script>
