ObjectCharacter                             = function(_x, _y, _sprite){

    this.xPos                               = _x;
    this.yPos                               = _y;
    this.sprite                             = _sprite;

    ObjectPhysics.call                      (this, this.xPos, this.yPos, this.sprite);

    this.behaviorArray                      = new Array();
    this.objectRangeLine                    = new ObjectRangeLine(this, 100);
    this.velocityH                          = 200;
    this.velocityV                          = -500;

};
ObjectCharacter.prototype                   = Object.create(ObjectPhysics.prototype);
ObjectCharacter.prototype.constructor       = ObjectCharacter;
ObjectCharacter.prototype.UpdatePreRender   = function(_radian){

    this.objectRangeLine.UpdatePreRender    (_radian);  

};
ObjectCharacter.prototype.Update            = function(){

    for(var i = 0; i < this.behaviorArray.length; i ++){

        if(this.behaviorArray[i].Update()   != null){

            this.behaviorArray[i].Update();

        }

    }

};
ObjectCharacter.prototype.AddBehavior       = function(_behavior){

    this.behaviorArray.push(_behavior);

};
