import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Stage from '../components/Stage'
import * as astronautActions from '../actions/AstronautActions'
import * as bonusActions from '../actions/BonusActions'
import * as enemyActions from '../actions/EnemyActions'
import * as fireActions from '../actions/FireActions'
import * as spaceshipActions from '../actions/SpaceshipActions'
import * as stageActions from '../actions/StageActions'

class App extends Component {

    render() {
        const { props } = this;
        return (
            <div className='stage-wrapper'>
                <Stage { ...props }/>
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
