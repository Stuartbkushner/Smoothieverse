import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
    profile: {
        bio,
        diets,
        allergies,
        user: { name }
    }
}) => (
        <div className='profile-about bg-light p-2'>
            {bio && (
                <Fragment>
                    <h2 className='text-primary'>{name.trim().split(' ')[0]}s Bio</h2>
                    <p>{bio}</p>
                    <div className='line' />
                </Fragment>
            )}
            <h2 className='text-primary'>Diets I'm Currently On</h2>
            <div className='diets'>
                {diets.map((diet, index) => (
                    <div key={index} className='p-1'>
                        <i className='fas fa-check' /> {diet}
                    </div>
                ))}
            </div>
            <h2 className='text-primary'>My Allergies</h2>
            <div className='allergies'>
                {allergies.map((allergy, index) => (
                    <div key={index} className='p-1'>
                        <i className='fas fa-check' /> {allergy}
                    </div>
                ))}
            </div>
        </div>
    );

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileAbout;
