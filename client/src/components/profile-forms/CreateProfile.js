import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const CreateProfile = ({
    createProfile,
    getCurrentProfile,
    profile: { profile, loading },
    history
}) => {
    const [formData, setFormData] = useState({
        location: '',
        bio: '',
        diets: '',
        allergies: '',
        youtube: '',
        twitter: '',
        facebook: '',
        instagram: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const {
        location,
        bio,
        diets,
        allergies,
        youtube,
        twitter,
        facebook,
        instagram
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history)
    };
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return loading && profile === null ? (
        <Redirect to='/dashboard' />
    ) : (
            <Fragment>
                <h1 className='large text-primary'>Create Your Profile</h1>
                <p className='lead'>
                    <i className='fas fa-user' /> Let's get some information to make your
                    profile stand out
                 </p>
                <small>* = required field</small>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Location'
                            name='location'
                            value={location}
                            onChange={e => onChange(e)}
                        />
                        <small className='form-text'>
                            City & state suggested (eg. Boston, MA)
                    </small>
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='* Diets'
                            name='diets'
                            value={diets}
                            onChange={e => onChange(e)}
                        />
                        <small className='form-text'>
                            Please use comma separated values (eg. Keto, Sugar-Free)
                    </small>
                    </div>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='* Allergies'
                            name='allergies'
                            value={allergies}
                            onChange={e => onChange(e)}
                        />
                        <small className='form-text'>
                            Please use comma separated values (eg. Milk, Gluten)
                    </small>
                    </div>
                    <div className='form-group'>
                        <textarea
                            placeholder='A short bio of yourself'
                            name='bio'
                            value={bio}
                            onChange={e => onChange(e)}
                        />
                        <small className='form-text'>Tell us a little about yourself</small>
                    </div>

                    <div className='my-2'>
                        <button
                            onClick={() => toggleSocialInputs(!displaySocialInputs)}
                            type='button'
                            className='btn btn-light'
                        >
                            Add Social Network Links
                        </button>
                        <span>Optional</span>
                    </div>

                    {displaySocialInputs && (
                        <Fragment>
                            <div className='form-group social-input'>
                                <i className='fab fa-twitter fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Twitter URL'
                                    name='twitter'
                                    value={twitter}
                                    onChange={e => onChange(e)}
                                />
                            </div>

                            <div className='form-group social-input'>
                                <i className='fab fa-facebook fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Facebook URL'
                                    name='facebook'
                                    value={facebook}
                                    onChange={e => onChange(e)}
                                />
                            </div>

                            <div className='form-group social-input'>
                                <i className='fab fa-youtube fa-2x' />
                                <input
                                    type='text'
                                    placeholder='YouTube URL'
                                    name='youtube'
                                    value={youtube}
                                    onChange={e => onChange(e)}
                                />
                            </div>

                            <div className='form-group social-input'>
                                <i className='fab fa-instagram fa-2x' />
                                <input
                                    type='text'
                                    placeholder='Instagram URL'
                                    name='instagram'
                                    value={instagram}
                                    onChange={e => onChange(e)}
                                />
                            </div>
                        </Fragment>
                    )}

                    <input type='submit' className='btn btn-primary my-1' />
                    <Link className='btn btn-light my-1' to='/dashboard'>
                        Go Back
                </Link>
                </form>
            </Fragment >
        )
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});


export default connect(
    mapStateToProps,
    { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
