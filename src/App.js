import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Container, Grid, Divider, Header, Segment } from 'semantic-ui-react';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import AddEmployeeForm from './components/AddEmployeeForm';
import AddDependentForm from './components/AddDependentForm';
import BenefitsSummary from './components/BenefitsSummary';
import { employeesState } from './state/atoms';
import './index.css';

const App = () => {
  const setEmployees = useSetRecoilState(employeesState);

  useEffect(() => {
    fetch('http://localhost:5000/employees')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employee data:', error));
  }, [setEmployees]);

  return (
    <Container className="main-container">
      <Segment className="header-segment">
        <Header as="h1" textAlign="center" className="header-text">
          My Awesome Org - Employee Benefits Manager
        </Header>
      </Segment>
      <Segment>
        <Header as="h2" textAlign="center">Add Employees</Header>
        <Divider hidden />
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={8}>
              <AddEmployeeForm />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      {/* You can comment this in if you would like a separate "Add Dependents" form
      <Segment>
        <Header as="h2" textAlign="center">Add Dependents</Header>
        <div className="instruction" style={{ textAlign: 'center' }}>
          You must first select an employee in order to add a dependent.
        </div>
        <Divider hidden />
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={8}>
              <AddDependentForm />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment> */}
      <Segment>
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column width={6}>
              <Header as="h2">My Employees</Header>
              <EmployeeList />
            </Grid.Column>
            <Grid.Column width={10}>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={8}>
                    <BenefitsSummary />
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <EmployeeDetails />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

export default App;
