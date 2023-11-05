"use client"

import React from 'react';

interface StepperProps {
  currentStep: number;
  children: React.ReactNode;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, children }) => {
  return (
    <div className="stepper">
      {React.Children.map(children, (child, index) => {
        if (index === currentStep) {
          return React.cloneElement(child as React.ReactElement);
        }
        return null;
      })}
    </div>
  );
};

interface StepProps {
  title: string;
  children: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({ title, children }) => {
  return (
    <div className="step">
      <h2>{title}</h2>
      {children}
    </div>
  );
};