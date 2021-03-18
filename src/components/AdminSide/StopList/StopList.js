import React, { Component } from 'react'
import axios from 'axios'
import './stopList.css'
import AdminHeader from '../AdminHeader/AdminHeader'
import {
    fetchAveryProductsItems,
    filterProductList,
    searchItems,
    addToStopList,
    postStopListItems,
    open,
} from '../../../store/actions/actionsTypes'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class StopList extends Component {
    async componentDidMount() {
        await this.props.fetchAveryProductsItems()
    }

    onChangeHandler = (e) => {
        const value = e.target.value
        if (value.length === 0) {
            return
        }
        this.props.searchItems(value)
    }
    renderSideBarItems = () => {
        return Object.keys(this.props.category).map((item) => {
            return (
                <li onClick={() => this.props.filterProductList(item)}>
                    {this.props.category[item]}
                </li>
            )
        })
    }
    renderProductsItems = (arr) => {
        return arr.map((item) => {
            const inStopList = item.stopList ? 'Нет в наличии' : 'В наличии'
            const cls = item.stopList ? 'inStopList' : null
            const textForBtn = item.stopList ? 'Добавить' : 'Убрать'
            return (
                <li className={cls}>
                    <span>{item.title}</span>

                    <span>{inStopList}</span>

                    <button
                        onClick={() =>
                            this.props.addToStopList(
                                item.category,
                                item.title,
                                item.stopList
                            )
                        }
                    >
                        {textForBtn}
                    </button>
                </li>
            )
        })
    }
    render() {
        const averyProductsList = []
        Object.values(this.props.averyProductsList).forEach((array) => {
            array.forEach((item) => {
                averyProductsList.push(item)
            })
        })
        const itemsToRender = this.props.update
            ? this.props.filterProductsList
            : averyProductsList

        const clsIcon = ['fas']
        const clsSideBar = ['leftWrapper']
        if (this.props.openSideBars) {
            clsSideBar.push('open')
            clsIcon.push('open')
            clsIcon.push('fa-angle-double-left')
        } else {
            clsIcon.push('fa-angle-double-right')
        }
        console.log(this.props)
        return (
            <>
                <AdminHeader />
                <section className="stopList">
                    <i
                        className={clsIcon.join(' ')}
                        onClick={this.props.open}
                    ></i>
                    <div className={clsSideBar.join(' ')}>
                        <div className="sideBar">
                            <h1>Категории</h1>
                            <ul>{this.renderSideBarItems()}</ul>
                        </div>
                    </div>
                    <div className="rightWrapper">
                        <div className="searchPanel">
                            <h1>Поиск</h1>
                            <input
                                onChange={this.onChangeHandler}
                                type="text"
                                placeholder="Найти блюдо"
                            />
                        </div>
                        <h1>Блюда</h1>
                        <div className="itemsList">
                            <ul>{this.renderProductsItems(itemsToRender)}</ul>
                        </div>
                        <button
                            className={'btn'}
                            onClick={() =>
                                this.props.postStopListItems(
                                    this.props.averyProductsList
                                )
                            }
                        >
                            Обновить стоп лист
                        </button>
                    </div>
                </section>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.admin.loading,
        filterProductsList: state.admin.filterProductsList,
        update: state.admin.update,
        category: state.products.category,
        averyProductsList: state.admin.averyProductsList,
        openSideBars: state.admin.openSideBars,
    }
}
const mapDispatchToProps = {
    fetchAveryProductsItems,
    filterProductList,
    searchItems,
    addToStopList,
    postStopListItems,
    open,
}
export default connect(mapStateToProps, mapDispatchToProps)(StopList)
