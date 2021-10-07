class Car2 extends Car {
  public getDescription(): string {
    return `${super.getDescription()} 第二代強化版`;
  }

  public triggerBrakes(): string {
    return `${super.triggerBrakes()} 的無敵改良版`;
  }
}