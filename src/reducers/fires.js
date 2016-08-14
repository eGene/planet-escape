import { ACTIONS } from '../constants/Actions';
import { CONST } from '../constants/Const';

export default function fires(state = [], action) {
    const { payload = {} } = action;
    let iState = payload.key && state[payload.key];
    let newState = Object.assign({}, state);
    if (iState || action.type === ACTIONS.FIRE.FIRE) {
        switch (action.type) {
            case ACTIONS.FIRE.COLLISION_OBSTACLE:
                delete newState[payload.key];
                return newState;

            case ACTIONS.FIRE.COLLISION_ENEMY:
                if ([CONST.BONUS.BLUE_LASER.TYPE].indexOf(newState[payload.key].weapon.type) === -1) {
                    delete newState[payload.key];
                }
                return newState;
                
            case ACTIONS.FIRE.FIRE:
                switch (payload.weapon.type) {
                    case CONST.BONUS.SHOTGUN.TYPE:
                        for (let iFire = 0; iFire < payload.weapon.grits; iFire++) {
                            const xSpeed = payload.xSpeed < 0 ? (payload.xSpeed - Math.random() * 10) : (payload.xSpeed + Math.random() * 10);
                            newState[payload.key + iFire] = {
                                x: payload.x,
                                y: payload.y,
                                xSpeed,
                                ySpeed: 5 - Math.random() * 10,
                                maxX: payload.maxX,
                                maxY: payload.maxY,
                                weapon: payload.weapon
                            }
                        }
                        break;

                    default:
                        newState[payload.key] = {
                            x: payload.x,
                            y: payload.y,
                            xSpeed: payload.xSpeed,
                            ySpeed: 0,
                            maxX: payload.maxX,
                            maxY: payload.maxY,
                            weapon: payload.weapon
                        }
                }
                
                return newState;

            case ACTIONS.FIRE.MOVE_X:
                if (typeof iState !== 'undefined' && iState !== null) {
                    if (iState.maxX > iState.x && iState.x > 0) {
                        newState[payload.key].x = iState.x + payload.dx;
                    } else {
                        delete newState[payload.key];
                    }
                }
                return newState;

            case ACTIONS.FIRE.MOVE_Y:
                if (typeof iState !== 'undefined' && iState !== null) {
                    if (iState.maxY > iState.y + iState.weapon.height && iState.y > 0) {
                        newState[payload.key].y = iState.y + payload.dy;
                    } else {
                        delete newState[payload.key];
                    }
                }
                return newState;

            default:
                return state;
        }
    } else {
        return state;
    }
}