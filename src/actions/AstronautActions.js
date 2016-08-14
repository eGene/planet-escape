import { ACTIONS } from '../constants/Actions'

export function fire() {
    return {
        type: ACTIONS.ASTRONAUT.FIRE
    }
}

export function incXSpeed(turn = true, dx = 1) {
    return {
        type: ACTIONS.ASTRONAUT.INC_X_SPEED,
        payload: { turn, dx }
    }
}

export function decXSpeed(turn = true, dx = 1) {
    return {
        type: ACTIONS.ASTRONAUT.DEC_X_SPEED,
        payload: { turn, dx }
    }
}

export function incYSpeed(dy = 1) {
    return {
        type: ACTIONS.ASTRONAUT.INC_Y_SPEED,
        payload: dy
    }
}

export function decYSpeed(dy = 1) {
    return {
        type: ACTIONS.ASTRONAUT.DEC_Y_SPEED,
        payload: dy
    }
}

export function moveX(dx) {
    return {
        type: ACTIONS.ASTRONAUT.MOVE_X,
        payload: dx
    }
}

export function moveY(dy) {
    return {
        type: ACTIONS.ASTRONAUT.MOVE_Y,
        payload: dy
    }
}

export function setup(x, y, width, height, maxX, maxY) {
    return {
        type: ACTIONS.ASTRONAUT.SETUP,
        payload: { x, y, width, height, maxX, maxY }
    }
}

export function collisionEnemy(damage) {
    return {
        type: ACTIONS.ASTRONAUT.COLLISION_ENEMY,
        payload: { damage }
    }
}

export function collisionFuel(fuel) {
    return {
        type: ACTIONS.ASTRONAUT.COLLISION_FUEL,
        payload: { fuel }
    }
}

export function collisionObstacle(x = false, y = false) {
    return {
        type: ACTIONS.ASTRONAUT.COLLISION_OBSTACLE,
        payload: { x, y }
    }
}

export function collisionBonus(key) {
    return {
        type: ACTIONS.ASTRONAUT.COLLISION_BONUS,
        payload: { key }
    }
}

export function dropFuel() {
    return {
        type: ACTIONS.ASTRONAUT.DROP_FUEL
    }
}

export function addScore(score) {
    return {
        type: ACTIONS.ASTRONAUT.ADD_SCORE,
        payload: { score }
    }
}

export function die() {
    return {
        type: ACTIONS.ASTRONAUT.DIE
    }
}

export function spawn() {
    return {
        type: ACTIONS.ASTRONAUT.SPAWN
    }
}

export function completeSpawning() {
    return {
        type: ACTIONS.ASTRONAUT.SPAWN_COMPLETE
    }
}

export function flySpaceship() {
    return {
        type: ACTIONS.ASTRONAUT.FLY_SPACESHIP
    }
}

export function restart(lives) {
    return {
        type: ACTIONS.ASTRONAUT.RESTART,
        payload: { lives }
    }
}

export function throttle(isThrottling) {
    return {
        type: ACTIONS.ASTRONAUT.THROTTLE,
        payload: { isThrottling }
    }
}
