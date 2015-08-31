var statePlay = {

    create:                         function(){

        game.physics.arcade.gravity.y       = 1200;

        this.systemCollisionGroup           = new SystemCollisionGroup();

        this.tmMap                          = game.add.tilemap      ('Tilemap1');
        this.tmMap.addTilesetImage          ('ImageTileset1', 'ImageTileset1');
        this.tmMap.setCollisionByExclusion  ([0], true, 'LayerBlock');
        this.layerBackground                = this.tmMap.createLayer('LayerBackground');
        this.layerBlock                     = this.tmMap.createLayer('LayerBlock');

        this.seCoin                         = game.add.audio('SECoin');

        //A function to create coin object in the scene.
        this.ObjectCreateCoin();
        //A function to create bullet object in scene.
        this.ObjectCreateBullet();
        //A function to create player object in the scene.
        this.ObjectCreateCharacters();

    },

    preRender:                      function(){ this.ObjectUpdatePreRenderCharacters(); },

    update:                         function(){

        //A function to handle objects collision within the scene.
        this.CollisionObject();
        //A function to update characters (movement, weapon range).
        this.ObjectUpdateCharacters();
        //A function to update bullet (range control, recycle, spawn).
        this.ObjectUpdateBullet();
        //A function to handle objects overlap within the scene.
        this.OverlapObject();

        this.systemCollisionGroup.Update();

    },

    CollisionObject:                function(){

        game.physics.arcade.collide(this.objectEnemy,       this.layerBlock);
        game.physics.arcade.collide(this.objectPlayer,      this.layerBlock);
        game.physics.arcade.collide(this.objectGroupCoin,   this.layerBlock);

    },

    //A function to get reference from Tiled object layer from custom properties of 'type'.
    //This function is from http://www.gamedevacademy.org/html5-phaser-tutorial-top-down-games-with-tiled/
    FindGameObjectsByType:          function(_layer, _map, _type){

        var findObjects = new Array();
        _map.objects[_layer].forEach(

            function(_element){

                if(_element.properties.type == _type){

                    _element.y -= _map.tileHeight;
                    findObjects.push(_element);

                }

            }

        );
        return findObjects;

    },

    FireBullet:                     function(){

        if (game.time.now > this.bulletNextFire && this.objectGroupBulletPlayer.countDead() > 0){

            this.bulletNextFire                     = game.time.now + this.bulletFireRate;

            var bullet                              = this.objectGroupBulletPlayer.getFirstDead();
            bullet.body.allowGravity                = false;
            bullet.anchor.setTo                     (0.5, 0.5);
            bullet.reset                            (this.objectPlayer.x + 16, this.objectPlayer.y + 16);
            bullet.rotation                         = game.physics.arcade.angleToPointer(this.objectPlayer.behaviorRangeLine.graphicsRangeLine);

            game.physics.arcade.moveToPointer       (bullet, 600);
            this.systemCollisionGroup.AddToGroup    (
                this.systemCollisionGroup.objectGroupBulletFriendly,
                this.systemCollisionGroup.objectGroupBulletFriendlyPrev,
                bullet
            );

        }

    },

    //A function for overlapping player object and coin object.
    PlayerCollectsCoin:             function(_player, _coin){

        //Codes to play sound.
        this.seCoin.play();
        //Codes to delete corresponding overlapping coin.
        _coin.destroy   (true);

    },

    ObjectCreateBullet:             function(){

        //this.bulletButtonPressed is a variable to control mouse button 'justPressed'.
        //As far as I know, there is no 'justPressed' boolean built inside Phaser.
        this.bulletButtonPressed                        = true;
        this.bulletFireRate                             = 100;
        this.bulletNextFire                             = 0;
        this.objectGroupBulletPlayer                    = game.add.group();
        this.objectGroupBulletPlayer.createMultiple     (50, 'ImageBullet');
        this.objectGroupBulletPlayer.setAll             ('checkWorldBounds', true);
        this.objectGroupBulletPlayer.setAll             ('outOfBoundsKill', true);
        this.objectGroupBulletPlayer.enableBody         = true;
        game.physics.arcade.enable                      (this.objectGroupBulletPlayer);

    },
    ObjectUpdateBullet:             function(){

        if(game.input.activePointer.leftButton.isDown && this.bulletButtonPressed){
            this.FireBullet();
            this.bulletButtonPressed = false;
        }
        else if(!game.input.activePointer.leftButton.isDown){
            this.bulletButtonPressed = true;
        }

        var playerX             = this.objectPlayer.x + 16;
        var playerY             = this.objectPlayer.y + 16;

        var removeThisBullet;

        this.objectGroupBulletPlayer.forEachExists(
            function(_bullet){

                var distance                        = Math.sqrt(Math.pow((playerX - _bullet.x), 2) + Math.pow((playerY - _bullet.y), 2));
                if(distance >= 100)                 {

                    removeThisBullet                = _bullet;
                    _bullet.kill();

                }

            }
        );

        this.systemCollisionGroup.RemoveFromGroup   (
            this.systemCollisionGroup.objectGroupBulletFriendly,
            this.systemCollisionGroup.objectGroupBulletFriendlyPrev,
            removeThisBullet
        );

    },

    ObjectCreateCoin:               function(){

        var findObjectsCoin                 = this.FindGameObjectsByType('LayerObject', this.tmMap, 'coin');
        this.objectGroupCoin                = game.add.group();
        this.objectArrayCoin                = new Array(findObjectsCoin.length);

        for(var i = 0; i < findObjectsCoin.length; i ++){

            this.objectArrayCoin[i]                 = new ObjectCoin(findObjectsCoin[i].x, findObjectsCoin[i].y);
            this.objectGroupCoin.add                (this.objectArrayCoin[i]);

        }

    },

    ObjectCreateCharacters:        function(){

        var findObjectEnemy                                 = this.FindGameObjectsByType('LayerObject',     this.tmMap,                 'enemy');
        this.objectEnemy                                    = new ObjectCharacter(findObjectEnemy[0].x,     findObjectEnemy[0].y,       'ImageEnemy');
        this.objectEnemy.behaviorRangeLineRadian.active     = true;

        var findObjectsPlayer                               = this.FindGameObjectsByType('LayerObject',     this.tmMap,                 'player');
        this.objectPlayer                                   = new ObjectCharacter(findObjectsPlayer[0].x,   findObjectsPlayer[0].y,     'ImagePlayer');
        this.objectPlayer.behaviorControlKeyboard.active    = true;
        this.objectPlayer.behaviorRangeLineRadian.active    = true;

    },
    ObjectUpdateCharacters:         function(){

        this.objectEnemy.Update();
        this.objectEnemy.behaviorRangeLineRadian    = game.physics.arcade.angleToXY       (this.objectEnemy.behaviorRangeLine.graphicsRangeLine, this.objectPlayer.x, this.objectPlayer.y     );

        this.objectPlayer.Update();
        this.objectPlayer.behaviorRangeLineRadian   = game.physics.arcade.angleToPointer  (this.objectPlayer.behaviorRangeLine.graphicsRangeLine                                              );

    },
    ObjectUpdatePreRenderCharacters:function(){

        this.objectEnemy.   UpdatePreRender();
        this.objectPlayer.  UpdatePreRender();

    },

    OverlapObject:                  function(){

        game.physics.arcade.overlap(this.objectPlayer, this.objectGroupCoin, this.PlayerCollectsCoin, null, this);

    }

};