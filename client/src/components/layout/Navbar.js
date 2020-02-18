import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to='/profiles'>Meet Fellow Smoothie Lovers</Link>
            </li>
            <li>
                <Link to='/dashboard'>
                    <i className='fas fa-user' />{' '}
                    <span className='hide-sm'>Dashboard</span>
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='#!'>All Smoothie Lovers</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/posts'>Posts</Link>
            </li>
        </ul>
    );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/index'>
          <i className='fas fa-code' /> SmoothieVerse
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
