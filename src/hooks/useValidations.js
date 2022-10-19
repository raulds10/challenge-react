import { useEffect, useState } from "react"
import { isValidCC, isValidEmail, isValidLastName, isValidName, isValidPhone, isValidPresence } from "../utils/validations"

const useValidations = ({ onSubmit }) => {
	const [errors, setErrors] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		const values = Object.values(errors)
		if (values.length > 0 && isSubmitting) {
			const isValid = values.every((value) => !value)
			if (isValid) {
				onSubmit()
			}
		}
	}, [errors])

	const validate = (key, value) => {
		let error = {
			[key]: ''
		}

		// Presence
		if (!isValidPresence(value)) {
			error = {
				[key]: `${key} es requerido`
			}
			return error
		}

        if(key === 'name' && !isValidName(value)) {
            error = {
				[key]: 'Nombre formato es invalido'
			}
			return error
        }

        if(key === 'lastName' && !isValidLastName(value)) {
            error = {
				[key]: 'Apellido formato es invalido'
			}
			return error
        }

		// Email
		if (key === 'email' && !isValidEmail(value)) {
			error = {
				[key]: 'Email formato es invalido'
			}
			return error

		}

		// Phone
		if (key === 'phoneNumber' && !isValidPhone(value)) {
			error = {
				[key]: 'Telefono es invalido'
			}
			return error
		}

		// CC
		if (key === 'cc' && !isValidCC(value)) {
			error = {
				[key]: 'CC es invalido'
			}
		}

		return error;
	}


	const validateFields = (form) => {
		const keys = Object.keys(form)
		let errs = {}

		keys.forEach((key) => {
			const errorField = validate(key, form[key])
			
			errs = {
				...errs,
				...errorField
			}
		})

		setErrors(errs)
		setIsSubmitting(true)
	}

	const validateField = (key, value) => {
		setIsSubmitting(false)
		const errorField = validate(key, value)

		setErrors({
			...errors,
			...errorField
		})
	}

	return {
		errors,
		validateFields,
		validateField
	}
}

export default useValidations