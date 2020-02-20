import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div class='dash-buttons'>
            <Link to='/edit-profile' class='btn btn-light'>
                <i class='fas fa-user-circle text-primary' /> Edit Profile
            </Link>
            <Link to='/diets' class='btn btn-light'>
                <i class='fas fa-user-circle text-primary' /> Are You On Any Diets?
            </Link>
            <Link to='/allergies' class='btn btn-light'>
                <i class='fas fa-user-circle text-primary' /> What are you allergic to?
            </Link>

        </div>
    );
};

export default DashboardActions;
