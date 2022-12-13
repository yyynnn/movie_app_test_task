// ----------------------------------------------------
// This code is based on the following repository.
// https://github.com/edankwan/The-Spirit/blob/master/src/index.js#L251
// ----------------------------------------------------

import * as THREE from 'three'

export class Mouse3D {
  private _ray = new THREE.Ray()
  private _mouse = new THREE.Vector2(0, 0)

  constructor(private _camera: THREE.Camera) {
    document.addEventListener('mousemove', this._handleMouseMove)
  }

  get position() {
    this._camera.updateMatrixWorld()
    this._ray.origin.setFromMatrixPosition(this._camera.matrixWorld)
    this._ray.direction
      .set(this._mouse.x, this._mouse.y, 0.5)
      .unproject(this._camera)
      .sub(this._ray.origin)
      .normalize()
    const distance =
      this._ray.origin.length() / Math.cos(Math.PI - this._ray.direction.angleTo(this._ray.origin))
    this._ray.origin.add(this._ray.direction.multiplyScalar(distance * 1.0))

    return this._ray.origin
  }

  private _handleMouseMove = (e: MouseEvent) => {
    this._mouse.x = (e.pageX / window.innerWidth) * 2 - 1
    this._mouse.y = -(e.pageY / window.innerHeight) * 2 + 1
  }

  dispose = () => {
    document.removeEventListener('mousemove', this._handleMouseMove)
  }
}
