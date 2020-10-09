import React, { useState, useEffect } from 'react';


const Accounts = ({
  accounts
}) => {

  //const [claimCode, setClaimCode] = useState('');


  useEffect(() => {
   
  }, []);


  return (
    <div>{ accounts[0] && accounts[0].status}</div>
  );
};

export default Accounts;
