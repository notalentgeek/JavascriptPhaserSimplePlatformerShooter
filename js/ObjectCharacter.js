ObjectCharacter                             = function(_x, _y, _sprite){

    this.xPos                               = _x;
    this.yPos                               = _y;
    this.sprite                             = _sprite;

    ObjectPhysics.call                      (this, this.xPos, this.yPos, this.sprite);

    this.velocityH                          = 200;
    this.velocityV                          = -500;

    this.behaviorControlKeyboard            = new BehaviorControlKeyboard   (this, this.velocityH, this.velocityV);

    this.behaviorRangeLineLength            = 100;
    this.behaviorRangeLineRadian            = 0;
    this.behaviorRangeLine                  = new BehaviorRangeLine         (this, this.behaviorRangeLineLength);

};
ObjectCharacter.prototype                   = Object.create                 (ObjectPhysics.prototype);
ObjectCharacter.prototype.constructor       = ObjectCharacter;
ObjectCharacter.prototype.UpdatePreRender   = function(){

    this.behaviorRangeLine.UpdatePreRender  (this.behaviorRangeLineRadian);  

};
ObjectCharacter.prototype.Update            = function(){

    this.behaviorControlKeyboard.Update     (
        game.input.keyboard.isDown(Phaser.Keyboard.A),
        game.input.keyboard.isDown(Phaser.Keyboard.D),
        game.input.keyboard.isDown(Phaser.Keyboard.S),
        game.input.keyboard.isDown(Phaser.Keyboard.W)
    );

};
