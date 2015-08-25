/*
function Player(_game, _spawn){
    this.game                       = _game;
    this.game.add.Sprite            (_spawn.x, _spawn.y, 'ImagePlayer');
    this.speed                      = 200;
    this.speedJump                  = -500;
    this.enabledBody                = true;
    this.game.physics.arcade.enable (this);
}

Player.prototype                = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor    = Player;

Player.prototype.update = function(){

    if      (game.input.keyboard.isDown(Phaser.Keyboard.A)) { this.body.velocity.x = this.speed*-1; }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) { this.body.velocity.x = this.speed; }
    else                                                    { this.body.velocity.x = 0; }

    if(

        game.input.keyboard.isDown(Phaser.Keyboard.W) &&
        this.body.onFloor()

    ){ this.body.velocity.y = this.speedJump; }

};
*/

var objectPlayer = 
    {

        speed                      : 200,
        speedJump                  : -500,
        enabledBody                : true,
        
    },
    Create: function(_x, _y){

        game.add.Sprite            (_x, _y, 'ImagePlayer');
        game.physics.arcade.enable (this);

    },
    Update: function(){

        if      (game.input.keyboard.isDown(Phaser.Keyboard.A)) { this.body.velocity.x = this.speed*-1; }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) { this.body.velocity.x = this.speed; }
        else                                                    { this.body.velocity.x = 0; }

        if(

            game.input.keyboard.isDown(Phaser.Keyboard.W) &&
            this.body.onFloor()

        ){ this.body.velocity.y = this.speedJump; }

    };
