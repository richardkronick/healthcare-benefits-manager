import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { selectedEmployeeState, employeesState } from '../state/atoms';
import { Form, Button, Message } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import { dependentRequiresEmployeeMessage, noEmptyDependentNameMessage } from '../common/constants';

const AddDependentForm = () => {
  const [selectedEmployee, setSelectedEmployee] = useRecoilState(selectedEmployeeState);
  const setEmployees = useSetRecoilState(employeesState);
  
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEmployee) {
      setError(dependentRequiresEmployeeMessage);
      return;
    }

    if (name.trim() === '') {
      setError(noEmptyDependentNameMessage);
      return;
    }

    const updatedEmployee = {
      ...selectedEmployee,
      dependents: [...(selectedEmployee.dependents ?? []), { id: uuidv4(), name }],
    };

    setSelectedEmployee(updatedEmployee);

    setEmployees((employees) =>
      employees.map((employee) =>
        employee.id === selectedEmployee.id ? updatedEmployee : employee
      )
    );

    setName('');
    setError('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error ? <Message error content={error} /> : <></>}
      <Form.Field>
        <label>Name</label>
        <input
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Field>
      <div style={{ textAlign: 'center' }}>
        <Button type='submit' primary disabled={!selectedEmployee}>
          Add Dependent
        </Button>
      </div>
    </Form>
  );
};

export default AddDependentForm;
