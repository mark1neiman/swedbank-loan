import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoanCounter from "../LoadCounter/LoanCounter";
import LoanDetails from "../LoanDetails/LoanDetails";
import ApplicationForm from "../Questions/ApplicationForm"; // Make sure this import is correct
import './Form.scss';

const Form: React.FC = () => {
    const [monthlyPayment, setMonthlyPayment] = useState<string>("0");
    const [questionNumber, setQuestionNumber] = useState<number>(1);

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <div className="container-title">
                        What are your needs?
                    </div>
                    <div className="form-container">
                        {questionNumber === 1 && (
                            <div className="form-content">
                                <div className="calculator-section">
                                    <div className="calculator">
                                        <LoanCounter setMonthlyPayment={setMonthlyPayment} />
                                    </div>
                                </div>
                                <div className="separator1"></div>
                                <div className="payment-section">
                                    <div className="monthly-payment">
                                        <LoanDetails monthlyPayment={monthlyPayment} setQuestionNumber={setQuestionNumber} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="bottom-info">
                        Loan and Insurance payment calculations are approximate and may differ from your personal offers. Home insurance and loan payments protection insurance is provided by Swedbank P&C insurance AS. Life insurance is provided by Swedbank Life Insurance SE.
                    </div>
                </>
            } />

            <Route path="/applicationform" element={<ApplicationForm />} />
        </Routes>
    );
};

export default Form;
