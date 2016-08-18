import React, { PropTypes, Component } from 'react'
import cx from 'classnames'
import appState from '../store/appState'
import Astronaut from './Astronaut'
import Bonus from './Bonus'
import Enemy from './Enemy'
import Fire from './Fire'
import Obstacle from './Obstacle'
import Spaceship from './Spaceship'
import { CONST } from '../constants/Const'

import $ from 'jquery'

const GAME_ENGINE_INTERVAL = 10;

function isCollision(rect1, rect2) {
    return !(rect1.x > rect2.x + rect2.width || rect1.x + rect1.width < rect2.x || rect1.y > rect2.y + rect2.height || rect1.y + rect1.height < rect2.y);
}

function normalize(point, scale) {
    let norm = Math.sqrt(point.x * point.x + point.y * point.y);
    let newPoint = {};
    if (norm !== 0) {
        newPoint.x = scale * point.x / norm;
        newPoint.y = scale * point.y / norm;
    }
    return newPoint;
}

export default class Stage extends Component {

    static get defaultProps() {
        return {
            astronaut: {},
            bonuses: {},
            spaceship: {},
            obstacles: {},
            enemies: {},
            fires: {}
        };
    }

    static get propTypes() {
        return {
            astronaut: PropTypes.object,
            bonuces: PropTypes.object,
            spaceship: PropTypes.object,
            obstacles: PropTypes.object,
            enemies: PropTypes.object,
            fires: PropTypes.object
        };
    }

    constructor(...args) {
        super(...args);
        this.lastTickTime = Date.now();

        this.tickers = {
            move: 0,
            key: 0,
            gravity: 0,
            enemies: 0,
            bonuses: 0,
            collision: 0
        };

        this.holdingLeft = false;
        this.holdingRight = false;
        this.holdingUp = false;
        this.holdingDown = false;
        this.holdingSpace = false;
        this.mouseEvent = false;
        this.enableTouch = 'ontouchstart' in window || navigator.maxTouchPoints;
        this.touchVector = {};

        this.spaceshipType = CONST.SPACESHIP.ROCKET.TYPE;
    }

    componentDidMount() {
        const { stage, astronautActions } = this.props;
        let stageElement = this.refs.stage;

        $(stageElement).css({
            width: stage.width,
            height: stage.height
        });

        this.gameEngineTimer = setTimeout(::this.gameEngineStep, GAME_ENGINE_INTERVAL);

        this.startAnimation();

        $(document).on('keydown', ::this.handleKeyDown);
        $(document).on('keyup', ::this.handleKeyUp);
        $(document).on('mousemove', ::this.mouseMove);

        setTimeout(astronautActions.completeSpawning, 3000);
    }

    shouldComponentUpdate() {
        const { stage } = this.props;
        return !stage.gameStarted;
    }

    render() {
        const { astronaut, astronautActions, enemies, fires, stage, spaceship, spaceshipActions, bonuses, obstacles } = this.props;
        const style = {
            container: {
                width: stage.width,
                height: stage.height
            },
            stage: {
                backgroundImage: `url(${stage.background})`,
                width: stage.width,
                height: stage.height
            }
        };

        return (
            <div className='container' style={ style.container }>
                {
                    stage.gameStarted &&
                        <div
                            ref='stage'
                            className={ cx('stage', { 'not-started': !stage.gameStarted, 'paused': stage.paused }) }
                            style={ style.stage }>
                            <div className='status-bar'>
                                <span className='section'>Level: { stage.level }</span>
                                <span className='section'>Lives: { astronaut.lives }</span>
                                <span className='section'>Score: { astronaut.score }</span>
                                <div className='section'>Gems: { this.renderGems() }</div>
                            </div>
                            {
                                !astronaut.flyingSpaceship && <Astronaut
                                    key='astronaut'
                                    data={ astronaut }
                                    stageWidth={ stage.width }
                                    stageHeight={ stage.height }

                                    astronautActions={ astronautActions } />
                            }
                            <Spaceship
                                key='spaceship'
                                data={ spaceship }
                                stageWidth={ stage.width }
                                stageHeight={ stage.height }
                                type={ this.spaceshipType }

                                spaceshipActions={ spaceshipActions } />
                            { Object.keys(enemies).length && this.renderEnemies() }
                            { Object.keys(fires).length && this.renderFires() }
                            { Object.keys(bonuses).length && this.renderBonuses() }
                            { stage.level > 0 && obstacles.level[stage.level] && obstacles.level[stage.level].static.length && this.renderObstacles() }
                            { this.enableTouch && this.renderTouchControls() }
                        </div> 
                }
                { stage.gameComplete && this.renderGameCompleteScreen() }
                { stage.gameOver && !stage.gameComplete && this.renderGameOverScreen() }
                { !stage.gameOver && !stage.paused && !stage.gameStarted && !stage.gameComplete && this.renderStartScreen() }
                { stage.paused && !stage.gameOver && this.renderPauseScreen() }
            </div>
        );
    }

