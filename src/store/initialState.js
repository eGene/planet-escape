import { SPRITES } from '../constants/Sprites';
import { CONST } from '../constants/Const';

const lives = 1;
const initialState = {
    astronaut: {
        firing: false,
        sprite: {
            still: SPRITES.ASTRONAUT.STILL,
            moving: SPRITES.ASTRONAUT.MOVING
        },
        energy: 100,
        direction: 'ltr',
        maxXSpeed: 10,
        maxYSpeed: 10,
        xSpeed: 0,
        ySpeed: 0,
        maxX: 0,
        maxY: 0,
        width: 0,
        height: 0,
        collision: false,
        score: 0,
        lives: lives,
        live: true,
        spawning: true,
        fuel: 0,
        flyingSpaceship: false
    },
    bonuses: {},
    spaceship: {},
    obstacles: {
        level: {
            '1': {
                static: [
                    {
                        x: 100, y: 100,
                        width: 100, height: 25,
                        sprite: SPRITES.OBSTACLE.BRICK.GREY_GREEN
                    },
                    {
                        x: 110, y: 300,
                        width: 60, height: 60,
                        sprite: SPRITES.OBSTACLE.BRICK.GREY_GREEN
                    },
                    {
                        x: 600, y: 350,
                        width: 100, height: 18,
                        sprite: SPRITES.OBSTACLE.BRICK.GREY_GREEN
                    }
                ]
            },
            '2': {
                static: [
                    {
                        x: 400, y: 150,
                        width: 200, height: 30,
                        sprite: SPRITES.OBSTACLE.BRICK.RED_ROCK
                    }
                ]
            },
            '3': {
                static: [
                    {
                        x: 500, y: 100,
                        width: 300, height: 20,
                        sprite: SPRITES.OBSTACLE.BRICK.ABSTRACT_1
                    },
                    {
                        x: 500, y: 300,
                        width: 300, height: 20,
                        sprite: SPRITES.OBSTACLE.BRICK.ABSTRACT_1
                    },
                    {
                        x: 750, y: 260,
                        width: 50, height: 5,
                        sprite: SPRITES.OBSTACLE.BRICK.ABSTRACT_1
                    },
                    {
                        x: 750, y: 280,
                        width: 50, height: 5,
                        sprite: SPRITES.OBSTACLE.BRICK.ABSTRACT_1
                    }
                ]
            },
            '4': {
                static: [
                    {
                        x: 100, y: 400,
                        width: 50, height: 50,
                        sprite: SPRITES.OBSTACLE.BRICK.ICE_1
                    },
                    {
                        x: 200, y: 400,
                        width: 50, height: 50,
                        sprite: SPRITES.OBSTACLE.BRICK.ICE_1
                    },
                    {
                        x: 300, y: 400,
                        width: 50, height: 50,
                        sprite: SPRITES.OBSTACLE.BRICK.ICE_1
                    }
                ]
            }
        }
    },
    enemies: {},
    fires: {},
    stage: {
        gems: [
            {
                data: CONST.BONUS.GEMS.G_1,
                spawned: false,
                collected: false
            },
            {
                data: CONST.BONUS.GEMS.G_2,
                spawned: false,
                collected: false
            },
            {
                data: CONST.BONUS.GEMS.G_3,
                spawned: false,
                collected: false
            },
            {
                data: CONST.BONUS.GEMS.G_4,
                spawned: false,
                collected: false
            }
        ],
        startScreen: {
            background: require('../img/bg/bg_ice_animated.gif')
        },
        settings: {
            lives: lives,
            level: {
                '1': {
                    level: 1,
                    background: require('../img/bg/bg_1.png'),
                    enemies: [
                        {
                            type: CONST.ENEMY.ASTEROID_1.TYPE,
                            maxEnemies: 1,
                            minSpeed: 3,
                            maxSpeed: 6,
                            damage: 2,
                            dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                            gemChance: CONST.CHANCE.BONUS.OFTEN
                        },
                        {
                            type: CONST.ENEMY.ASTEROID_2.TYPE,
                            maxEnemies: 1,
                            minSpeed: 4,
                            maxSpeed: 8,
                            damage: 3,
                            dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                            gemChance: CONST.CHANCE.BONUS.QUARTER
                        },
                        {
                            type: CONST.ENEMY.UFO.TYPE,
                            maxEnemies: 3,
                            minSpeed: 2,
                            maxSpeed: 6,
                            damage: 2,
                            dieSprite: CONST.EXPLOSION.SMALL.SPRITE
                        }
                    ],
                    bonuses: [
                        {
                            type: CONST.BONUS.MEDIKIT.TYPE,
                            chance: CONST.CHANCE.BONUS.NORMAL
                        },
                        {
                            type: CONST.BONUS.SHOTGUN.TYPE,
                            chance: CONST.CHANCE.BONUS.NORMAL
                        }
                    ]
                },
                '2': {
                    level: 2,
                    background: require('../img/bg/bg_2.jpg'),
                    enemies: [
                        {
                            type: CONST.ENEMY.ASTEROID_2.TYPE,
                            maxEnemies: 1,
                            minSpeed: 1,
                            maxSpeed: 3,
                            damage: 2,
                            dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                            gemChance: CONST.CHANCE.BONUS.QUARTER
                        },
                        {
                            type: CONST.ENEMY.ASTEROID_3.TYPE,
                            maxEnemies: 1,
                            minSpeed: 1,
                            maxSpeed: 3,
                            damage: 3,
                            dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                            gemChance: CONST.CHANCE.BONUS.QUARTER
                        },
                        {
                            type: CONST.ENEMY.BAT.TYPE,
                            maxEnemies: 8,
                            minSpeed: 3,
                            maxSpeed: 10,
                            damage: 2,
                            dieSprite: CONST.EXPLOSION.FOG.SPRITE
                        }
                    ],
                    bonuses: [
                        {
                            type: CONST.BONUS.MEDIKIT.TYPE,
                            chance: CONST.CHANCE.BONUS.NORMAL
                        },
                        {
                            type: CONST.BONUS.BLUE_LASER.TYPE,
                            chance: CONST.CHANCE.BONUS.RARE
                        }
                    ]
                },
                '3': {
                    level: 3,
                    background: require('../img/bg/bg_3.jpg'),
                    enemies: [
                        {
                            type: CONST.ENEMY.ASTEROID_5.TYPE,
                            maxEnemies: 2,
                            minSpeed: 5,
                            maxSpeed: 8,
                            damage: 4,
                            dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                            gemChance: CONST.CHANCE.BONUS.QUARTER
                        },
                        {
                            type: CONST.ENEMY.HOMING_UFO.TYPE,
                            maxEnemies: 5,
                            minSpeed: 3,
                            maxSpeed: 6,
                            damage: 3,
                            homingRadius: 150,
                            dieSprite: CONST.EXPLOSION.SMALL.SPRITE
                        }
                    ],
                    bonuses: [
                        {
                            type: CONST.BONUS.MEDIKIT.TYPE,
                            chance: CONST.CHANCE.BONUS.NORMAL
                        },
                        {
                            type: CONST.BONUS.BLUE_LASER.TYPE,
                            chance: CONST.CHANCE.BONUS.RARE
                        }
                    ]
                },
                '4': {
                    level: 4,
                    background: require('../img/bg/bg_4.jpg'),
                    enemies: [
                        {
                            type: CONST.ENEMY.ASTEROID_1.TYPE,
                            maxEnemies: 1,
                            minSpeed: 1,
                            maxSpeed: 3,
                            damage: 2,
                            dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                            gemChance: CONST.CHANCE.BONUS.QUARTER
                        },
                        {
                            type: CONST.ENEMY.ASTEROID_3.TYPE,
                            maxEnemies: 1,
                            minSpeed: 1,
                            maxSpeed: 3,
                            damage: 2,
                            dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                            gemChance: CONST.CHANCE.BONUS.QUARTER
                        },
                        {
                            type: CONST.ENEMY.ASTEROID_5.TYPE,
                            maxEnemies: 1,
                            minSpeed: 1,
                            maxSpeed: 3,
                            damage: 2,
                            dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                            gemChance: CONST.CHANCE.BONUS.QUARTER
                        },
                        {
                            type: CONST.ENEMY.ICE.TYPE,
                            maxEnemies: 10,
                            minSpeed: 3,
                            maxSpeed: 5,
                            damage: 2,
                            dieSprite: CONST.EXPLOSION.SMOKE.SPRITE
                        }
                    ],
                    bonuses: [
                        {
                            type: CONST.BONUS.MEDIKIT.TYPE,
                            chance: CONST.CHANCE.BONUS.NORMAL
                        },
                        {
                            type: CONST.BONUS.SHIELD_1.TYPE,
                            chance: CONST.CHANCE.BONUS.NORMAL
                        },
                        {
                            type: CONST.BONUS.YELLOW_LASER.TYPE,
                            chance: CONST.CHANCE.BONUS.NORMAL
                        }
                    ]
                }
            }
        },
        width: 1024,
        height: 600,
        gameStarted: false,
        gameOver: false,
        paused: false,
        maxLevel: 4,
        latestAchievement: null
    }
}

export default initialState;