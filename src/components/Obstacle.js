import React, { PropTypes, Component } from 'react'

export default class Obstacle extends Component {

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
            width: data.width,
            height: data.height,
            backgroundImage: `url(${data.sprite})`
        };

        return (
            <div
                ref='obstacle'
                className='obstacle'
                style={ styles } />
        );
    }

}