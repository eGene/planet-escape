import { ACTIONS } from '../constants/Actions'

export function generate() {
    return {
        type: ACTIONS.STAGE.GENERATE
    }
}

export function startGame(settings) {
    return {
        type: ACTIONS.STAGE.START,
        payload: { settings }
    }
}

export function gameOver(score) {
	return {
		type: ACTIONS.STAGE.GAME_OVER,
		payload: { score }
	}
}

export function nextLevel(score, settings) {
    return {
        type: ACTIONS.STAGE.NEXT_LEVEL,
        payload: { score, settings }
    }
}

export function spawnGem(type) {
    return {
        type: ACTIONS.STAGE.SPAWN_GEM,
        payload: { type }
    }
}

export function collectGem(type) {
    return {
        type: ACTIONS.STAGE.COLLECT_GEM,
        payload: { type }
    }
}