import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
    profile: {
        user: { _id, name, avatar },
        location,
        diets,
        allergies
    }
}) => {
    return (
        <div className='profile bg-light'>
            <img src={avatar} alt='' className='round-img' />
            <div>
                <h2>{name}</h2>
                <p className='my-1'>{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className='btn btn-primary'>
                    View Profile
                </Link>
            </div>
            <ul>
                {diets.slice(0, 4).map((diet, index) => (
                    <li key={index} className='text-primary'>
                        <i className='fas fa-check' /> {diet}
                    </li>
                ))}
            </ul>
            <ul>
                {allergies.slice(0, 4).map((allergy, index) => (
                    <li key={index} className='text-primary'>
                        <i className='fas fa-check' /> {allergy}
                    </li>
                ))}
            </ul>
        </div>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;
