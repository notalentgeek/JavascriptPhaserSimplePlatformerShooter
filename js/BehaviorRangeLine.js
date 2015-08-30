BehaviorRangeLine                           = function(_objectFollow, _rangeLineLength){

    this.objectFollow                       = _objectFollow
    this.rangeLineLength                    = _rangeLineLength;

    this.active                             = false;

    this.graphicsRangeLine                  = game.add.graphics(this.objectFollow.x + (this.objectFollow.width/2), this.objectFollow.y + (this.objectFollow.height/2));
    this.graphicsRangeLine.lineStyle        (1, 0xDF7126, 1);
    this.graphicsRangeLine.moveTo           (0, 0);
    this.graphicsRangeLine.lineTo           (this.rangeLineLength, 0);

};
BehaviorRangeLine.prototype.constructor     = BehaviorRangeLine;
BehaviorRangeLine.prototype.UpdatePreRender = function(_radian){

    this.graphicsRangeLine.alpha            = this.active ? 0 : 1;
    this.graphicsRangeLine.rotation         = _radian;
    this.graphicsRangeLine.x                = this.objectFollow.x + (this.objectFollow.width/2);
    this.graphicsRangeLine.y                = this.objectFollow.y + (this.objectFollow.height/2);
    this.graphicsRangeLine.width            = this.rangeLineLength;

};