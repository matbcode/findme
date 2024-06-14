<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { ShaderMaterial, PlaneGeometry, Mesh } from 'three'

const sceneContainer = ref(null)
let scene, camera, renderer, plane, clock

// Perlin Noise function
const perlinNoise = `
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }
  vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
  }
  vec4 taylorInvSqrt(vec4 r)
  {
    return 1.79284291400159 - 0.85373472095314 * r;
  }
  vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
  }

  // Classic Perlin noise
  float cnoise(vec3 P)
  {
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.y, Pi0.y, Pi1.y, Pi1.y);
    vec4 iz0 = vec4(Pi0.z);
    vec4 iz1 = vec4(Pi1.z);

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000,g000), dot(g010,g010), dot(g100,g100), dot(g110,g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001,g001), dot(g011,g011), dot(g101,g101), dot(g111,g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.y, Pf0.z));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.x, Pf1.y, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.x, Pf0.y, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.y, Pf1.z));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }
`

const vertexShader = `
  uniform float time;
  varying vec2 vUv;
  varying float vHeight;

  ${perlinNoise}

  void main() {
    vUv = uv;
    vec3 pos = position;
    float amplitude = 0.4 + cnoise(vec3(pos.x * 0.3, pos.y * 0.3, time * 0.05)) * 0.75; // Varying amplitude, slower time multiplier
    float noise = cnoise(vec3(pos.x * 0.15, pos.y * 0.15, time * 0.005)); // Adjusted scaling, slower time multiplier
    pos.z += sin(pos.x * 2.0 + time * 0.5) * amplitude * noise; // Slower time multiplier for x
    pos.z += sin(pos.y * 2.0 + time * 0.5) * amplitude * noise; // Slower time multiplier for y
    pos.z += cnoise(vec3(pos.x * 0.5, pos.y * 0.5, time * 0.1)) * 0.25; // Additional noise layer
    vHeight = pos.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform float time;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform vec3 color4;
  uniform vec3 colorLow1;
  uniform vec3 colorLow2;
  uniform vec3 colorHigh;
  varying vec2 vUv;
  varying float vHeight;

  void main() {
    float t = time * 0.2;

    vec3 dynamicColor1 = color1 + vec3(sin(t) * 0.2, cos(t) * 0.2, sin(t * 0.5) * 0.2);
    vec3 dynamicColor2 = color2 + vec3(cos(t * 0.5) * 0.2, sin(t) * 0.2, cos(t) * 0.2);
    vec3 dynamicColor3 = color3 + vec3(sin(t) * 0.2, cos(t * 0.5) * 0.2, sin(t) * 0.2);

    float blendFactor1 = smoothstep(0.0, 0.33, vUv.x);
    float blendFactor2 = smoothstep(0.33, 0.66, vUv.x);
    float blendFactor3 = smoothstep(0.66, 1.0, vUv.x);

    vec3 baseColor;
    if (vUv.x < 0.33) {
      baseColor = mix(dynamicColor1, dynamicColor2, blendFactor1);
    } else if (vUv.x < 0.66) {
      baseColor = mix(dynamicColor2, dynamicColor3, blendFactor2);
    } else {
      baseColor = mix(dynamicColor3, color4, blendFactor3);
    }

    float lowColorBlendFactor = 0.5 + 0.5 * sin(time * 0.5);

    vec3 dynamicLowColor = mix(colorLow1, colorLow2, lowColorBlendFactor);

    vec3 lowHeightColor = mix(baseColor, dynamicLowColor, smoothstep(0.0, 1.0, -vHeight * 0.5));
    vec3 highHeightColor = mix(baseColor, colorHigh, smoothstep(0.0, 1.0, vHeight * 0.5));

    vec3 finalColor = mix(lowHeightColor, highHeightColor, smoothstep(0.0, 1.0, vHeight * 0.5));

    gl_FragColor = vec4(finalColor, 1.0);
  }
`

const init = () => {
    if (!sceneContainer.value) return

    // Scene
    scene = new THREE.Scene()

    // Camera
    const aspect = window.innerWidth / window.innerHeight
    camera = new THREE.PerspectiveCamera(70, aspect, 0.1, 1000)

    // Position the camera at an angle and level it
    camera.position.set(-1.1, 0.7, 1.5)
    camera.up.set(0, 0, 1) // Ensure the camera is upright
    camera.lookAt(0, 0, 0)

    // Renderer
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    sceneContainer.value.appendChild(renderer.domElement)

    // Clock
    clock = new THREE.Clock()

    // Plane geometry with more segments for smoothness
    const geometry = new PlaneGeometry(26, 26, 600, 600)
    const material = new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            time: { value: 0 },
            color1: { value: new THREE.Color('#fff') },
            color2: { value: new THREE.Color('#514dd6') },
            color3: { value: new THREE.Color('#7344c9') },
            color4: { value: new THREE.Color('#c5d9fa') },
            colorLow1: { value: new THREE.Color('#de4e6b') }, // First color for low heights
            colorLow2: { value: new THREE.Color('#34ebc0') }, // Second color for low heights
            colorHigh: { value: new THREE.Color('#fff') }, // Define the color for high heights
        },
    })

    plane = new Mesh(geometry, material)
    scene.add(plane)

    animate()
}

const animate = () => {
    if (!renderer) return // Ensure renderer is still available
    requestAnimationFrame(animate)
    plane.material.uniforms.time.value = clock.getElapsedTime()
    renderer.render(scene, camera)
}

const onWindowResize = () => {
    if (!camera || !renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
    init()
    window.addEventListener('resize', onWindowResize, false)
})

onUnmounted(() => {
    if (renderer && sceneContainer.value) {
        window.removeEventListener('resize', onWindowResize, false)
        sceneContainer.value.removeChild(renderer.domElement)
        renderer.dispose()
    }

    // Properly dispose geometries and materials
    if (plane) {
        plane.geometry.dispose()
        plane.material.dispose()
    }

    // Clean up references
    scene = null
    camera = null
    renderer = null
    plane = null
    clock = null
})
</script>

<template>
    <div ref="sceneContainer" />
</template>
