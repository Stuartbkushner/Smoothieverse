import React from 'react';
import PropTypes from 'prop-types';

const ProfileDiets = ({
    diets: { diet }
}) => (
        <div>
            <h3 className='text-dark'>{diet}</h3>
        </div>
    );

ProfileDiets.propTypes = {
    diets: PropTypes.array.isRequired
};

export default ProfileDiets;
