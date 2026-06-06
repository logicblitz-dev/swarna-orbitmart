import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroGlobe() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const w = el.clientWidth;
    const h = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    el.appendChild(renderer.domElement);

    const geo = new THREE.IcosahedronGeometry(1.2, 2);
    const wire = new THREE.WireframeGeometry(geo);
    const mat = new THREE.LineBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.7 });
    const sphere = new THREE.LineSegments(wire, mat);
    scene.add(sphere);

    const glowGeo = new THREE.IcosahedronGeometry(1.25, 1);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x9d00ff, wireframe: true, transparent: true, opacity: 0.15 });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glow);

    let raf = 0;
    const tick = () => {
      sphere.rotation.y += 0.0025;
      sphere.rotation.x += 0.0008;
      glow.rotation.y -= 0.0015;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      if (!el) return;
      const nw = el.clientWidth, nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose(); wire.dispose(); mat.dispose();
      glowGeo.dispose(); glowMat.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="absolute inset-0 pointer-events-none" />;
}
