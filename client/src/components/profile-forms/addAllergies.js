import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAllergies } from '../../actions/profile';

const AddAllergies = ({ addAllergies, history }) => {
    const [formData, setFormData] = useState({
        allergy: ''
    });

    const { allergy } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 className='large text-primary'>What are you allergic to?</h1>
            <p className='lead'>
                <i className='fas fa-code-branch' /> Add your allergies
      </p>
            <small>* = required field</small>
            <form
                className='form'
                onSubmit={e => {
                    e.preventDefault();
                    AddAllergies(formData, history);
                }}
            >
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Allergy'
                        name='allergy'
                        value={allergy}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/dashboard'>
                    Go Back
                </Link>
            </form>
        </Fragment>
    );
};

AddAllergies.propTypes = {
    addAllergies: PropTypes.func.isRequired
};

export default connect(
    null,
    { addAllergies }
)(withRouter(AddAllergies));
