import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const Form = styled.form`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

const AddSchool = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [image, setImage] = useState(null);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      formData.append('image', image);

      await axios.post('http://localhost:5000/api/schools', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('School added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add school.');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <FormGroup>
        <Label>Name</Label>
        <Input {...register('name', { required: true })} />
        {errors.name && <ErrorMessage>Name is required.</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Address</Label>
        <Input {...register('address', { required: true })} />
        {errors.address && <ErrorMessage>Address is required.</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>City</Label>
        <Input {...register('city', { required: true })} />
        {errors.city && <ErrorMessage>City is required.</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>State</Label>
        <Input {...register('state', { required: true })} />
        {errors.state && <ErrorMessage>State is required.</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Contact</Label>
        <Input {...register('contact', { required: true })} type="tel" />
        {errors.contact && <ErrorMessage>Contact number is required.</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input {...register('email_id', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} type="email" />
        {errors.email_id && <ErrorMessage>Invalid email address.</ErrorMessage>}
      </FormGroup>
      <FormGroup>
        <Label>Image</Label>
        <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </FormGroup>
      <Button type="submit">Add School</Button>
    </Form>
  );
};

export default AddSchool;
