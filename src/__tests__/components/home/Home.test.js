import React from 'react';
import reduxThunk from 'redux-thunk'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import schoolList from '../../../reducers/schoolList';
import rootReducer from '../../../reducers'
import Home from '../../../components/home';
import * as SchoolListActions from '../../../actions/schoolList';

const schools = [{ name: 'Test School', id: 1 }, { name: 'Test School 2', id: 2 }];
const schoolListState = {
  records: schools,
  schoolPage: 1,
  per_page: 10,
  filter: {},
  search: {},
  totalPages: null
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
    store.dispatch(SchoolListActions.requestSchools());
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should render all the components', () => {
    act(() => {
      renderWithRedux(<Home />);
    });
    expect(screen.getByText(/Please Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/More schools!/i)).toBeInTheDocument();
    expect(screen.getByText(/Test School/i)).toBeInTheDocument();
    expect(screen.getByText(/Test School 2/i)).toBeInTheDocument();
  });

  it('should call addMoreSchools action on clicking the button', async () => {
    const spy = jest.spyOn(SchoolListActions, 'addMoreSchools');
    renderWithRedux(<Home />);
    fireEvent.click(screen.getByText(/More schools!/i));
    await waitFor(() => expect(spy).toHaveBeenCalled());
  });

  it('should not render alert message when authenticated', () => {
    store.dispatch({ type: 'USER_AUTHENTICATED' });
    renderWithRedux(<Home />);
    expect(screen.queryByText(/Please Sign Up/i)).toBeNull();
  });
});

// yarn add react-dom@version