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
/*
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
*/

/*
ObjectPlayer                        = function(_game, _x, _y, _sprite){

    Phaser.Sprite.call(_game, _x, _y, _sprite);
    game.add.existing(this);

};
ObjectPlayer.prototype              = Object.create(Phaser.Sprite.prototype);
ObjectPlayer.prototype.constructor  = ObjectPlayer;
ObjectPlayer.prototype.Create       = function(){

    //this.game                       = _game;
    //this.game.add.Sprite            (_spawn.x, _spawn.y, 'ImagePlayer');
    this.speed                      = 200;
    this.speedJump                  = -500;
    this.enabledBody                = true;
    this.game.physics.arcade.enable (this);

};
ObjectPlayer.prototype.update       = function(){

    if      (game.input.keyboard.isDown(Phaser.Keyboard.A)) { this.body.velocity.x = this.speed*-1; }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) { this.body.velocity.x = this.speed; }
    else                                                    { this.body.velocity.x = 0; }

    if(

        game.input.keyboard.isDown(Phaser.Keyboard.W) &&
        this.body.onFloor()

    ){ this.body.velocity.y = this.speedJump; }

};
*/

ObjectPlayer                            = function (_game, _x, _y, _sprite) {

    this.game                           = _game;

    Phaser.Sprite.call                  (this, this.game, _x, _y, _sprite);

    this.speed                          = 200;
    this.speedJump                      = -500;
    this.enabledBody                    = true;
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