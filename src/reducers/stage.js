import { ACTIONS } from '../constants/Actions';

export default function stage(state = {}, action) {
    const { payload } = action;
    switch (action.type) {
        case ACTIONS.STAGE.SPAWN_GEM:
        case ACTIONS.STAGE.COLLECT_GEM:
            let { gems } = state;
            let foundGem = false;
            for (let iGem = 0; iGem < gems.length && !foundGem; iGem++) {
                if (gems[iGem].data.TYPE === payload.type) {
                    foundGem = true;
                    gems[iGem].spawned = gems[iGem].spawned || action.type === ACTIONS.STAGE.SPAWN_GEM;
                    gems[iGem].collected = gems[iGem].collected || action.type === ACTIONS.STAGE.COLLECT_GEM;
                }
            }
            return { ...state, gems };

        case ACTIONS.STAGE.START:
            return { ...state,
                gameStarted: true,
                gameOver: false,
                level: payload.settings.level,
                paused: false,
                latestAchievement: null,
                background: payload.settings.background,
                gameComplete: false,
                gems: state.gems.map(gem => { return { ...gem, collected: false, spawned: false } })
            }

        case ACTIONS.STAGE.GAME_OVER:
            return { ...state,
                gameStarted: false,
                paused: false,
                gameOver: true,
                latestAchievement: { score: payload.score }
            }

        case ACTIONS.STAGE.NEXT_LEVEL:
            if (state.level < state.maxLevel) {
                return { ...state,
                    level: state.level + 1,
                    background: payload.settings.background,
                    gems: state.gems.map(gem => { return { ...gem, collected: false, spawned: false } })
                }
            } else {
                return { ...state,
                    gameComplete: true,
                    gameStarted: false,
                    level: 1,
                    paused: false,
                    latestAchievement: { score: payload.score }
                }
            }
            break;

        default:
            return state;
    }
}
