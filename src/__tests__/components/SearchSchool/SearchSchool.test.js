import React from 'react';
import reduxThunk from 'redux-thunk'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../../reducers'
import SearchSchool from '../../../components/SearchSchool';

const renderWithRedux = (component, store) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  )
}

afterEach(() => {
  jest.resetModules();
});

// don't create a real store, learn how to create a store mock

describe('SearchSchool component', () => {
  it('should render all the components', () => {
    const store = createStore(
      rootReducer,
      {
        user: {
          data: {
            isAuthenticated: false
          }
        }
      }
    );
    act(() => {
      renderWithRedux(<SearchSchool />, store);
    });
    expect(screen.getByText(/Search/i)).toBeInTheDocument();
  });

  it('should dispatch the search action when the Search button is clicked', async () => {
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
    const store = createStore(
      rootReducer,
      {
        user: {
          data: {
            isAuthenticated: false
          }
        }
      },
      applyMiddleware(reduxThunk)
    );
    act(() => {
      renderWithRedux(<SearchSchool />, store);
    });
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    await waitFor(() => expect(useDispatchMock).toHaveBeenCalled())
  });

  // xit('should not render the New School button if the user is not authenticated', () => {
  //   store = mockStore({
  //     user: {
  //       data: {
  //         isAuthenticated: false // Set isAuthenticated to false for testing purposes
  //       }
  //     }
  //   });

  //   component.rerender(
  //     <Provider store={store}>
  //       <SearchSchool />
  //     </Provider>
  //   );

  //   const newSchoolButton = component.queryByText('New School');
  //   expect(newSchoolButton).not.toBeInTheDocument();
  // });
});
