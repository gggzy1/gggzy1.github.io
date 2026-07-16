import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js";

(function () {
  const root = document.getElementById("cone-explorer");
  if (!root) return;

  const viewport = root.querySelector("#cone-viewport");
  const caption = root.querySelector("#cone-caption");
  const tabs = root.querySelectorAll("[data-cone-tab]");
  const scaleSlider = root.querySelector("#cone-scale");
  const scaleVal = root.querySelector("#cone-scale-val");
  const scaleRow = root.querySelector("#cone-scale-row");
  if (!viewport) return;

  let mode = "compare";
  let scale = 1.4;

  const TEAL = 0x2a9d8f;
  const CORAL = 0xc45c26;
  const BLUE = 0x2563eb;
  const INK = 0x2c3338;

  const copy = {
    en: {
      compare:
        "Drag to rotate. Scale a point inside each set: the ice-cream cone stays closed under α > 0; the cylinder does not.",
      tangent:
        "Drag to rotate. At boundary point x* on the ball, feasible directions form a half-space cone; the blue arrow is a descent direction.",
      recession:
        "Drag to rotate. An infinite cylinder = compact disk base + recession cone along ±z (the teal axis).",
    },
    zh: {
      compare:
        "拖动旋转。把集合内一点做正缩放：冰淇淋锥在 α>0 下封闭；圆柱则否。",
      tangent:
        "拖动旋转。球边界点 x* 处，可行方向是半空间锥；蓝色箭头是一个下降方向。",
      recession:
        "拖动旋转。无穷圆柱 = 紧致圆盘底面 + 沿 ±z 的回收锥（青色轴）。",
    },
  };

  function pageLang() {
    const page = document.querySelector(".note-page[data-bilingual]");
    return page && page.dataset.lang === "zh" ? "zh" : "en";
  }

  function updateCaption() {
    caption.textContent = copy[pageLang()][mode];
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0xfbfcfd, 1);
  viewport.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(4.2, 2.8, 5.2);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 3;
  controls.maxDistance = 14;
  controls.target.set(0, 0.6, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 0.85);
  key.position.set(4, 8, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xffffff, 0.25);
  fill.position.set(-3, 2, -2);
  scene.add(fill);

  const content = new THREE.Group();
  scene.add(content);

  // persistent refs for scale mode
  let pointP = null;
  let pointAlpha = null;
  let linkLine = null;
  let cylPointP = null;
  let cylPointAlpha = null;
  let cylLink = null;

  function clearContent() {
    const kids = content.children.slice();
    kids.forEach(function (obj) {
      content.remove(obj);
      obj.traverse(function (child) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(function (m) {
              m.dispose();
            });
          } else {
            child.material.dispose();
          }
        }
      });
    });
    pointP = pointAlpha = linkLine = null;
    cylPointP = cylPointAlpha = cylLink = null;
  }

  function axesHelper(size) {
    const g = new THREE.Group();
    const mat = new THREE.LineBasicMaterial({ color: 0xc5cad1 });
    const pts = [
      [-size, 0, 0], [size, 0, 0],
      [0, 0, 0], [0, size, 0],
      [0, 0, -size], [0, 0, size],
    ];
    for (let i = 0; i < pts.length; i += 2) {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3().fromArray(pts[i]),
        new THREE.Vector3().fromArray(pts[i + 1]),
      ]);
      g.add(new THREE.Line(geo, mat));
    }
    return g;
  }

  function makeArrow(dir, origin, length, color, radius) {
    const group = new THREE.Group();
    const d = dir.clone().normalize();
    const shaftLen = length * 0.78;
    const headLen = length - shaftLen;
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, shaftLen, 12),
      new THREE.MeshStandardMaterial({ color: color, roughness: 0.45, metalness: 0.05 })
    );
    shaft.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
    shaft.position.copy(origin).addScaledVector(d, shaftLen / 2);
    group.add(shaft);
    const head = new THREE.Mesh(
      new THREE.ConeGeometry(radius * 2.4, headLen, 16),
      new THREE.MeshStandardMaterial({ color: color, roughness: 0.4, metalness: 0.05 })
    );
    head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d);
    head.position.copy(origin).addScaledVector(d, shaftLen + headLen / 2);
    group.add(head);
    return group;
  }

  function iceCreamCone() {
    // Second-order cone: radius grows with height, apex at origin, opens along +y
    const group = new THREE.Group();
    const height = 2.4;
    const radius = 1.15;
    const geo = new THREE.ConeGeometry(radius, height, 48, 1, true);
    const mat = new THREE.MeshStandardMaterial({
      color: TEAL,
      transparent: true,
      opacity: 0.38,
      side: THREE.DoubleSide,
      roughness: 0.35,
      metalness: 0.05,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    // ConeGeometry apex at +y/2 by default with base at -y/2; flip so apex at origin
    mesh.rotation.x = Math.PI;
    mesh.position.y = height / 2;
    group.add(mesh);
    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(geo),
      new THREE.LineBasicMaterial({ color: TEAL, transparent: true, opacity: 0.35 })
    );
    wire.rotation.x = Math.PI;
    wire.position.y = height / 2;
    group.add(wire);
    return group;
  }

  function cylinderMesh(radius, height, color, opacity) {
    const geo = new THREE.CylinderGeometry(radius, radius, height, 48, 1, true);
    const mat = new THREE.MeshStandardMaterial({
      color: color,
      transparent: true,
      opacity: opacity,
      side: THREE.DoubleSide,
      roughness: 0.4,
      metalness: 0.05,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geo, mat);
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.CylinderGeometry(radius, radius, height, 24)),
      new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.55 })
    );
    const g = new THREE.Group();
    g.add(mesh);
    g.add(edges);
    return g;
  }

  function sphereAt(pos, color, r) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(r || 0.08, 20, 20),
      new THREE.MeshStandardMaterial({ color: color, roughness: 0.35, metalness: 0.1 })
    );
    m.position.copy(pos);
    return m;
  }

  function link(a, b, color) {
    const geo = new THREE.BufferGeometry().setFromPoints([a.clone(), b.clone()]);
    return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: color, linewidth: 2 }));
  }

  // Point on ice-cream cone interior: direction with angle < opening
  const coneDir = new THREE.Vector3(0.35, 1, 0.15).normalize();
  const coneP0 = coneDir.clone().multiplyScalar(0.95);

  // Point inside cylinder (offset from axis)
  const cylP0 = new THREE.Vector3(0.35, 0.55, 0.2);

  function buildCompare() {
    clearContent();
    controls.target.set(0, 0.9, 0);
    camera.position.set(5.2, 3.2, 5.8);

    const left = new THREE.Group();
    left.position.x = -1.7;
    left.add(axesHelper(1.6));
    left.add(iceCreamCone());
    pointP = sphereAt(coneP0, TEAL, 0.09);
    pointAlpha = sphereAt(coneP0.clone().multiplyScalar(scale), TEAL, 0.09);
    linkLine = link(coneP0, coneP0.clone().multiplyScalar(scale), TEAL);
    left.add(pointP);
    left.add(pointAlpha);
    left.add(linkLine);
    content.add(left);

    const right = new THREE.Group();
    right.position.x = 1.7;
    right.add(axesHelper(1.6));
    const cyl = cylinderMesh(0.7, 2.8, CORAL, 0.32);
    cyl.position.y = 1.2;
    right.add(cyl);
    // closed bottom disk for visual base
    const disk = new THREE.Mesh(
      new THREE.CircleGeometry(0.7, 48),
      new THREE.MeshStandardMaterial({
        color: CORAL,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide,
        roughness: 0.5,
      })
    );
    disk.rotation.x = -Math.PI / 2;
    disk.position.y = 1.2 - 1.4;
    right.add(disk);

    cylPointP = sphereAt(cylP0, CORAL, 0.09);
    cylPointAlpha = sphereAt(cylP0.clone().multiplyScalar(scale), 0xcf222e, 0.09);
    cylLink = link(cylP0, cylP0.clone().multiplyScalar(scale), CORAL);
    right.add(cylPointP);
    right.add(cylPointAlpha);
    right.add(cylLink);
    content.add(right);

    applyScale();
  }

  function applyScale() {
    if (!pointP) return;
    const q = coneP0.clone().multiplyScalar(scale);
    pointAlpha.position.copy(q);
    linkLine.geometry.setFromPoints([coneP0, q]);

    const cq = cylP0.clone().multiplyScalar(scale);
    cylPointAlpha.position.copy(cq);
    // outside cylinder if radial > 0.7
    const radial = Math.hypot(cq.x, cq.z);
    cylPointAlpha.material.color.setHex(radial <= 0.7 ? CORAL : 0xcf222e);
    cylLink.geometry.setFromPoints([cylP0, cq]);
    cylLink.material.color.setHex(radial <= 0.7 ? CORAL : 0xcf222e);
  }

  function buildTangent() {
    clearContent();
    controls.target.set(0.4, 0.2, 0);
    camera.position.set(4.5, 2.4, 4.2);

    content.add(axesHelper(1.8));

    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 48),
      new THREE.MeshStandardMaterial({
        color: TEAL,
        transparent: true,
        opacity: 0.28,
        roughness: 0.35,
        metalness: 0.05,
        depthWrite: false,
      })
    );
    content.add(ball);
    content.add(
      new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.SphereGeometry(1, 20, 12)),
        new THREE.LineBasicMaterial({ color: TEAL, transparent: true, opacity: 0.2 })
      )
    );

    const xStar = new THREE.Vector3(1, 0, 0);
    content.add(sphereAt(xStar, INK, 0.1));

    // Tangent half-space: large disk through x*, normal = +x
    const plane = new THREE.Mesh(
      new THREE.CircleGeometry(2.2, 64),
      new THREE.MeshStandardMaterial({
        color: TEAL,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
        roughness: 0.5,
        depthWrite: false,
      })
    );
    plane.position.copy(xStar);
    plane.lookAt(xStar.clone().add(new THREE.Vector3(1, 0, 0)));
    content.add(plane);

    // hemisphere of tangent directions (inward half) for conical look
    const hemi = new THREE.Mesh(
      new THREE.SphereGeometry(1.35, 32, 16, 0, Math.PI, 0, Math.PI),
      new THREE.MeshStandardMaterial({
        color: TEAL,
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    );
    hemi.position.copy(xStar);
    hemi.rotation.z = Math.PI / 2;
    content.add(hemi);

    content.add(makeArrow(new THREE.Vector3(1, 0, 0), xStar, 1.1, CORAL, 0.035));
    content.add(makeArrow(new THREE.Vector3(-0.75, 0.45, 0.2), xStar, 1.25, BLUE, 0.035));
  }

  function buildRecession() {
    clearContent();
    controls.target.set(0, 0.2, 0);
    camera.position.set(4.8, 2.6, 4.6);

    content.add(axesHelper(2));

    const cyl = cylinderMesh(0.85, 3.6, CORAL, 0.3);
    content.add(cyl);

    const base = new THREE.Mesh(
      new THREE.CircleGeometry(0.85, 48),
      new THREE.MeshStandardMaterial({
        color: INK,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
        roughness: 0.45,
      })
    );
    base.rotation.x = -Math.PI / 2;
    base.position.y = 0;
    content.add(base);

    // recession cone = line along ±y (cylinder axis)
    content.add(makeArrow(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0.15, 0), 1.9, TEAL, 0.04));
    content.add(makeArrow(new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, -0.15, 0), 1.9, TEAL, 0.04));

    // thin axis line
    const axisGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -2.1, 0),
      new THREE.Vector3(0, 2.1, 0),
    ]);
    content.add(new THREE.Line(axisGeo, new THREE.LineBasicMaterial({ color: TEAL, transparent: true, opacity: 0.7 })));
  }

  function setMode(next) {
    mode = next;
    tabs.forEach(function (btn) {
      const on = btn.dataset.coneTab === mode;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
    scaleRow.style.display = mode === "compare" ? "flex" : "none";
    if (mode === "compare") buildCompare();
    else if (mode === "tangent") buildTangent();
    else buildRecession();
    updateCaption();
  }

  function resize() {
    const w = viewport.clientWidth || 640;
    const h = Math.max(360, Math.round(w * 0.58));
    viewport.style.height = h + "px";
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }

  tabs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setMode(btn.dataset.coneTab);
    });
  });

  if (scaleSlider) {
    scaleSlider.addEventListener("input", function () {
      scale = parseFloat(scaleSlider.value);
      if (scaleVal) scaleVal.textContent = scale.toFixed(1);
      if (mode === "compare") applyScale();
    });
  }

  const page = document.querySelector(".note-page[data-bilingual]");
  if (page) {
    new MutationObserver(updateCaption).observe(page, {
      attributes: true,
      attributeFilter: ["data-lang"],
    });
  }

  window.addEventListener("resize", resize);

  setMode("compare");
  resize();

  (function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  })();
})();
