/* eslint-env jest */
/* eslint-disable */
import React from 'react';
import {  fireEvent, render, waitForElement } from '@testing-library/react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({
  accounts: { stats: {}, accounts:[{id:'1', balance:1000, status:'pending'}] }
});

import Accounts from './component';

const props = {
  classes: {},
  updateAccount: jest.fn(),
  accounts: [{id:'1', balance:1000, status:'pending'},{id:'1', balance:2000, status:'funded'}],
};

describe('Accounts component', () => {
  it('should test if <Accounts/> component renders properly', async () => {
    const { findByTestId } = render(<Provider store={store}><Accounts {...props} /></Provider>);

    expect(findByTestId('accounts__stats')).toBeDefined();
    expect(findByTestId('accounts__filter')).toBeDefined();
    expect(findByTestId('accounts__table')).toBeDefined();
  });

  // it('should test if <Accounts/> select component update status', async () => {
  //   const { findByText, findByTestId } =   render(<Provider store={store}><Accounts {...props} /></Provider>);
  //   await waitForElement(() => findByTestId('account__select'))
  //   fireEvent.click(findByTestId("account__select"));
  //   fireEvent.click(findByText("closed"));
  //   expect(props.updateAccount).toBeCalled();
  // });
});
