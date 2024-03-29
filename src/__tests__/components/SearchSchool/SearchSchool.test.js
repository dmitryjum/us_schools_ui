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

describe('SearchSchool component', () => {
  describe('unauthenticted state', () => {
    it('should render all the components', () => {
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
      expect(screen.getByText(/Search/i)).toBeInTheDocument();
    });

    it('should dispatch the search action when the Search button is clicked', async () => {
      const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(jest.fn())
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
      fireEvent.click(screen.getByText('Search'));

      await waitFor(() => {
        expect(useDispatchMock).toHaveBeenCalled()
        useDispatchMock.mockClear()
      })
    });

    it('should not render the New School button if the user is not authenticated', () => {
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
      expect(screen.queryByText('New School')).not.toBeInTheDocument();
    })
  })
  
  describe('authenticted state', () => {
    it('should render the New School button if the user is authenticated', () => {
      const store = createStore(
        rootReducer,
        {
          user: {
            data: {
              isAuthenticated: true
            }
          }
        }
      );

      act(() => {
        renderWithRedux(<SearchSchool />, store);
      });
      expect(screen.queryByText('New School')).toBeInTheDocument();
    })

    it('should dispatch the openModal action when the New School button is clicked', async () => {
      const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(jest.fn())
      const store = createStore(
        rootReducer,
        {
          user: {
            data: {
              isAuthenticated: true
            }
          }
        },
        applyMiddleware(reduxThunk)
      );

      act(() => {
        renderWithRedux(<SearchSchool />, store);
      });
      fireEvent.click(screen.getByText('New School'));
      
      await waitFor(() => {
        expect(useDispatchMock).toHaveBeenCalled()
      })
    });
  })
});
