import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedEmployeeState } from '../state/atoms';
import { Card, Divider } from 'semantic-ui-react';
import { calculateBenefitsCost } from '../utils/calculations';

const BenefitsSummary = () => {
  const selectedEmployee = useRecoilValue(selectedEmployeeState);

  if (!selectedEmployee) return <div>Select an employee to see benefits summary</div>;

  const { totalCost, totalDiscount } = calculateBenefitsCost(selectedEmployee);

  const costPerPaycheck = totalCost / 26;

  return (
    <Card>
      <Card.Content>
        <Card.Header>Benefits Summary</Card.Header>
        <Divider />
        <Card.Description>
          <p>Annual Benefits Cost: ${totalCost.toFixed(2)}</p>
          <p>Total Discount Applied: ${totalDiscount.toFixed(2)}</p>
          <Divider />
          <p>Monthly Salary: ${(selectedEmployee.monthlySalary).toFixed(2)}</p>
          <p>Cost Per Paycheck: ${(costPerPaycheck).toFixed(2)}</p>
          <p>Total Monthly Disbursement: ${(selectedEmployee.monthlySalary - costPerPaycheck).toFixed(2)}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default BenefitsSummary;
