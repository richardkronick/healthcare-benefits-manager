import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedEmployeeState } from '../state/atoms';
import { Card, Divider } from 'semantic-ui-react';
import { calculateBenefitsCost } from '../utils/calculations';
import { numPaychecksPerYear } from '../common/constants'
import { toDollars } from '../utils/calculations';

const BenefitsSummary = () => {
  const selectedEmployee = useRecoilValue(selectedEmployeeState);

  if (!selectedEmployee) return <div>Select an employee to see their benefits summary</div>;

  const { totalCost, totalDiscount } = calculateBenefitsCost(selectedEmployee);

  const costPerPaycheck = totalCost / numPaychecksPerYear;

  return (
    <Card>
      <Card.Content>
        <Card.Header>Benefits Summary</Card.Header>
        <Divider />
        <Card.Description>
          <p>Annual Benefits Cost: ${toDollars(totalCost)}</p>
          <p>Total Discount Applied: ${toDollars(totalDiscount)}</p>
          <Divider />
          <p>Monthly Salary: ${toDollars(selectedEmployee.monthlySalary)}</p>
          <p>Cost Per Paycheck: ${toDollars(costPerPaycheck)}</p>
          <p>Total Monthly Disbursement: ${toDollars(selectedEmployee.monthlySalary - costPerPaycheck)}</p>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default BenefitsSummary;
