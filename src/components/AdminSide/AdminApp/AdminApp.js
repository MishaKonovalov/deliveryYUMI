import React from 'react'
import Header from '../AdminHeader/AdminHeader'
import OrdersList from '../OrdersList/OrderList'

export default function AdminApp() {
    return (
        <div className="adminApp">
            <Header />
            <OrdersList />
        </div>
    )
}
