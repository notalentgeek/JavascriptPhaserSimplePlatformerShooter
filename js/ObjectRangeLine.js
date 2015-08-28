ObjectRangeLine                             = function(_objectFollow, _rangeLineLength){

    this.objectFollow                       = _objectFollow
    this.rangeLineLength                    = _rangeLineLength;

    Phaser.Graphics.call                    (this, game, this.objectFollow.x + (this.objectFollow.width/2), this.objectFollow.y + (this.objectFollow.height/2));

    this.lineStyle                          (1, 0xDF7126, 1);
    this.moveTo                             (0, 0);
    this.lineTo                             (this.rangeLineLength, 0);
    this.game.add.existing                  (this);

};
ObjectRangeLine.prototype                   = Object.create(Phaser.Graphics.prototype);
ObjectRangeLine.prototype.constructor       = ObjectRangeLine;
ObjectRangeLine.prototype.UpdatePreRender   = function(_radian){

    this.rotation                           = _radian;
    this.x                                  = this.objectFollow.x + (this.objectFollow.width/2);
    this.y                                  = this.objectFollow.y + (this.objectFollow.height/2);
    this.width                              = this.rangeLineLength;


};