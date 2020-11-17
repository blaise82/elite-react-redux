import React from 'react';
import {
  render,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../redux/store';
const onSubmit = jest.fn();

const AppComp = () => {
  return render(
    <Provider store={store}>
      <App onSubmit={onSubmit} />
    </Provider>
  );
};
describe('APP', () => {
  afterEach(cleanup);

  it('should render the component', () => {
    const { asFragment } = AppComp();
    expect(asFragment(<App />)).toMatchSnapshot();
  });

  it('should change state/value of email on type', () => {
    const { getByLabelText } = AppComp();
    const email = getByLabelText('email');
    const password = getByLabelText('password');

    userEvent.type(email, 'email@gmail.com');
    userEvent.type(password, 'admin');

    expect(email.value).toBe('email@gmail.com');
    expect(password.value).toBe('admin');
  });

  it('should return error if password not provided', async () => {
    const { getByLabelText, container, getByText, debug } = AppComp();
    const email = getByLabelText('email');
    const form = container.querySelector('form');

    userEvent.type(email, 'email@gmail.com');

    form.dispatchEvent(new Event('submit'));

    waitFor(() => expect(getByText('Provide a password')).toBeTruthy());
  });

  it('should return error if password not provided', async () => {
    const { getByLabelText, container, getByText } = AppComp();
    const password = getByLabelText('password');
    const form = container.querySelector('form');

    userEvent.type(password, 'email@gmail.com');

    form.dispatchEvent(new Event('submit'));

    waitFor(() => expect(getByText('Provide a valid email')).toBeTruthy());
  });

  it('should return error if password and email are not correct', async () => {
    const { getByLabelText, container, getByText, debug } = AppComp();
    const password = getByLabelText('password');
    const email = getByLabelText('email');
    const button = getByLabelText('login');

    userEvent.type(email, 'email@gmail.com');
    userEvent.type(password, 'password');

    button.click(button);

    waitFor(() =>
      expect(getByText('Invalid Username or passoword')).toBeTruthy()
    );
  });
  //   it('should return backend error if password and email are not correct', () => {});

  //   it('should return backend error if password and email are not correct', () => {});
});
