import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Allergy = ({ allergy }) => {
    const allergies = allergy.map(allergy => (
        <tr key={allergy._id}>
            <td>{allergy.name}</td>
            <td>
                <button className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className='my-2'>My Allergies</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Allergy</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{allergies}</tbody>
            </table>
        </Fragment>
    );
};

Allergy.propTypes = {
    allergies: PropTypes.array.isRequired
};

export default Allergy;
