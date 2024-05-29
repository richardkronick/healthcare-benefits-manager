import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { selectedEmployeeState, employeesState } from '../state/atoms';
import { Card, Form, Button, Icon } from 'semantic-ui-react';

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

  const handleAddDependent = () => {
    setDependents([...dependents, { id: '', name: '' }]);
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

  const handleRemoveDependent = (index) => {
    const updatedDependents = dependents.filter((_, i) => i !== index);
    setDependents(updatedDependents);
  };

  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Form.Input 
            value={employeeName}
            onChange={handleEmployeeNameChange}
          />
        </Card.Header>
        <Card.Description>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            Dependents
            <Button icon color='green' size='mini' onClick={handleAddDependent} style={{ marginLeft: '10px' }}>
              <Icon name='plus' />
            </Button>
          </div>
          <div className="dependent-list">
            {dependents.length === 0 ? (
              <div>None</div>
            ) : (
              dependents.map((dependent, index) => (
                <div key={index} className="dependent-item">
                  <Form.Input 
                    value={dependent.name}
                    onChange={(e) => handleDependentNameChange(index, e.target.value)}
                    className="dependent-input"
                  />
                  <Button icon color='red' size='mini' onClick={() => handleRemoveDependent(index)}>
                    <Icon name='trash' />
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card.Description>
        <Button onClick={handleSave} primary>Save</Button>
        {isSaved && <p className="saved-message">Saved</p>}
      </Card.Content>
    </Card>
  );
};

export default EmployeeDetails;
