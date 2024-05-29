import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { selectedEmployeeState, employeesState } from '../state/atoms';
import { calculateBenefitsCost, toDollars } from '../utils/calculations';
import { Card, Form, Button, Icon, Divider } from 'semantic-ui-react';
import { displaySavedMessageTimeInMs, numPaychecksPerYear } from '../common/constants';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useRecoilState(employeesState);
  const [selectedEmployee, setSelectedEmployee] = useRecoilState(selectedEmployeeState);

  const [employeeName, setEmployeeName] = useState('');
  const [dependents, setDependents] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [costPerPaycheck, setCostPerPaycheck] = useState(0);

  useEffect(() => {
    if (selectedEmployee) {
      setEmployeeName(selectedEmployee.name);
      setDependents(selectedEmployee.dependents);
      recalculateCost(selectedEmployee.name, selectedEmployee.dependents);
    }
  }, [selectedEmployee]);

  const recalculateCost = (name, dependents) => {
    const updatedEmployee = { name, dependents };
    const { totalCost } = calculateBenefitsCost(updatedEmployee);
    setCostPerPaycheck(toDollars(totalCost / numPaychecksPerYear));
  };

  const handleEmployeeNameChange = (e) => {
    const newName = e.target.value;
    setEmployeeName(newName);
    recalculateCost(newName, dependents);
  };

  const handleDependentNameChange = (index, newName) => {
    const updatedDependents = [...dependents];
    updatedDependents[index] = { ...updatedDependents[index], name: newName };
    setDependents(updatedDependents);
    recalculateCost(employeeName, updatedDependents);
  };

  const handleAddDependent = () => {
    const updatedDependents = [...dependents, { id: '', name: '' }];
    setDependents(updatedDependents);
    recalculateCost(employeeName, updatedDependents);
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
    }, displaySavedMessageTimeInMs);
  };

  const handleRemoveDependent = (index) => {
    const updatedDependents = dependents.filter((_, i) => i !== index);
    setDependents(updatedDependents);
    recalculateCost(employeeName, updatedDependents);
  };

  const isSaveDisabled = () => {
    return dependents.some(dependent => dependent.name?.trim() === '');
  };

  if (!selectedEmployee) {
    return null;
  }

  return (
    <Card>
      <Card.Content>        
        <Card.Header>
            Employee Details
        </Card.Header>
        <Divider />
            Name
          <Form.Input 
            value={employeeName}
            onChange={handleEmployeeNameChange}
          />
        <Card.Description>
          <div style={{ display: 'flex', alignItems: 'center', paddingTop: '3rem' }}>
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
        <div style={{ marginBottom: '10px' }}>
          By clicking save, the cost per paycheck will be ${costPerPaycheck}
        </div>
        <Button onClick={handleSave} primary disabled={isSaveDisabled()}>Save</Button>
        {isSaved && <p className="saved-message">Saved</p>}
      </Card.Content>
    </Card>
  );
};

export default EmployeeDetails;
