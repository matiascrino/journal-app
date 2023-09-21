import { useEffect, useState, useMemo } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
	const [formState, setFormState] = useState(initialForm);
	const [formValidation, setFormValidation] = useState({});

	useEffect(() => {
		createValidators();
	}, [formState]);

	useEffect(() => {
		setFormState(initialForm);
	}, [initialForm]);

	const isFormValid = useMemo(() => {

		for (const formValue in formValidation) {
			if (formValidation[formValue]!==null) return false;
		}

		return true;

	}, [formValidation])

	const onInputChange = ({ target }) => {
		const { name, value } = target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const onResetForm = () => {
		setFormState(initialForm);
	};


	const createValidators = () => {
		const formCheckValues= {};

		for (const formField in formValidations) {
			const [fn, errorMessage] = formValidations[formField];

			formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
		}

		setFormValidation(formCheckValues);
	
	};




	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,
		...formValidation,
		isFormValid
	};
};
