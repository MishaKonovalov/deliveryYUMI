import React from 'react'
import './error.css'
import { Link } from 'react-router-dom'

export default function errorMassage() {
    return (
        <div className="error">
            <div className={'massage'}>
                <i className="far fa-frown"></i>
                <h1>Что-то пошло не так</h1>
                <div className="back">
                    <Link to="/">
                        <i className="home fas fa-arrow-left"></i>
                    </Link>
                    <span>Вернуться</span>
                </div>
            </div>
        </div>
    )
}
