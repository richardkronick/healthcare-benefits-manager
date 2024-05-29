import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { employeesState, selectedEmployeeState } from '../state/atoms';
import { Form, Button } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';

const AddEmployeeForm = () => {
  const [name, setName] = useState('');
  const setEmployees = useSetRecoilState(employeesState);
  const setSelectedEmployee = useSetRecoilState(selectedEmployeeState);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      id: uuidv4(),
      name,
      dependents: [],
      monthlySalary: 2000
    };

    setEmployees((employees) => [...employees, newEmployee]);
    setSelectedEmployee(newEmployee);

    setName('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Name</label>
        <input
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Field>
      <div style={{ textAlign: 'center' }}>
        <Button type='submit' primary>
          Add Employee
        </Button>
      </div>
    </Form>
  );
};

export default AddEmployeeForm;
