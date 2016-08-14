import React, { PropTypes, Component } from 'react'
import cx from 'classnames'
import $ from 'jquery'
import { CONST } from '../constants/Const';

export default class Stage extends Component {

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
            wrapper: {
                left: data.x,
                top: data.y,
                width: data.width,
                height: data.height
            },
            astronaut: {
                transform: data.live ? `scaleX(${data.direction === 'ltr' ? 1 : -1})` : `rotate(${360 * Math.random()}deg)`,
                width: data.width,
                height: data.height,
                opacity: data.spawning ? 0.5 : 1
            },
            energy: {
                width: data.energy + '%'
            }
        };

        return (
            <div className='astronaut-wrapper' style={ styles.wrapper }>
                <div className={ cx('astronaut-energy', {
                    'low-energy': data.energy <= 50
                }) } style={ styles.energy }/>
                <div
                    ref='astronaut'
                    className='astronaut'
                    style={ styles.astronaut }>
                    {
                        data.shield === CONST.BONUS.SHIELD_1.TYPE && [1,2,3,4].map((idx) => {
                            const shieldStyle = { opacity: data.shieldEnergy / data.maxShieldEnergy }
                            return <div key={ idx } className='shield-1-circle' style={ shieldStyle }/>
                        })
                    }
                </div>
                { data.fuel > 0 && <div className='astronaut-fuel'/> }
            </div>
        );
    }

    componentWillUpdate(nextProps) {
        const { data } = nextProps;
        let { astronaut } = this.refs;

        if (data.isThrottling) {
            $(astronaut).css({
                backgroundImage: `url(${data.sprite.moving})`
            });
        } else {
            $(astronaut).css({
                backgroundImage: `url(${data.sprite.still})`
            });
        }
    }

    componentDidMount() {
        const { data, stageWidth, stageHeight } = this.props;
        let { astronaut } = this.refs;

        let img = new Image();
        img.src = data.sprite.still;
        img.onload = () => {
            this.props.astronautActions.setup((stageWidth - img.width) / 2, stageHeight - img.height, img.width, img.height, stageWidth, stageHeight);
            $(astronaut).css({
                backgroundImage: `url(${data.sprite.still}`
            });
        }
    }

}