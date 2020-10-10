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
              const {id, status}=payload;
              const response = await request({
                method: 'PUT',
                url: "/api/accounts",
                data: {
                  id,
                  status
                }
              });
          
              if (!response.error) {
                const prevAccounts = state.accounts.accounts;
                const newAccounts= prevAccounts.map((prevAccount)=>{
                    if(prevAccount._id !== id) return prevAccount;
                    prevAccount.status= status;
                    return prevAccount;
                })
                dispatch.accounts.setAccounts(newAccounts);            
              }
            } catch (error) {
             console.log('error!')
            }
          },
    }),
}

export default count;