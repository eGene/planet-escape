import React, { PropTypes, Component } from 'react'
import ReactCSSTransitionGroup from'react-addons-css-transition-group';
import cx from 'classnames'
import { CONST } from '../constants/Const';

export default class Fire extends Component {

    static get defaultProps() {
        return {
            data: {}
        };
    }

    static get propTypes() {
        return {
            data: PropTypes.object
        };
    }

    render() {
        const { data } = this.props;
        const styles = {
            left: data.x,
            top: data.y,
            width: data.weapon.width,
            height: data.weapon.height
        };
        const classes = {
            'default-laser': !data.weapon.type,
            'blue-laser': data.weapon.type === CONST.BONUS.BLUE_LASER.TYPE,
            'yellow-laser': data.weapon.type === CONST.BONUS.YELLOW_LASER.TYPE,
            'purple-laser': data.weapon.type === CONST.BONUS.PURPLE_LASER.TYPE,
            'grit': data.weapon.type === CONST.BONUS.SHOTGUN.TYPE
        };

        return (
            <div ref='fire' className='laser-ray' style={ styles }>
                <ReactCSSTransitionGroup style={{width: data.weapon.width, height: data.weapon.height}} transitionName='laser' component='div' transitionAppear={true} transitionAppearTimeout={1500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                    <div key={ data.key } className={ cx(classes, { 'exhausting': data.exhausting }) } />
                </ReactCSSTransitionGroup>
            </div>
        );
    }

}