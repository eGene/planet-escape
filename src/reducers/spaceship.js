import { ACTIONS } from '../constants/Actions';

export default function spaceship(state = {}, action) {
    const { payload = {} } = action;
    switch (action.type) {
        case ACTIONS.SPACESHIP.SETUP:
            return { ...state, x: payload.x, y: payload.y, width: payload.width, height: payload.height, maxY: payload.maxY, fuelLevel: 0, maxFuel: 5, flying: false, ySpeed: 0, yOffset: 0, departed: false }

        case ACTIONS.SPACESHIP.ADD_FUEL:
            return { ...state, fuelLevel: state.maxFuel > state.fuelLevel ? state.fuelLevel + payload.fuel : state.maxFuel };

        case ACTIONS.SPACESHIP.FLY:
            return { ...state, flying: true, ySpeed: 1, yOffset: 0, departed: false };

        case ACTIONS.SPACESHIP.MOVE_Y:
            if (state.yOffset < state.maxY + state.height) {
                return { ...state, yOffset: state.yOffset + state.ySpeed, ySpeed: state.ySpeed * payload.boost, x: state.x + (0.5 - Math.random()) };
            } else {
                return { ...state, departed: true };
            }
            break;

        case ACTIONS.SPACESHIP.RESTART:
            return { ...state, flying: false, yOffset: 0, ySpeed: 0, fuelLevel: 0, departed: false }

        default:
            return state;
    }
}