ObjectPlayer                            = function (_game, _x, _y, _sprite) {

    this.game                           = _game;

    Phaser.Sprite.call                  (this, this.game, _x, _y, _sprite);

    this.speed                          = 200;
    this.speedJump                      = -500;

    this.enableBody                     = true;
    
    this.game.physics.arcade.enable     (this);
    this.game.add.existing              (this);

};
ObjectPlayer.prototype              = Object.create(Phaser.Sprite.prototype);
ObjectPlayer.prototype.constructor  = ObjectPlayer;
ObjectPlayer.prototype.Update       = function(){

    if      (this.game.input.keyboard.isDown(Phaser.Keyboard.A))    { this.body.velocity.x = this.speed*-1; }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))    { this.body.velocity.x = this.speed; }
    else                                                            { this.body.velocity.x = 0; }

    if(

        this.game.input.keyboard.isDown(Phaser.Keyboard.W) &&
        this.body.onFloor()

    ){ this.body.velocity.y = this.speedJump; }

};