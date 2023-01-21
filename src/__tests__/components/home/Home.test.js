import React from 'react';
import reduxThunk from 'redux-thunk'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../../reducers'
import Home from '../../../components/home';
import USUApi from '../../../utils/api';
import * as SchoolListActions from '../../../actions/schoolList';

const schools = [
  { title: 'Test School', id: 1, details: { mascot: "Grizzly bear" } },
  { title: 'Test School 2', id: 2, details: { mascot: "Wild boar" } }
];
const schoolListState = {
  records: schools,
  schoolPage: 1,
  per_page: 2,
  filter: {},
  search: {},
  totalPages: 2
};
const userState = {
  data: {
    isAuthenticated: false
  }
};

const store = createStore(
    rootReducer,
    {schools: schoolListState, user: userState},
    applyMiddleware(reduxThunk)
  );

const renderWithRedux = (component) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  )
}

describe('Home component', () => {
  beforeEach(() => {
    jest.mock('../../../constants/env/us_states_api', () => {
      return {
        constants: {
          US_STATE_UNIVERSITIES_HOST: 'https://api.example.com'
        }
      }
    });
    // console.log(`api: ${USUApi}`)
    const spyTTK = jest.spyOn(USUApi, 'getTopTwentyKeys')
    const spySearch = jest.spyOn(USUApi, 'search')
    const respTTK = {
      data: { "website":642,"established":638,"type":633,"location":632,"campus":586,"colors":578,"students":564,"nickname":532,"president":510,"sporting affiliations":478,"endowment":467,"mascot":430,"undergraduates":421,"academic staff":413,"postgraduates":394,"motto":383,"parent institution":356,"academic affiliations":305,"former names":288,"provost":259 },
      status: 200,
      statusText: "OK"
    }

    const respSearch = { totalPages: 1 }
    spyTTK.mockResolvedValue(respTTK)
    spySearch.mockResolvedValue(respSearch)

    store.dispatch(SchoolListActions.requestSchools());
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should render all the components', () => {
    act(() => {
      renderWithRedux(<Home />);
    });
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/More schools!/i)).toBeInTheDocument();
    expect(screen.getByText(/Test School/)).toBeInTheDocument();
    expect(screen.getByText(/Test School 2/)).toBeInTheDocument();
  });

  xit('should call addMoreSchools action on clicking the button', async () => {
    const spy = jest.spyOn(SchoolListActions, 'addMoreSchools');
    renderWithRedux(<Home />);
    fireEvent.click(screen.getByText(/More schools!/i));
    await waitFor(() => expect(spy).toHaveBeenCalled());
  });

  xit('should not render alert message when authenticated', () => {
    store.dispatch({ type: 'USER_AUTHENTICATED' });
    renderWithRedux(<Home />);
    expect(screen.queryByText(/Please Sign Up/i)).toBeNull();
  });
});

// yarn add react-dom@version