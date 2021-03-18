import React, { Component } from 'react'
import AdminHeader from '../AdminHeader/AdminHeader'
import './orderDatails.css'
import Spinner from '../../../UI/adminSpinner/adminSpinner'
import { connect } from 'react-redux'
import {
    loadedOrder,
    acceptOrder,
    fetchOrder,
} from '../../../store/actions/actionsTypes'
import { Link, withRouter } from 'react-router-dom'

class OrderDatails extends Component {
    componentDidMount() {
        this.props.fetchOrder(this.props.match.params.id)
    }
    render() {
        const order = this.props.order
        const id = this.props.match.params.id
        return (
            <>
                <AdminHeader />
                {this.props.loading ? (
                    <div className="loading">
                        <h1 className="loadingText">Подождите...</h1>
                    </div>
                ) : (
                    <section className="orderDatails">
                        <Link to="/admin" className={'btn'}>
                            <i
                                className="fas fa-arrow-left"
                                style={{ color: '#fff', fontSize: 30 }}
                            ></i>
                        </Link>
                        <div className="orderDatailsWrapper">
                            <div className="leftWrapper">
                                <ol className="productList">
                                    {order.productList.map((prod, index) => {
                                        return (
                                            <li key={index}>
                                                {prod.title} - {prod.count}{' '}
                                                порции -{prod.price}руб
                                            </li>
                                        )
                                    })}
                                </ol>
                                <div>
                                    <h2>Коментарий к заказу</h2>
                                    <p>
                                        {order.comment === ''
                                            ? '____'
                                            : order.comment}
                                    </p>
                                </div>
                            </div>
                            <div className="rigthWrapper">
                                <h2>Заказ на имя {order.name}</h2>
                                <h2>Номер телефона {order.numberOfPhone}</h2>
                                <h2>Сумма заказа: {order.cost}</h2>
                                <h2>
                                    {order.payCard
                                        ? 'Оплата картой'
                                        : 'Оплата наличными'}
                                </h2>
                                <h2>
                                    Сдача с :{' '}
                                    {order.change === ''
                                        ? 'без сдачи'
                                        : order.change}
                                </h2>
                                <h2>Адрес доставки: {order.address}</h2>
                            </div>
                        </div>
                        {order.accepted ? null : (
                            <button
                                to="/admin"
                                className="orderDatailsButton"
                                onClick={() =>
                                    this.props.acceptOrder(order, id)
                                }
                            >
                                Принять
                            </button>
                        )}
                    </section>
                )}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.admin.order,
        loading: state.admin.loading,
    }
}
const mapDispatchToProps = {
    acceptOrder,
    fetchOrder,
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OrderDatails)
)
