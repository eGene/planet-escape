import { ACTIONS } from '../constants/Actions'

export function fire(key, x, y, xSpeed, maxX, maxY, weapon) {
    return {
        type: ACTIONS.FIRE.FIRE,
        payload: { key, x, y, xSpeed, maxX, maxY, weapon }
    }
}

export function moveX(key, dx) {
    return {
        type: ACTIONS.FIRE.MOVE_X,
        payload: { key, dx }
    }
}

export function moveY(key, dy) {
    return {
        type: ACTIONS.FIRE.MOVE_Y,
        payload: { key, dy }
    }
}

export function collisionEnemy(key) {
    return {
        type: ACTIONS.FIRE.COLLISION_ENEMY,
        payload: { key }
    }
}

export function collisionObstacle(key) {
    return {
        type: ACTIONS.FIRE.COLLISION_OBSTACLE,
        payload: { key }
    }
}

export function exhaust(key) {
    return {
        type: ACTIONS.FIRE.EXHAUST,
        payload: { key }
    }
}

export function remove(key) {
    return {
        type: ACTIONS.FIRE.REMOVE,
        payload: { key }
    }
}

export function adjust(key, x, y, width) {
    return {
        type: ACTIONS.FIRE.ADJUST,
        payload: { key, x, y, width }
    }
}