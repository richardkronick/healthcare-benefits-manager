import { atom } from 'recoil';

export const employeesState = atom({
  key: 'employeesState',
  default: [],
});

export const selectedEmployeeState = atom({
  key: 'selectedEmployeeState',
  default: null,
});
