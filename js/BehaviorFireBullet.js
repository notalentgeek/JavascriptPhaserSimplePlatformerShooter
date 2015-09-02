BehaviorFireBullet 								= function(_bulletFireRate, _bulletSpeed, _sprite, _systemCollisionGroup){

	this.bulletFireRate							= _bulletFireRate;
	this.bulletSpeed							= _bulletSpeed;
	this.systemCollisionGroup					= _systemCollisionGroup;

	this.active 								= false;

	//this.bulletButtonPressed is a variable to control mouse button 'justPressed'.
    //As far as I know, there is no 'justPressed' boolean built inside Phaser.
    this.bulletButtonPressed					= true;
    this.bulletFireRate							= 100;
    this.bulletNextFire							= 0;
    this.objectGroupBullet						= game.add.group();
    this.objectGroupBullet.createMultiple		(50, _sprite);
    this.objectGroupBullet.setAll				('checkWorldBounds', true);
    this.objectGroupBullet.setAll				('outOfBoundsKill', true);
    this.objectGroupBullet.enableBody			= true;
    game.physics.arcade.enable					(this.objectGroupBullet);
	
};
BehaviorFireBullet.prototype.constructor 		= BehaviorFireBullet;
BehaviorFireBullet.prototype.Update 			= function(_objectSource){

	if(this.active){

	    this.objectSource						= _objectSource;

		if(game.input.activePointer.leftButton.isDown && this.bulletButtonPressed){

	        this.FireBullet 					();
	        this.bulletButtonPressed 			= false;

	    }
	    else if(!game.input.activePointer.leftButton.isDown){ this.bulletButtonPressed = true; }

	    this.objectSourceX						= this.objectSource.x + (this.objectSource.width/2);
	    this.objectSourceY						= this.objectSource.y + (this.objectSource.height/2);

	    var objectSourceX 						= this.objectSourceX;
	    var objectSourceY 						= this.objectSourceY;
	    var removeThisBullet;

	    var i = 0;
	    this.objectGroupBullet.forEachExists(
	        function(_bullet){

	            var distance					= Math.sqrt(Math.pow((objectSourceX - _bullet.x), 2) + Math.pow((objectSourceY - _bullet.y), 2));
	            if  (distance >= 100)			{

	                removeThisBullet			= _bullet;
	                _bullet.kill();

	            }

	        }
	    );

	    this.systemCollisionGroup.RemoveFromGroup   (
	        this.systemCollisionGroup.objectGroupBulletFriendly,
	        this.systemCollisionGroup.objectGroupBulletFriendlyPrev,
	        removeThisBullet
	    );

	}

};
BehaviorFireBullet.prototype.FireBullet 		= function(){

	if (game.time.now > this.bulletNextFire && this.objectGroupBullet.countDead() > 0){

        this.bulletNextFire						= game.time.now + this.bulletFireRate;

        var bullet 								= this.objectGroupBullet.getFirstDead();
         	bullet.body.allowGravity			= false;
         	bullet.anchor.setTo					(0.5, 0.5);
         	bullet.reset 						(this.objectSourceX, this.objectSourceY);
         	bullet.rotation 					= game.physics.arcade.angleToPointer(this.objectSource.behaviorRangeLine.graphicsRangeLine);

         var degree 							= -1*bullet.rotation*(180/Math.PI);
             degree 							= (degree < 0) ? (360 - Math.abs(degree)) : degree;

        game.physics.arcade.moveToXY 		(
        	bullet,
        	Math.ceil(this.objectSourceX + Math.cos(bullet.rotation)*this.objectSource.behaviorRangeLine.graphicsRangeLine.width),
        	Math.ceil(this.objectSourceY + Math.sin(bullet.rotation)*this.objectSource.behaviorRangeLine.graphicsRangeLine.width),
        	this.bulletSpeed
        );

        this.systemCollisionGroup.AddToGroup(
            this.systemCollisionGroup.objectGroupBulletFriendly,
            this.systemCollisionGroup.objectGroupBulletFriendlyPrev,
            bullet
        );

    }

};
