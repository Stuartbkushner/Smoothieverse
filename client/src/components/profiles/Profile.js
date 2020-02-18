import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileDiets from './ProfileDiets';
import ProfileAllergies from './ProfileAllergies';
import { getProfileById } from '../../actions/profile';

const Profile = ({
    getProfileById,
    profile: { profile, loading },
    auth,
    match
}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (
        <Fragment>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                    <Fragment>
                        <Link to='/profiles' className='btn btn-light'>
                            Back To Profiles
                        </Link>
                        {auth.isAuthenticated &&
                            auth.loading === false &&
                            auth.user._id === profile.user._id && (
                                <Link to='/edit-profile' className='btn btn-dark'>
                                    Edit Profile
                                    </Link>
                            )}
                        <div class='profile-grid my-1'>
                            <ProfileTop profile={profile} />
                            <ProfileAbout profile={profile} />
                            <div className='profile-diets bg-white p-2'>
                                <h2 className='text-primary'>Diets I'm Currently On</h2>
                                {profile.diets.length > 0 ? (
                                    <Fragment>
                                        {profile.diets.map(diet => (
                                            <ProfileDiets
                                                key={diet._id}
                                                diets={diet}
                                            />
                                        ))}
                                    </Fragment>
                                ) : (
                                        <h4>I'm Not On Any Diets</h4>
                                    )}
                            </div>

                            <div className='profile-allergies bg-white p-2'>
                                <h2 className='text-primary'>Allergies</h2>
                                {profile.allergies.length > 0 ? (
                                    <Fragment>
                                        {profile.allergies.map(allergy => (
                                            <ProfileAllergies
                                                key={allergy._id}
                                                allergies={allergy}
                                            />
                                        ))}
                                    </Fragment>
                                ) : (
                                        <h4>I'm Not Allergic to Anything</h4>
                                    )}
                            </div>

                        </div>
                            )}
                    </Fragment>
                )}
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getProfileById }
)(Profile);
