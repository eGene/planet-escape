import React, { PropTypes, Component } from 'react'
import cx from 'classnames'
import { CONST } from '../constants/CONST';

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

        return (
            <div
                ref='fire'
                className={ cx('laser-ray',
                    {
                        'default-laser': !data.weapon.type,
                        'blue-laser': data.weapon.type === CONST.BONUS.BLUE_LASER.TYPE,
                        'yellow-laser': data.weapon.type === CONST.BONUS.YELLOW_LASER.TYPE,
                        'grit': data.weapon.type === CONST.BONUS.SHOTGUN.TYPE
                    }
                ) }
                style={ styles } />
        );
    }

}