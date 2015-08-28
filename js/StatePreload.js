var statePreload = {

    preload:            function(){

        game.load.image                     ('ImageBullet',     'assets/bullet.png');
        game.load.image                     ('ImageCoin',       'assets/coin.png')
        game.load.image                     ('ImageEnemy',      'assets/enemy.png')
        game.load.image                     ('ImagePlayer',     'assets/player.png');
        game.load.image                     ('ImageTileset1',   'assets/Tileset1.png');
        //game.load.audio                   ('BGMRhinoceros',   'assets/rhinoceros.mp3');
        game.load.audio                     ('SECoin',          'assets/coin.ogg');
        game.load.tilemap                   ('Tilemap1',        'assets/Tilemap1.json'  , null, Phaser.Tilemap.TILED_JSON);

    },
    create:             function(){
        //Codes to start the background sound.
        //this.bgmRhinoceros                = game.add.audio('BGMRhinoceros');
        //this.bgmRhinoceros.play();
    },
    update:             function(){

        //Codes to change scene.
        //if(this.bgmRhinoceros.isDecoded)  { game.state.start('StatePlay'); }
        game.state.start                    ('StatePlay');

    }

};