import React from 'react';
import PropTypes from 'prop-types';

const ProfileAllergies = ({
    allergies: { allergy }
}) => (
        <div>
            <h3 className='text-dark'>{allergy}</h3>
        </div>
    );

ProfileAllergies.propTypes = {
    allergies: PropTypes.array.isRequired
};

export default ProfileAllergies;
