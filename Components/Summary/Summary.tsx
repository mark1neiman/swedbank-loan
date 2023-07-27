import React from 'react';
import './Summary.scss';
import { Link } from 'react-router-dom';

const Summary: React.FC = () => {
    const applicationFormAnswers = JSON.parse(sessionStorage.getItem('applicationFormAnswers') || '{}');


    const formatLabel = (str) =>
        str.replace(/_/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

    const loanPurposeData = applicationFormAnswers['2'] || {};
    const educationAndEmploymentData = applicationFormAnswers['3'] || {};
    const familyData = applicationFormAnswers['4'] || {};
    const incomeData = applicationFormAnswers['5'] || {};
    const obligationsData = applicationFormAnswers['6'] || {};

    const propertyPrice = sessionStorage.getItem('propertyPrice') || 'N/A';
    const downPayment = sessionStorage.getItem('downPayment') || 'N/A';
    const loanTerm = sessionStorage.getItem('loanTerm') || 'N/A';
    const interestRate = sessionStorage.getItem('interestRate') || 'N/A';
    const loanAmount = sessionStorage.getItem('loanAmount') || 'N/A';


    const handleButtonClick = () => {
        sessionStorage.clear();
    };

    return (
        <div className="summary">
            <h1>Summary</h1>
            <div className="summary-section">
                <hr />
                <div className="summary-line">
                    <span className="data-label">{formatLabel('Loan Purpose')}:</span>
                    <span className="data-value">{formatLabel(loanPurposeData.loanPurpose)}</span>
                </div>
                <hr />
                <div className="summary-line">
                    <span className="data-label">{formatLabel('Education Level')}:</span>
                    <span className="data-value">{formatLabel(educationAndEmploymentData.educationLevel)}</span>
                </div>
                <hr />
                <div className="summary-line">
                    <span className="data-label">{formatLabel('Employment Status')}:</span>
                    <span className="data-value">{formatLabel(educationAndEmploymentData.employmentStatus)}</span>
                </div>
                <hr />
                <div className="summary-line">
                    <span className="data-label">{formatLabel('Marital Status')}:</span>
                    <span className="data-value">{formatLabel(familyData.maritalStatus)}</span>
                </div>
                <hr />
                <div className="summary-line">
                    <span className="data-label">{formatLabel('Feelings')}:</span>
                    <span className="data-value">{formatLabel(familyData.feelings)}</span>
                </div>
                <hr />
                <div className="summary-line">
                    <span className="data-label">{formatLabel('Net Monthly Income')}:</span>
                    <span className="data-value">{incomeData.monthlyIncome} EUR</span>
                </div>
                <hr />
                <div className="summary-line">
                    <span className="data-label">{formatLabel('Has Other Income')}:</span>
                    <span className="data-value">{incomeData.hasOtherIncome ? 'Yes' : 'No'}</span>
                </div>
                <hr />
                <div className="summary-line">
                    <span className="data-label">{formatLabel('Social Support')}:</span>
                    <span className="data-value">{incomeData.socialSupport ? 'Yes' : 'No'}</span>
                </div>
                <hr />
                <div className="summary-line">
                    <span className="data-label">{formatLabel('Has Obligations')}:</span>
                    <span className="data-value">{obligationsData.hasObligations}</span>
                </div>
                {obligationsData.hasObligations === 'yes' && (
                    <>
                        <hr />
                        <div className="summary-line">
                            <span className="data-label">{formatLabel('Obligation Bank')}:</span>
                            <span className="data-value">{obligationsData.obligationBank}</span>
                        </div>
                        <hr />
                        <div className="summary-line">
                            <span className="data-label">{formatLabel('Obligation Amount')}:</span>
                            <span className="data-value">{obligationsData.obligationAmount} EUR</span>
                        </div>
                    </>
                )}
                <hr />
                <div className="summary-line">
                    <span className="data-label">Property Price:</span>
                    <span className="data-value">{propertyPrice} EUR</span>
                </div>
                <hr />
                <div className="summary-line">
                    <span className="data-label">Down Payment:</span>
                    <span className="data-value">{downPayment} EUR</span>
                </div>
                <hr />
                <div className="summary-line">
                    <span className="data-label">Loan Term:</span>
                    <span className="data-value">{loanTerm} years</span>
                </div>
                <hr />
                <div className="summary-line">
                    <span className="data-label">Interest Rate:</span>
                    <span className="data-value">{interestRate}%</span>
                </div>
                <hr />
                <div className="summary-line">
                    <span className="data-label">Loan Amount:</span>
                    <span className="data-value">{loanAmount} EUR</span>
                </div>
                <hr />
                <div className="button-container">
                    <Link to="/">
                        <button className="next-button" onClick={handleButtonClick}>Go Back</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Summary;
