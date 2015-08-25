ObjectCoin                              = function(_x, _y){

    ObjectPhysics.call                  (_x, _y, 'ImageCoin');

};
ObjectCoin.prototype                = Object.create(ObjectPhysics.prototype);
ObjectCoin.prototype.constructor    = ObjectCoin;