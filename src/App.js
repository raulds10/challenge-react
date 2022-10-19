import {
  useState,
  cloneElement
} from 'react'

import {
  Container,
  Step,
  Stepper,
  StepLabel,
  Box,
  Grid,
  Pagination,
  Typography,
} from '@mui/material'


import Form1 from './components/Form1'
import Form2 from './components/Form2'
import TableData from './components/Table'
import useUsers from './hooks/useUsers'
import Modal from './components/Modal'
import UserForm from './components/UserForm'
import Loading from './components/Loading'

const defaultForm = {
  name: '',
  lastName: '',
  email: '',
  cc: '',
  phoneNumber: ''
}

const steps = [
  {
    label: 'Paso 1',
    componente: <Form1 />
  },
  {
    label: 'Paso 2',
    componente: <Form2 />
  }
]

const App = () => {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(defaultForm)
  const [editForm, setEditForm] = useState(defaultForm)
  const { users, addUser, editUser, deleteUser, isLoading } = useUsers()
  const [isOpenModal, setIsOpenModal] = useState(false);
  const PER_PAGE = 5;
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: PER_PAGE,
    page: 1
  })
  const COUNT_PAGES = Math.ceil(users.length / PER_PAGE)

  const handleAddUserSuccess = () => {
    setForm(defaultForm)
    setStep(0)
  }

  const handleSubmit = ({ currentStep }) => {
    if (currentStep === 0) {
      return setStep(1)
    }

    if (currentStep === 1) {
      addUser(form, handleAddUserSuccess)
    }
  }

  const handleEditUserSuccess = () => {
    setIsOpenModal(false)
    setTimeout(() => alert('Successfully! Your user was updated correctly'), 400)
  }

  const handleSubmitEdit = () => {
    editUser(editForm, handleEditUserSuccess)
  }

  const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setForm({
      ...form,
      [key]: value
    })
  }

  const handleChangeEdit = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    })
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleClickEdit = (user) => {
    setEditForm({
      id: user._id,
      name: user.name,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      cc: String(user.cc)
    })
    setIsOpenModal(true)
  }

  const handleDeleteUserSuccess = (callback) => {
    callback()
    setTimeout(() => alert('Successfully! Your user was deleted correctly'), 400)
  }

  const handleClickDelete = (id, callback) => {
    deleteUser(id, () => handleDeleteUserSuccess(callback))
  }

  const handleCloseModal = () => setIsOpenModal(false)

  const handleChangePagination = (_, p) => {
    const limit = p * PER_PAGE;
    setPagination({
      page: p,
      skip: limit - PER_PAGE,
      limit: limit
    })
  }

  return (
    <Container
      fixed
      style={{
        padding: '3em'
      }}
    >
      <Grid
        container
        spacing={6}
      >
        <Grid
          item
          md={4}
          sm={12}
          xs={12}
        >
          <Stepper
            activeStep={step}
          >
            {steps.map((step, key) => (
              <Step
                key={key}
              >
                <StepLabel>
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box
            style={{
              marginTop: '4em'
            }}
          >
            {cloneElement(steps[step].componente,{
              onChange: handleChange,
              onSubmit: handleSubmit,
              form,
              onBack: handleBack
            })}
            
          </Box>
        </Grid>
        <Grid
          item
          md={8}
          sm={12}
          xs={12}
        >
          <TableData
            data={users.slice(pagination.skip, pagination.limit)}
            onClickEditRow={handleClickEdit}
            onClickDeleteRow={handleClickDelete}
          />
          <Pagination
            count={COUNT_PAGES}
            onChange={handleChangePagination}
          />
        </Grid> 
      </Grid>
      {isLoading&& <Loading />}
      <Modal
        isOpen={isOpenModal}
        onClose={handleCloseModal}
      >
        <Typography variant='h5' m={5}>Edit User</Typography>
        <UserForm
          form={editForm}
          onChange={handleChangeEdit}
          onSubmit={handleSubmitEdit}
          isLoading={isLoading}
        />
      </Modal>
    </Container>
  )
}

export default App
