class Align {
  static scaleToGameW(obj, per, scale) {
    obj.displayWidth = scale.width * per;
    obj.scaleY = obj.scaleX;
  }

  static scaleToGameWHor(obj, per, scale) {
    obj.displayWidth = scale.width * per;
  }

  
  static scaleToGameWVer(obj, per, scale) {
    obj.displayHeight = scale.height * per;
  }

  static scale(obj, scale, proportion) {
    obj.x = scale.width / proportion;
    obj.y = scale.height / proportion;
  }

  static center(obj, scale) {
    obj.x = scale.width / 2;
    obj.y = scale.height / 2;
  }

  static centerX(obj, scale) {
    obj.x = scale.width / 2;
  }

  static centerY(obj, scale) {
    obj.y = scale.height / 2;
  }

  static alignToGameWVer(obj, scale, proportion) {
    obj.y = scale.height / proportion;
  }
}