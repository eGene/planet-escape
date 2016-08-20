import { SPRITES } from '../constants/Sprites';
import { CONST } from '../constants/Const';

const lives = 1;
const stageWidth = window.innerWidth - 100;
const stageHeight = window.innerHeight - 100;
let obstacles = {
    level: {
        '1': {
            static: [
                {
                    x: 10, y: 15, width: 20, height: 5,
                    sprite: SPRITES.OBSTACLE.BRICK.GREY_GREEN,
                    canHoldBonus: true
                },
                {
                    x: 15, y: 40, width: 5, height: 5,
                    sprite: SPRITES.OBSTACLE.BRICK.GREY_GREEN,
                    canHoldBonus: true
                },
                {
                    x: 80, y: 70, width: 10, height: 10,
                    sprite: SPRITES.OBSTACLE.BRICK.GREY_GREEN,
                    canHoldBonus: true
                }
            ]
        },
        '2': {
            static: [
                {
                    x: 40, y: 20, width: 40, height: 5,
                    sprite: SPRITES.OBSTACLE.BRICK.RED_ROCK,
                    canHoldBonus: true
                }
            ]
        },
        '3': {
            static: [
                {
                    x: 50, y: 15, width: 40, height: 2,
                    sprite: SPRITES.OBSTACLE.BRICK.ABSTRACT_1,
                    canHoldBonus: true
                },
                {
                    x: 50, y: 60, width: 40, height: 2,
                    sprite: SPRITES.OBSTACLE.BRICK.ABSTRACT_1,
                    canHoldBonus: true
                },
                {
                    x: 80, y: 50, width: 10, height: 1,
                    sprite: SPRITES.OBSTACLE.BRICK.ABSTRACT_1,
                    canHoldBonus: true
                },
                {
                    x: 80, y: 55, width: 10, height: 1,
                    sprite: SPRITES.OBSTACLE.BRICK.ABSTRACT_1,
                    canHoldBonus: false
                }
            ]
        },
        '4': {
            static: [
                {
                    x: 10, y: 80, width: 5, height: 5,
                    sprite: SPRITES.OBSTACLE.BRICK.ICE_1,
                    canHoldBonus: true
                },
                {
                    x: 20, y: 80, width: 5, height: 5,
                    sprite: SPRITES.OBSTACLE.BRICK.ICE_1,
                    canHoldBonus: true
                },
                {
                    x: 30, y: 80, width: 5, height: 5,
                    sprite: SPRITES.OBSTACLE.BRICK.ICE_1,
                    canHoldBonus: true
                }
            ]
        },
        '5': {
            static: [
                {
                    x: 10, y: 15, width: 2, height: 70,
                    sprite: SPRITES.OBSTACLE.BRICK.RED_ROCK,
                    canHoldBonus: true
                },
                {
                    x: 90, y: 15, width: 2, height: 70,
                    sprite: SPRITES.OBSTACLE.BRICK.RED_ROCK,
                    canHoldBonus: true
                },
                {
                    x: 90, y: 90, width: 2, height: 5,
                    sprite: SPRITES.OBSTACLE.BRICK.RED_ROCK,
                    canHoldBonus: false
                }
            ]
        }
    }
}

Object.keys(obstacles.level).forEach(key => {
    let level = obstacles.level[key];
    level.static = level.static.map(o => {
        return {
            ...o,
            x: stageWidth / 100 * o.x,
            y: stageHeight / 100 * o.y,
            width: stageWidth / 100 * o.width,
            height: stageHeight / 100 * o.height
        };
    });
});

