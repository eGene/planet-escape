import { ACTIONS } from '../constants/Actions'
import { CONST } from '../constants/Const'

export default function enemies(state = [], action) {
    const { payload = {} } = action;
    let iState = payload.key && state[payload.key];
    let newState = Object.assign({}, state);
    switch (action.type) {
        case ACTIONS.ENEMY.ADJUST_SPEED:
            if (iState !== 'undefined' && iState !== null) {
                newState[payload.key].xSpeed += payload.vector.x;
                newState[payload.key].ySpeed += payload.vector.y;
                if (Math.abs(newState[payload.key].xSpeed) > newState[payload.key].maxSpeed) {
                    newState[payload.key].xSpeed = newState[payload.key].xSpeed > 0 ? newState[payload.key].maxSpeed : -newState[payload.key].maxSpeed;
                }
                if (Math.abs(newState[payload.key].ySpeed) > newState[payload.key].maxSpeed) {
                    newState[payload.key].ySpeed = newState[payload.key].ySpeed > 0 ? newState[payload.key].maxSpeed : -newState[payload.key].maxSpeed;
                }
            }
            newState[payload.key].direction = newState[payload.key].xSpeed > 0 ? CONST.DIRECTION.TO_RIGHT : CONST.DIRECTION.TO_LEFT;
            return newState;

        case ACTIONS.ENEMY.COLLISION_FIRE:
            if (iState !== 'undefined' && iState !== null) {
                newState[payload.key].live = false;
                newState[payload.key].explode = true;
                newState[payload.key].sprite = newState[payload.key].dieSprite;
            }
            return newState;

        case ACTIONS.ENEMY.COLLISION_OBSTACLE:
            if (iState !== 'undefined' && iState !== null) {
                if (payload.x) {
                    newState[payload.key].xSpeed = Number(-iState.xSpeed);
                    newState[payload.key].x += Number(iState.xSpeed);
                    newState[payload.key].direction = newState[payload.key].direction === CONST.DIRECTION.TO_RIGHT ? CONST.DIRECTION.TO_LEFT : CONST.DIRECTION.TO_RIGHT;
                }
                if (payload.y) {
                    newState[payload.key].ySpeed = -iState.ySpeed;
                    newState[payload.key].y += iState.ySpeed;
                }
            }
            return newState;

        case ACTIONS.ENEMY.SPAWN:
            const xSign = Math.random() < 0.5 ? -1 : 1;
            const ySign = Math.random() < 0.5 ? -1 : 1;
            const xSpeed = xSign * Math.round(payload.minSpeed + Math.random() * (payload.maxSpeed - payload.minSpeed));
            const ySpeed = ySign * Math.round(payload.minSpeed + Math.random() * (payload.maxSpeed - payload.minSpeed));
            newState[payload.key] = {
                live: true,
                x: 10,
                y: 0,
                direction: xSpeed < 0 ? CONST.DIRECTION.TO_LEFT : CONST.DIRECTION.TO_RIGHT,
                xSpeed,
                ySpeed,
                sprite: CONST.ENEMY[payload.type].SPRITE,
                damage: payload.damage,
                gemChance: payload.gemChance,
                dieSprite: payload.dieSprite,
                score: 100,
                width: 0,
                height: 0,
                spawning: true,
                maxX: payload.maxX,
                maxY: payload.maxY,
                type: payload.type,
                homingRadius: payload.homingRadius,
                maxSpeed: payload.maxSpeed
            };
            return newState;

        case ACTIONS.ENEMY.SPAWN_COMPLETE:
            if (iState !== 'undefined' && iState !== null) {
                newState[payload.key].spawning = false;
            }
            return newState;

        case ACTIONS.ENEMY.SETUP:
            if (typeof iState !== 'undefined' && iState !== null) {
                newState[payload.key] = Object.assign({}, newState[payload.key], {
                    width: payload.width,
                    height: payload.height,
                    xSpeed: iState.xSpeed ? iState.xSpeed : 5,
                    ySpeed: iState.ySpeed ? iState.ySpeed : 5,
                    direction: iState.xSpeed ? iState.direction : CONST.DIRECTION.TO_RIGHT
                });
            }
            return newState;

        case ACTIONS.ENEMY.MOVE_X:
            if (typeof iState !== 'undefined' && iState !== null) {
                if (iState.maxX > iState.x && iState.x > 0) {
                    newState[payload.key].x = iState.x + payload.dx
                } else {
                    if (iState.x <= 0) {
                        newState[payload.key].x = iState.maxX + iState.x + payload.dx;
                    } else {
                        newState[payload.key].x = iState.x - iState.maxX + payload.dx;
                    }
                }
            }
            return newState;

        case ACTIONS.ENEMY.MOVE_Y:
            if (typeof iState !== 'undefined' && iState !== null) {
                if (iState.maxY > iState.y + iState.height && iState.y > 0) {
                    newState[payload.key].y = iState.y + payload.dy;
                } else {
                    if ((iState.y <= 0 && payload.dy < 0) || (iState.y > 0 && payload.dy > 0)) {
                        newState[payload.key].y = iState.y - payload.dy;
                        newState[payload.key].ySpeed = -iState.ySpeed;
                    } else {
                        newState[payload.key].y = iState.y <= 0 ? 0 : iState.maxY - iState.height;
                        newState[payload.key].ySpeed = -iState.ySpeed;
                    }
                }
            }
            return newState;

        case ACTIONS.ENEMY.DIE:
            delete newState[payload.key];
            return newState;

        default:
            return state;
    }
}