import React from 'react'
import { connect } from 'react-redux'
import EmptyMassage from './emptyMassage/emptyMassage'
import './basket.css'
import {
    deleteItem,
    clear,
    toOrderToggle,
} from '../../../store/actions/actionsTypes'

function Basket(props) {
    const renderProdukts = (productsList) => {
        return props.productsList.map((item, index) => {
            return (
                <div className={'basket_card'} key={index}>
                    <img src={item.url} alt="" />
                    <p>{item.title}</p>
                    <p>{item.count}</p>
                    <span>{item.price} Руб.</span>
                    <i
                        className={'fas fa-times'}
                        onClick={() => props.deleteItem(index)}
                    ></i>
                </div>
            )
        })
    }

    const clsBasket = ['basket']

    if (!props.openBasket) {
        clsBasket.push('close')
    }

    const calcPrice = props.productsList.reduce(
        (accumulator, value) => accumulator + value.price,
        0
    )
    const content =
        !props.productsList.length == 0 ? (
            <>
                <h2>Ваш Заказ</h2>
                <div className={'offer'}>
                    {renderProdukts(props.productsList)}
                    <h2>Сумма заказа составит: {calcPrice} рублей</h2>
                    <button className={'clear'} onClick={props.clear}>
                        Очистить корзину
                    </button>
                    <button onClick={props.toOrderToggle}>
                        Оформить Заказ
                    </button>
                </div>
            </>
        ) : (
            <EmptyMassage />
        )
    return (
        <div className={clsBasket.join(' ')}>
            {props.toOrder ? null : content}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        productsList: state.basket.basket,
        openBasket: state.basket.openBasket,
    }
}

const mapDispatchToProps = {
    deleteItem,
    toOrderToggle,
    clear,
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)
