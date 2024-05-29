import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { employeesState, selectedEmployeeState } from '../state/atoms';
import { Table } from 'semantic-ui-react';

const EmployeeList = () => {
  const employees = useRecoilValue(employeesState);
  const [selectedEmployee, setSelectedEmployee] = useRecoilState(selectedEmployeeState);

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Dependents</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {employees.map((employee) => (
          <Table.Row
            key={employee.id}
            className={selectedEmployee?.id === employee.id ? 'selected-row' : ''}
            onClick={() => setSelectedEmployee(employee)}
          >
            <Table.Cell>{employee.name}</Table.Cell>
            <Table.Cell>{employee.dependents.length}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default EmployeeList;
