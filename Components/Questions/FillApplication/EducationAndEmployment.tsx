import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import './styles/EducationAndEmployment.scss';

const validationSchema = Yup.object().shape({
    educationLevel: Yup.string().required('You have not chosen any of options, please choose one and go further.'),
    employmentStatus: Yup.string().required('Choose one answer'),
});

const educationOptions = [
    { value: 'primary', label: 'Primary' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'vocational', label: 'Vocational' },
    { value: 'college', label: 'College' },
    { value: 'higher', label: 'Higher' },
];

const employmentOptions = [
    { value: 'trial_period', label: 'Trial period' },
    { value: '1_3_years', label: 'up to 1-3 year' },
    { value: '3_5_years', label: 'up to 3-5 years' },
    { value: 'more_than_5_years', label: 'more than 5 years' },
];

const EducationAndEmployment: React.FC<{ onSubmit: (values: any) => void, initialValues: any }> = ({ onSubmit, initialValues }) => {
    const formik = useFormik({
        initialValues: initialValues || { educationLevel: '', employmentStatus: '' },
        validationSchema,
        onSubmit,
    });

    const handleEducationChange = (selectedOption: any) => {
        formik.setFieldValue("educationLevel", selectedOption.value);
    }

    const handleEmploymentChange = (selectedOption: any) => {
        formik.setFieldValue("employmentStatus", selectedOption.value);
    }

    return (
        <>
            {formik.errors.employmentStatus && <div className="error-message">{formik.errors.employmentStatus}. {formik.errors.educationLevel}</div>}

            <form onSubmit={formik.handleSubmit} className="loan-purpose-form">
                <label htmlFor="educationLevel" className="loan-purpose-label">
                    Education Level
                    <Select
                        className="loan-purpose-select"
                        options={educationOptions}
                        onChange={handleEducationChange}
                        value={educationOptions.find(option => option.value === formik.values.educationLevel)}
                    />
                </label>


                <label htmlFor="employmentStatus" className="loan-purpose-label">
                    Time employed on current position
                    <Select
                        className="loan-purpose-select"
                        options={employmentOptions}
                        onChange={handleEmploymentChange}
                        value={employmentOptions.find(option => option.value === formik.values.employmentStatus)}
                    />
                </label>


                <button type="submit" className="next-button">Forward</button>
            </form>
        </>
    );
};

export default EducationAndEmployment;
