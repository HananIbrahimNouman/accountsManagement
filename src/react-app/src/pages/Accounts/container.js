import { connect } from 'react-redux';

import Accounts from './component';

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
});

const mapDispatchToProps = dispatch => ({
    updateAccount: dispatch.accounts.updateAccount,
});

export default 
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Accounts);