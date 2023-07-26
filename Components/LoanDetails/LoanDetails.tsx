import React, { useState, useEffect } from "react";
import './LoanDetails.scss';

interface LoanDetailsProps {
    monthlyPayment: string;
    setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
}

const LoanDetails: React.FC<LoanDetailsProps> = ({ monthlyPayment, setQuestionNumber }) => {
    const [paymentStyle, setPaymentStyle] = useState<string>("payment-positive");

    useEffect(() => {
        const payment = parseFloat(monthlyPayment);
        const newPaymentStyle = payment === 0 ? "payment-zero" : "payment-zero";
        setPaymentStyle(newPaymentStyle);
    }, [monthlyPayment]);

    return (
        <div>
            <h2 className="loan-header">Loan</h2>
            <div className="payment-container">
                <p className="monthly-payment">Monthly Payment</p>
                <span className={paymentStyle}> {Math.abs(parseFloat(monthlyPayment)).toFixed(0)} </span>
                <span className="payment-unit"> €</span>
            </div>
            <hr className="divider" />
            <div className="button-container">
                <button onClick={() => setQuestionNumber(3)} className="button button--fill">Apply with co-applicant</button>
                <button onClick={() => setQuestionNumber(2)} className="button button--apply">Fill in application</button>
            </div>
        </div>
    );
};

export default LoanDetails;
