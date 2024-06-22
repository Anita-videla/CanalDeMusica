// Escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight,1,50);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Añadir luces
const ambientLight = new THREE.AmbientLight(0x709040, 2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Cargar fuente y crear el texto
const loader = new THREE.FontLoader();
let textMesh;

loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new THREE.TextGeometry('SoundMAP', {
        font: font,
        size: 5, // Tamaño reducido a la mitad
        height: 0.1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.01,
        bevelSegments: 5
    });

    textGeometry.computeBoundingBox();
const centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);

const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffa500, specular: 0x555555, shininess: 30 });
textMesh = new THREE.Mesh(textGeometry, textMaterial);
textMesh.position.x = -1; // Centrar el texto en el eje X
textMesh.position.y = 0; // Centrar el texto en el eje Y
textMesh.position.z = centerOffset; // Mantener el texto en el eje Z
scene.add(textMesh);


animate();
}, undefined, function (error) {
console.error(error);
});

camera.position.z = 5; // Ajustar la posición de la cámara

// Animar el texto
const animate = function () {
requestAnimationFrame(animate);

if (textMesh) {
    textMesh.rotation.y += 0.01;
    textMesh.material.color.setHSL((Date.now() % 10000) / 10000, 1, 0.5);
}

renderer.render(scene, camera);
};

// Ajustar tamaño del canvas al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
renderer.setSize(window.innerWidth, window.innerHeight);
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
});