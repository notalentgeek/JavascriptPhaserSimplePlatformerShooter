BehaviorControlKeyboard                         = function(
    _objectTarget,
    _velocityH,
    _velocityV
){

    this.objectTarget       = _objectTarget;
    this.velocityH          = _velocityH;
    this.velocityV          = _velocityV;

};
BehaviorControlKeyboard.prototype.constructor   = BehaviorControlKeyboard;
BehaviorControlKeyboard.prototype.Update        = function(){

    if      (game.input.keyboard.isDown(Phaser.Keyboard.A))     { this.objectTarget.body.velocity.x = this.velocityH*-1; }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))     { this.objectTarget.body.velocity.x = this.velocityH;    }
    else                                                        { this.objectTarget.body.velocity.x = 0;                }

    if(

        game.input.keyboard.isDown(Phaser.Keyboard.W) &&
        this.objectTarget.body.onFloor()

    ){ this.objectTarget.body.velocity.y = this.velocityV; }

};