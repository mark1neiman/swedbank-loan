import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import './styles/LoanPurpose.scss';

const validationSchema = Yup.object().shape({
    loanPurpose: Yup.string().required('You have not chosen any of options, please choose one and go further.'),
});

const options = [
    { value: 'purchase_of_housing', label: 'Purchase of housing' },
    { value: 'exploring_loan_possibilities', label: 'Exploring the loan possibilities, looking for real estate' },
    { value: 'housing_renovation_or_repair', label: 'Housing renovation or repair' },
    { value: 'construction_of_housing', label: 'Construction of housing' },
    { value: 'purchase_of_land_plot', label: 'Purchase of land plot' },
    { value: 'home_exchange', label: 'Home exchange' },
];

const LoanPurpose: React.FC<{ onSubmit: (values: any) => void, initialValues: any }> = ({ onSubmit, initialValues }) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit,
    });

    const handleChange = (selectedOption: any) => {
        formik.setFieldValue("loanPurpose", selectedOption.value);
    }

    const selectedOption = options.find(option => option.value === formik.values.loanPurpose);

    return (
        <>
            {formik.errors.loanPurpose && <div className="error-message">{formik.errors.loanPurpose}</div>}
            <form onSubmit={formik.handleSubmit} className="loan-purpose-form">

                <label htmlFor="loanPurpose" className="loan-purpose-label">
                    Loan Purpose
                    <Select
                        options={options}
                        onChange={handleChange}
                        value={selectedOption}
                        className="loan-purpose-select"
                        classNamePrefix="select"
                    />

                </label>
                <button type="submit" className="next-button">Forward</button>

            </form>

        </>
    );
};

export default LoanPurpose;
