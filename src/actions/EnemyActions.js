import { ACTIONS } from '../constants/Actions'

export function spawn(key, settings) {
    return {
        type: ACTIONS.ENEMY.SPAWN,
        payload: {
            key,
            type: settings.type,
            damage: settings.damage,
            gemChance: settings.gemChance,
            dieSprite: settings.dieSprite,
            minSpeed: settings.minSpeed,
            maxSpeed: settings.maxSpeed,
            homingRadius: settings.homingRadius,
            maxX: settings.maxX,
            maxY: settings.maxY
        }
    }
}

export function completeSpawning(key) {
    return {
        type: ACTIONS.ENEMY.SPAWN_COMPLETE,
        payload: { key }
    }
}

export function adjustSpeed(key, vector) {
    return {
        type: ACTIONS.ENEMY.ADJUST_SPEED,
        payload: { key, vector }
    }
}

export function moveX(key, dx) {
    return {
        type: ACTIONS.ENEMY.MOVE_X,
        payload: { key, dx }
    }
}

export function moveY(key, dy) {
    return {
        type: ACTIONS.ENEMY.MOVE_Y,
        payload: { key, dy }
    }
}

export function setup(key, width, height, maxX, maxY) {
    return {
        type: ACTIONS.ENEMY.SETUP,
        payload: { key, width, height, maxX, maxY }
    }
}

export function collisionFire(key) {
    return {
        type: ACTIONS.ENEMY.COLLISION_FIRE,
        payload: { key }
    }
}

export function collisionObstacle(key, x = false, y = false) {
    return {
        type: ACTIONS.ENEMY.COLLISION_OBSTACLE,
        payload: { key, x, y }
    }
}

export function die(key) {
    return {
        type: ACTIONS.ENEMY.DIE,
        payload: { key }
    }
}