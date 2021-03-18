import React, { Component } from 'react'
import './login.css'
import img from '../../ShopSide/AppHeader/logo.png'
import { login } from '../../../store/actions/actionsTypes'
import { connect } from 'react-redux'
class Login extends Component {
    state = {
        email: '',
        password: '',
    }
    onChangeHanndler = (e) => {
        this.setState((state) => {
            return {
                [e.target.id]: e.target.value,
            }
        })
    }
    render() {
        return (
            <section className="login">
                <div className="formWrapper">
                    <img src={img} alt="" />
                    <div className="loginForm">
                        <span>Почта</span>
                        <input
                            type="text"
                            id="email"
                            onChange={this.onChangeHanndler}
                        />
                        <span>Пароль</span>
                        <input
                            type="text"
                            id="password"
                            onChange={this.onChangeHanndler}
                        />
                        <button onClick={() => this.props.login(this.state)}>
                            Войти
                        </button>
                    </div>
                </div>
            </section>
        )
    }
}

const mapDispatchToProps = {
    login,
}

export default connect(null, mapDispatchToProps)(Login)
