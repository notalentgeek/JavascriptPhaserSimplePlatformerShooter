var statePlay = {

    create                      : function(){

        /*Add down gravity to the state.
        1200 is the most natural gravity point in Phaser of which similar in the real world.*/
        game.physics.arcade.gravity.y       = 1200;

        //Add system collision group object of which handle all grouping and collision.
        this.systemCollisionGroup           = new SystemCollisionGroup();

        //Add tilemap.
        this.tmMap                          = game.add.tilemap('Tilemap1');
        //Assign tileset to the tilemap.
        this.tmMap.addTilesetImage          ('ImageTileset1', 'ImageTileset1');
        /*Set collision tile in block layer.
        setCollisionByExlusion([0], ... means that block layer has all its tileset
            to have collision except index 0 of which no tilset is set (blank, empty).*/
        this.tmMap.setCollisionByExclusion  ([0], true, 'LayerBlock');

        //Add two layers to the state, otherwise it will not shown on map.
        this.layerBackground                = this.tmMap.createLayer('LayerBackground');
        this.layerBlock                     = this.tmMap.createLayer('LayerBlock');

        //Add sound effect for coin.
        this.seCoin                         = game.add.audio('SECoin');

        //Create all coins in the tilemap.
        this.ObjectsCreateCoin              ();
        //Create all characters in the tilemap.
        this.ObjectsCreateCharacter         ();

    },

    preRender                   : function(){

        /*Update enemies and player pre render status.
        This preRender() override function is similar to update physics in Unity.*/
        this.objectEnemy.   UpdatePreRender();
        this.objectPlayer.  UpdatePreRender();

    },

    update                      : function(){

        /*PENDING: Put these two functions into SystemCollisionGroup 'class'.
        A function to handle objects collision within the scene.*/
        this.ObjectsCollision       ();
        //A function to handle objects overlap within the scene.
        this.ObjectsOverlap         ();

        //Update enemies and all of their necessary properties.
        this.objectEnemy.Update     ();
        this.objectEnemy.behaviorRangeLineRadian    = game.physics.arcade.angleToXY       (this.objectEnemy.behaviorRangeLine.graphicsRangeLine, this.objectPlayer.x, this.objectPlayer.y     );
        //Update the player and all of its necessary properties.
        this.objectPlayer.Update    ();
        this.objectPlayer.behaviorRangeLineRadian   = game.physics.arcade.angleToPointer  (this.objectPlayer.behaviorRangeLine.graphicsRangeLine                                              );

        this.systemCollisionGroup.Update();

    },

    //This function is to find object with custom properties 'type' in the tilemap .json.
    FindGameObjectsByType       : function(_layer, _map, _type){

        //An array to store all objects with its type equal _type found in the .json tilemap.
        var findObjects     = new Array();

        //Loop to iterate all objects found within layer _layer.
        _map.objects[_layer].forEach(

            function(_object){

                //If the object's type is the type we desired than put in the array.
                if(_object.properties.type  == _type){

                    _object.y               -= _map.tileHeight;
                    findObjects.push        (_object);

                }

            }

        );

        //Return the array so that in the end the array will be all objects with the desired type.
        return findObjects;

    },

    //A function to create all characters in this state.
    ObjectsCreateCharacter      : function(){

        /*Find all characters and then activate which behavior you like to use.
        PENDING: Maybe in the future put all creation things in to a Loop,
            so that in case in the tilemap there is more than object, the latter object
            will still be processed.
        PENDING: Error in this.objectEnemy.behaviorFireBullet*/
        var findObjectEnemy                                 = this.FindGameObjectsByType('LayerObject',     this.tmMap,                 'enemy');
        this.objectEnemy                                    = new ObjectCharacter(findObjectEnemy[0].x,     findObjectEnemy[0].y,       'ImageEnemy', this.systemCollisionGroup);
        this.objectEnemy.behaviorRangeLineRadian    .active = true;
        var findObjectsPlayer                               = this.FindGameObjectsByType('LayerObject',     this.tmMap,                 'player');
        this.objectPlayer                                   = new ObjectCharacter(findObjectsPlayer[0].x,   findObjectsPlayer[0].y,     'ImagePlayer', this.systemCollisionGroup);
        this.objectPlayer.behaviorControlKeyboard   .active = true;
        this.objectPlayer.behaviorFireBullet        .active = true;
        this.objectPlayer.behaviorRangeLineRadian   .active = true;

    },

    //A function to create all the coins in this state.
    ObjectsCreateCoin           : function(){

        //Find all object with type of coin in tilemap.
        var findObjectsCoin             = this.FindGameObjectsByType('LayerObject', this.tmMap, 'coin');
        //An array to temporary store the coin.
        var objectArrayCoin             = new Array(findObjectsCoin.length);
        //Add every found object into local group.
        this.objectGroupCoin            = game.add.group();

        //Loop all the coins and assign it with class properties.
        for(var i = 0; i < objectArrayCoin.length; i ++){

            //Instantiate the coin object.
            objectArrayCoin[i]          = new ObjectCoin(findObjectsCoin[i].x, findObjectsCoin[i].y);
            //Put the instantiated object in to group.
            this.objectGroupCoin.add    (objectArrayCoin[i]);

        }

    },

    /*A function to handle all collision events.
    PENDING: Please put every collision and overlap into SystemCollisionGroup 'class'.*/
    ObjectsCollision            : function(){

        game.physics.arcade.collide(this.objectEnemy,       this.layerBlock);
        game.physics.arcade.collide(this.objectPlayer,      this.layerBlock);
        game.physics.arcade.collide(this.objectGroupCoin,   this.layerBlock);

    },

    /*A function to handle all overlap events.
    PENDING: Please put every collision and overlap into SystemCollisionGroup 'class'.*/
    ObjectsOverlap              : function(){

        game.physics.arcade.overlap(this.objectPlayer, this.objectGroupCoin, this.OverlapPlayerColectsCoin, null, this);

    },

    OverlapPlayerColectsCoin    : function(_player, _coin){

        //Play sound effect everytime player collects a coin.
        this.seCoin.play    ();
        /*After player collects a coin, delete that coin from the state.
        One thing I learn from using this game framework is that, if your objects are
            collections from a recycleable Phaser.Group then use the kill() method instead.
        If your object is one time use only then you should have use destory(true) method.*/
        _coin.destroy       (true);

    }

};