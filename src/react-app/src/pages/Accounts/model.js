import request from '../../Services/ApiService';

 const count = {
    state: {
        accounts: [],
    },
    reducers: {
        setAccounts(state, accounts) {
            return {
              ...state,
              accounts,
            };
        },
    },
    effects: dispatch => ({
        async fetchAccounts(payload, state) {
            try {
              const response = await request({
                method: 'GET',
                url: "/api/accounts",
              });
          
              if (!response.error) {
                dispatch.accounts.setAccounts(response.data);
              }
            } catch (error) {
             console.log('error!')
            }
          },
          async updateAccount(payload, state) {
            try {
              const response = await request({
                method: 'PUT',
                url: "/api/accounts",
              });
          
              if (!response.error) {
                  //TBD
              }
            } catch (error) {
             console.log('error!')
            }
          },
    }),
}

export default count;