import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import './styles/Family.scss';

const validationSchema = Yup.object().shape({
    maritalStatus: Yup.string().required('You have not chosen any of options, please choose one and go futher.'),
    feelings: Yup.string().required('Description is required.'),
});


const maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'common_law_marriage', label: 'Common law marriage' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widow_widower', label: 'Widow/Widower' },
];

const Family: React.FC<{ onSubmit: (values: any) => void, initialValues: any }> = ({ onSubmit, initialValues }) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit,
    });

    const handleMaritalStatusChange = (selectedOption: any) => {
        formik.setFieldValue("maritalStatus", selectedOption.value);
    }

    const selectedOption = maritalStatusOptions.find(option => option.value === formik.values.maritalStatus);

    return (
        <>
            {formik.errors.maritalStatus ? <div className="error-message">{formik.errors.maritalStatus} {formik.errors.feelings}</div> : null}<br />
            <form onSubmit={formik.handleSubmit} className="family-form">
                <label htmlFor="maritalStatus" className="family-label">
                    Marital Status
                    <Select
                        options={maritalStatusOptions}
                        onChange={handleMaritalStatusChange}
                        value={selectedOption}
                        className="loan-purpose-select"
                    />
                </label>

                <label htmlFor="feelings" className="family-label">
                    Describe him/her
                    <textarea
                        id="feelings"
                        name="feelings"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.feelings}
                        className="family-input"
                    />
                </label>

                <button type="submit" className="next-button">Next question</button>
            </form>
        </>
    );
};

export default Family;
