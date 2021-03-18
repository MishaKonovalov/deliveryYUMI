import React from 'react'
import './emptyMassage.css'

export default function EmptyMassage() {
    return (
        <div className={'emptyMassage'}>
            <h3>Ваша корзина пуста</h3>
            <i className="fas fa-shopping-cart"></i>
        </div>
    )
}
