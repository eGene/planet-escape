import React, { PropTypes, Component } from 'react'
import { CONST } from '../constants/Const';
import $ from 'jquery'

export default class Enemy extends Component {

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

    constructor(...args) {
        super(...args);
        this.state = {};
    }

    render() {
        const { data } = this.props;
        let styles = {
            left: data.x,
            top: data.y,
            width: this.state.width || data.width,
            height: this.state.height || data.height,
            opacity: data.spawning ? 0.5 : 1,
            transform: `scaleX(${data.direction === CONST.DIRECTION.TO_RIGHT ? -1 : 1})`
        };

        if (!data.live && data.explode) {
            styles.backgroundImage = `url(${data.sprite})`;
        }

        return (
            <div
                ref='enemy'
                className='enemy'
                style={ styles } />
        );
    }

    componentWillReceiveProps(nextProps) {
        const { data } = nextProps;
        if (data.sprite !== this.props.data.sprite) {
            let img = new Image();
            img.src = data.sprite;
            img.onload = () => {
                this.setState({
                    width: img.width,
                    height: img.height
                });
            }
        }
    }

    componentDidMount() {
        const { data } = this.props;
        let { enemy } = this.refs;

        let img = new Image();
        img.src = data.sprite;
        img.onload = () => {
            this.props.enemyActions.setup(data.key, img.width, img.height);
            $(enemy).css({
                backgroundImage: `url(${data.sprite})`
            });
        }
    }

}