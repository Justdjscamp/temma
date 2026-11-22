/**
 * ТЭММА — LOCAL WEBGL THREE.JS PBR 60FPS 3D STORYBOARD ENGINE (180 FRAMES · 4 ACTS)
 * 100% Self-Contained (uses local vendor/three.min.js, zero external CDNs, zero slideshow).
 *   Act I  (001–045): Exploded 3D Contract Dossier + Golden Verification Laser Sweep
 *   Act II (046–090): Machined 36-Tooth Brushed-Brass Legal Seal "ТЭММА" + Shockwave Ring
 *   Act III (091–135): Horological Arbitration Balance Scale + Sliding Counterweights -> 0.00°
 *   Act IV (136–180): 10-Practice Architectural Monolith + Orbital Rings + "Т" Crown Crest
 */

(function () {
  'use strict';

  const TOTAL_FRAMES = 180;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smoothstep = (e0, e1, x) => {
    const t = clamp((x - e0) / (e1 - e0), 0, 1);
    return t * t * (3 - 2 * t);
  };

  /**
   * 1. High-Contrast Procedural Studio HDRI Environment Map (PMREM)
   * Gives brushed brass, polished gold, and smoked obsidian authentic luxury watchmaking reflections
   */
  function createStudioEnvironment(renderer) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep obsidian-navy architectural studio base
    const bg = ctx.createLinearGradient(0, 0, 0, 512);
    bg.addColorStop(0, '#1e4258');
    bg.addColorStop(0.42, '#0d202d');
    bg.addColorStop(0.54, '#060f16');
    bg.addColorStop(1, '#102534');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1024, 512);

    const drawSoftbox = (x, y, w, h, color, alpha) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      const cx = x + w * 0.5;
      const cy = y + h * 0.5;
      const g = ctx.createRadialGradient(cx, cy, 8, cx, cy, Math.max(w, h) * 0.65);
      g.addColorStop(0, color);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x, y, w, h);
      ctx.restore();
    };

    // Warm golden key softboxes + crisp ivory overhead strip + cool steel rim
    drawSoftbox(60, 28, 360, 165, '#fff5de', 0.98);
    drawSoftbox(580, 55, 310, 150, '#eccb92', 0.9);
    drawSoftbox(260, 270, 420, 130, '#6aa3c7', 0.52);
    drawSoftbox(750, 290, 220, 160, '#ffe0a8', 0.72);

    // Sharp specular reflection light-bars (classic horological commercial look)
    ctx.fillStyle = 'rgba(255, 248, 232, 0.88)';
    ctx.fillRect(120, 82, 240, 18);
    ctx.fillRect(630, 118, 195, 14);
    ctx.fillStyle = 'rgba(155, 210, 245, 0.65)';
    ctx.fillRect(380, 315, 220, 10);

    const envTex = new THREE.CanvasTexture(canvas);
    envTex.mapping = THREE.EquirectangularReflectionMapping;

    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    const envMap = pmrem.fromEquirectangular(envTex).texture;
    envTex.dispose();
    pmrem.dispose();
    return envMap;
  }

  /**
   * 2. High-DPI Legal Contract Sheet Texture (Cyrillic Blueprint & Verification Seal)
   */
  function createContractSheetTexture(sheetIndex) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 680;
    const ctx = canvas.getContext('2d');

    const isLight = sheetIndex === 4 || sheetIndex % 2 === 1;
    ctx.fillStyle = isLight ? '#f6f2e8' : '#102432';
    ctx.fillRect(0, 0, 512, 680);

    const fgPrimary = isLight ? '#142936' : '#f0d5a3';
    const fgMuted = isLight ? 'rgba(20, 41, 54, 0.32)' : 'rgba(232, 206, 154, 0.28)';
    const brass = '#c49d62';

    // Double architectural border
    ctx.strokeStyle = brass;
    ctx.lineWidth = 3;
    ctx.strokeRect(22, 22, 468, 636);
    ctx.lineWidth = 1;
    ctx.strokeRect(32, 32, 448, 616);

    ctx.fillStyle = fgPrimary;
    ctx.font = '700 14px "JetBrains Mono", monospace';
    ctx.fillText(`ТЭММА · ПРАВОВОЙ КОНТУР / ЛИСТ 0${sheetIndex + 1}`, 48, 66);

    ctx.fillStyle = brass;
    ctx.fillRect(48, 78, 416, 2);

    const titles = [
      'АРБИТРАЖНАЯ ОГОВОРКА',
      'ПРОТОКОЛ РАЗНОГЛАСИЙ',
      'КАРТА РИСКОВ СДЕЛКИ',
      'ГАРАНТИИ И ОБЕСПЕЧЕНИЕ',
      'ДОГОВОРНОЕ ДОСЬЕ № 01/ТМ'
    ];
    ctx.fillStyle = fgPrimary;
    ctx.font = '700 21px Georgia, serif';
    ctx.fillText(titles[sheetIndex % titles.length], 48, 114);

    let y = 148;
    for (let b = 0; b < 4; b++) {
      ctx.fillStyle = brass;
      ctx.font = '600 12px "JetBrains Mono", monospace';
      ctx.fillText(`§ ${sheetIndex + 1}.${b + 1} ФИКСАЦИЯ ОБЯЗАТЕЛЬСТВ`, 48, y);
      y += 16;

      ctx.fillStyle = fgMuted;
      for (let l = 0; l < 4; l++) {
        const w = l === 3 ? 215 + ((b * 43) % 130) : 400;
        ctx.fillRect(48, y, w, 6);
        y += 15;
      }
      y += 16;
    }

    // Verification footer box
    ctx.strokeStyle = brass;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(48, 535, 244, 82);
    ctx.fillStyle = fgPrimary;
    ctx.font = '600 11px "JetBrains Mono", monospace';
    ctx.fillText('СТАТУС: ВЕРИФИЦИРОВАНО', 62, 560);
    ctx.fillText('КОНТУР: ЗАЩИЩЁН', 62, 580);
    ctx.fillStyle = brass;
    ctx.fillText('ТЭММА · ЮРИДИЧЕСКАЯ ФУНКЦИЯ', 62, 602);

    // Circular stamp
    ctx.save();
    ctx.translate(390, 575);
    ctx.strokeStyle = brass;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, 44, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, 35, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = brass;
    ctx.font = '700 30px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Т', 0, 2);
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    return tex;
  }

  /**
   * 3. Engraved Horological Vernier Dial Texture for Machined Brass Seal
   */
  function createSealDialTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0d202d';
    ctx.fillRect(0, 0, 512, 512);

    ctx.save();
    ctx.translate(256, 256);

    [242, 224, 188, 148, 94].forEach((r, idx) => {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = idx % 2 === 0 ? '#e7cc9f' : 'rgba(212, 178, 125, 0.45)';
      ctx.lineWidth = idx === 0 ? 4 : 1.6;
      ctx.stroke();
    });

    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      const major = i % 6 === 0;
      const r1 = major ? 194 : 207;
      const r2 = 222;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
      ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
      ctx.strokeStyle = major ? '#f5deb3' : 'rgba(212, 178, 125, 0.5)';
      ctx.lineWidth = major ? 2.5 : 1;
      ctx.stroke();
    }

    const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    ctx.fillStyle = '#f2d7a4';
    ctx.font = '700 20px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    numerals.forEach((num, idx) => {
      const a = (idx / 10) * Math.PI * 2 - Math.PI / 2;
      ctx.fillText(num, Math.cos(a) * 168, Math.sin(a) * 168);
    });

    ctx.restore();
    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    return tex;
  }

  /**
   * 4. Engraved Architectural Practice Slab Texture (01..10)
   */
  function createPracticeSlabTexture(index, title) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0f2330';
    ctx.fillRect(0, 0, 256, 512);

    ctx.strokeStyle = '#d4b27d';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 236, 492);
    ctx.lineWidth = 1;
    ctx.strokeRect(18, 18, 220, 476);

    ctx.fillStyle = '#f0d5a3';
    ctx.font = '700 38px "JetBrains Mono", monospace';
    ctx.fillText(String(index + 1).padStart(2, '0'), 30, 68);

    ctx.fillStyle = '#d4b27d';
    ctx.fillRect(30, 86, 196, 2);

    ctx.save();
    ctx.translate(128, 290);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#f6f3eb';
    ctx.font = '700 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title.toUpperCase(), 0, 0);
    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    return tex;
  }

  /**
   * MAIN LOCAL WEBGL THREE.JS PBR STORYBOARD ENGINE
   */
  class Storyboard3DEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.totalFrames = TOTAL_FRAMES;
      this.currentFrameFloat = 0;
      this.targetFrameFloat = 0;
      this.pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
      this.isVisible = true;
      this.isMobile = window.innerWidth <= 860;

      this.initThree();
      this.initMaterials();
      this.buildScene();
      this.bindEvents();
    }

    getStageSize() {
      const stage = this.canvas.parentElement;
      const w = (stage && stage.clientWidth) || window.innerWidth;
      const h = (stage && stage.clientHeight) || window.innerHeight;
      return { w: Math.max(1, w), h: Math.max(1, h) };
    }

    initThree() {
      this.scene = new THREE.Scene();

      const { w, h } = this.getStageSize();
      this.camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
      this.camera.position.set(0, 0.35, 10.6);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: true
      });
      this.renderer.setSize(w, h, false);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.24;
      this.renderer.outputEncoding = THREE.sRGBEncoding;

      // Real Studio Reflection Map
      this.scene.environment = createStudioEnvironment(this.renderer);

      // Architectural Lighting Rig
      this.scene.add(new THREE.AmbientLight(0xd9e8f5, 0.45));

      this.keyLight = new THREE.DirectionalLight(0xffe9c4, 2.35);
      this.keyLight.position.set(6, 9, 8);
      this.scene.add(this.keyLight);

      this.rimLight = new THREE.DirectionalLight(0x69b4e0, 1.45);
      this.rimLight.position.set(-7, 4, -6);
      this.scene.add(this.rimLight);

      this.brassLight = new THREE.PointLight(0xe8c78a, 2.4, 20);
      this.brassLight.position.set(1.5, 1.4, 4.4);
      this.scene.add(this.brassLight);
    }

    initMaterials() {
      this.matBrushedBrass = new THREE.MeshStandardMaterial({
        color: 0xd6b37a,
        metalness: 0.93,
        roughness: 0.2
      });

      this.matBrightGold = new THREE.MeshStandardMaterial({
        color: 0xf4dca8,
        metalness: 0.98,
        roughness: 0.11
      });

      this.matDarkObsidian = new THREE.MeshPhysicalMaterial({
        color: 0x0d212f,
        metalness: 0.65,
        roughness: 0.22,
        clearcoat: 0.8,
        clearcoatRoughness: 0.16
      });

      this.matSmokedGlass = new THREE.MeshPhysicalMaterial({
        color: 0x1a3e54,
        metalness: 0.15,
        roughness: 0.08,
        clearcoat: 1.0,
        transparent: true,
        opacity: 0.68
      });

      this.matGlowingCore = new THREE.MeshStandardMaterial({
        color: 0xf5d698,
        emissive: 0xc99c52,
        emissiveIntensity: 0.85,
        metalness: 0.85,
        roughness: 0.14
      });

      this.matDialFace = new THREE.MeshStandardMaterial({
        map: createSealDialTexture(),
        metalness: 0.58,
        roughness: 0.28
      });

      this.matLaserGlow = new THREE.MeshBasicMaterial({
        color: 0xf8e1ac,
        transparent: true,
        opacity: 0.92
      });
    }

    buildScene() {
      this.masterRoot = new THREE.Group();
      this.scene.add(this.masterRoot);

      this.buildBackdropAndParticles();
      this.buildAct1And2DossierSeal();
      this.buildAct3ArbitrationScales();
      this.buildAct4PracticeMonolith();
    }

    buildBackdropAndParticles() {
      // 3D Astrolabe Calibration Rings
      this.bgGroup = new THREE.Group();
      this.masterRoot.add(this.bgGroup);

      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xd4b27d,
        metalness: 0.9,
        roughness: 0.25,
        transparent: true,
        opacity: 0.36
      });

      this.bgRing1 = new THREE.Mesh(new THREE.TorusGeometry(4.0, 0.014, 12, 128), ringMat);
      this.bgRing2 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.018, 12, 112), ringMat);
      this.bgRing2.rotation.z = Math.PI / 5;
      this.bgGroup.add(this.bgRing1, this.bgRing2);

      // 180 3D Floating Golden Dust Motes
      const count = 180;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const phi = i * 2.39996;
        const r = 2.1 + ((i * 53) % 45) * 0.11;
        positions[i * 3] = Math.cos(phi) * r;
        positions[i * 3 + 1] = (((i * 29) % 60) - 30) * 0.15;
        positions[i * 3 + 2] = (((i * 41) % 40) - 20) * 0.18;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.045,
        color: 0xe8c98e,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      this.particles = new THREE.Points(pGeo, pMat);
      this.masterRoot.add(this.particles);
    }

    /**
     * ACT I & II: 5-SHEET CONTRACT DOSSIER + GOLDEN LASER SCAN + 36-TOOTH BRASS SEAL
     */
    buildAct1And2DossierSeal() {
      this.dossierGroup = new THREE.Group();
      this.masterRoot.add(this.dossierGroup);

      this.contractSheets = [];
      const sheetGeo = new THREE.BoxGeometry(2.5, 3.3, 0.048);
      const rimGeo = new THREE.BoxGeometry(2.56, 3.36, 0.032);

      for (let i = 0; i < 5; i++) {
        const wrap = new THREE.Group();
        const tex = createContractSheetTexture(i);
        const faceMat = new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.38,
          metalness: 0.12
        });
        const mats = [
          this.matBrushedBrass,
          this.matBrushedBrass,
          this.matBrightGold,
          this.matBrushedBrass,
          faceMat,
          this.matDarkObsidian
        ];
        const mesh = new THREE.Mesh(sheetGeo, mats);
        const rim = new THREE.Mesh(rimGeo, this.matBrushedBrass);
        rim.position.z = -0.012;
        wrap.add(mesh, rim);
        this.dossierGroup.add(wrap);
        this.contractSheets.push(wrap);
      }

      // Golden Verification Laser Scan Bar across Front Sheet
      this.laserBar = new THREE.Mesh(new THREE.BoxGeometry(2.68, 0.038, 0.05), this.matLaserGlow);
      this.dossierGroup.add(this.laserBar);

      // Machined 36-Tooth Brushed-Brass Legal Seal ("ПЕЧАТЬ ТЭММА")
      this.brassSeal = new THREE.Group();
      this.dossierGroup.add(this.brassSeal);

      const dialMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(1.18, 1.24, 0.22, 64),
        [this.matBrushedBrass, this.matDialFace, this.matDialFace]
      );
      dialMesh.rotation.x = Math.PI / 2;
      this.brassSeal.add(dialMesh);

      const outerBezel = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.085, 24, 72), this.matBrightGold);
      this.brassSeal.add(outerBezel);

      // 36 Precision Knurled Gear Teeth
      const toothGeo = new THREE.BoxGeometry(0.055, 0.14, 0.24);
      for (let i = 0; i < 36; i++) {
        const a = (i / 36) * Math.PI * 2;
        const tooth = new THREE.Mesh(toothGeo, this.matBrushedBrass);
        tooth.position.set(Math.cos(a) * 1.29, Math.sin(a) * 1.29, 0);
        tooth.rotation.z = a;
        this.brassSeal.add(tooth);
      }

      // Raised Sculptural 3D Monogram "Т"
      const monoGroup = new THREE.Group();
      const stem = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.88, 0.18), this.matBrightGold);
      stem.position.set(0, -0.08, 0.15);
      const topBar = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.2, 0.2), this.matBrightGold);
      topBar.position.set(0, 0.34, 0.16);
      const serifL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.28, 0.2), this.matBrightGold);
      serifL.position.set(-0.39, 0.30, 0.16);
      const serifR = serifL.clone();
      serifR.position.x = 0.39;
      monoGroup.add(stem, topBar, serifL, serifR);
      this.brassSeal.add(monoGroup);

      // Expanding Golden Shockwave Ring when Seal Locks
      this.shockwaveMat = new THREE.MeshBasicMaterial({
        color: 0xf4dca8,
        transparent: true,
        opacity: 0
      });
      this.shockwaveRing = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.032, 16, 72), this.shockwaveMat);
      this.dossierGroup.add(this.shockwaveRing);
    }

    /**
     * ACT III: HOROLOGICAL ARBITRATION BALANCE SCALE + DEGREE ARC + SLIDING COUNTERWEIGHTS
     */
    buildAct3ArbitrationScales() {
      this.scalesGroup = new THREE.Group();
      this.masterRoot.add(this.scalesGroup);

      // Stepped Plinth Base
      const base1 = new THREE.Mesh(new THREE.CylinderGeometry(1.56, 1.75, 0.24, 48), this.matDarkObsidian);
      base1.position.y = -2.14;
      const base2 = new THREE.Mesh(new THREE.CylinderGeometry(1.36, 1.44, 0.16, 48), this.matBrushedBrass);
      base2.position.y = -1.96;
      this.scalesGroup.add(base1, base2);

      // Fluted Central Pillar + Brass Collars
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.29, 3.6, 32), this.matDarkObsidian);
      pillar.position.y = -0.14;
      this.scalesGroup.add(pillar);

      [-1.38, -0.42, 0.56, 1.42].forEach((py) => {
        const collar = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.048, 18, 40), this.matBrightGold);
        collar.rotation.x = Math.PI / 2;
        collar.position.y = py;
        this.scalesGroup.add(collar);
      });

      // Calibrated 3D Degree Arc Gauge behind Fulcrum
      const arcGauge = new THREE.Mesh(
        new THREE.TorusGeometry(1.08, 0.022, 14, 48, Math.PI * 0.42),
        this.matBrightGold
      );
      arcGauge.position.set(0, 1.65, -0.18);
      arcGauge.rotation.z = Math.PI * 0.29;
      this.scalesGroup.add(arcGauge);

      // Fulcrum Gimbal Ring
      this.fulcrumRing = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.065, 22, 56), this.matBrightGold);
      this.fulcrumRing.position.y = 1.65;
      this.scalesGroup.add(this.fulcrumRing);

      // Tilting Balance Beam + Sliding Counterweights
      this.balanceBeamGroup = new THREE.Group();
      this.balanceBeamGroup.position.y = 1.65;
      this.scalesGroup.add(this.balanceBeamGroup);

      const mainBeam = new THREE.Mesh(new THREE.BoxGeometry(4.65, 0.14, 0.18), this.matBrushedBrass);
      const subBeam = new THREE.Mesh(new THREE.BoxGeometry(3.85, 0.07, 0.26), this.matDarkObsidian);
      subBeam.position.y = -0.11;
      const needle = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.72, 12), this.matBrightGold);
      needle.position.y = 0.46;
      this.balanceBeamGroup.add(mainBeam, subBeam, needle);

      // Sliding Obsidian-and-Gold Counterweights
      const weightGeo = new THREE.BoxGeometry(0.28, 0.34, 0.34);
      this.counterWeightL = new THREE.Mesh(weightGeo, this.matDarkObsidian);
      this.counterWeightR = new THREE.Mesh(weightGeo, this.matDarkObsidian);
      const cwRim = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.08, 0.36), this.matBrightGold);
      this.counterWeightL.add(cwRim.clone());
      this.counterWeightR.add(cwRim.clone());
      this.balanceBeamGroup.add(this.counterWeightL, this.counterWeightR);

      // Suspended Trays
      this.leftPanGroup = this.createBalanceTray();
      this.leftPanGroup.position.set(-2.15, 0, 0);
      this.balanceBeamGroup.add(this.leftPanGroup);

      this.rightPanGroup = this.createBalanceTray();
      this.rightPanGroup.position.set(2.15, 0, 0);
      this.balanceBeamGroup.add(this.rightPanGroup);
    }

    createBalanceTray() {
      const trayRoot = new THREE.Group();
      trayRoot.add(new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.14, 24), this.matBrightGold));

      const rodGeo = new THREE.CylinderGeometry(0.018, 0.018, 1.95, 12);
      for (let i = 0; i < 3; i++) {
        const a = (i / 3) * Math.PI * 2;
        const rod = new THREE.Mesh(rodGeo, this.matBrushedBrass);
        rod.position.set(Math.cos(a) * 0.34, -0.96, Math.sin(a) * 0.34);
        rod.rotation.z = Math.cos(a) * 0.17;
        rod.rotation.x = -Math.sin(a) * 0.17;
        trayRoot.add(rod);
      }

      const dish = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.58, 0.14, 40), this.matSmokedGlass);
      dish.position.y = -1.92;
      const dishRim = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.042, 16, 48), this.matBrightGold);
      dishRim.rotation.x = Math.PI / 2;
      dishRim.position.y = -1.86;
      const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.4, 0), this.matGlowingCore);
      crystal.position.y = -1.48;
      trayRoot.add(dish, dishRim, crystal);
      trayRoot.userData.crystal = crystal;

      return trayRoot;
    }

    /**
     * ACT IV: 10-PRACTICE ARCHITECTURAL MONOLITH + ORBITAL RINGS + "Т" CROWN CREST
     */
    buildAct4PracticeMonolith() {
      this.vaultGroup = new THREE.Group();
      this.masterRoot.add(this.vaultGroup);

      // Glowing Faceted Diamond Core
      this.vaultCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.85, 1), this.matGlowingCore);
      this.vaultGroup.add(this.vaultCore);

      // Two Intersecting Orbital Brass Gyro Rings
      this.coreRing1 = new THREE.Mesh(new THREE.TorusGeometry(1.22, 0.045, 20, 64), this.matBrightGold);
      this.coreRing2 = new THREE.Mesh(new THREE.TorusGeometry(1.38, 0.036, 20, 64), this.matBrushedBrass);
      this.coreRing2.rotation.x = Math.PI / 3;
      this.vaultGroup.add(this.coreRing1, this.coreRing2);

      // Upper & Lower Monolith Plinths
      this.vaultBotPlinth = new THREE.Mesh(new THREE.CylinderGeometry(1.52, 1.66, 0.24, 40), this.matDarkObsidian);
      this.vaultTopPlinth = new THREE.Mesh(
        new THREE.CylinderGeometry(1.66, 1.52, 0.24, 40),
        [this.matBrushedBrass, this.matDialFace, this.matDarkObsidian]
      );
      this.vaultGroup.add(this.vaultBotPlinth, this.vaultTopPlinth);

      // Rising Sculptural 3D "Т" Crown Crest on Top of Monolith
      this.crownCrest = new THREE.Group();
      const cStem = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.82, 0.22), this.matBrightGold);
      cStem.position.y = 0.28;
      const cTop = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.2, 0.24), this.matBrightGold);
      cTop.position.y = 0.68;
      this.crownCrest.add(cStem, cTop);
      this.vaultGroup.add(this.crownCrest);

      // 10 Engraved Architectural Practice Pillars
      const practiceNames = [
        'Договоры',
        'Арбитраж',
        'Взыскание',
        'Корпоративное',
        'Банкротство',
        'Трудовое',
        'Недвижимость',
        'Интеллект. права',
        'Налоги',
        'Абонентка'
      ];

      this.vaultSlabs = [];
      const slabGeo = new THREE.BoxGeometry(0.64, 2.86, 0.24);
      practiceNames.forEach((name, i) => {
        const wrap = new THREE.Group();
        const frontMat = new THREE.MeshStandardMaterial({
          map: createPracticeSlabTexture(i, name),
          metalness: 0.48,
          roughness: 0.26
        });
        const mats = [
          this.matBrushedBrass,
          this.matBrushedBrass,
          this.matBrightGold,
          this.matBrightGold,
          frontMat,
          this.matDarkObsidian
        ];
        wrap.add(new THREE.Mesh(slabGeo, mats));
        this.vaultGroup.add(wrap);
        this.vaultSlabs.push(wrap);
      });
    }

    /**
     * CONTINUOUS 180-FRAME 3D POSE EVALUATOR (ZERO SLIDESHOW!)
     */
    applyFramePose(frameFloat) {
      const f = clamp(frameFloat, 0, this.totalFrames - 1);
      const progress = f / (this.totalFrames - 1);

      const stageX = this.isMobile ? 0.0 : 0.38;
      const stageY = this.isMobile ? 1.28 : 0.08;
      this.masterRoot.position.set(
        stageX + this.pointer.x * (this.isMobile ? 0.14 : 0.28),
        stageY + this.pointer.y * (this.isMobile ? 0.1 : 0.18),
        0
      );

      // Scale astrolabe rings cleanly on narrow portrait screens so they never clip horizontally
      this.bgGroup.scale.setScalar(this.isMobile ? 0.62 : 1.0);

      // Backdrop & Particles continuous 3D motion
      this.bgRing1.rotation.z = progress * Math.PI * 1.6;
      this.bgRing2.rotation.x = progress * Math.PI * 0.85 + this.pointer.y * 0.16;
      this.bgRing2.rotation.y = progress * Math.PI * 1.15 + this.pointer.x * 0.16;
      this.particles.rotation.y = progress * Math.PI * 0.9 + this.pointer.x * 0.12;
      this.particles.rotation.x = this.pointer.y * 0.08;

      // Dynamic brass point light intensity pulse during Seal Stamp & Monolith Lock
      const sealGlow = Math.exp(-Math.pow((f - 62) / 14, 2)) * 1.6;
      this.brassLight.intensity = 2.2 + sealGlow + smoothstep(135, 175, f) * 1.1;

      // Seamless 4-Act Blend Weights
      const wDossier = 1 - smoothstep(68, 86, f);
      const wScales = smoothstep(66, 85, f) * (1 - smoothstep(122, 140, f));
      const wVault = smoothstep(120, 140, f);

      // --- ACT I & II: DOSSIER & MACHINED BRASS SEAL ---
      this.dossierGroup.visible = wDossier > 0.004;
      if (this.dossierGroup.visible) {
        const localT = clamp(f / 85, 0, 1);
        const compressT = smoothstep(0.0, 0.5, localT);
        const sealLockT = smoothstep(0.32, 0.82, localT);
        const scanT = smoothstep(0.06, 0.52, localT);

        this.dossierGroup.scale.setScalar(wDossier * (this.isMobile ? 0.78 : 0.98));
        this.dossierGroup.rotation.y = lerp(-0.52, 0.36, localT) + this.pointer.x * 0.24;
        this.dossierGroup.rotation.x = lerp(0.3, -0.18, localT) - this.pointer.y * 0.16;

        this.contractSheets.forEach((sheet, idx) => {
          const off = idx - 2;
          sheet.position.z = lerp(off * 0.64, off * 0.068, compressT);
          sheet.position.x = lerp(off * 0.3, 0, compressT);
          sheet.position.y = lerp(Math.sin(idx * 1.35) * 0.22, 0, compressT) - 0.12;
          sheet.rotation.z = lerp(off * 0.095, 0, compressT);
        });

        // Golden laser verification scanline
        this.laserBar.visible = scanT > 0.01 && scanT < 0.99;
        if (this.laserBar.visible) {
          this.laserBar.position.set(0, lerp(1.45, -1.55, scanT), 0.35);
        }

        // Brass seal descent & 180-deg lock rotation
        this.brassSeal.position.z = lerp(2.25, 0.34, sealLockT);
        this.brassSeal.position.y = lerp(0.58, 0.06, sealLockT);
        this.brassSeal.rotation.z = lerp(-Math.PI * 0.85, 0, sealLockT);

        // Golden shockwave ring expanding on lock impact (Frames 52..76)
        const shockT = smoothstep(52, 76, f);
        this.shockwaveRing.visible = shockT > 0.01 && shockT < 0.99;
        if (this.shockwaveRing.visible) {
          this.shockwaveRing.position.set(0, 0.06, 0.24);
          this.shockwaveRing.scale.setScalar(lerp(0.9, 2.35, shockT));
          this.shockwaveMat.opacity = (1 - shockT) * 0.88;
        }
      }

      // --- ACT III: HOROLOGICAL ARBITRATION BALANCE SCALE ---
      this.scalesGroup.visible = wScales > 0.004;
      if (this.scalesGroup.visible) {
        const localT = clamp((f - 66) / (140 - 66), 0, 1);

        this.scalesGroup.scale.setScalar(wScales * (this.isMobile ? 0.74 : 0.94));
        this.scalesGroup.rotation.y = lerp(-0.56, 0.56, localT) + this.pointer.x * 0.24;
        this.scalesGroup.rotation.x = lerp(0.15, 0.03, localT) - this.pointer.y * 0.14;

        const damped = Math.cos(localT * Math.PI * 2.5) * Math.pow(1 - smoothstep(0.0, 0.82, localT), 1.75);
        const tilt = 0.32 * damped;
        this.balanceBeamGroup.rotation.z = tilt;

        // Sliding counterweights gliding into equilibrium
        const cwX = lerp(0.85, 1.38, smoothstep(0.1, 0.78, localT));
        this.counterWeightL.position.x = -cwX;
        this.counterWeightR.position.x = cwX;

        // Keep trays vertical + spin faceted crystal weights
        this.leftPanGroup.rotation.z = -tilt;
        this.rightPanGroup.rotation.z = -tilt;
        this.leftPanGroup.userData.crystal.rotation.y = localT * Math.PI * 3.5;
        this.rightPanGroup.userData.crystal.rotation.y = -localT * Math.PI * 3.5;

        this.fulcrumRing.rotation.y = localT * Math.PI * 2;
      }

      // --- ACT IV: 10-PRACTICE ARCHITECTURAL MONOLITH ---
      this.vaultGroup.visible = wVault > 0.004;
      if (this.vaultGroup.visible) {
        const localT = clamp((f - 120) / (179 - 120), 0, 1);
        const lockT = smoothstep(0.05, 0.86, localT);
        const crownT = smoothstep(0.42, 0.96, localT);

        this.vaultGroup.scale.setScalar(wVault * (this.isMobile ? 0.76 : 0.96));
        this.vaultGroup.rotation.y = lerp(-0.38, Math.PI * 0.72, localT) + this.pointer.x * 0.24;
        this.vaultGroup.rotation.x = lerp(0.26, 0.08, localT) - this.pointer.y * 0.14;

        this.vaultCore.rotation.y = localT * Math.PI * 3;
        this.vaultCore.rotation.x = localT * Math.PI * 1.4;
        this.coreRing1.rotation.x = localT * Math.PI * 2.2;
        this.coreRing2.rotation.y = -localT * Math.PI * 2.6;

        const plinthY = lerp(2.38, 1.56, lockT);
        this.vaultBotPlinth.position.y = -plinthY;
        this.vaultTopPlinth.position.y = plinthY;

        this.crownCrest.visible = crownT > 0.01;
        this.crownCrest.position.y = plinthY + lerp(-0.1, 0.16, crownT);
        this.crownCrest.scale.setScalar(crownT);

        this.vaultSlabs.forEach((slab, i) => {
          const angle = (i / 10) * Math.PI * 2;
          const r = lerp(2.85, 1.56, lockT);
          const helicalY = lerp(((i - 4.5) / 4.5) * 0.98, 0, lockT);
          slab.position.set(Math.cos(angle) * r, helicalY, Math.sin(angle) * r);
          slab.rotation.y = -angle + Math.PI / 2;
          slab.rotation.x = lerp(0.28, 0, lockT);
        });
      }

      // Smooth Cinematic Camera Dolly (full-bleed portrait framing on mobile & wide stage on desktop)
      const camZBase = this.isMobile ? 11.8 : 10.4;
      this.camera.position.z = camZBase - Math.sin(progress * Math.PI) * (this.isMobile ? 0.85 : 1.1);
      this.camera.position.y = lerp(this.isMobile ? 0.12 : 0.36, 0.08, progress);
      this.camera.lookAt(0, 0, 0);
    }

    /**
     * Bakes real WebGL renders of keyframes (008, 058, 108, 165) into the bottom Filmstrip thumbnails
     */
    bakeFilmstripThumbnails() {
      const thumbCanvases = document.querySelectorAll('.thumb-canvas[data-thumb-frame]');
      if (!thumbCanvases.length) return;

      const savedFrame = this.currentFrameFloat;
      const savedPX = this.pointer.x;
      const savedPY = this.pointer.y;
      this.pointer.x = 0;
      this.pointer.y = 0;

      thumbCanvases.forEach((tc) => {
        const frameNum = parseInt(tc.getAttribute('data-thumb-frame'), 10) || 0;
        this.applyFramePose(frameNum);
        this.renderer.render(this.scene, this.camera);

        const tctx = tc.getContext('2d');
        tctx.clearRect(0, 0, tc.width, tc.height);
        tctx.fillStyle = '#0c1b26';
        tctx.fillRect(0, 0, tc.width, tc.height);
        tctx.drawImage(this.renderer.domElement, 0, 0, tc.width, tc.height);
      });

      this.pointer.x = savedPX;
      this.pointer.y = savedPY;
      this.applyFramePose(savedFrame);
      this.renderer.render(this.scene, this.camera);
    }

    setTargetFrame(frameFloat) {
      this.targetFrameFloat = clamp(frameFloat, 0, this.totalFrames - 1);
    }

    bindEvents() {
      window.addEventListener('resize', () => {
        this.isMobile = window.innerWidth <= 860;
        const { w, h } = this.getStageSize();
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h, false);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      });

      window.addEventListener(
        'pointermove',
        (e) => {
          this.pointer.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
          this.pointer.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
        },
        { passive: true }
      );

      if ('IntersectionObserver' in window) {
        const section = document.getElementById('storyboard');
        if (section) {
          new IntersectionObserver(
            (entries) => {
              this.isVisible = entries[0]?.isIntersecting ?? true;
            },
            { threshold: 0.01 }
          ).observe(section);
        }
      }
    }

    startLoop(onFrameUpdate) {
      const tick = () => {
        requestAnimationFrame(tick);
        if (!this.isVisible) return;

        // Silky 60fps/120fps inertia damping
        this.currentFrameFloat = lerp(this.currentFrameFloat, this.targetFrameFloat, 0.085);
        this.pointer.x = lerp(this.pointer.x, this.pointer.targetX, 0.065);
        this.pointer.y = lerp(this.pointer.y, this.pointer.targetY, 0.065);

        this.applyFramePose(this.currentFrameFloat);
        this.renderer.render(this.scene, this.camera);

        if (typeof onFrameUpdate === 'function') {
          onFrameUpdate(Math.round(this.currentFrameFloat) + 1, this.currentFrameFloat);
        }
      };
      requestAnimationFrame(tick);
    }
  }

  window.Storyboard3DEngine = Storyboard3DEngine;
})();
