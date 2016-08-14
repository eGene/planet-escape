import { ACTIONS } from '../constants/Actions'

export function fly() {
    return {
        type: ACTIONS.SPACESHIP.FLY
    }
}

export function addFuel(fuel) {
    return {
        type: ACTIONS.SPACESHIP.ADD_FUEL,
        payload: { fuel }
    }
}

export function setup(x, y, width, height, maxY) {
    return {
        type: ACTIONS.SPACESHIP.SETUP,
        payload: { x, y, width, height, maxY }
    }
}

export function depart() {
    return {
        type: ACTIONS.SPACESHIP.MOVE_Y,
        payload: { boost: 1.05 }
    }
}

export function restart() {
    return {
        type: ACTIONS.SPACESHIP.RESTART
    }
}