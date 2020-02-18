import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAllergies } from '../../actions/profile';

const AddAllergies = ({ addAllergies, history }) => {
    const [formData, setFormData] = useState({
        allergy: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { allergy } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h1 class='large text-primary'>What are you allergic to?</h1>
            <p class='lead'>
                <i class='fas fa-code-branch' /> Add your allergies
      </p>
            <small>* = required field</small>
            <form
                class='form'
                onSubmit={e => {
                    e.preventDefault();
                    AddAllergies(formData, history);
                }}
            >
                <div class='form-group'>
                    <input
                        type='text'
                        placeholder='* Allergy'
                        name='allergy'
                        value={allergy}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type='submit' class='btn btn-primary my-1' />
                <a class='btn btn-light my-1' href='dashboard.html'>
                    Go Back
                </a>
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
