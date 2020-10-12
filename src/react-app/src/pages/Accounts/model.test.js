/* eslint-env jest */
import { init } from '@rematch/core';

import accountsModel from './model';
import { mock } from '../../Services/ApiService';

const mockAccounts = [{id:'1', balance:1000, status:'pending'},{id:'1', balance:2000, status:'funded'}]; 

jest.mock('../../Services/ApiService');


const initialState = {
    
        accounts: [],
        stats:{
          totalBalance: 0,
          pending:0,
          closed:0,
          funded:0,
          approved:0,
        } 
    
};
let store;

describe('Accounts Model tests', () => {
  describe('Accounts Reducer tests', () => {
    it('setAccounts: should set the list of Acccounts', () => {
      const result = accountsModel.reducers.setAccounts(
        initialState,
        mockAccounts,
      );

      expect(result).toEqual({
        ...initialState,
        accounts: mockAccounts,
      });
    });
  });

  describe('Accounts Effect tests', () => {
    beforeEach(() => {
      store = init({
        models: {
          accounts: accountsModel,
        },
      });
    });

    it('fetchAccounts: test if fetchAccounts works as expected', async () => {
      mock.onGet().reply(200, { data: mockAccounts });

      store.dispatch.accounts.setAccounts = jest.fn();
      store.dispatch.accounts.updateStats = jest.fn();

      await store.dispatch.accounts.fetchAccounts({});
      expect(store.dispatch.accounts.setAccounts).toHaveBeenCalledWith(
        mockAccounts
      );
      expect(
        store.dispatch.accounts.updateStats
      ).toHaveBeenCalled();
    });

    it('updateAccount: test if updateAccount works as expected', async () => {
        mock.onPut().reply(200, { data: {} });
  
        store.dispatch.accounts.setAccounts = jest.fn();
        store.dispatch.accounts.updateStats = jest.fn();
  
        await store.dispatch.accounts.updateAccount({
            id:1,
            status:'closed',
        });
        expect(store.dispatch.accounts.setAccounts).toHaveBeenCalled();
        expect(
          store.dispatch.accounts.updateStats
        ).toHaveBeenCalled();
      });
    

  });
});
