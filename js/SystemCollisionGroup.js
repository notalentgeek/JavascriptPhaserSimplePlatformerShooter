SystemCollisionGroup                        = function(){

    this.objectGroupBullet                  = new Array();
    this.objectGroupBulletPrev              = this.objectGroupBullet;
        this.objectGroupBulletFriendly      = new Array();
        this.objectGroupBUlletFriendlyPrev  = this.objectGroupBulletFriendly;
        this.objectGroupBulletHostile       = new Array();
        this.objectGroypBulletHostilePrev   = this.objectGroupBulletHostile;

};
SystemCollisionGroup.prototype.constructor      = SystemCollisionGroup;
SystemCollisionGroup.prototype.AddToGroup       = function(_group, _groupPrev, _element){

    _groupPrev   = _group;
    _group.push (_element);

};
SystemCollisionGroup.prototype.CheckIntegrity   = function(_group, _groupPrev, _groupParent){

    if(_group != _groupPrev){

        _groupParent.length = 0;
        this.AddToGroup(
            _group,
            _groupPrev,
            _groupParent
        );
        _groupPrev = _group;

    }

};
SystemCollisionGroup.prototype.RemoveFromGroup  = function(_group, _groupPrev, _element){

    _groupPrev = _group;
    if(_group.indexOf(_element) >= 0){ _group.splice(_group.indexOf(_element), 1); }

};
SystemCollisionGroup.prototype.Update           = function(){

    this.CheckIntegrity(
        this.objectGroupBullet,
        this.objectGroupBulletPrev,
        this.objectGroupBulletFriendly
    );

};