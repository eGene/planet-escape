import { ACTIONS } from '../constants/Actions'

export function setup(key, width, height, maxX, maxY) {
    return {
        type: ACTIONS.BONUS.SETUP,
        payload: { key, width, height, maxX, maxY }
    }
}

export function spawn(type, x, y) {
	return {
		type: ACTIONS.BONUS.SPAWN,
		payload: { key: type, x, y }
	}
}

export function remove(key) {
	return {
		type: ACTIONS.BONUS.REMOVE,
		payload: { key }
	}
}

export function collisionAstronaut(key) {
	return {
		type: ACTIONS.BONUS.COLLISION_ASTRONAUT,
		payload: { key }
	}
}