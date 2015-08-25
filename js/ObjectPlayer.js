ObjectPlayer                            = function(_x, _y){

    ObjectPhysics.call                  (this, _x, _y, 'ImagePlayer');

    this.speed                          = 200;
    this.speedJump                      = -500;

};
ObjectPlayer.prototype              = Object.create(ObjectPhysics.prototype);
ObjectPlayer.prototype.constructor  = ObjectPlayer;
ObjectPlayer.prototype.Update       = function(){

    if      (game.input.keyboard.isDown(Phaser.Keyboard.A))     { this.body.velocity.x = this.speed*-1; }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))     { this.body.velocity.x = this.speed; }
    else                                                        { this.body.velocity.x = 0; }

    if(

        game.input.keyboard.isDown(Phaser.Keyboard.W) &&
        this.body.onFloor()

    ){ this.body.velocity.y = this.speedJump; }

};