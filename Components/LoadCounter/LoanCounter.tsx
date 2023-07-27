import React, { useState, useMemo, useEffect } from "react";
import './LoanCounter.scss';
import { Tooltip } from 'react-tooltip'

interface LoanCalculatorProps {
    setMonthlyPayment: React.Dispatch<React.SetStateAction<string>>;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ setMonthlyPayment }) => {
    const [propertyPrice, setPropertyPrice] = useState<number>(Number(sessionStorage.getItem('propertyPrice')) || 0);
    const [downPayment, setDownPayment] = useState<number>(Number(sessionStorage.getItem('downPayment')) || 0);
    const [downPaymentPercent, setDownPaymentPercent] = useState<number>(15);
    const [loanTerm, setLoanTerm] = useState<number>(Number(sessionStorage.getItem('loanTerm')) || 25);
    const [interestRate, setInterestRate] = useState<number>(Number(sessionStorage.getItem('interestRate')) || 1.99);

    const PLACES = ['bottom-start']
    const [place, setPlace] = useState(0)

    const loanAmount = useMemo(() => {
        return propertyPrice - downPayment;
    }, [propertyPrice, downPayment]);

    useEffect(() => {
        sessionStorage.setItem('propertyPrice', propertyPrice.toString());
    }, [propertyPrice]);

    useEffect(() => {
        sessionStorage.setItem('downPayment', downPayment.toString());
    }, [downPayment]);

    useEffect(() => {
        sessionStorage.setItem('loanTerm', loanTerm.toString());
    }, [loanTerm]);

    useEffect(() => {
        sessionStorage.setItem('interestRate', interestRate.toString());
    }, [interestRate]);

    useEffect(() => {
        sessionStorage.setItem('loanAmount', loanAmount.toString());
    }, [loanAmount]);



    useEffect(() => {
        const timer = setTimeout(() => {
            const value = Math.round((propertyPrice * 15) / 100);
            setDownPayment(value);
            setDownPaymentPercent(15);
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, [propertyPrice]);

    useEffect(() => {
        const rate = (interestRate + 3.95) / (12 * 100);
        const termInMonths = loanTerm * 12;
        const monthlyPayment = loanAmount * rate * (Math.pow(1 + rate, termInMonths)) / (Math.pow(1 + rate, termInMonths) - 1);
        setMonthlyPayment(monthlyPayment.toFixed(2));
    }, [loanAmount, loanTerm, interestRate]);

    const handleDownPaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        setDownPayment(value);
        const percent = Math.round((value / propertyPrice) * 100);
        setDownPaymentPercent(percent);
    };

    const handleDownPaymentPercentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const percent = Number(event.target.value);
        setDownPaymentPercent(percent);
        const value = Math.round((propertyPrice * percent) / 100);
        setDownPayment(value);
    };

    return (
        <div className="loan-calculator">
            <div className="input-container">
                <div className="field-row">
                    <label className="field-label">Purchase price of the property </label>
                    <input className="field-input" type="number" value={propertyPrice || ''} onChange={(e) => setPropertyPrice(Number(e.target.value))} />
                    <label className="field-unit">€</label>
                </div>
                <div className="field-row down-payment-fields">
                    <label className="field-label">Down Payment </label>
                    <input className="field-input down-payment-first" placeholder="€" type="number" value={downPayment || ''} onChange={handleDownPaymentChange} />
                    <input className="field-input" type="number" value={downPaymentPercent} onChange={handleDownPaymentPercentChange} />
                    <label className="field-unit">%</label>
                </div>
                <div className="field-row">
                    <label className="field-label">Loan Amount </label>
                    <input className="field-input loan-amount-input" type="number" value={loanAmount || ''} readOnly />
                    <label className="field-unit">€</label>
                </div>
                <div className="field-row">
                    <label className="field-label">Loan Term </label>
                    <select className="loan-term-select" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))}>
                        {[...Array(30)].map((_, index) => {
                            const yearValue = index + 1;
                            return (
                                <option value={yearValue} key={yearValue}>
                                    {yearValue} {yearValue === 1 ? "year" : "years"}
                                </option>
                            );
                        })}
                        <option value={101}>101 years</option>
                    </select>
                    <button
                        className="info-button"
                        data-tooltip-id="my-tooltip">?
                    </button>

                    <Tooltip
                        id="my-tooltip"
                        content={`Down payment starting form 15%`}
                        place={PLACES[place]}
                        style={{ backgroundColor: "rgb(235, 231, 226)", color: "#512b2b" }}
                    />
                </div >
                <div className="field-row">
                    <label className="field-label">Interest Rate </label>
                    <input className="field-input" type="number" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
                    <label className="field-unit">% + 3.95% 6-month Euribor</label>
                </div>
            </div>
        </div >
    );
};

export default LoanCalculator;
