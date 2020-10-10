import React from 'react';
import HomeIcon from "@material-ui/icons/Home";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'; 

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    title: 'Accounts',
    path: '/accounts',
    icon: <AccountBalanceWalletIcon />,
  }
];
