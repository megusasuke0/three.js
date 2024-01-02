import './style.css'
import * as THREE from 'three';

//setup---------------------------

let scene , camera , renderer;

//❶シーンを追加
scene = new THREE.Scene();
//❷カメラを追加
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//❸レンダラーを追加 
renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
//レンダラーのサイズを設定 ...setSize(画面幅,画面の高さ)
renderer.setSize(window.innerWidth, window.innerHeight)
//どこにレンダラーを挿入するか？
//document.body.appendChild(renderer.domElement);

//①ジオメトリーを作成
let ballGeometry = new THREE.SphereGeometry(100, 64, 32);
//②マテリアルを作成
let ballMaterial = new THREE.MeshPhysicalMaterial();
//③メッシュ化してみよう。ジオメトリー　＋　マテリアル
let ballMesh = new THREE.Mesh(ballGeometry,ballMaterial) ;
//④メッシュ化したものをsceneに追加
scene.add(ballMesh);

//⑤カメラの位置を調整
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

//⑥レンダリングしてみよう
renderer.render(scene, camera);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

//setupここまで---------------------------