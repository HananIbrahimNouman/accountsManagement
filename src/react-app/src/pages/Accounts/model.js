import request from '../../Services/ApiService';
import { setLS, getLS } from '../../Utils/localStorage';

 const count = {
    state: {
        accounts: [],
        stats:{
          totalBalance: 0,
          pending:0,
          closed:0,
          funded:0,
          approved:0,
        } 
    },
    reducers: {
        setAccounts(state, accounts) {
            return {
              ...state,
              accounts,
            };
        },
        setStats(state, stats) {
          return {
            ...state,
            stats,
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
                 dispatch.accounts.updateStats();  
                 setLS('accounts', JSON.stringify(response.data));  // will be needed in future or use rematch/persist                                  
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
                dispatch.accounts.updateStats();    
                setLS('accounts', JSON.stringify(newAccounts));                 
              }
            } catch (error) {
             console.log('error!')
            }
          },
          //shouldn't be in the model file, but in utilities in future. 
          updateStats(payload, state){
            let Stats= {totalBalance: 0,pending:0,closed:0,funded:0,approved:0}
            //remember to change accounts to be an object so we don't update all values
            for(var i=0;i<state.accounts.accounts.length;i++){
              Stats[state.accounts.accounts[i].status]+= 1;
              Stats.totalBalance += state.accounts.accounts[i].balance
            }

            dispatch.accounts.setStats(Stats)    
          }
    }),
}

export default count;