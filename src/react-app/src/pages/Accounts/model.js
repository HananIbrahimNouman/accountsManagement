import request from '../../Services/ApiService';

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
              }
            } catch (error) {
             console.log('error!')
            }
          },
          updateStats(payload, state){
            let Stats= {totalBalance: 0,pending:0,closed:0,funded:0,approved:0}
            for(var i=0;i<state.accounts.accounts.length;i++){
              Stats[state.accounts.accounts[i].status]+= 1;
              Stats.totalBalance += state.accounts.accounts[i].balance
            }

            dispatch.accounts.setStats(Stats)    
          }
    }),
}

export default count;