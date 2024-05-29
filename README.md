# Employee Benefits Manager

This front-end app is intended to be used by employers to manage their employees benefits. It displays a list of employees, their associated dependents
and a summary of relevant costs associated with each employees benefits. In addition, you can add and remove dependents and add employees.

## Dependencies

- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Technologies and Important Packages Used
- [React and Create React App](https://github.com/facebook/create-react-app)
- [Recoil](https://recoiljs.org/) for state management
- [Semantic UI](https://react.semantic-ui.com/) for styling

### Why these technologies?
- React because it can provide a great user experience as well as developer experience. Vue could also be a good choice.
- Recoil is, in the author's opinion, usually the best choice for state management. The react context API could work. MobX could work. Redux makes me sad.
- Semantic UI was chosen because it is easy, fast and looks nice. But there are many other good choices like Material UI, Tailwind, etc.

## How to run the app
- Clone the repo to your local machine
- Open a terminal at the rool and run `npm run server` 
    - This will run a mock API server called [json-server](https://www.npmjs.com/package/json-server)
    - And will give you some starting mock data (employees with dependents)
    - The mock data comes from the db.json file
- Open another terminal and run `npm start`
    - This runs the app in the development mode.
    - It will open [http://localhost:3000](http://localhost:3000) in your browser.
    - Thanks to hot reloading installed by create-react-app the page will reload when you make changes.

## Assumptions in the App
- In /src/common/constants.js you will find some defaults and assumptions, such as the monthly employee salary and annual cost of benefits.
- There is a 10% discount offered to employees and dependents whose names start with the letter A.
- A bi-weekly payment schedule is used (26 payments per year).

## Things I might have done differently if...
If I knew this was an app going to production, or that would become larger, I would
- Probably use next.js for integrated API routing, automatic code splitting, TypeScript support, the intuitive file structure routing, etc.
- Definitely add some unit and integration testing
- Use TypeScript
- Use some sort of persistent storage, such as a database
- Do some performance testing and see where [useMemo](https://react.dev/reference/react/useMemo) and [useCallback](https://react.dev/reference/react/useContext) might be beneficial
- Implement this as a monorepo using [nx](https://nx.dev/) if this could become a large application
- Add authentication and authorization
- Cleanup inline styles and consolidate them
- Add more validation, such as checking for numbers in names
- Add the ability to delete an employee
- Possibly consider combining pieces of state in more complex components into a single object piece of state
- Maybe use a different styling library. Semantic UI has a smaller community and usage than some others.