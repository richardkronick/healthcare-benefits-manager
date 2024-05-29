export const calculateBenefitsCost = (employee) => {
    if (!employee || !employee.name || !Array.isArray(employee.dependents)) {
      return { totalCost: 0, totalDiscount: 0 };
    }
  
    const baseCost = 1000;
    const dependentCost = 500;
    const employeeDiscount = employee.name.toLowerCase().startsWith('a') ? 0.1 : 0;
    let totalCost = baseCost * (1 - employeeDiscount);
    let totalDiscount = baseCost * employeeDiscount;
  
    employee.dependents.forEach((dependent) => {
      const dependentDiscount = dependent.name.toLowerCase().startsWith('a') ? 0.1 : 0;
      totalCost += dependentCost * (1 - dependentDiscount);
      totalDiscount += dependentCost * dependentDiscount;
    });
  
    return { totalCost, totalDiscount };
  };
  