ObjectCoin                          = function(_game, _x, _y, _sprite){

    this.game = _game;

    Phaser.Sprite.call(this, this.game, _x, _y, _sprite);

    this.enableBody                     = true;

    this.game.physics.arcade.enable     (this);
    this.body.immovable                 = true;
    this.body.moves                     = false;
    
    this.game.add.existing              (this);

};
ObjectCoin.prototype                = Object.create(Phaser.Sprite.prototype);
ObjectCoin.prototype.constructor    = ObjectCoin;