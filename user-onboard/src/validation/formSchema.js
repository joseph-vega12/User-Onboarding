import * as yup from "yup";

export default yup.object().shape({
    name: yup
    .string()
    .required("username is required")
    .min(4, "name must be more than 3 characters"),
    email: yup
    .string()
    .email("must be a valid email address")
    .required("email is required"),
    password: yup
    .string()
    .required("password is required")
    .min(3, "password must be more than 3 characters"),
    terms: 
    yup.boolean()
    .oneOf([true], "In order to proceed please agree to terms of services")
    ,
});