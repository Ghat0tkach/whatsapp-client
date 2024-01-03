import * as Yup from 'yup'

export const signUpSchema=Yup.object({
    name:Yup.string().required("Name is required")
    .matches(/^[a-zA-z_ ]*$/,"No special characters or numbers allowed")
    .min(2,"Name must be between 2 and 64 characters")
    .max(64,"Name must be between 2 and 64 characters"),
    
    email:Yup.string().required("Email is required")
    .email("Invalid Email address"),

    status:Yup.string()
    .max(64,"Status should be less than 64 characters"),

    password:Yup.string().required("Password is required")
    .min(6 , "Password must be more than 6 characters")
    
    
})

export const signInSchema=Yup.object({
    email:Yup.string().required("Email is required")
    .email("Invalid Email address"),

    password:Yup.string().required("Password is required")
  
    
    
})