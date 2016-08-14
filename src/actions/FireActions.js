import { ACTIONS } from '../constants/Actions'

export function fire(x, y, xSpeed, maxX, maxY, weapon) {
    return {
        type: ACTIONS.FIRE.FIRE,
        payload: { key: Date.now(), x, y, xSpeed, maxX, maxY, weapon }
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