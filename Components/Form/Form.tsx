import React, { useState } from "react";
import LoadCounter from "../LoadCounter/LoanCounter";
import LoanDetails from "../LoanDetails/LoanDetails";
import './Form.scss';

const Form: React.FC = () => {
    const [monthlyPayment, setMonthlyPayment] = useState<string>("0");
    const [questionNumber, setQuestionNumber] = useState<number>(1);

    return (
        <>
            <div className="container-title">
                What are your needs?
            </div>
            <div className="form-container">
                {questionNumber === 1 && (
                    <div className="form-content">
                        <div className="calculator-section">
                            <div className="calculator">
                                <LoadCounter setMonthlyPayment={setMonthlyPayment} />
                            </div>
                        </div>
                        <div className="separator"></div>
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
    );
};

export default Form;
