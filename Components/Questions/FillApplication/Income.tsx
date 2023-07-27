import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './styles/Income.scss';


const validationSchema = Yup.object({
    monthlyIncome: Yup.number()
        .required('This field is required.')
        .positive('Monthly income should be a positive number'),
    hasOtherIncome: Yup.boolean(),
    rentalIncome: Yup.boolean(),
    socialSupport: Yup.boolean(),
    other: Yup.boolean(),
})
    .test('at-least-one-true', 'At least one checkbox should be checked', function (value) {
        const obj = value || this.parent || {};
        const { rentalIncome, socialSupport, other, hasOtherIncome } = obj;
        if (hasOtherIncome) {
            return rentalIncome || socialSupport || other;
        }
        return true;
    });

const Income: React.FC<{ onSubmit: (values: any) => void, initialValues: any }> = ({ onSubmit, initialValues }) => {
    const [hasOtherIncome, setHasOtherIncome] = useState<boolean>(false);

    useEffect(() => {
        setHasOtherIncome(initialValues.hasOtherIncome);
    }, [initialValues.hasOtherIncome]);

    const formik = useFormik({
        initialValues: sessionStorage.getItem('formikValues')
            ? JSON.parse(sessionStorage.getItem('formikValues') as string)
            : initialValues,
        validationSchema,
        onSubmit,
    });

    // Save to sessionStorage whenever formik.values changes
    useEffect(() => {
        sessionStorage.setItem('formikValues', JSON.stringify(formik.values));
    }, [formik.values]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue(e.target.name, e.target.checked);
    };

    const handleOtherIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasOtherIncome(e.target.checked);
        formik.setFieldValue(e.target.name, e.target.checked);
    }

    return (
        <>
            {formik.errors.monthlyIncome && <div className="error-message">{formik.errors.monthlyIncome}</div>}
            <form onSubmit={formik.handleSubmit} className="income-form">
                <div className="income-label">
                    <label htmlFor="monthlyIncome">
                        Your Monthly Income (net)
                    </label>
                    <input
                        id="monthlyIncome"
                        name="monthlyIncome"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.monthlyIncome}
                        className="income-input"
                    />
                </div>

                <div className="income-label">
                    <label htmlFor="hasOtherIncome">
                        Other Income Types
                    </label>
                    <input
                        id="hasOtherIncome"
                        name="hasOtherIncome"
                        type="checkbox"
                        onChange={handleOtherIncomeChange}
                        checked={formik.values.hasOtherIncome}
                        className="income-checkbox"
                    />
                </div>


                {hasOtherIncome && (
                    <>
                        <label htmlFor="rentalIncome" className="income-label">
                            Rental Income
                            <input
                                id="rentalIncome"
                                name="rentalIncome"
                                type="checkbox"
                                onChange={handleCheckboxChange}
                                checked={formik.values.rentalIncome}
                                className="income-checkbox"
                            />
                        </label>
                        <label htmlFor="socialSupport" className="income-label">
                            Social Support
                            <input
                                id="socialSupport"
                                name="socialSupport"
                                type="checkbox"
                                onChange={handleCheckboxChange}
                                checked={formik.values.socialSupport}
                                className="income-checkbox"
                            />
                        </label>
                        <label htmlFor="other" className="income-label">
                            Other
                            <input
                                id="other"
                                name="other"
                                type="checkbox"
                                onChange={handleCheckboxChange}
                                checked={formik.values.other}
                                className="income-checkbox"
                            />
                        </label>
                    </>
                )}
                <button type="submit" className="next-button">Forward</button>
            </form>
        </>
    );

};

export default Income;
