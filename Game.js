var game = new Phaser.Game(1024, 576, Phaser.AUTO);
    game.state.add  ('StateBoot',       stateBoot);
    game.state.add  ('StatePreload',    statePreload);
    game.state.add  ('StatePlay',       statePlay);
    game.state.start('StateBoot');