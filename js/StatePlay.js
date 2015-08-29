var statePlay = {

    create:                         function(){

        game.physics.arcade.gravity.y       = 1200;

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

        if (game.time.now > this.bulletNextFire && this.objectGroupBullet.countDead() > 0){

            this.bulletNextFire         = game.time.now + this.bulletFireRate;

            var bullet                  = this.objectGroupBullet.getFirstDead();
            bullet.body.allowGravity    = false;
            bullet.anchor.setTo         (0.5, 0.5);
            bullet.reset                (this.objectPlayer.x + 16, this.objectPlayer.y + 16);
            bullet.rotation             = game.physics.arcade.angleToPointer(this.objectPlayer.objectRangeLine);

            game.physics.arcade.moveToPointer(bullet, 600);

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
        this.bulletButtonPressed                = true;
        this.bulletFireRate                     = 100;
        this.bulletNextFire                     = 0;
        this.objectGroupBullet                  = game.add.group();
        this.objectGroupBullet.createMultiple   (50, 'ImageBullet');
        this.objectGroupBullet.setAll           ('checkWorldBounds', true);
        this.objectGroupBullet.setAll           ('outOfBoundsKill', true);
        game.physics.arcade.enable              (this.objectGroupBullet);
        this.objectGroupBullet.enableBody       = true;

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

        this.objectGroupBullet.forEachExists(
            function(_bullet){

                var distance            = Math.sqrt(Math.pow((playerX - _bullet.x), 2) + Math.pow((playerY - _bullet.y), 2));
                if(distance >= 100)     { _bullet.kill(); }

            }
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

        var findObjectEnemy                     = this.FindGameObjectsByType('LayerObject',     this.tmMap,                 'enemy');
        var findObjectsPlayer                   = this.FindGameObjectsByType('LayerObject',     this.tmMap,                 'player');
        this.objectEnemy                        = new ObjectCharacter(findObjectEnemy[0].x,     findObjectEnemy[0].y,       'ImageEnemy');
        this.objectPlayer                       = new ObjectCharacter(findObjectsPlayer[0].x,   findObjectsPlayer[0].y,     'ImagePlayer');

        this.behaviorControlKeyboardPlayer       = new BehaviorControlKeyboard(
            this.objectPlayer,
            this.objectPlayer.velocityH,
            this.objectPlayer.velocityV
        );
        this.objectPlayer.AddBehavior(this.behaviorControlKeyboardPlayer);

    },
    ObjectUpdateCharacters:         function(){

        this.objectEnemy.   Update();
        this.objectPlayer.  Update();

    },
    ObjectUpdatePreRenderCharacters:function(){

        this.objectEnemy.   UpdatePreRender(game.physics.arcade.angleToXY       (this.objectEnemy.objectRangeLine, this.objectPlayer.x, this.objectPlayer.y     ));
        this.objectPlayer.  UpdatePreRender(game.physics.arcade.angleToPointer  (this.objectPlayer.objectRangeLine                                              ));

    },

    OverlapObject:                  function(){

        game.physics.arcade.overlap(this.objectPlayer, this.objectGroupCoin, this.PlayerCollectsCoin, null, this);

    }

};