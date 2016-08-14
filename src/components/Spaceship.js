import React, { PropTypes, Component } from 'react'
import { CONST } from '../constants/Const';
import cx from 'classnames'

import $ from 'jquery'

export default class Spaceship extends Component {

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
        const { data, type } = this.props;
        const styles = {
            wrapper: {
                left: data.x,
                bottom: CONST.SPACESHIP[type].BOTTOM_OFFSET + (data.yOffset ? data.yOffset : 0),
                width: data.width

            },
            spaceship: {
                width: data.width,
                height: data.height
            }
        };

        return (
            <div className='spaceship-wrapper' style={ styles.wrapper }>
                <div className='fuel-wrapper'>
                    { this.renderFuel(data.fuelLevel, data.maxFuel) }
                </div>
                <div
                    ref='spaceship'
                    className='spaceship'
                    style={ styles.spaceship } />
            </div>
        );
    }

    renderFuel(fuelLevel, maxFuel) {
        let a = [];
        for(let i = 0; i < maxFuel; i++) {
            a.push(i < fuelLevel ? 'full' : 'empty');
        }
        return a.map((value, i) => <div key={ i } className={ cx('fuel', value) }/>)
    }

    componentDidMount() {
        const { stageWidth, stageHeight, type } = this.props;
        let { spaceship } = this.refs;

        let img = new Image();
        img.src = CONST.SPACESHIP[type].SPRITE;
        img.onload = () => {
            this.props.spaceshipActions.setup(stageWidth / 2 + stageWidth / 5 - img.width / 2, stageHeight - img.height + CONST.SPACESHIP[type].BOTTOM_OFFSET, img.width, img.height, stageHeight);
            $(spaceship).css({
                backgroundImage: `url(${img.src})`
            });
        }
    }

    componentWillUpdate(nextProps) {
        const { stageWidth, stageHeight, type } = nextProps;
        let { spaceship } = this.refs;

        if (nextProps.data.flying && !this.props.data.flying) {
            let img = new Image();
            img.src = CONST.SPACESHIP[type].SPRITE_FLYING;
            img.onload = () => {
                $(spaceship).css({
                    backgroundImage: `url(${img.src})`
                });
            }
        } else if (!nextProps.data.flying && this.props.data.flying) {
            let img = new Image();
            img.src = CONST.SPACESHIP[type].SPRITE;
            img.onload = () => {
                this.props.spaceshipActions.setup(stageWidth / 2 + stageWidth / 5 - img.width / 2, stageHeight - img.height + CONST.SPACESHIP[type].BOTTOM_OFFSET, img.width, img.height, stageHeight);
                $(spaceship).css({
                    backgroundImage: `url(${img.src})`
                });
            }
        }
    }

}