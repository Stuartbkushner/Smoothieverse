import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div className='dash-buttons'>
            <Link to='/edit-profile' className='btn btn-light'>
                <i className='fas fa-user-circle text-primary' /> Edit Profile
            </Link>
            <Link to='/diets' className='btn btn-light'>
                <i className='fas fa-user-circle text-primary' /> Are You On Any Diets?
            </Link>
            <Link to='/allergies' className='btn btn-light'>
                <i className='fas fa-user-circle text-primary' /> What are you allergic to?
            </Link>

        </div>
    );
};

export default DashboardActions;
