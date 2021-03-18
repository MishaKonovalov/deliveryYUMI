import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './category.css'
import * as Imgs from './exportImg'

function Category(props) {
    return (
        <main className={'catalog'}>
            <ul className="nav">
                {Object.keys(props.category).map((item, index) => {
                    return (
                        <li key={index}>
                            <Link to={`/${item}`}>
                                <img src={`${Imgs[item]}`} alt="icon" />
                                <h2>{props.category[item]}</h2>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </main>
    )
}

const mapStateToProps = (state) => {
    return {
        category: state.products.category,
    }
}
export default connect(mapStateToProps, null)(Category)
