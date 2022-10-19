import { Button, TextField, CircularProgress } from "@mui/material"
import useValidations from "../hooks/useValidations"
import useFormStyles from "../styles/useFormFields"

const UserForm = ({ form, onChange, onSubmit, isLoading }) => {
	const handleSubmit= () => {
    onSubmit({ currentStep: 0 })
  }

  const { errors, validateFields, validateField } = useValidations({
    onSubmit: handleSubmit
  })

  const classes = useFormStyles()
  
  
  const handleValidations = (event) => {
    event.preventDefault()
    validateFields(form)
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
        id="phoneNumber"
        name="phoneNumber"
        label="Teléfono"
				type="number"
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
        variant="contained"
        type="submit"
        onClick={handleValidations}
      >
        Guardar
				{isLoading && <CircularProgress />}
      </Button>
    </form>
  );
}

export default UserForm