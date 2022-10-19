import {
  TextField,
  Button
} from '@mui/material'
import useValidations from '../hooks/useValidations'

import useFormStyles from '../styles/useFormFields'

const Form2 = ({ onSubmit, onChange, form, onBack }) => {
  const classes = useFormStyles()

  const handleSubmit= () => {
    onSubmit({ currentStep: 1 })
  }

  const { errors, validateFields, validateField } = useValidations({
    onSubmit: handleSubmit
  })  
  
  const handleValidations = (event) => {
    event.preventDefault()
    validateFields({
      email: form.email,
      phoneNumber: form.phoneNumber,
      cc: form.cc,
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
        type="email"
        id="email"
        name="email"
        label="E-mail"
        value={form.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors?.email}
      />
      <TextField
        className={classes.formField}
        fullWidth
        type="number"
        id="phoneNumber"
        name="phoneNumber"
        label="Teléfono"
        value={form.phoneNumber}
        onChange={handleChange}
        error={!!errors.phoneNumber}
        helperText={errors?.phoneNumber}
      />
      <TextField
        className={classes.formField}
        fullWidth
        type="number"
        id="cc"
        name="cc"
        label="Documento de identidad"
        value={form.cc}
        onChange={handleChange}
        error={!!errors.cc}
        helperText={errors?.cc}
      />
      <Button
        className={classes.formButtons}
        variant="outlined"
        onClick={onBack}
      >
        Anterior
      </Button>
      <Button
        variant="contained"
        type="submit"
        onClick={handleValidations}
      >
        Enviar
      </Button>
    </form>
  )
}

export default Form2
