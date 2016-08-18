import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Stage from '../components/Stage'
import * as stageActions from '../actions/StageActions'
import * as astronautActions from '../actions/AstronautActions'
import * as enemyActions from '../actions/EnemyActions'
import * as fireActions from '../actions/FireActions'
import * as spaceshipActions from '../actions/SpaceshipActions'
import * as bonusActions from '../actions/BonusActions'

class App extends Component {

    render() {
        const { astronaut, enemies, fires, obstacles, spaceship, stage, bonuses } = this.props;
        const { astronautActions, stageActions, enemyActions, fireActions, spaceshipActions, bonusActions } = this.props;
        return (
            <div className='stage-wrapper'>
                <Stage
                    astronaut={ astronaut }
                    bonuses={ bonuses }
                    enemies={ enemies }
                    fires={ fires }
                    obstacles={ obstacles }
                    spaceship={ spaceship }
                    stage={ stage }

                    astronautActions={ astronautActions }
                    bonusActions={ bonusActions }
                    enemyActions={ enemyActions }
                    fireActions={ fireActions }
                    spaceshipActions={ spaceshipActions }
                    stageActions={ stageActions } />
            </div>
        )
    }

}

function mapStateToProps(state) {
    return { ...state }
}

function mapDispatchToProps(dispatch) {
    return {
        astronautActions: bindActionCreators(astronautActions, dispatch),
        bonusActions: bindActionCreators(bonusActions, dispatch),
        enemyActions: bindActionCreators(enemyActions, dispatch),
        fireActions: bindActionCreators(fireActions, dispatch),
        spaceshipActions: bindActionCreators(spaceshipActions, dispatch),
        stageActions: bindActionCreators(stageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
