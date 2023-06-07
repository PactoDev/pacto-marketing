// import PropTypes from 'prop-types';
import {
  Route,
  Routes,
  // useLocation,
} from 'react-router-dom';
import propTypes from '../../propTypes';

import View from './View';
// import NotFound from '../NotFound';

const AccountPage = (props) => {
  // const location = useLocation();
  return (
    <Routes>
      <Route index element={<View />} />
    </Routes>

  );
};

AccountPage.propTypes = { ...propTypes.reactRouter };

export default AccountPage;
