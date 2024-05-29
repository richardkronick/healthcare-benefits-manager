import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { selectedEmployeeState, employeesState } from '../state/atoms';
import { Card, Form, Button, Divider } from 'semantic-ui-react';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useRecoilState(employeesState);
  const [selectedEmployee, setSelectedEmployee] = useRecoilState(selectedEmployeeState);

  const [employeeName, setEmployeeName] = useState('');
  const [dependents, setDependents] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (selectedEmployee) {
      setEmployeeName(selectedEmployee.name);
      setDependents(selectedEmployee.dependents);
    }
  }, [selectedEmployee]);

  if (!selectedEmployee) return <></>;

  const handleEmployeeNameChange = (e) => {
    setEmployeeName(e.target.value);
  };

  const handleDependentNameChange = (index, newName) => {
    const updatedDependents = [...dependents];
    updatedDependents[index] = { ...updatedDependents[index], name: newName };
    setDependents(updatedDependents);
  };

  const handleSave = () => {
    const updatedEmployee = { ...selectedEmployee, name: employeeName, dependents };

    setEmployees(employees.map(employee => 
      employee.id === selectedEmployee.id ? updatedEmployee : employee
    ));

    setSelectedEmployee(updatedEmployee);
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>
            Employee Summary
        </Card.Header>
        <Divider />
            <Card.Description>
                <div>Note: All names are editable and saved by clicking the Save button</div>
                <Divider />
                    Name: 
                    <Form.Input 
                    value={employeeName}
                    onChange={handleEmployeeNameChange}
                />
            </Card.Description>
        <Divider hidden />
        <Card.Description>
          Dependents:
          <ul>
            {dependents.length === 0 ? (
              <li>None</li>
            ) : (
              dependents.map((dependent, index) => (
                <li key={index}>
                  <Form.Input 
                    value={dependent.name}
                    onChange={(e) => handleDependentNameChange(index, e.target.value)}
                  />
                </li>
              ))
            )}
          </ul>
        </Card.Description>
        <Button onClick={handleSave} primary>Save</Button>
        {isSaved && <p class='saved-message'>Saved</p>}
      </Card.Content>
    </Card>
  );
};

export default EmployeeDetails;
