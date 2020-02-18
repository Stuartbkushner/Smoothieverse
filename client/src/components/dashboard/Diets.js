import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Diet = ({ diet }) => {
    const diets = diet.map(diet => (
        <tr key={diet._id}>
            <td>{diet.name}</td>
            <td>
                <button className='btn btn-danger'>Delete</button>
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
    diets: PropTypes.array.isRequired
};

export default Diet;
