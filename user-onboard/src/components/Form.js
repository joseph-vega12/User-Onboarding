import React from "react";

export default function Form(props) {
    const { values, submit, update, errors} = props;

    const onChange = (evt) => {
        const { name, value, type, checked} = evt.target;
        const valueToUse = type === "checkbox" ? checked : value;
        update(name, valueToUse);
    };
    
    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    }

    return (
        <>
            <div>{errors.name}</div>
            <div>{errors.email}</div>
            <div>{errors.password}</div>
            <div>{errors.terms}</div>

        <form onSubmit={onSubmit}>
            <label>
                Name:
            <input 
            type='text'
            name="name"
            onChange={onChange}
            value={values.name}
                />
            </label>
            <label>
                Email:
                <input 
                type='email'
                name="email"
                onChange={onChange}
                value={values.email}
                />
            </label>
            <label>
                Password:
                <input
                type="password"
                name="password"
                onChange={onChange}
                value={values.password}
                />
            </label>
            <label>
                <input 
                type="checkbox"
                name="terms"
                onChange={onChange}
                checked={values.terms}
                />
                I Agree Terms of Services
            </label>
            <button>Submit</button>
        </form>
        </>
    )
}