import { combineReducers } from 'redux'
import astronaut from './astronaut'
import bonuses from './bonuses'
import enemies from './enemies'
import fires from './fires'
import obstacles from './obstacles'
import spaceship from './spaceship'
import stage from './stage'

export default combineReducers({
    astronaut,
    bonuses,
    enemies,
    fires,
    obstacles,
    spaceship,
    stage
})
