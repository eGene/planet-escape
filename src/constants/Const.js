import { SPRITES } from './Sprites';

export const CONST = {
    CHANCE: {
        SPAWN_FUEL: 0.25,
        SPAWN_ENEMY: 0.2,
        BONUS: {
            ALWAYS: 100,
            HALF: 0.5,
            QUARTER: 0.25,
            OFTEN: 0.1,
            NORMAL: 0.08,
            RARE: 0.05,
            SUPER_RARE: 0.01
        }
    },

    DIRECTION: {
        TO_RIGHT: 'ltr',
        TO_LEFT: 'rtl'
    },

    SCORE: {
        GEM: 1000
    },

    SPACESHIP: {
        ROCKET: {
            TYPE: 'ROCKET',
            SPRITE: SPRITES.SPACESHIP.ROCKET,
            BOTTOM_OFFSET: 185,
            SPRITE_FLYING: SPRITES.SPACESHIP.FLYING_ROCKET
        }
    },

    BONUS: {
        FUEL: {
            TYPE: 'FUEL',
            SPRITE: SPRITES.BONUS.FUEL.NUCLEAR
        },
        MEDIKIT: {
            TYPE: 'MEDIKIT',
            SPRITE: SPRITES.BONUS.MEDIKIT
        },
        BLUE_LASER: {
            TYPE: 'BLUE_LASER',
            SPRITE: SPRITES.BONUS.BLUE_LASER,
            MAX_FIRES: 10,
            WIDTH: 20,
            HEIGHT: 1,
            SPEED: 20
        },
        YELLOW_LASER: {
            TYPE: 'YELLOW_LASER',
            SPRITE: SPRITES.BONUS.YELLOW_LASER,
            MAX_FIRES: 15,
            WIDTH: 10,
            HEIGHT: 2,
            SPEED: 20
        },
        PURPLE_LASER: {
            TYPE: 'PURPLE_LASER',
            SPRITE: SPRITES.BONUS.PURPLE_LASER,
            MAX_FIRES: 1,
            WIDTH: 0,
            HEIGHT: 4,
            SPEED: 0
        },
        SHIELD_1: {
            TYPE: 'SHIELD_1',
            SPRITE: SPRITES.BONUS.SHIELD_1,
            ENERGY: 25
        },
        SHOTGUN: {
            TYPE: 'SHOTGUN',
            SPRITE: SPRITES.BONUS.SHOTGUN,
            MAX_FIRES: 1,
            WIDTH: 5,
            HEIGHT: 5,
            GRITS: 10,
            SPEED: 20
        },
        GEMS: {
            G_1: {
                TYPE: 'G_1',
                SPRITE: SPRITES.BONUS.GEM_1
            },
            G_2: {
                TYPE: 'G_2',
                SPRITE: SPRITES.BONUS.GEM_2
            },
            G_3: {
                TYPE: 'G_3',
                SPRITE: SPRITES.BONUS.GEM_3
            },
            G_4: {
                TYPE: 'G_4',
                SPRITE: SPRITES.BONUS.GEM_4
            }
        }
    },

    OBSTACLE: {
        BRICK: {
            GREY_GREEN: {
                TYPE: 'GREY_GREEN',
                SPRITE: SPRITES.OBSTACLE.BRICK.GREY_GREEN
            },
            ABSTRACT_1: {
                TYPE: 'ABSTRACT_1',
                SPRITE: SPRITES.OBSTACLE.BRICK.ABSTRACT_1
            },
            RED_ROCK: {
                TYPE: 'RED_ROCK',
                SPRITE: SPRITES.OBSTACLE.BRICK.RED_ROCK
            },
            ICE_1: {
                TYPE: 'ICE_1',
                SPRITE: SPRITES.OBSTACLE.BRICK.ICE_1
            }
        }
    },

    ENEMY: {
        UFO: {
            TYPE: 'UFO',
            SPRITE: SPRITES.ENEMY.UFO
        },
        HOMING_UFO: {
            TYPE: 'HOMING_UFO',
            SPRITE: SPRITES.ENEMY.HOMING_UFO
        },
        BAT: {
            TYPE: 'BAT',
            SPRITE: SPRITES.ENEMY.BAT
        },
        ICE: {
            TYPE: 'ICE',
            SPRITE: SPRITES.ENEMY.ICE
        },
        FLY: {
            TYPE: 'FLY',
            SPRITE: SPRITES.ENEMY.FLY
        },
        ASTEROID_1: {
            TYPE: 'ASTEROID_1',
            SPRITE: SPRITES.ENEMY.ASTEROID_1
        },
        ASTEROID_2: {
            TYPE: 'ASTEROID_2',
            SPRITE: SPRITES.ENEMY.ASTEROID_2
        },
        ASTEROID_3: {
            TYPE: 'ASTEROID_3',
            SPRITE: SPRITES.ENEMY.ASTEROID_3
        },
        ASTEROID_4: {
            TYPE: 'ASTEROID_4',
            SPRITE: SPRITES.ENEMY.ASTEROID_4
        },
        ASTEROID_5: {
            TYPE: 'ASTEROID_5',
            SPRITE: SPRITES.ENEMY.ASTEROID_5
        }
    },

    EXPLOSION: {
        SMALL: {
            TYPE: 'SMALL',
            SPRITE: SPRITES.EXPLOSION.SMALL
        },
        FOG: {
            TYPE: 'FOG',
            SPRITE: SPRITES.EXPLOSION.FOG
        },
        SMOKE: {
            TYPE: 'SMOKE',
            SPRITE: SPRITES.EXPLOSION.SMOKE
        }
    }
};