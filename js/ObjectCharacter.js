ObjectCharacter                             = function(_x, _y, _sprite){

    ObjectPhysics.call                      (this, _x, _y, _sprite);

    this.objectRangeLine                    = new ObjectRangeLine(this, 100);
    this.speed                              = 200;
    this.speedJump                          = -500;

};
ObjectCharacter.prototype                   = Object.create(ObjectPhysics.prototype);
ObjectCharacter.prototype.constructor       = ObjectCharacter;
ObjectCharacter.prototype.UpdatePreRender   = function(_radian){

    this.objectRangeLine.UpdatePreRender    (_radian);  

};
ObjectCharacter.prototype.Update            = function(_isPlayer){

    if(_isPlayer){
        if      (game.input.keyboard.isDown(Phaser.Keyboard.A))     { this.body.velocity.x = this.speed*-1; }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.D))     { this.body.velocity.x = this.speed;    }
        else                                                        { this.body.velocity.x = 0;             }

        if(

            game.input.keyboard.isDown(Phaser.Keyboard.W) &&
            this.body.onFloor()

        ){ this.body.velocity.y = this.speedJump; }
    }

};