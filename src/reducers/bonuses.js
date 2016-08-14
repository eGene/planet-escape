import { ACTIONS } from '../constants/Actions'
import { CONST } from '../constants/Const';

export default function bonuses(state = {}, action) {
    const { payload = {} } = action;
    let iState = payload.key && state[payload.key];
    let newState = Object.assign({}, state);
    switch (action.type) {
        case ACTIONS.BONUS.SPAWN:
            switch (payload.key) {
                case CONST.BONUS.FUEL.TYPE:
                    newState[payload.key] = {
                        sprite: CONST.BONUS.FUEL.SPRITE,
                        carried: false,
                        x: payload.x,
                        y: payload.y,
                        width: 0,
                        height: 0,
                        fuel: 1,
                        isGem: false
                    };
                    break;

                case CONST.BONUS.GEMS.G_1.TYPE:
                case CONST.BONUS.GEMS.G_2.TYPE:
                case CONST.BONUS.GEMS.G_3.TYPE:
                case CONST.BONUS.GEMS.G_4.TYPE:
                    if (typeof CONST.BONUS.GEMS[payload.key] !== 'undefined') {
                        newState[payload.key] = {
                            sprite: CONST.BONUS.GEMS[payload.key].SPRITE,
                            x: payload.x,
                            y: payload.y,
                            width: 0,
                            height: 0,
                            isGem: true
                        }
                    } else {
                        console.log('Unknown bonus type: ', payload.key);
                    }
                    break;

                default:
                    if (typeof CONST.BONUS[payload.key] !== 'undefined') {
                        newState[payload.key] = {
                            sprite: CONST.BONUS[payload.key].SPRITE,
                            x: payload.x,
                            y: payload.y,
                            width: 0,
                            height: 0,
                            isGem: false
                        }
                    } else {
                        console.log('Unknown bonus type: ', payload.key);
                    }
                    break;
            }
            return newState;

        case ACTIONS.BONUS.REMOVE:
            delete newState[payload.key];
            return newState;

        case ACTIONS.BONUS.SETUP:
            if (typeof iState !== 'undefined' && iState !== null) {
                newState[payload.key] = { ...iState, width: payload.width, height: payload.height, maxX: payload.maxX, maxY: payload.maxY };
                newState[payload.key].y -= payload.height;
            }
            return newState;

        case ACTIONS.BONUS.COLLISION_ASTRONAUT:
            if (typeof iState !== 'undefined' && iState !== null) {
                if (payload.key === CONST.BONUS.FUEL.TYPE) {
                    newState[payload.key].carried = true;
                } else {
                    delete newState[payload.key];
                    return newState;
                }
            }
            return newState;

        default:
            return state;
    }
}