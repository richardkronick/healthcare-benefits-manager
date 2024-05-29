import { standardEmployeeAnnualCost, standardDependentAnnualCost, standardDiscountPercent } from '../common/constants'

export const calculateBenefitsCost = (employee) => {
    if (!employee || !employee.name || !Array.isArray(employee.dependents)) {
      return { totalCost: 0, totalDiscount: 0 };
    }
  
    const employeeDiscount = employee.name.toLowerCase().startsWith('a') ? standardDiscountPercent : 0;
    let totalCost = standardEmployeeAnnualCost * (1 - employeeDiscount);
    let totalDiscount = standardEmployeeAnnualCost * employeeDiscount;
  
    employee.dependents.forEach((dependent) => {
      const dependentDiscount = dependent.name?.toLowerCase().startsWith('a') ? standardDiscountPercent : 0;
      totalCost += standardDependentAnnualCost * (1 - dependentDiscount);
      totalDiscount += standardDependentAnnualCost * dependentDiscount;
    });
  
    return { totalCost, totalDiscount };
  };
  
  export const toDollars = (num) => num?.toFixed(2);