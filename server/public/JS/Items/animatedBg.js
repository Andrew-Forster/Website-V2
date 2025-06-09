import * as THREE from "three";

let scene = new THREE.Scene();
let camera = new THREE.Camera();
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = "silk-bg-canvas";
document.body.appendChild(renderer.domElement);

const uniforms = {
  iTime: { value: 0 },
  iResolution: {
    value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1),
  },
  iChannel0: { value: null }, // placeholder, not used
};

const material = new THREE.ShaderMaterial({
  uniforms,
  fragmentShader: `
    uniform float iTime;
    uniform vec3 iResolution;
    uniform sampler2D iChannel0;

    vec2 rotate(vec2 p, float a) {
      return vec2(p.x * cos(a) - p.y * sin(a), p.x * sin(a) + p.y * cos(a));
    }

    float rand(float n) {
      return fract(sin(n) * 43758.5453123);
    }

    vec2 rand2(in vec2 p) {
      return fract(vec2(sin(p.x * 591.32 + p.y * 154.077), cos(p.x * 391.32 + p.y * 49.077)));
    }

    float noise1(float p) {
      float fl = floor(p);
      float fc = fract(p);
      return mix(rand(fl), rand(fl + 1.0), fc);
    }

    float voronoi(in vec2 x) {
      vec2 p = floor(x);
      vec2 f = fract(x);
      vec2 res = vec2(8.0);
      for(int j = -1; j <= 1; j++) {
        for(int i = -1; i <= 1; i++) {
          vec2 b = vec2(i, j);
          vec2 r = b - f + rand2(p + b);
          float d = max(abs(r.x), abs(r.y));
          if(d < res.x) {
            res.y = res.x;
            res.x = d;
          } else if(d < res.y) {
            res.y = d;
          }
        }
      }
      return res.y - res.x;
    }

    void main() {
      vec2 fragCoord = gl_FragCoord.xy;
      float flicker = noise1(iTime * 0.2) * 0.8 + 0.4;
      vec2 uv = fragCoord / iResolution.xy;
      uv = (uv - 0.5) * 2.0;
      vec2 suv = uv;
      uv.x *= iResolution.x / iResolution.y;
      uv *= 0.6 + sin(iTime * 0.005) * 0.3;
      uv = rotate(uv, sin(iTime * 0.05) * 1.0);
      uv += iTime * 0.2;

      float v = 0.0;
      float a = 0.6, f = 1.0;
      for(int i = 0; i < 3; i++) {
        float v1 = voronoi(uv * f + 5.0);
        float v2 = 0.0;
        if(i > 0) {
          v2 = voronoi(uv * f * 0.5 + 50.0 + iTime);
          float va = 1.0 - smoothstep(0.0, 0.1, v1);
          float vb = 1.0 - smoothstep(0.0, 0.08, v2);
          v += a * pow(va * (0.5 + vb), 2.0);
        }
        v1 = 1.0 - smoothstep(0.0, 0.3, v1);
        v2 = a * noise1(v1 * 5.5 + 0.1);
        if(i == 0)
          v += v2 * flicker;
        else
          v += v2;
        f *= 3.0;
        a *= 0.7;
      }

      v *= exp(-0.6 * length(suv)) * 1.2;

      vec3 cexp = vec3(6.0, 4.0, 2.0); // fixed color scheme
      vec3 col = vec3(pow(v, cexp.x), pow(v, cexp.y), pow(v, cexp.z)) * 2.0;

      gl_FragColor = vec4(col * 0.5, 0.5);

    }
  `,
});

let mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
scene.add(mesh);

function animate(time) {
  uniforms.iTime.value = time * 0.001;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  uniforms.iResolution.value.set(window.innerWidth, window.innerHeight, 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
});
