ObjectCoin                              = function(_x, _y){

    ObjectPhysics.call                  (this, _x, _y, 'ImageCoin');

    this.body.immovable                 = true;
    this.body.moves                     = false;

};
ObjectCoin.prototype                    = Object.create(ObjectPhysics.prototype);
ObjectCoin.prototype.constructor        = ObjectCoin;