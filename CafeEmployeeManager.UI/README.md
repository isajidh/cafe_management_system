Folder Structure Explanation
public/
This folder contains the public assets of the project, such as the HTML template (index.html) and favicon. Files in this directory are served directly by the web server.

src/
The main source code of the application resides here.

api/
This folder contains modules for making API calls. Each service is defined in its own file. For example, cafeService.js handles all API requests related to cafes.

assets/
This folder contains static assets such as images, icons, and stylesheets.

components/
Reusable components are organized into subfolders. Common reusable components go under common/, while domain-specific components go under folders like Cafe/ and Employee/.

common/: Contains generic reusable components like filters, buttons, and input fields.
Cafe/: Contains components specific to the Cafe domain, such as CafeCard, CafeList, and CafeTable (which will use Aggrid for table representation).
Employee/: Contains components specific to the Employee domain.
pages/
This folder contains the main page components that represent the different routes in the application, such as Cafes.js and Employees.js.

redux/
This folder is dedicated to state management using Redux.

actions/: Contains action creators for each domain (e.g., cafeActions.js).
reducers/: Contains reducers for each domain (e.g., cafeReducer.js).
sagas/: Contains Redux-Saga side effects for each domain (e.g., cafeSagas.js).
store.js: Configures and exports the Redux store.
routes/
This folder contains the routing configuration using React Router.

AppRoutes.js: Defines the routes for the application, mapping URLs to page components.
App.js
The root component that sets up the application, including routing.

index.js
The entry point of the React application. It renders the App component and sets up the Redux provider.

.env
Environment variables configuration.

package.json
The npm package configuration file. It includes dependencies and scripts for running the application.