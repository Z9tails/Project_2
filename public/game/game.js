var config = {
    type: Phaser.AUTO,
    width: 2000,
    height: 2000,
    parent: 'canvas',
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 750 },
            debug: false
        }
    },
    scene: {
        key: "main",
        preload: preload,
        create: create,
        // update: update
        // add scale manager for full scene deployment
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.tilemapTiledJSON('map', '/assets/map/map.json', '/assets/map/map.tmx');
    this.load.image('mapImg','/assets/map/map.png');
    this.load.image('bed','/assets/map/bed2.png');
    this.load.image('floor','/assets/map/obj_misk_atlas.png');
    this.load.image('building','/assets/map/build_atlas.png');
    this.load.image('wall','/assets/map/tile_wall.png');
    this.load.image('beam','/assets/map/tile_room.png');
    this.load.spritesheet('BiggieSmalls','/assets/characters/temp.png', {frameWidth: 15, frameHeight: 15} );
};

var player;
var cursors;

function create() {
    // debugger
    // this.camaras.main.zoom = 4;
    // this.cameras.main.roundPixels = true;

    const map = this.make.tilemap({key: 'map', tileWidth: 32, tileHeight: 32 });

    // floors layer
    const floorTileset = map.addTilesetImage('obj_misk_atlas', 'floor'); 
    const floorLayer = map.createLayer("floors", floorTileset, 0,0);
    floorLayer.setCollisionByProperty({Collision: true});

    // grass layer
    const grassTileset = map.addTilesetImage('tile_wall', 'wall'); 
    const grassLayer = map.createLayer("grass", grassTileset, 0,0);
    // grassLayer.setCollisionByProperty({Collision: true})

    // woodPlatform layer
    const woodPlatformTileset = map.addTilesetImage('tile_wall', 'wall'); 
    const woodPlatformLayer = map.createLayer("woodPlatforms", woodPlatformTileset, 0,0);
    // woodPlatformLayer.setCollisionByProperty({Collision: true})

    // walls layer
    const wallsTileset = map.addTilesetImage('tile_wall', 'wall'); 
    const wallLayer = map.createLayer("walls", wallsTileset, 0,0);
    // outdoor layer
    const outdoorTileset = map.addTilesetImage('obj_misk_atlas', 'floor'); 
    const outdoorLayer = map.createLayer("outdoor", outdoorTileset, 0,0);

    // beams and windows layer
    const beamWindowTileset = map.addTilesetImage('tile_room', 'beam'); 
    const beamWindowLayer = map.createLayer("beamsandWindows", beamWindowTileset, 0,0);

    // decorations layer
    const decorationsTileset = map.addTilesetImage('obj_misk_atlas', 'floor'); 
    const decorationsLayer = map.createLayer("decorations", decorationsTileset, 0,0);

    // outdoorDecorations layer
    const outdoorDecorationsTileset = map.addTilesetImage('build_atlas', 'building'); 
    const outdoorDecorationsLayer = map.createLayer("outdoorDecorations", outdoorDecorationsTileset, 0,0);

    player = this.add.sprite(200, 200, 'BiggieSmalls');


    // camera follows
    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // this.cameras.main.roundPixels = true;
    // this.cameras.main.startFollow(player)

  
    this.physics.add.collider(player, floorLayer);
    this.physics.add.staticGroup();

    // add animiation to player
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('BiggieSmalls', { start: 1, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [{ key: 'BiggieSmalls', frame: 0 }],
        frameRate: 10
    });
    this.anims.create({
        key: 'jump',
        frames: [{ key: 'BiggieSmalls', start: 1, end: 3 }],
        frameRate: 10
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('BiggieSmalls', { start: 1, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
        player.flipX = true;
        player.body.setVelocityX(-120);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
        player.flipX = false;
        player.body.setVelocityX(120);
    }
    else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }



    if (cursors.up.isDown && player.body.velocity.y > -1.388888888888889 && player.body.velocity.y < 1.388888888888889) {

        player.setVelocityY(-330);
        player.anims.play('jump', true);

    }



    player.physics.add.collide(player);
}