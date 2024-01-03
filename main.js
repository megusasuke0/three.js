import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//setup---------------------------

let scene , camera , renderer ,pointLight, controls;

//❶シーンを追加
scene = new THREE.Scene();
//❷カメラを追加
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//❸レンダラーを追加
renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true,
});
//レンダラーのサイズを設定 ...setSize(画面幅,画面の高さ)
renderer.setSize(window.innerWidth, window.innerHeight)
//どこにレンダラーを挿入するか？
//document.body.appendChild(renderer.domElement);

//テクスチャを追加してみよう
let texture = new THREE.TextureLoader().load("texture02.jpg")

//❶シーンを追加
//①ジオメトリーを作成
//let ballGeometry = new THREE.SphereGeometry(100, 64, 32);
let ballGeometry = new THREE.IcosahedronGeometry( 100,1 );
//②マテリアルを作成
let ballMaterial = new THREE.MeshPhysicalMaterial({
    map: texture,
    wireframe: true,
   });//引数：mapは貼り付け
//③メッシュ化してみよう。ジオメトリー　＋　マテリアル
let ballMesh = new THREE.Mesh(ballGeometry,ballMaterial) ;
//④メッシュ化したものをsceneに追加
scene.add(ballMesh);
  // create wireframe
let wireframe = new THREE.Mesh(
    undefined,
    new THREE.MeshBasicMaterial( { color: 0x009688, wireframe: true } ),
  );
  scene.add( wireframe );

//❷カメラを追加
//⑤カメラの位置を調整
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0, +500);
//camera.position.setZ(30);
//camera.position.setX(-3);

// let ambientLight = new THREE.AmbientLight({color:0xF8EDFF});
// ambientLight.position.set(100,100,100);
// scene.add(ambientLight);


//平行光源を追加
// let directionalLight = new THREE.DirectionalLight(0xffffff,1.5);//((カラー,強さ))
// directionalLight.position.set(5000,5000,5000);//(光源の位置を変更)
// scene.add(directionalLight);

//ポイント光源を追加
pointLight = new THREE.PointLight(0xffffff,1);
pointLight.position.set(-200,-200,-200);//マイナスにすると後ろにいく
scene.add(pointLight);

//ポイント光源を追加
let pointLight02 = new THREE.PointLight(0xffffff,1);
pointLight02.position.set(20000,20000,20000);//マイナスにすると後ろにいく
scene.add(pointLight02);

// スポットライト光源を作成
// new THREE.SpotLight(色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率)
let spotLight = new THREE.SpotLight(0xF8EDFF, 3000000, 5650000, 0.5455, 1, 10000, 1);
spotLight.position.set(5000,5000,5000);
scene.add(spotLight);

let spotLight02 = new THREE.SpotLight(0xF8EDFF, 15000000, 5650000, 0.5455, 1, 10000, 1);
spotLight02.position.set(-4900,-5000,6000);
scene.add(spotLight02);

// const spotLightHelper = new THREE.SpotLightHelper( spotLight );
// scene.add( spotLightHelper );

//ポイント光源がどこにあるのかを特定する
// let pointLightHelper = new THREE.PointLightHelper(pointLight,30);
// scene.add(pointLightHelper);

//マウス操作ができるようにしよう
controls = new OrbitControls(camera, renderer.domElement);

//ポイント光源を球の周りを巡回させよう
//function animate() {
  // pointLight.position.set(
  //   200 * Math.sin(Date.now() / 500),
  //   200 * Math.sin(Date.now() / 1000),
  //   200 * Math.cos(Date.now() / 500),
  // );//Math：数学関数　　Date.now()は現在の時刻を取得
//}

function animate() {
  //❸レンダラーを追加
  //⑥レンダリングしてみよう
    ballMesh.position.set(
    50 * Math.sin(Date.now() / 1000),
    50 * Math.sin(Date.now() / 1000),
    50 * Math.cos(Date.now() / 1000),)
    ballMesh.rotation.x += 0.01;
    ballMesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  renderer.setPixelRatio(window.devicePixelRatio);
  requestAnimationFrame(animate);//requestAnimationFrame：フレーム単位で更新する関数
}
animate();

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

//setupここまで---------------------------