/// <reference path='../global.d.ts' />

import { Application, Renderer } from "pixi.js"
import { CameraOrbitControl, LightingEnvironment, ImageBasedLighting, Model, Mesh3D, Light, LightType, ShadowCastingLight, ShadowQuality } from "pixi3d"

let app = new Application({
  backgroundColor: 0xdddddd, resizeTo: window, antialias: true
})
document.body.appendChild(app.view)

let control = new CameraOrbitControl(app.view)

app.loader.add("assets/chromatic/diffuse.cubemap")
app.loader.add("assets/chromatic/specular.cubemap")
app.loader.add("assets/teapot/teapot.gltf")

app.loader.load((_, resources) => {

  let model = app.stage.addChild(
    Model.from(resources["assets/teapot/teapot.gltf"].gltf))
  model.y = -0.8

  let ground = app.stage.addChild(Mesh3D.createPlane())
  ground.y = -0.8
  ground.scale.set(10, 1, 10)

  LightingEnvironment.main.imageBasedLighting = new ImageBasedLighting(
    resources["assets/chromatic/diffuse.cubemap"].cubemap,
    resources["assets/chromatic/specular.cubemap"].cubemap
  )

  let directionalLight = Object.assign(new Light(), {
    intensity: 1,
    type: LightType.directional
  })
  directionalLight.rotationQuaternion.setEulerAngles(25, 120, 0)
  LightingEnvironment.main.lights.push(directionalLight)

  let shadowCastingLight = new ShadowCastingLight(
    <Renderer>app.renderer, directionalLight, { shadowTextureSize: 1024, quality: ShadowQuality.medium })
  shadowCastingLight.softness = 1
  shadowCastingLight.shadowArea = 15

  let pipeline = app.renderer.plugins.pipeline
  pipeline.enableShadows(ground, shadowCastingLight)
  pipeline.enableShadows(model, shadowCastingLight)
})