import { ACTIONS } from '../constants/Actions';
import { CONST } from '../constants/Const';

export default function astronaut(state = {}, action = {}) {
    let { payload } = action;
    switch (action.type) {
        case ACTIONS.ASTRONAUT.THROTTLE:
            return { ...state, isThrottling: payload.isThrottling }

        case ACTIONS.ASTRONAUT.SPAWN_COMPLETE:
            return { ...state, spawning: false }

        case ACTIONS.ASTRONAUT.SPAWN:
            return { ...state,
                    live: true,
                    energy: 100,
                    x: state.maxX / 2,
                    y: state.maxY - state.height,
                    xSpeed: 0,
                    ySpeed: 0,
                    spawning: true,
                    flyingSpaceship: false,
                    weapon: { maxFires: 5 }
            };

        case ACTIONS.ASTRONAUT.ADD_SCORE:
            return { ...state, score: state.score + payload.score };

        case ACTIONS.ASTRONAUT.SETUP:
            return { ...state,
                    x: payload.x,
                    y: payload.y,
                    maxX: payload.maxX,
                    maxY: payload.maxY,
                    width: payload.width,
                    height: payload.height
                };

        case ACTIONS.ASTRONAUT.INC_X_SPEED:
            if (state.live) {
                if (state.fuel > 0) {
                    payload.dx /= 2;
                }
                if (state.direction === CONST.DIRECTION.TO_LEFT) {
                    if (payload.turn) {
                        return { ...state, direction: CONST.DIRECTION.TO_RIGHT };
                    } else {
                        return { ...state, xSpeed: Math.abs(state.maxXSpeed) > Math.abs(state.xSpeed) ? state.xSpeed + payload.dx : state.xSpeed, direction: CONST.DIRECTION.TO_LEFT };
                    }
                } else {
                    return { ...state, xSpeed: state.maxXSpeed > state.xSpeed ? state.xSpeed + payload.dx : state.xSpeed, direction: CONST.DIRECTION.TO_RIGHT };
                }
            } else {
                return state;
            }
            break;

        case ACTIONS.ASTRONAUT.DEC_X_SPEED:
            if (state.live) {
                if (state.fuel > 0) {
                    payload.dx /= 2;
                }
                if (state.direction === CONST.DIRECTION.TO_RIGHT) {
                    if (payload.turn) {
                        return { ...state, direction: CONST.DIRECTION.TO_LEFT };
                    } else {
                        return { ...state, xSpeed: Math.abs(state.maxXSpeed) > Math.abs(state.xSpeed) ? state.xSpeed - payload.dx : state.xSpeed, direction: CONST.DIRECTION.TO_RIGHT };
                    }
                } else {
                    return { ...state, xSpeed: -state.maxXSpeed < state.xSpeed ? state.xSpeed - payload.dx : state.xSpeed, direction: CONST.DIRECTION.TO_LEFT };
                }
            } else {
                return state;
            }
            break;

        case ACTIONS.ASTRONAUT.INC_Y_SPEED:
            if (state.fuel > 0) {
                payload /= 2;
            }
            return state.live ? { ...state, ySpeed: state.maxYSpeed > state.ySpeed ? state.ySpeed + payload : state.ySpeed } : state;

        case ACTIONS.ASTRONAUT.DEC_Y_SPEED:
            if (state.fuel > 0) {
                payload /= 2;
            }
            return state.live ? { ...state, ySpeed: -state.maxYSpeed < state.ySpeed ? state.ySpeed - payload : state.ySpeed } : state;

        case ACTIONS.ASTRONAUT.MOVE_X:
            if (state.maxX > state.x && state.x > 0) {
                return { ...state, x: state.x + payload };
            } else {
                if (state.x <= 0) {
                    return { ...state, x: state.maxX + state.x + payload }
                } else {
                    return { ...state, x: state.x - state.maxX + payload }
                }
            }
            break;

        case ACTIONS.ASTRONAUT.MOVE_Y:
            if (state.maxY > state.y + state.height && state.y > 0) {
                return { ...state, y: state.y - payload };
            } else {
                if ((state.y <= 0 && payload < 0) || (state.y > 0 && payload > 0)) {
                    return { ...state, y: state.y - payload };
                } else {
                    return { ...state, ySpeed: 0, y: state.y <= 0 ? 0 : state.maxY - state.height };
                }
            }
            break;

        case ACTIONS.ASTRONAUT.FIRE:
            return state.live ? { ...state, firing: true } : state;

        case ACTIONS.ASTRONAUT.COLLISION_OBSTACLE:
            return { ...state, xSpeed: payload.x ? 0 : state.xSpeed, ySpeed: payload.y ? 0 : state.ySpeed }

        case ACTIONS.ASTRONAUT.COLLISION_ENEMY:
            const { damage } = payload;
            const { energy, shieldEnergy = 0 } = state;
            const remainingShieldEnergy = shieldEnergy - damage;
            const remainingEnergy = remainingShieldEnergy >= 0 ? energy : energy - damage + remainingShieldEnergy;
            const shield = remainingEnergy > 0 ? state.shield : null;

            return state.live && !state.spawning ? {
                ...state,
                collision: damage > 0,
                energy: damage > 0 ? (remainingEnergy > 0 ? remainingEnergy : 0) : state.energy,
                shield,
                shieldEnergy: remainingEnergy > 0 ? remainingShieldEnergy : 0
            } : state;

        case ACTIONS.ASTRONAUT.COLLISION_FUEL:
            return { ...state, fuel: payload.fuel }

        case ACTIONS.ASTRONAUT.COLLISION_BONUS:
            switch (payload.key) {
                case CONST.BONUS.MEDIKIT.TYPE:
                    return { ...state, energy: state.energy + 25 > 100 ? 100 : state.energy + 25}

                case CONST.BONUS.BLUE_LASER.TYPE:
                case CONST.BONUS.YELLOW_LASER.TYPE:
                case CONST.BONUS.PURPLE_LASER.TYPE:
                    return { ...state,
                            weapon: {
                                type: CONST.BONUS[payload.key].TYPE,
                                maxFires: CONST.BONUS[payload.key].MAX_FIRES,
                                width: CONST.BONUS[payload.key].WIDTH,
                                height: CONST.BONUS[payload.key].HEIGHT,
                                speed: CONST.BONUS[payload.key].SPEED
                            }
                    }

                case CONST.BONUS.SHOTGUN.TYPE:
                    return { ...state,
                            weapon: {
                                type: CONST.BONUS.SHOTGUN.TYPE,
                                maxFires: CONST.BONUS.SHOTGUN.MAX_FIRES,
                                width: CONST.BONUS.SHOTGUN.WIDTH,
                                height: CONST.BONUS.SHOTGUN.HEIGHT,
                                speed: CONST.BONUS.SHOTGUN.SPEED,
                                grits: CONST.BONUS.SHOTGUN.GRITS
                            }
                    }

                case CONST.BONUS.SHIELD_1.TYPE:
                    const maxEnergy = CONST.BONUS.SHIELD_1.ENERGY;
                    return { ...state, shield: CONST.BONUS.SHIELD_1.TYPE, shieldEnergy: maxEnergy, maxShieldEnergy: maxEnergy }

                default:
                    return state;
            }
            break;

        case ACTIONS.ASTRONAUT.DROP_FUEL:
            return { ...state, fuel: 0 }

        case ACTIONS.ASTRONAUT.DIE:
            return state.live ? { ...state, lives: state.lives - 1, live: false, weapon: { maxFires: 5 } } : state;

        case ACTIONS.ASTRONAUT.FLY_SPACESHIP:
            return { ...state, flyingSpaceship: true }

        case ACTIONS.ASTRONAUT.RESTART:
            return { ...state, lives: payload.lives, score: 0, weapon: { maxFires: 5 } }

        default:
            return state;
    }
}