import React from 'react';

export const LocationIcon: React.FC = () => {
    return (
        <svg
            style={{ position: 'relative', top: '2px', right: '2px' }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 512 512"
        >
            <path
                fill="none"
                stroke="#444"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"
            />
            <circle
                cx="256"
                cy="192"
                r="48"
                fill="none"
                stroke="#444"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
            />
        </svg>
    );
};
