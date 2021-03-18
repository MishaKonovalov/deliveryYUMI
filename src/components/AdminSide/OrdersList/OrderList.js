import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {
    getOrders,
    getAcceptedOrdersLoaded,
} from '../../../store/actions/actionsTypes'
import { connect } from 'react-redux'

import './orderList.css'
import Spinner from '../../../UI/adminSpinner/adminSpinner'

class OrderList extends Component {
    componentDidMount() {
        this.props.getOrders()
        this.props.getAcceptedOrdersLoaded()
    }

    renderOrders = (orders, cls) => {
        return Object.keys(orders).map((order, index) => {
            return (
                <div className={cls} key={order}>
                    <div>
                        <span>{`№ ${orders[order].numbersOfOrder}`}</span>
                    </div>
                    <div>
                        <span>Заказ</span>
                    </div>
                    <div>
                        <Link to={`/admin/${order}`}>Детали заказа</Link>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div className="orders">
                <h1>Новые заказы</h1>
                <div className="ordersList">
                    {this.props.loading ? (
                        <Spinner />
                    ) : (
                        this.renderOrders(this.props.orders, 'order swing')
                    )}
                </div>
                <h1>Принятые заказы</h1>
                <div className="ordersList">
                    {this.props.loading ? (
                        <Spinner />
                    ) : (
                        this.renderOrders(
                            this.props.acceptedOrders,
                            'acceptedOrders'
                        )
                    )}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        orders: state.admin.orders,
        acceptedOrders: state.admin.acceptedOrders,
        loading: state.admin.loading,
    }
}
const mapDispatchToProps = {
    getOrders,
    getAcceptedOrdersLoaded,
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)
