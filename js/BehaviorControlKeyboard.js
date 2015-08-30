BehaviorControlKeyboard                         = function(
    _objectTarget,
    _velocityH,
    _velocityV
){

    this.objectTarget       = _objectTarget;
    this.velocityH          = _velocityH;
    this.velocityV          = _velocityV;

    this.active             = false;

};
BehaviorControlKeyboard.prototype.constructor   = BehaviorControlKeyboard;
BehaviorControlKeyboard.prototype.Update        = function(_buttonLeft, _buttonRight, _buttonDown, _buttonUp){

    if(this.active){
        if      (_buttonLeft)       { this.objectTarget.body.velocity.x = this.velocityH*-1; }
        else if (_buttonRight)      { this.objectTarget.body.velocity.x = this.velocityH;    }
        else                        { this.objectTarget.body.velocity.x = 0;                }

        if(

            _buttonUp &&
            this.objectTarget.body.onFloor()

        ){ this.objectTarget.body.velocity.y = this.velocityV; }
    }

};