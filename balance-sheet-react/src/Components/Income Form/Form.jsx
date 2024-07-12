import React from 'react'
import {useFormik} from 'formik'

 function Form(){
  const formik = useFormik({
    initialValues:{
      name:'',
      email:''
    },
    onSubmit:values=>{
      console.log(values)
    },
    validate:values=>{
      let errors = {}
      if(!values.name){
        errors.name = 'required'
      }
      if(!values.email){
        errors.email = 'required'
      }
      return errors
    }
  })
  return(
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>name</label>
        <input type="text" name="name" 
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur} />
        <div>
          {formik.touched.name &&
          formik.errors.name ? 
          <div>{formik.errors.name}</div> : null}
        </div>
      </div>
      <div>
        <label>email</label>
        <input type="email" name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur} />
        <div>
          {formik.touched.email &&
          formik.errors.email ? 
          <div>{formik.errors.email}</div> : null}
        </div>
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  )
}

export default Form;