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
        //A function to create player object in the scene.
        this.ObjectCreateCharacters();

    },

    preRender:                      function(){ this.ObjectUpdatePreRenderCharacters(); },

    update:                         function(){

        //A function to handle objects collision within the scene.
        this.CollisionObject();
        //A function to update characters (movement, weapon range).
        this.ObjectUpdateCharacters();
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

    //A function for overlapping player object and coin object.
    PlayerCollectsCoin:             function(_player, _coin){

        //Codes to play sound.
        this.seCoin.play();
        //Codes to delete corresponding overlapping coin.
        _coin.destroy   (true);

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
        this.objectEnemy                                    = new ObjectCharacter(findObjectEnemy[0].x,     findObjectEnemy[0].y,       'ImageEnemy', this.systemCollisionGroup);
        this.objectEnemy.behaviorRangeLineRadian    .active = true;

        var findObjectsPlayer                               = this.FindGameObjectsByType('LayerObject',     this.tmMap,                 'player');
        this.objectPlayer                                   = new ObjectCharacter(findObjectsPlayer[0].x,   findObjectsPlayer[0].y,     'ImagePlayer', this.systemCollisionGroup);
        this.objectPlayer.behaviorControlKeyboard   .active = true;
        this.objectPlayer.behaviorFireBullet        .active = true;
        this.objectPlayer.behaviorRangeLineRadian   .active = true;

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