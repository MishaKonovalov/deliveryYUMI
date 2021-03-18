import React from 'react'
import './app-header.css'
import { NavLink } from 'react-router-dom'
import pic from './logo.png'
import { connect } from 'react-redux'
import { toggleBasket } from '../../../store/actions/actionsTypes'

function AppHeader(props) {
    const cls = ['fas']
    if (props.openBasket || props.openOrderingWindow) {
        cls.push('fa-times')
        cls.push('open')
    } else {
        cls.push('fa-shopping-cart')
    }

    const numberOfProducts =
        props.numberOfProducts === 0 ? null : (
            <span>{props.numberOfProducts}</span>
        )
    return (
        <div className="header-wrapper">
            <header className="header">
                <NavLink to={'/'}>
                    <div className="logo">
                        <img
                            alt="logo"
                            src={pic}
                            style={{
                                maxHeight: 73,
                                maxWidth: 227,
                            }}
                        />
                    </div>
                </NavLink>
                <div className="cart">
                    {!props.openOrderingWindow ? (
                        <i
                            className={cls.join(' ')}
                            onClick={props.toggleBasket}
                        >
                            <span>{numberOfProducts}</span>
                        </i>
                    ) : null}
                </div>
                <div className="title">
                    <h1>Доставка ресторана Юми</h1>
                </div>
                <div className="arrow" onClick={props.scrollTo}>
                    Выбрать любимые блюда
                    <i className="fal fa-arrow-down"></i>
                </div>
            </header>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        openBasket: state.basket.openBasket,
        openOrderingWindow: state.basket.openOrderingWindow,
        numberOfProducts: state.basket.basket.length,
    }
}

const mapDispatchToProps = {
    toggleBasket,
}
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
