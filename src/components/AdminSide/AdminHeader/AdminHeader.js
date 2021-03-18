import React from 'react'
import './adminHeader.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { barsToggle } from '../../../store/actions/actionsTypes'

function AdminHeader(props) {
    const cls = ['fas ']
    props.openBars ? cls.push('fa-times') : cls.push('fa-bars')

    return (
        <div className="wrapperAdminHeader">
            <header className="adminHeader">
                <div className="wrapperBars">
                    <i className={cls.join('')} onClick={props.barsToggle}></i>
                    {!props.openBars ? null : (
                        <ul>
                            <li>
                                <Link to="/admin" onClick={props.barsToggle}>
                                    Следить за аказами
                                </Link>
                            </li>
                            <li>
                                <Link to="/stopList" onClick={props.barsToggle}>
                                    Стоп лист
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
                <div className="wrapperWelcome">
                    <h4>Привет, Админ</h4>
                </div>
            </header>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        openBars: state.admin.openBars,
    }
}

const mapDispathToProps = {
    barsToggle,
}

export default connect(mapStateToProps, mapDispathToProps)(AdminHeader)
