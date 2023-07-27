import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './styles/Obligations.scss';

const Obligations: React.FC<{ onSubmit: (values: any) => void, initialValues: any }> = ({ onSubmit, initialValues }) => {
    const [hasObligations, setHasObligations] = useState<boolean>(false);

    const validationSchema = Yup.object().shape({
        hasObligations: Yup.string().required('This field is required.'),
        obligationBank: Yup.string().when('hasObligations', (hasObligations: string, schema: any) => {
            return hasObligations === 'yes' ? schema.required('This field is required.') : schema;
        }),
        obligationAmount: Yup.number().when('hasObligations', (hasObligations: string, schema: any) => {
            return hasObligations === 'yes' ? schema.required('This field is required.').positive('The amount should be a positive number') : schema;
        }),
    });



    useEffect(() => {
        setHasObligations(initialValues.hasObligations === 'yes');
    }, [initialValues.hasObligations]);


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            onSubmit(values);
            sessionStorage.setItem('obligationsData', JSON.stringify(values));
            setSubmitting(false);
        },
    });

    return (
        <>
            {formik.errors.hasObligations && <div className="error-message">{formik.errors.hasObligations}</div>}
            <form onSubmit={formik.handleSubmit} className="obligations-form">
                <label htmlFor="hasObligations" className="obligations-label">
                    Do you have obligations outside Swedbank?
                    <div role="group" aria-labelledby="hasObligations" className="obligations-radio-group">

                        <label className="custom-radio-container">
                            Yes
                            <input
                                type="radio"
                                className="custom-radio-input"
                                name="hasObligations"
                                value="yes"
                                onChange={(e) => { formik.handleChange(e); setHasObligations(true) }}
                                checked={formik.values.hasObligations === 'yes'}
                            />
                            <span className="custom-radio">
                                <span className="inner-circle"></span>
                                <span className="outer-circle"></span>
                            </span>
                        </label>
                        <label className="custom-radio-container">
                            No
                            <input
                                type="radio"
                                className="custom-radio-input"
                                name="hasObligations"
                                value="no"
                                onChange={(e) => { formik.handleChange(e); setHasObligations(false) }}
                                checked={formik.values.hasObligations === 'no'}
                            />
                            <span className="custom-radio">
                                <span className="inner-circle"></span>
                                <span className="outer-circle"></span>
                            </span>
                        </label>



                    </div>
                </label>
                {hasObligations && (
                    <div className="obligations-label">

                        <select
                            id="obligationBank"
                            name="obligationBank"
                            onChange={formik.handleChange}
                            value={formik.values.obligationBank}
                            className="obligations-select"
                        >
                            <option value="">Select a bank</option>
                            <option value="bank1">Bank1</option>
                            <option value="bank2">Bank2</option>
                        </select>
                        <input
                            id="obligationAmount"
                            name="obligationAmount"
                            type="number"
                            placeholder="€"
                            onChange={formik.handleChange}
                            value={formik.values.obligationAmount}
                            className="obligations-input"
                        />
                    </div>
                )}
                <button type="submit" className="next-button">Forward</button>
            </form>

        </>
    );
};

export default Obligations;
