import React, { PropTypes, Component } from 'react'
import cx from 'classnames'
import { CONST } from '../constants/Const';

import $ from 'jquery'

export default class Bonus extends Component {

    static get defaultProps() {
        return {
            data: {},
            stageWidth: 0,
            stageHeight: 0
        };
    }

    static get propTypes() {
        return {
            data: PropTypes.object,
            stageWidth: PropTypes.number,
            stageHeight: PropTypes.number
        };
    }

    render() {
        const { data } = this.props;
        const styles = {
            left: data.x,
            top: data.y,
            width: data.width,
            height: data.height
        };

        return (
            <div
                ref='bonus'
                className={ cx('bonus', {
                        'fuel': data.key === CONST.BONUS.FUEL.TYPE,
                        'medikit': data.key === CONST.BONUS.MEDIKIT.TYPE,
                        'blue-laser': data.key === CONST.BONUS.BLUE_LASER.TYPE,
                        'yellow-laser': data.key === CONST.BONUS.YELLOW_LASER.TYPE,
                        'shield-1': data.key === CONST.BONUS.SHIELD_1.TYPE,
                        'shotgun': data.key === CONST.BONUS.SHOTGUN.TYPE
                    })
                }
                style={ styles } />
        );
    }

    componentDidMount() {
        const { data, stageWidth, stageHeight } = this.props;
        let { bonus } = this.refs;

        let img = new Image();
        img.src = data.sprite;
        img.onload = () => {
            this.props.bonusActions.setup(data.key, img.width, img.height, stageWidth, stageHeight);
            $(bonus).css({
                backgroundImage: `url(${img.src})`
            });
        }
    }

}