const levels = {
    '1': {
        level: 1,
        background: require('../img/bg/bg_1.png'),
        enemies: [
            {
                type: CONST.ENEMY.ASTEROID_1.TYPE,
                maxEnemies: 1, minSpeed: 3, maxSpeed: 6, damage: 2,
                dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                gemChance: CONST.CHANCE.BONUS.OFTEN
            },
            {
                type: CONST.ENEMY.ASTEROID_2.TYPE,
                maxEnemies: 1, minSpeed: 4, maxSpeed: 8, damage: 3,
                dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                gemChance: CONST.CHANCE.BONUS.QUARTER
            },
            {
                type: CONST.ENEMY.UFO.TYPE,
                maxEnemies: 3, minSpeed: 2, maxSpeed: 6, damage: 2,
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
                maxEnemies: 1, minSpeed: 1, maxSpeed: 3, damage: 2,
                dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                gemChance: CONST.CHANCE.BONUS.QUARTER
            },
            {
                type: CONST.ENEMY.ASTEROID_3.TYPE,
                maxEnemies: 1, minSpeed: 1, maxSpeed: 3, damage: 3,
                dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                gemChance: CONST.CHANCE.BONUS.QUARTER
            },
            {
                type: CONST.ENEMY.BAT.TYPE,
                maxEnemies: 8, minSpeed: 3, maxSpeed: 10, damage: 2,
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
                maxEnemies: 2, minSpeed: 5, maxSpeed: 8, damage: 4,
                dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                gemChance: CONST.CHANCE.BONUS.QUARTER
            },
            {
                type: CONST.ENEMY.HOMING_UFO.TYPE,
                maxEnemies: 5, minSpeed: 3, maxSpeed: 6, damage: 3,
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
                maxEnemies: 1, minSpeed: 1, maxSpeed: 3, damage: 2,
                dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                gemChance: CONST.CHANCE.BONUS.QUARTER
            },
            {
                type: CONST.ENEMY.ASTEROID_3.TYPE,
                maxEnemies: 1, minSpeed: 1, maxSpeed: 3, damage: 2,
                dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                gemChance: CONST.CHANCE.BONUS.QUARTER
            },
            {
                type: CONST.ENEMY.ASTEROID_5.TYPE,
                maxEnemies: 1, minSpeed: 1, maxSpeed: 3, damage: 2,
                dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                gemChance: CONST.CHANCE.BONUS.QUARTER
            },
            {
                type: CONST.ENEMY.ICE.TYPE,
                maxEnemies: 10, minSpeed: 3, maxSpeed: 5, damage: 2,
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
    },
    '5': {
        level: 5,
        background: require('../img/bg/bg_6.jpg'),
        enemies: [
            {
                type: CONST.ENEMY.ASTEROID_3.TYPE,
                maxEnemies: 3, minSpeed: 3, maxSpeed: 5, damage: 3,
                dieSprite: CONST.EXPLOSION.SMALL.SPRITE,
                gemChance: CONST.CHANCE.BONUS.NORMAL
            },
            {
                type: CONST.ENEMY.FLY.TYPE,
                maxEnemies: 20, minSpeed: 3, maxSpeed: 3, damage: 3,
                homingRadius: 150,
                dieSprite: CONST.EXPLOSION.SMOKE.SPRITE
            }
        ],
        bonuses: [
            {
                type: CONST.BONUS.MEDIKIT.TYPE,
                chance: CONST.CHANCE.BONUS.NORMAL
            },
            {
                type: CONST.BONUS.PURPLE_LASER.TYPE,
                chance: CONST.CHANCE.BONUS.NORMAL
            },
            {
                type: CONST.BONUS.SHIELD_1.TYPE,
                chance: CONST.CHANCE.BONUS.NORMAL
            }
        ]
    }
};

let initialState = {
    obstacles,
    astronaut: {
        firing: false,
        sprite: {
            still: SPRITES.ASTRONAUT.STILL,
            moving: SPRITES.ASTRONAUT.MOVING
        },
        energy: 100,
        direction: CONST.DIRECTION.TO_RIGHT,
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
            lives,
            levels
        },
        width: stageWidth,
        height: stageHeight,
        gameStarted: false,
        gameOver: false,
        paused: false,
        maxLevel: Object.keys(levels).length,
        latestAchievement: null
    }
}

export default initialState;