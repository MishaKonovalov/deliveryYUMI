import React, { Component } from 'react'
import { connect } from 'react-redux'
import './products-page.css'
import Spinner from '../../../UI/spinner/spinner'
import Error from './Error/errorMassage'
import plus from './icons/plus.svg'
import minus from './icons/minus.svg'
//actions
import {
    fetchMenuItems,
    addToBasket,
    inc,
    dec,
} from '../../../store/actions/actionsTypes'

class ProductsPage extends Component {
    componentDidMount() {
        this.props.fetchMenuItems(this.props.url)
    }

    renderCard = () => {
        return this.props.products.map((item, index) => {
            const inStopList = (
                <div className="inStopList">
                    <span>Скоро появится</span>
                </div>
            )
            return (
                <div className={'card'} key={item.id}>
                    {item.stopList ? inStopList : null}
                    <div className={'wrapper-items'}>
                        <img src={item.url} alt="" />
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                        {item.stopList ? null : (
                            <>
                                <div className={'calc-panel'}>
                                    <h1 className={'price'}>
                                        {item.price} руб
                                    </h1>
                                    <button
                                        className={'dec'}
                                        onClick={() => this.props.dec(item.id)}
                                    >
                                        <img src={minus} alt="" />
                                    </button>
                                    <h1 className="count">{item.count}</h1>
                                    <button
                                        className={'inc'}
                                        onClick={() => this.props.inc(item.id)}
                                    >
                                        <img src={plus} alt="" />
                                    </button>
                                </div>
                                <button
                                    className={'add'}
                                    onClick={() => this.props.addToBasket(item)}
                                >
                                    <span>Добавить</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )
        })
    }

    render() {
        if (this.props.error) {
            return <Error />
        }
        const checkContent = this.props.loading ? (
            <Spinner />
        ) : (
            this.renderCard()
        )

        return (
            <div className={'productPage'} ref={this.props.refProp}>
                {checkContent}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        error: state.products.error,
        loading: state.products.loading,
    }
}

const mapDispatchToProps = {
    fetchMenuItems,
    addToBasket,
    inc,
    dec,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)
