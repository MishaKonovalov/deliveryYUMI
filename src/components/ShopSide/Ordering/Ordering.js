/* eslint-disable no-restricted-globals */
import React, { Component } from 'react'
import Input from '../../../UI/Input/Input.js'
import { connect } from 'react-redux'

import {
    toggleBasket,
    onChange,
    payCard,
    payCash,
    postItems,
} from '../../../store/actions/actionsTypes'

import './ordering.css'

function validatePhone(phoneNumber) {
    const phoneNumberPattern = /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/
    return phoneNumberPattern.test(phoneNumber)
}
function validateLatters(string) {
    const numbersPattern = /^[\d]+$/g
    return !numbersPattern.test(string)
}

class Ordering extends Component {
    state = {
        formControls: {
            name: {
                value: '',
                id: 'name',
                placeholder: 'Имя',
                touched: false,
                isValid: false,
                errorMassage: 'Не допустимые символы',
                validation: {
                    required: true,
                    letters: true,
                },
            },
            numberOfPhone: {
                value: '',
                id: 'numberOfPhone',
                placeholder: 'Номер телефона',
                touched: false,
                isValid: false,
                validation: {
                    required: true,
                    numbers: true,
                },
            },
            address: {
                value: '',
                id: 'address',
                placeholder: 'Адрес доставки',
                touched: false,
                isValid: false,
                validation: {
                    required: true,
                },
            },
        },
    }

    changeHandler = (e, controlName) => {
        this.props.onChange(e)
        if (this.props.successfull) {
            this.setState((state) => {
                return {
                    ...state,
                }
            })
        }
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = e.target.value
        control.touched = true
        control.isValid = this.validate(control.value, control.validation)

        formControls[controlName] = control
        this.setState({ formControls })
    }

    validate(value, validation) {
        if (!validation) {
            return true
        }
        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.numbers) {
            isValid = validatePhone(value) && isValid
        }
        if (validation.letters) {
            isValid = validateLatters(value) && isValid
        }
        return isValid
    }

    renderInputs = (clearForm = false) => {
        return Object.keys(this.state.formControls).map(
            (controlName, index) => {
                const control = this.state.formControls[controlName]
                return (
                    <Input
                        key={index}
                        id={control.id}
                        placeholder={control.placeholder}
                        value={clearForm ? '' : control.value}
                        isValid={control.isValid}
                        touched={control.touched}
                        errorMassage={control.errorMassage}
                        onChange={() => this.changeHandler(event, controlName)}
                    />
                )
            }
        )
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
        this.props.postItems(this.props.order)
        this.setState(() => {
            return {
                formControls: {
                    name: {
                        value: '',
                        id: 'name',
                        placeholder: 'Имя',
                        touched: false,
                        isValid: false,
                        errorMassage: 'Не допустимые символы',
                        validation: {
                            required: true,
                            letters: true,
                        },
                    },
                    numberOfPhone: {
                        value: '',
                        id: 'numberOfPhone',
                        placeholder: 'Номер телефона',
                        touched: false,
                        isValid: false,
                        validation: {
                            required: true,
                            numbers: true,
                        },
                    },
                    address: {
                        value: '',
                        id: 'address',
                        placeholder: 'Адрес доставки',
                        touched: false,
                        isValid: false,
                        validation: {
                            required: true,
                        },
                    },
                },
            }
        })
    }

    render() {
        const cls = ['ordering-wrapper']
        if (this.props.open) {
            cls.push('open')
        }
        const { clearForm, payCard, payCash, comment } = this.props.order

        const checkDisabled =
            this.state.formControls.name.isValid &&
            this.state.formControls.address.isValid &&
            this.state.formControls.numberOfPhone.isValid &&
            (payCard || payCash)
        return (
            <section className={cls.join(' ')}>
                <i
                    className="fas fa-arrow-left"
                    onClick={this.props.toggleBasket}
                ></i>
                <form className={'ordering'} onSubmit={this.onSubmitHandler}>
                    <h2 htmlFor="">Заполните, пожалуйста, форму</h2>
                    {this.renderInputs(clearForm)}
                    <div className="check_box">
                        <h2 htmlFor="">Выберите способ оплаты</h2>
                        <ul>
                            <li>
                                <span>Банковской картой</span>
                                <input
                                    onChange={() => this.props.payCard()}
                                    type="radio"
                                    checked={clearForm ? null : payCard}
                                    name=""
                                    id=""
                                />
                            </li>
                            <li>
                                <span>Наличными</span>
                                <input
                                    onChange={this.props.payCash}
                                    type="radio"
                                    checked={clearForm ? null : payCash}
                                    name=""
                                    id=""
                                />
                            </li>
                        </ul>
                    </div>
                    {payCash ? (
                        <div>
                            <h2 htmlFor="">С какой суммы потребуется сдача?</h2>
                            <input
                                placeholder="5000"
                                type="text"
                                id={'change'}
                                onChange={this.props.onChange}
                            />
                        </div>
                    ) : null}

                    <div className={'coment'}>
                        <label htmlFor="">Коментарий к Заказу</label>
                        <textarea
                            value={clearForm ? '' : comment}
                            onChange={this.props.onChange}
                            id={'comment'}
                            type="text"
                        />
                    </div>
                    <button disabled={!checkDisabled}>Оформить</button>
                </form>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        open: state.basket.openOrderingWindow,
        order: state.basket.order,
    }
}

const mapDispatchToProps = {
    postItems,
    toggleBasket,
    onChange,
    payCash,
    payCard,
}

export default connect(mapStateToProps, mapDispatchToProps)(Ordering)
