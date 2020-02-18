import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteDiet } from '../../actions/profile';

const Diet = ({ diet, deleteDiet }) => {
    const diets = diet.map(diet => (
        <tr key={diet._id}>
            <td>{diet.name}</td>
            <td>
            <button
                onClick={() => deleteDiet(diet._id)}
                className='btn btn-danger'
            >
                Delete
            </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className='my-2'>My Diets</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Diet</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{diets}</tbody>
            </table>
        </Fragment>
    );
};

Diet.propTypes = {
    diets: PropTypes.array.isRequired,
    deleteDiet: PropTypes.func.isRequired
};

export default connect(
    null,
    { deleteDiet }
)(Diet);