    controlPinTouch = (e) => {
        const touches = e.targetTouches;
        const { astronaut, astronautActions } = this.props;

        if (touches.length > 0) {
            let { leftControls } = this.refs;
            const rect = leftControls.getBoundingClientRect();
            const vx = touches[0].clientX - (rect.left + rect.width / 2);
            const vy = touches[0].clientY - (rect.top + rect.height / 2);
            const vector = {x: vx / (rect.width / 2), y: vy / (rect.height / 2)};
            this.touchVector = { x: vector.x * (rect.width / 2), y: vector.y * (rect.height / 2) };
            if (!astronaut.flyingSpaceship) {
                if (Math.abs(vector.x) > 0.2) {
                    this.holdingLeft = vector.x < 0;
                    this.holdingRight = vector.x > 0;
                }

                if (Math.abs(vector.y) > 0.2) {
                    this.holdingUp = vector.y < 0;
                    this.holdingDown = vector.y > 0 && (astronaut.y < astronaut.maxY - astronaut.height && astronaut.y > 0 && !this.astronautIsOnObstacle()) && astronautActions.decYSpeed();
                }
            }
        }
    }

    controlPinTouchEnd = () => {
        this.holdingLeft = false;
        this.holdingRight = false;
        this.holdingUp = false;
        this.holdingDown = false;
    }

    controlFireTouch = () => {
        this.holdingSpace = true;
    }

    controlFireTouchEnd = () => {
        this.holdingSpace = false;
    }

    renderTouchControls() {
        const style = {
            left: this.touchVector.x || 0,
            top: this.touchVector.y || 0
        }

        return (
            <div className='touch-controls-wrapper'>
                <div ref='leftControls' className='left-controls' onTouchStart={ this.controlPinTouch } onTouchMove={ this.controlPinTouch } onTouchEnd={ this.controlPinTouchEnd }>
                    <div className='control-pin' style={ style }/>
                </div>
                <div className='right-controls' onTouchStart={ this.controlFireTouch } onTouchMove={ this.controlFireTouch } onTouchEnd={ this.controlFireTouchEnd }>
                    <div className='control-fire'/>
                </div>
            </div>
        );
    }

    renderGems() {
        const { stage } = this.props;
        const { gems } = stage;

        return gems.map((gem, iGem) => {
            const style = { opacity: gem.collected ? 1 : 0.3 };
            return <img key={ iGem } src={ gem.data.SPRITE } className='gem' style={ style }/>
        });
    }

    renderGameCompleteScreen() {
        const { stage } = this.props;
        const style = {
            background: { backgroundImage : `url(${stage.startScreen.background})` }
        };

        return (
            <div className='gamecomplete-screen'>
                <div className='background' style={ style.background }></div>
                <div className='content'>
                    <div className='section'>
                        <b>Congratulations, you won!</b>
                    </div>
                    <div className='section controls'>
                        <button onClick={ this.startGame.bind(this, 1) }>Start Over</button>
                    </div>
                    <div className='section info'>
                        Score: { stage.latestAchievement.score }
                    </div>
                </div>
            </div>
        )
    }

    renderGameOverScreen() {
        const { stage } = this.props;
        const style = {
            background: { backgroundImage : `url(${stage.startScreen.background})` }
        };

        return (
            <div className='gameover-screen'>
                <div className='background' style={ style.background }></div>
                <div className='content'>
                    <div className='section'>
                        <b>Game Over</b>
                    </div>
                    <div className='section controls'>
                        <button onClick={ this.tryAgain }>Try Again</button>
                    </div>
                    <div className='section info'>
                        Score: { stage.latestAchievement.score }
                    </div>
                </div>
            </div>
        )
    }

