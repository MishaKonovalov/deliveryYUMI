import React from 'react'
function isInvalid({ isValid, touched }) {
    return !isValid && touched
}
export default function Input(props) {
    const cls = ['input']

    if (isInvalid(props)) {
        cls.push('error')
    }

    return (
        <input
            className={cls.join(' ')}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
            type="text"
            id={props.id}
        />
    )
}
