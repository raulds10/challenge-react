import {
  TextField,
  Button
} from '@mui/material'

import useFormStyles from '../styles/useFormFields'
import useValidations from '../hooks/useValidations'
import { useEffect } from 'react'

const Form1 = ({ onSubmit, onChange, form }) => {

 /* useEffect(() =>{
    console.log("form", form);
    if(
      !!form.name || !!form.lastName
    ){
      validateFields({
        name: form.name,
        lastName: form.lastName
      })
    }
    
  },[form.name,form.lastName])*/


  const handleSubmit= () => {
    onSubmit({ currentStep: 0 })
  }

  const { errors, validateFields, validateField } = useValidations({
    onSubmit: handleSubmit
  })

  const classes = useFormStyles()
  
  
  const handleValidations = (event) => {
    event.preventDefault()
    validateFields({
      name: form.name,
      lastName: form.lastName
    })
  }
  
  const handleChange = (e) => {
    onChange(e)
    validateField(e.target.name, e.target.value)
  }

  return (
    <form
      onSubmit={handleValidations}
    >
      <TextField
        className={classes.formField}
        fullWidth
        error={!!errors.name}
        name='name'
        onChange={handleChange}
        id="name"
        label="Nombre"
        value={form.name}
        helperText={errors?.name}
      />
      <TextField
        className={classes.formField}
        fullWidth
        error={!!errors.lastName}
        name='lastName'
        onChange={handleChange}
        id="lastName"
        label="Apellido"
        value={form.lastName}
        helperText={errors?.lastName}
      />
      <Button
        variant="contained"
        type="submit"
        onClick={handleValidations}
      >
        Siguiente
      </Button>
    </form>
  )
}

export default Form1
