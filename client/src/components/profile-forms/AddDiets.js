import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDiets } from '../../actions/profile';

const AddDiets = ({ addDiets, history }) => {
    const [formData, setFormData] = useState({
        diet: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        diet
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.allergyOrDiet]: e.target.value });

    return (
        <Fragment>
            <h1 class='large text-primary'>Add Your Favorite Bands</h1>
            <p class='lead'>
                <i class='fas fa-code-branch' /> Add any bands you like
            </p>
            <small>* = required field</small>
            <form
                class='form'
                onSubmit={e => {
                    e.preventDefault();
                    addDiets(formData, history);
                }}
            >
                <div class='form-group'>
                    <input
                        type='text'
                        placeholder='* Diet'
                        diet='Diet'
                        value={diet}
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

AddDiets.propTypes = {
    addDiets: PropTypes.func.isRequired
};

export default connect(
    null,
    { addDiets }
)(withRouter(AddDiets));
