import React, { useState, useEffect } from 'react';
import LoanPurpose from './FillApplication/LoanPurpose';
import EducationAndEmployment from './FillApplication/EducationAndEmployment';
import Family from './FillApplication/Family';
import Income from './FillApplication/Income';
import Obligations from './FillApplication/Obligations';
import '../Questions/FillApplication/styles/ApplicationForm.scss';
import { useNavigate } from 'react-router-dom';
import Summary from '../Summary/Summary';

const steps = ['Loan Purpose', 'Education', 'Family', 'Income', 'Obligations'];

const Steps: React.FC<{ currentStep: number; setStep: (step: number) => void; answers: any }> = ({ currentStep, setStep, answers }) => {
    const navigate = useNavigate();

    const handleStepClick = (index: number) => {
        if (index + 2 <= currentStep) {
            setStep(index + 2);
        }
    }

    return (
        <div className="steps">
            <div
                className={`step ${currentStep === 1 ? 'active' : ''}`}
                onClick={() => navigate('/')}
            >
                <div className="step-number">1</div>
                <div className="step-name">Home Loan</div>
            </div>
            {steps.map((step, index) => (
                <div
                    key={step}
                    className={`step ${currentStep === index + 2 ? 'active' : ''}`}
                    onClick={() => handleStepClick(index)}
                >
                    <div className="step-number">{index + 2}</div>
                    <div className="step-name">{step}</div>
                </div>
            ))}
        </div>
    );
};


const ApplicationForm: React.FC = () => {
    const [step, setStep] = useState(2);
    const [answers, setAnswers] = useState(() => {
        const savedAnswers = sessionStorage.getItem('applicationFormAnswers');
        if (savedAnswers) {
            return JSON.parse(savedAnswers);
        } else {
            return {};
        }
    });

    useEffect(() => {
        sessionStorage.setItem('applicationFormAnswers', JSON.stringify(answers));
    }, [answers]);

    const handleSubmit = (values: any) => {
        setAnswers(prev => ({ ...prev, [step]: values }));
        setStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (step > 2) setStep(prev => prev - 1);
    };

    const renderQuestion = () => {
        switch (step) {
            case 2:
                return <LoanPurpose onSubmit={handleSubmit} initialValues={answers[step] || {}} />;
            case 3:
                return <EducationAndEmployment onSubmit={handleSubmit} initialValues={answers[step] || {}} />;
            case 4:
                return <Family onSubmit={handleSubmit} initialValues={answers[step] || {}} />;
            case 5:
                return <Income onSubmit={handleSubmit} initialValues={answers[step] || {}} />;
            case 6:
                return <Obligations onSubmit={handleSubmit} initialValues={answers[step] || {}} />;
            case 7:
                return <Summary />;
            default:
                return null;
        }
    };

    return (
        <div className="form-container">
            <div className="steps-container">
                <Steps currentStep={step} setStep={setStep} />
            </div>
            <div className="question-container">
                {renderQuestion()}
                {/* {step > 2 && <button onClick={handleBack}>Back</button>} */}
            </div>
        </div>
    );
};

export default ApplicationForm;
