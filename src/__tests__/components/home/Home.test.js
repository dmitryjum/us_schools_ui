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
  { title: 'Grizzly School', id: 1, details: { mascot: "Grizzly bear" } },
  { title: 'Wild Boar School', id: 2, details: { mascot: "Wild boar" } }
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
    const spyTTK = jest.spyOn(USUApi, 'getTopTwentyKeys')
    const spySearch = jest.spyOn(USUApi, 'search')
    const respTTK = {
      data: { "website":642,"established":638,"type":633 },
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
    expect(screen.getByText(/Grizzly School/i)).toBeInTheDocument();
    expect(screen.getByText(/Wild Boar School/)).toBeInTheDocument();
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