    renderStartScreen() {
        const { stage } = this.props;
        const style = {
            container: {
                width: stage.width,
                height: stage.height
            },
            background: { backgroundImage : `url(${stage.startScreen.background})` }
        };
        const lastLevel = appState.getLastLevel();
        let levels = [];
        for (let iLevel = 1; iLevel <= stage.maxLevel; iLevel++) {
            levels.push({
                number: iLevel,
                class: iLevel <= lastLevel ? 'available' : 'inavailable'
            });
        }

        return (
            <div className='start-screen' style={ style.container }>
                <div className='background' style={ style.background }></div>
                <div className='content'>
                    <div className='game-title'><h1>Planet Escape</h1></div>
                    <div className='level-selection'>
                        <div className='header'>Select a level to start</div>
                        <div className='levels'>
                            {
                                levels.map(level => {
                                    const gems = appState.getLevelGems(level.number);
                                    return (
                                        <div key={ level.number } className={ cx('level', level.class) } onClick={ level.class === 'available' ? this.startGame.bind(this, level.number) : () => {} }>
                                            <span>{ level.number }</span>
                                            <div className='gems'>
                                                { gems.map((gem, iGem) => <img key={ iGem } src={ CONST.BONUS.GEMS[gem.type].SPRITE }/>) }
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div><input type='checkbox' defaultChecked={ this.enableTouch } onClick={ (e) => {this.enableTouch = $(e.target)[0].checked} }/> Enable touch controls</div>
                    </div>
                </div>
            </div>
        )
    }

    renderBonuses() {
        const { bonuses, bonusActions, stage } = this.props;

        return (
            Object.keys(bonuses).map(key => {
                const bonus = bonuses[key];
                if (key === CONST.BONUS.FUEL.TYPE && !bonus.carried || key !== CONST.BONUS.FUEL.TYPE) {
                    return (
                        <Bonus
                            key={ key }
                            data={ { ...bonus, key } }
                            type={ bonus.type }
                            stageWidth={ stage.width }
                            stageHeight={ stage.height }

                            bonusActions={ bonusActions } /> : null
                    );
                } else {
                    return null;
                }
            })
        );
    }

    renderEnemies() {
        const { enemies, enemyActions, stage } = this.props;
        return (
            Object.keys(enemies).map(key => {
                const enemy = enemies[key];
                return (
                    <Enemy
                        key={ key }
                        data={ { ...enemy, key } }
                        stageWidth={ stage.width }
                        stageHeight={ stage.height }

                        enemyActions={ enemyActions } />
                );
            })
        );
    }

    renderFires() {
        const { fires, fireActions, stage } = this.props;
        return (
            Object.keys(fires).map(key => {
                const fire = fires[key];
                return (
                    <Fire
                        key={ key }
                        data={ {...fire, key } }
                        stageWidth={ stage.width }
                        stageHeight={ stage.height }

                        fireActions={ fireActions } />
                );
            })
        );
    }

    renderObstacles() {
        const { stage, obstacles } = this.props;
        return (
            obstacles.level[stage.level].static.map((obstacle, idx) => {
                return (
                    <Obstacle
                        key={ idx }
                        data={ obstacle } />
                );
            })
        );
    }

    componentWillUnmount() {
        if (this.gameEngineTimer) {
            clearInterval(this.gameEngineTimer);
            delete this.gameEngineTimer;
        }
        $(document).off('keydown');
        $(document).off('keyup');
    }

    tryAgain = () => {
        document.location.reload();
    }

    startGame = (level = 1) => {
        const { stage, astronautActions, stageActions, enemies, bonuses, enemyActions, bonusActions } = this.props;
        const settings = stage.settings.levels[level];
        Object.keys(enemies).forEach(key => {
            enemyActions.die(key);
        });
        Object.keys(bonuses).forEach(key => {
            bonusActions.remove(key);
        });
        stageActions.startGame(settings);
        astronautActions.spawn();
        setTimeout(astronautActions.completeSpawning, 3000);
    }

    getStageSettings() {
        const { stage } = this.props;
        return stage.settings.levels[stage.level];
    }

    astronautIsOnObstacle() {
        const { astronaut, obstacles, stage } = this.props;
        let isOnObstacle = false;
        for (let i = 0; i < obstacles.level[stage.level].static.length && !isOnObstacle; i++) {
            let o = obstacles.level[stage.level].static[i];
            isOnObstacle = isCollision({
                x: astronaut.x,
                y: astronaut.y + 1,
                width: astronaut.width,
                height: astronaut.height
            }, {
                x: o.x,
                y: o.y,
                width: o.width,
                height: o.height
            });
        }
        return isOnObstacle;
    }

    astronautIsUnderObstacle() {
        const { astronaut, obstacles, stage } = this.props;
        let isUnderObstacle = false;
        for (let i = 0; i < obstacles.level[stage.level].static.length && !isUnderObstacle; i++) {
            let o = obstacles.level[stage.level].static[i];
            isUnderObstacle = isCollision({
                x: astronaut.x,
                y: astronaut.y - 1,
                width: astronaut.width,
                height: astronaut.height
            }, {
                x: o.x,
                y: o.y,
                width: o.width,
                height: o.height
            });
        }
        return isUnderObstacle;
    }

    astronautIsOnLeftFromObstacle() {
        const { astronaut, obstacles, stage } = this.props;
        let isOnLeftFromObstacle = false;
        for (let i = 0; i < obstacles.level[stage.level].static.length && !isOnLeftFromObstacle; i++) {
            let o = obstacles.level[stage.level].static[i];
            isOnLeftFromObstacle = isCollision({
                x: astronaut.x + 1,
                y: astronaut.y,
                width: astronaut.width,
                height: astronaut.height
            }, {
                x: o.x,
                y: o.y,
                width: o.width,
                height: o.height
            });
        }
        return isOnLeftFromObstacle;
    }

    astronautIsOnRightFromObstacle() {
        const { astronaut, obstacles, stage } = this.props;
        let isOnRightFromObstacle = false;
        for (let i = 0; i < obstacles.level[stage.level].static.length && !isOnRightFromObstacle; i++) {
            let o = obstacles.level[stage.level].static[i];
            isOnRightFromObstacle = isCollision({
                x: astronaut.x - 1,
                y: astronaut.y,
                width: astronaut.width,
                height: astronaut.height
            }, {
                x: o.x,
                y: o.y,
                width: o.width,
                height: o.height
            });
        }
        return isOnRightFromObstacle;
    }

    moveAstronaut() {
        const { astronaut, astronautActions, obstacles, stage } = this.props;
        let hasXCollision = false;
        let hasYCollision = false;
        let hasXYCollision = false;

        for (let i = 0; i < obstacles.level[stage.level].static.length && !(hasXCollision && hasYCollision); i++) {
            const o = obstacles.level[stage.level].static[i];
            let a;

            if (astronaut.xSpeed) {
                a = {
                    x: astronaut.x + astronaut.xSpeed,
                    y: astronaut.y,
                    width: astronaut.width,
                    height: astronaut.height
                }
                if (isCollision(a, o)) {
                    hasXCollision = true;
                }
            }

            if (astronaut.ySpeed) {
                a = {
                    x: astronaut.x,
                    y: astronaut.y - astronaut.ySpeed,
                    width: astronaut.width,
                    height: astronaut.height
                }
                if (isCollision(a, o)) {
                    hasYCollision = true;
                }
            }

            if (astronaut.xSpeed && astronaut.ySpeed) {
                a = {
                    x: astronaut.x + astronaut.xSpeed,
                    y: astronaut.y - astronaut.ySpeed,
                    width: astronaut.width,
                    height: astronaut.height
                }
                if (isCollision(a, o)) {
                    hasXYCollision = true;
                }
            }
        }

        if (hasXCollision || hasYCollision || hasXYCollision) {
            astronautActions.collisionObstacle(hasXCollision || hasXYCollision, hasYCollision || hasXYCollision);
        }

        if (astronaut.xSpeed && !hasXCollision && !hasXYCollision) {
            astronautActions.moveX(astronaut.xSpeed);
        }

        if (astronaut.ySpeed && !hasYCollision && !hasXYCollision) {
            astronautActions.moveY(astronaut.ySpeed);
        }
    }

    moveEnemy(key, enemy) {
        const { enemyActions, obstacles, stage } = this.props;
        let hasXCollision = false;
        let hasYCollision = false;

        for (let i = 0; i < obstacles.level[stage.level].static.length && !(hasXCollision && hasYCollision); i++) {
            const o = obstacles.level[stage.level].static[i];
            let e;

            if (enemy.xSpeed) {
                e = {
                    x: enemy.x + enemy.xSpeed,
                    y: enemy.y,
                    width: enemy.width,
                    height: enemy.height
                }
                if (isCollision(e, o)) {
                    hasXCollision = true;
                }
            }

            if (enemy.ySpeed) {
                e = {
                    x: enemy.x,
                    y: enemy.y + enemy.ySpeed,
                    width: enemy.width,
                    height: enemy.height
                }
                if (isCollision(e, o)) {
                    hasYCollision = true;
                }
            }
        }

        if (hasXCollision || hasYCollision) {
            enemyActions.collisionObstacle(key, hasXCollision, hasYCollision);
        }

        if (enemy.xSpeed && !hasXCollision) {
            enemyActions.moveX(key, enemy.xSpeed);
        }

        if (enemy.ySpeed && !hasYCollision) {
            enemyActions.moveY(key, enemy.ySpeed);
        }
    }

    moveFire(key, fire) {
        const { fireActions, obstacles, stage } = this.props;
        let hasXCollision = false;
        let hasYCollision = false;

        for (let i = 0; i < obstacles.level[stage.level].static.length && !(hasXCollision && hasYCollision); i++) {
            const o = obstacles.level[stage.level].static[i];
            let e;

            if (fire.xSpeed) {
                e = {
                    x: fire.x,
                    y: fire.y,
                    width: fire.weapon.width,
                    height: fire.weapon.height
                }
                if (isCollision(e, o)) {
                    hasXCollision = true;
                }
            }

            if (fire.ySpeed) {
                e = {
                    x: fire.x,
                    y: fire.y,
                    width: fire.weapon.width,
                    height: fire.weapon.height
                }
                if (isCollision(e, o)) {
                    hasYCollision = true;
                }
            }
        }

        if (hasXCollision || hasYCollision) {
            fireActions.collisionObstacle(key, hasXCollision, hasYCollision);
        }

        if (fire.xSpeed && !hasXCollision) {
            fireActions.moveX(key, fire.xSpeed);
        }

        if (fire.ySpeed && !hasYCollision) {
            fireActions.moveY(key, fire.ySpeed);
        }
    }

    handleMoveTicker() {
        const { astronaut, enemies, fires, spaceship, spaceshipActions, enemyActions } = this.props;

        if (this.tickers.move >= 30) {
            this.tickers.move = 0;
            if (!astronaut.flyingSpaceship) {
                this.moveAstronaut();
            }
            
            Object.keys(enemies).forEach(key => {
                const enemy = enemies[key];
                this.moveEnemy(key, enemy);
                if (typeof enemy.homingRadius !== 'undefined') {
                    const { homingRadius } = enemy;
                    const dx = Math.pow(astronaut.x + astronaut.width / 2 - (enemy.x + enemy.width / 2), 2);
                    const dy = Math.pow(astronaut.y + astronaut.height / 2 - (enemy.y + enemy.height / 2), 2);
                    if (Math.sqrt(dx + dy) < homingRadius) {
                        const vx = astronaut.x + astronaut.width / 2 - (enemy.x + enemy.width / 2);
                        const vy = astronaut.y + astronaut.height / 2 - (enemy.y + enemy.height / 2);
                        const vector = normalize({x: vx, y: vy}, 1);
                        enemyActions.adjustSpeed(key, vector);
                    }
                }
            });

            Object.keys(fires).forEach(key => {
                const fire = fires[key];
                this.moveFire(key, fire);
            });

            if (spaceship.flying) {
                spaceshipActions.depart();
            }
        }
    }

    handleKeyTicker() {
        const { astronaut, astronautActions, fires, fireActions, stage } = this.props;
        const defaultRayWidth = 30;
        const defaultRayHeight = 1;
        const defaultRaySpeed = 20;

        const rayWidth = astronaut.weapon.width || defaultRayWidth;
        const rayHeight = astronaut.weapon.height || defaultRayHeight;
        const raySpeed = astronaut.weapon.speed || defaultRaySpeed;

        if (this.tickers.key >= 100) {
            this.tickers.key = 0;

            astronautActions.throttle(this.holdingLeft || this.holdingRight || this.holdingUp || this.holdingDown);

            this.holdingLeft && !astronaut.flyingSpaceship && !this.astronautIsOnRightFromObstacle() && astronautActions.decXSpeed();
            this.holdingUp && !astronaut.flyingSpaceship && !this.astronautIsUnderObstacle() && astronautActions.incYSpeed();
            this.holdingRight && !astronaut.flyingSpaceship && !this.astronautIsOnLeftFromObstacle() && astronautActions.incXSpeed();
            this.holdingDown && !astronaut.flyingSpaceship && (astronaut.y < astronaut.maxY - astronaut.height && astronaut.y > 0 && !this.astronautIsOnObstacle()) && astronautActions.decYSpeed();
            if (this.holdingSpace && !astronaut.flyingSpaceship && astronaut.live && Object.keys(fires).length < astronaut.weapon.maxFires) {
                fireActions.fire(
                    astronaut.x + (astronaut.direction === 'ltr' ? astronaut.width : -rayWidth),
                    astronaut.y + astronaut.height / 2 + 2,
                    astronaut.direction === 'ltr' ? raySpeed : -raySpeed,
                    stage.width,
                    stage.height,
                    Object.assign({}, astronaut.weapon, { width: rayWidth, height: rayHeight })
                );
                if (astronaut.weapon.type === CONST.BONUS.SHOTGUN.TYPE) {
                    if (astronaut.direction === 'ltr') {
                        astronautActions.decXSpeed(false);
                    } else {
                        astronautActions.incXSpeed(false);
                    }
                }
            }

            if (this.mouseEvent) {
                const vx = this.mouseEvent.offsetX - astronaut.x;
                const vy = this.mouseEvent.offsetY - astronaut.y;
                const vector = normalize({x: vx, y: vy}, 1);
                if (Math.abs(vector.x) > 0.2) {
                    vector.x < 0 && !astronaut.flyingSpaceship && !this.astronautIsOnRightFromObstacle() && astronautActions.decXSpeed();
                    vector.x > 0 && !astronaut.flyingSpaceship && !this.astronautIsOnLeftFromObstacle() && astronautActions.incXSpeed();
                }
                if (Math.abs(vector.y) > 0.2) {
                    vector.y < 0 && !astronaut.flyingSpaceship && !this.astronautIsUnderObstacle() && astronautActions.incYSpeed();
                    vector.y > 0 && !astronaut.flyingSpaceship && (astronaut.y < astronaut.maxY - astronaut.height && astronaut.y > 0 && !this.astronautIsOnObstacle()) && astronautActions.decYSpeed();
                }
            }
        }
    }

    handleGravityTicker() {
        const { astronautActions } = this.props;

        if (this.tickers.gravity >= 300) {
            this.tickers.gravity = 0;
            !this.astronautIsOnObstacle() && astronautActions.decYSpeed(0.3);
        }
    }

    handleEnemiesTicker() {
        const { astronaut, enemies, enemyActions, stage } = this.props;
        const stageSettings = this.getStageSettings();

        if (this.tickers.enemies >= 250) {
            this.tickers.enemies = 0;
            const enemySettings = stageSettings.enemies[Math.floor(Math.random() * stageSettings.enemies.length)];
            if (enemySettings && !astronaut.flyingSpaceship && Object.keys(enemies).filter(key => enemies[key].type === enemySettings.type).length < enemySettings.maxEnemies) {
                if (Math.random() < CONST.CHANCE.SPAWN_ENEMY) {
                    const key = Date.now();
                    enemyActions.spawn(key, {
                        type: enemySettings.type,
                        damage: enemySettings.damage,
                        gemChance: enemySettings.gemChance || 0,
                        dieSprite: enemySettings.dieSprite,
                        minSpeed: enemySettings.minSpeed,
                        maxSpeed: enemySettings.maxSpeed,
                        homingRadius: enemySettings.homingRadius,
                        maxX: stage.width,
                        maxY: stage.height
                    });
                    setTimeout(() => {
                        !this.props.astronaut.flyingSpaceship && enemyActions.completeSpawning(key);
                    }, 1000);
                } 
            }
        }
    }

    handleBonusesTicker() {
        const { bonuses, bonusActions, spaceship, stage } = this.props;
        let { obstacles } = this.props;

        obstacles = obstacles.level[stage.level].static;

        if (this.tickers.bonuses >= 1000) {
            this.tickers.bonuses = 0;

            let where = Math.floor(Math.random() * (obstacles.length + 1));
            let o, x, y;

            if (where >= obstacles.length) {
                x = stage.width * Math.random() / 2;
                y = stage.height;
            } else {
                o = obstacles[where];
                x = o.x + o.width / 2 - 15;
                y = o.y;
                let collision = false;
                let keys = Object.keys(bonuses);
                for (let i = 0; i < keys.length && !collision; i++) {
                    collision = isCollision({ x, y, width: 10, height: 10}, bonuses[keys[i]]);
                }
                if (collision) {
                    x = stage.width * Math.random() / 2;
                    y = stage.height;
                }
            }

            if (!bonuses[CONST.BONUS.FUEL.TYPE] && spaceship.fuelLevel < spaceship.maxFuel && Math.random() < CONST.CHANCE.SPAWN_FUEL) {
                bonusActions.spawn(CONST.BONUS.FUEL.TYPE, x, y);
            }

            this.spawnBonuses(0.2);
        }
    }

    spawnBonuses(multiplier = 1) {
        const { bonuses, stage, bonusActions } = this.props;
        const stageSettings = this.getStageSettings();
        let { obstacles } = this.props;

        obstacles = obstacles.level[stage.level].static;

        stageSettings.bonuses.forEach(bonus => {
            const key = bonus.type;
            if (!bonuses[key] && Math.random() < bonus.chance * multiplier) {
                let where = Math.floor(Math.random() * (obstacles.length + 1));
                let o, x, y;
                if (where >= obstacles.length) {
                    x = stage.width * Math.random() / 2;
                    y = stage.height;
                } else {
                    o = obstacles[where];
                    x = o.x + o.width / 2 - 15;
                    y = o.y;
                    let collision = false;
                    let keys = Object.keys(bonuses);
                    for (let i = 0; i < keys.length && !collision; i++) {
                        collision = isCollision({ x, y, width: 10, height: 10}, bonuses[keys[i]]);
                    }
                    if (collision) {
                        x = stage.width * Math.random() / 2;
                        y = stage.height;
                    }
                }
                bonusActions.spawn(key, x, y);
            }
        });
    }

    handleCollisionTicker() {
        const { stage, astronaut, astronautActions, enemies, enemyActions, fires, fireActions, bonuses, bonusActions, spaceship, spaceshipActions, stageActions } = this.props;
        let enemy;

        if (this.tickers.collision >= 50) {
            this.tickers.collision = 0;

            let damage = 0;

            Object.keys(enemies).forEach(key => {
                enemy = enemies[key];
                if (enemy.live && !enemy.spawning && !astronaut.flyingSpaceship && isCollision(enemy, astronaut)) {
                    damage += enemy.damage;
                }
            });

            if (damage > 0 && astronaut.live) {
                if (astronaut.energy > damage) {
                    astronautActions.collisionEnemy(damage);
                } else {
                    const lives = astronaut.lives;
                    astronautActions.collisionEnemy(damage - astronaut.energy);
                    astronautActions.die();
                    astronautActions.dropFuel();
                    bonuses[CONST.BONUS.FUEL.TYPE] && bonuses[CONST.BONUS.FUEL.TYPE].carried && bonusActions.remove(CONST.BONUS.FUEL.TYPE);
                    if (lives > 0) {
                        setTimeout(astronautActions.spawn, 1000);
                        setTimeout(astronautActions.completeSpawning, 4000);
                    } else {
                        setTimeout(() => {
                            stageActions.gameOver(astronaut.score);
                            astronautActions.restart(stage.settings.lives);
                            Object.keys(enemies).forEach(key => {
                                enemyActions.die(key);
                            });
                        }, 1000);
                    }
                }
            }

            if (!astronaut.spawning) {
                Object.keys(bonuses).forEach(key => {
                    let bonus = bonuses[key];
                    if (!bonus.carried && isCollision(bonus, astronaut)) {
                        if (bonus.isGem) {
                            astronautActions.addScore(CONST.SCORE.GEM);
                            stageActions.collectGem(key);
                        }
                        bonusActions.collisionAstronaut(key);
                        if (key === CONST.BONUS.FUEL.TYPE) {
                            astronautActions.collisionFuel(bonus.fuel);
                        } else {
                            astronautActions.collisionBonus(key);
                        }
                    }
                    if (key === CONST.BONUS.FUEL.TYPE && bonus.carried && astronaut.fuel > 0 && isCollision(astronaut, spaceship)) {
                        astronautActions.dropFuel();
                        spaceshipActions.addFuel(astronaut.fuel);
                        bonusActions.remove(key);
                    }
                });
            }

            Object.keys(enemies).forEach(eKey => {
                enemy = enemies[eKey];
                Object.keys(fires).forEach(fKey => {
                    const fire = fires[fKey];
                    const collision = enemy.live && !enemy.spawning && isCollision(enemy, Object.assign({}, fire, { width: fire.weapon.width, height: fire.weapon.height }));
                    if (collision) {
                        const { gemChance = 0, x, y, width, height } = enemy;
                        enemyActions.collisionFire(eKey);
                        fireActions.collisionEnemy(fKey);
                        astronautActions.addScore(enemy.score);
                        setTimeout(() => {
                            let nextGem = null;
                            for (let iGem = 0; iGem < stage.gems.length && !nextGem; iGem++) {
                                if (!stage.gems[iGem].spawned) {
                                    nextGem = stage.gems[iGem].data;
                                }
                            }
                            if (gemChance && nextGem && Math.random() < gemChance) {
                                stageActions.spawnGem(nextGem.TYPE);
                                bonusActions.spawn(nextGem.TYPE, x + width / 2, y + height / 2);
                            }
                            enemyActions.die(eKey);
                            this.spawnBonuses();
                        }, 750);
                    }
                })
            });

            if (spaceship.maxFuel <= spaceship.fuelLevel && !astronaut.flyingSpaceship && isCollision(astronaut, spaceship)) {
                astronautActions.flySpaceship();
                spaceshipActions.fly();
                Object.keys(enemies).forEach(key => {
                    enemyActions.die(key);
                });
                Object.keys(bonuses).forEach(key => {
                    bonusActions.remove(key);
                });
                setTimeout(() => {
                    astronautActions.spawn();
                    spaceshipActions.restart();
                    if (stage.level <= stage.maxLevel) {
                        const lastLevel = appState.getLastLevel();
                        if (!lastLevel || lastLevel <= stage.level + 1) {
                            appState.setLastLevel(stage.level + 1);
                        }
                    }
                    const prevCollectedGems = appState.getLevelGems(stage.level);
                    const collectedGems = stage.gems.filter(gem => gem.collected).map(gem => { return { type: gem.data.TYPE } });
                    if (prevCollectedGems.length <= collectedGems.length) {
                        appState.setLevelGems(stage.level, collectedGems);
                    }
                    stageActions.nextLevel(astronaut.score, stage.settings.levels[stage.level + 1]);
                    setTimeout(astronautActions.completeSpawning, 3000);
                }, 5000);
            }
        }
    }

    startAnimation() {
        let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        requestAnimationFrame(::this.startAnimation);
        this.forceUpdate();
    }

    gameEngineStep() {
        const { stage } = this.props;
        if (stage.gameStarted && !stage.paused) {
            const now = Date.now();

            Object.keys(this.tickers).forEach(ticker => {
                this.tickers[ticker] += (now - this.lastTickTime);
            });

            this.lastTickTime = now;

            this.handleMoveTicker();
            this.handleKeyTicker();
            this.handleGravityTicker();
            this.handleEnemiesTicker();
            this.handleBonusesTicker();
            this.handleCollisionTicker();
        }

        this.gameEngineTimer = setTimeout(::this.gameEngineStep, GAME_ENGINE_INTERVAL);
    }

    handleKeyDown(e) {
        // console.log('keydown', e.keyCode);
        switch (e.keyCode) {
            case 37: // Left
                this.holdingLeft = true;
                break;

            case 38: // Up
                this.holdingUp = true;
                break;

            case 39: // Right
                this.holdingRight = true;
                break;

            case 40: // Down
                this.holdingDown = true;
                break;

            case 32: // Space
                this.holdingSpace = true;
                break;
        }
    }

    handleKeyUp(e) {
        // console.log('keyup', e.keyCode);
        switch (e.keyCode) {
            case 37: // Left
                this.holdingLeft = false;
                break;

            case 38: // Up
                this.holdingUp = false;
                break;

            case 39: // Right
                this.holdingRight = false;
                break;

            case 40: // Down
                this.holdingDown = false;
                break;

            case 32: // Space
                this.holdingSpace = false;
                break;
        }
    }

    mouseMove(e) {
        e.stopPropagation();
        //this.mouseEvent = e;
    }

}