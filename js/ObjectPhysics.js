ObjectPhysics                           = function(_x, _y, _sprite){
    
    Phaser.Sprite.call                  (this, game, _x, _y, _sprite);
    this.enableBody                     = true;
    game.physics.arcade.enable          (this);
    this.game.add.existing              (this);

};
ObjectPhysics.prototype                 = Object.create(Phaser.Sprite.prototype);
ObjectPhysics.prototype.constructor     = ObjectPhysics;