class Resize {
  static resize(gameSize, baseSize, displaySize, resolution) {
    const width = gameSize.width;
    const height = gameSize.height;

    this.cameras.resize(width, height);
  }
}
