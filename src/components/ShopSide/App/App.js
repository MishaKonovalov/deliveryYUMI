import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import {
    checkout,
    clearState,
    postItems,
} from '../../../store/actions/actionsTypes'

import Basket from '../Basket/Basket'
import ProductsPage from '../ProductsPage/ProductsPage'
import Ordering from '../Ordering/Ordering'
import SuccessfullWindow from '../Ordering/SaccesfullWindow/successfull'
import AppHeader from '../AppHeader/AppHeader'
import Category from '../Category/Category'
import Error from '../ProductsPage/Error/errorMassage'
import AdminApp from '../../AdminSide/AdminApp/AdminApp'
import OrderDatails from '../../AdminSide/OrderDatails/OrderDatails'
import StopList from '../../AdminSide/StopList/StopList'
import Login from '../../AdminSide/Login/Login'

class App extends Component {
    constructor() {
        super()
        this.myRef = React.createRef()
    }

    scrollToHandler = () => {
        this.myRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    renderRoutes = () => {
        return Object.keys(this.props.category).map((url, i) => {
            return (
                <Route key={url + i} path={`/${url}`}>
                    <Basket />
                    <Ordering />
                    <AppHeader scrollTo={this.scrollToHandler} />
                    <Category />
                    <ProductsPage refProp={this.myRef} url={url} />
                </Route>
            )
        })
    }

    render() {
        return (
            <>
                {this.props.order.successfull ? <SuccessfullWindow /> : null}
                <Switch>
                    <Route path="/" exact>
                        <Basket />
                        <Ordering />
                        <AppHeader scrollTo={this.scrollToHandler} />
                        <Category />
                        <ProductsPage refProp={this.myRef} url="salad" />
                    </Route>
                    {this.renderRoutes()}
                    <Route path={'/admin/'} exact>
                        {this.props.token ? <AdminApp /> : <Login />}
                    </Route>
                    <Route path={'/admin/:id'} exact>
                        {this.props.token ? <OrderDatails /> : <Login />}
                    </Route>
                    <Route path={'/stopList'} exact>
                        {this.props.token ? <StopList /> : <Login />}
                    </Route>
                    <Route
                        render={() => {
                            return <Error />
                        }}
                    />
                </Switch>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.basket.order,
        category: state.products.category,
        token: !!state.admin.token,
    }
}
const mapDispatchToProps = {
    checkout,
    clearState,
    postItems,
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
