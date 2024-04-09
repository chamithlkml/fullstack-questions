import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap'

const CreateQuestionForm = ({ fetchTags, updateQuestions, showSuccessMessage }) => {
  const [questionTags, setQuestionTags] = useState([])
  const [formField, setFormField] = useState({ title: '', tag_id: 0 })
  const [errorMessages, setErrorMessages] = useState([])
  const [showModal, setShowModal] = useState(false)


  useEffect(() => {
    fetchTags()
    .then(data => {
      setQuestionTags(data)
    })
  }, [fetchTags])

  const handleFormFields = (event) => {
    let localFormField = formField
    localFormField[event.target.name] = event.target.value
    setFormField(localFormField)
  }

  const openModal = () => setShowModal(true)

  const closeModal = () => setShowModal(false)

  const handleFormSubmission = (event) => {
    event.preventDefault()

    fetch(`http://localhost:3000/api/v1/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formField)
    })
    .then(response => response.json())
    .then(data => {
      if(data.status == 'failure'){
        setErrorMessages(data.messages)
      }else if(data.status == 'success'){
        setFormField({ title: '', tag_id: '0' })
        setErrorMessages([])
        closeModal()
        updateQuestions()
        showSuccessMessage('Thanks for adding a valuble question..!!!')
      }
    }).catch(error => {
      setErrorMessages([error])
    })
  }

  return (
      <div>
        <Button className="mt-4 mb-4 btn btn-primary" onClick={openModal}>
          Add a Question
        </Button>
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorMessages.map((errorMessage, index) => (
              <Alert key={index} variant='danger'>
                {errorMessage}
              </Alert>
            ))}
            <Form onSubmit={handleFormSubmission}>
              <Form.Group className='mb-3' controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formField.title}
                  onChange={handleFormFields}
                  />
              </Form.Group>
              <Form.Group className='mb-3' controlId='tag_id'>
                <Form.Label>Tag</Form.Label>
                <Form.Select
                  name="tag_id"
                  value={formField.tag_id}
                  onChange={handleFormFields}
                  >
                    {
                      questionTags.map(tag => (
                        <option key={tag.id} value={tag.id}>{tag.id == '0' ? 'Select Tag' : tag.label }</option>
                      ))
                    }
                  </Form.Select>
              </Form.Group>
              <Modal.Footer>
                <Button variant='secondary' onClick={closeModal}>
                  Close
                </Button>
                <Button variant='primary' type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    )
}

export default CreateQuestionForm