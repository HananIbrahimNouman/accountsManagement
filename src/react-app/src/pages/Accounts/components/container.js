import { connect } from 'react-redux';

import Stats from './Stats';

const mapStateToProps = state => ({
  stats: state.accounts.stats,
});

const mapDispatchToProps = dispatch => ({
});

export default 
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Stats);