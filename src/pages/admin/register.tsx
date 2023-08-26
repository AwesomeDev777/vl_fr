import React from 'react'
import withAdminGuest from 'components/auth/withAdminGuest'
import { Row, Col, Portlet, Widget12, Form, Button } from '@blueupcode/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Link from 'next/link'
import type { ExtendedNextPage } from '@blueupcode/components/types'
import { loginUser } from 'store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import PAGE from 'config/page.config'
import { swal } from 'components/sweetalert2/instance'
import isEmpty from 'utils/is-empty'
import apiCall from 'utils/apiCall'
import { Admin_Sign_up } from 'utils/adminUrl'

const AdminRegister: ExtendedNextPage = () => {
	return (
		<Row className="g-0 align-items-center justify-content-center h-100">
			<Col sm={8} md={6} lg={4} xl={3}>
				{/* BEGIN Portlet */}
				<Portlet>
					<Portlet.Body>
						<div className="text-center mt-4 mb-5">
							{/* BEGIN Avatar */}
							<Widget12 circle display variant="label-primary">
								<FontAwesomeIcon icon={faUserAlt} />
							</Widget12>
							{/* END Avatar */}
						</div>
						<AdminRegisterForm />
					</Portlet.Body>
				</Portlet>
				{/* END Portlet */}
			</Col>
		</Row>
	)
}

// Form validation schema
const validationSchema = yup.object().shape({
  firstname: yup.string().required("First Name field must be required"),
  lastname: yup.string().required("Last Name field must be required"),
	email: yup.string().email('Your email is not valid').required('Please enter your email'),
	password: yup.string().min(6, 'Please enter at least 6 characters').required('Please provide your password'),
	passwordConfirm: yup.string().min(6, 'Please enter at least 6 characters').required('Please provide your password'),
})

const AdminRegisterForm = () => {
	const dispatch = useDispatch()
	
	const errors = useSelector((state: any) => state.errors.errors)
	React.useEffect(() => {
		if(!isEmpty(errors)){
			swal.fire({ text: errors, icon: 'error' })
		}
	}, [errors])

	// Initialize form validation with react-hook-form
	const { control, handleSubmit } = useForm<AdminloginFormInputs>({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			passwordConfirm: '',
		},
	})

	// Function to handle form submission
	const onSubmit = async (formData: AdminloginFormInputs) => {
    await apiCall(Admin_Sign_up, "POST", formData);
		
		Router.push(PAGE.AdminloginPagePath)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className="d-grid gap-3">
      {/* BEGIN Validation Controller */}
			<Controller
				name="firstname"
				control={control}
				render={({ field, fieldState: { invalid, error } }) => (
					<Form.Group controlId="firstname">
						<Form.Floating>
							<Form.Control
								type="text"
								size="lg"
								placeholder="Please insert your First name"
								isInvalid={invalid}
								{...field}
							/>
							<Form.Label>First Name</Form.Label>
							{invalid && <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>}
						</Form.Floating>
					</Form.Group>
				)}
			/>
			{/* END Validation Controller */}
      {/* BEGIN Validation Controller */}
			<Controller
				name="lastname"
				control={control}
				render={({ field, fieldState: { invalid, error } }) => (
					<Form.Group controlId="lastname">
						<Form.Floating>
							<Form.Control
								type="text"
								size="lg"
								placeholder="Please insert your Last name"
								isInvalid={invalid}
								{...field}
							/>
							<Form.Label>Last Name</Form.Label>
							{invalid && <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>}
						</Form.Floating>
					</Form.Group>
				)}
			/>
			{/* END Validation Controller */}
			{/* BEGIN Validation Controller */}
			<Controller
				name="email"
				control={control}
				render={({ field, fieldState: { invalid, error } }) => (
					<Form.Group controlId="email">
						<Form.Floating>
							<Form.Control
								type="email"
								size="lg"
								placeholder="Please insert your email"
								isInvalid={invalid}
								{...field}
							/>
							<Form.Label>Email</Form.Label>
							{invalid && <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>}
						</Form.Floating>
					</Form.Group>
				)}
			/>
			{/* END Validation Controller */}
			{/* BEGIN Validation Controller */}
			<Controller
				name="password"
				control={control}
				render={({ field, fieldState: { invalid, error } }) => (
					<Form.Group controlId="password">
						<Form.Floating>
							<Form.Control
								type="password"
								size="lg"
								placeholder="Please insert your password"
								isInvalid={invalid}
								{...field}
							/>
							<Form.Label>Password</Form.Label>
							{invalid && <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>}
						</Form.Floating>
					</Form.Group>
				)}
			/>
			{/* END Validation Controller */}

      {/* BEGIN Validation Controller */}
			<Controller
				name="passwordConfirm"
				control={control}
				render={({ field, fieldState: { invalid, error } }) => (
					<Form.Group controlId="password">
						<Form.Floating>
							<Form.Control
								type="password"
								size="lg"
								placeholder="Please insert your password"
								isInvalid={invalid}
								{...field}
							/>
							<Form.Label>Password</Form.Label>
							{invalid && <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>}
						</Form.Floating>
					</Form.Group>
				)}
			/>
			{/* END Validation Controller */}
			
			
			{/* BEGIN Flex */}
			<div className="d-flex align-items-center justify-content-between">
				<span>
					Already have an account? <Link href="/admin/login">Login</Link>
				</span>
				<Button type="submit" variant="label-primary" size="lg" width="widest">
					Register
				</Button>
			</div>
			{/* END Flex */}
		</Form>
	)
}

interface AdminloginFormInputs {
	firstname: string
	lastname: string
	email: string
	password: string
  passwordConfirm: string
}

AdminRegister.pageTitle = 'AdminRegister'
AdminRegister.layoutName = 'blank'

export default withAdminGuest(AdminRegister)
