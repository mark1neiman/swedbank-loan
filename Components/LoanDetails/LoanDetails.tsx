import React, { useState, useEffect } from "react";
import './LoanDetails.scss';
import { useNavigate } from 'react-router-dom';
import ApplicationForm from '../Questions/ApplicationForm';

interface LoanDetailsProps {
    monthlyPayment: string;
    setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
}

const LoanDetails: React.FC<LoanDetailsProps> = ({ monthlyPayment, setQuestionNumber }) => {
    const [paymentStyle, setPaymentStyle] = useState<string>("payment-positive");
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const payment = parseFloat(monthlyPayment);
        const newPaymentStyle = payment === 0 ? "payment-zero" : "payment-zero";
        setPaymentStyle(newPaymentStyle);
    }, [monthlyPayment]);

    const handleApplicationForm = () => {
        if (parseFloat(monthlyPayment) > 0) {
            navigate("/applicationform");
        } else {
            setErrorMessage('You have to input price of the property');
        }
    };

    return (
        <div>
            <h2 className="loan-header">Loan</h2>
            <div className="payment-container">
                <p className="monthly-payment">Monthly Payment</p>
                <span className={paymentStyle}> {Math.abs(parseFloat(monthlyPayment)).toFixed(0)} </span>
                <span className="payment-unit"> €</span>
            </div>
            <hr className="divider" />

            {showApplicationForm ? (
                <ApplicationForm />
            ) : (
                <div className="button-container">
                    <button onClick={handleApplicationForm} className="button button--fill">Apply with co-applicant</button>
                    <button onClick={handleApplicationForm} className="button button--apply">Fill in application</button>
                </div>
            )}
            <div>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
        </div>

    );
};

export default LoanDetails;
