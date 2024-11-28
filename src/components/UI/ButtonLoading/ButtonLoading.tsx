import React from 'react';
import SmallSpinner from "../SmallSpinner/SmallSpinner.tsx";

interface Props {
    isLoading?: boolean;
    text: string;
    isDisabled?: boolean;
    type? : 'button' | 'submit';
}

const ButtonLoading: React.FC<Props> = ({isLoading = false, text, type="submit", isDisabled = false}) => {
    return (
        <button disabled={isDisabled} type={type} className="btn btn-primary d-flex align-items-center">
            <span className="me-2">{text}</span>
            {isLoading ? <SmallSpinner/> : null}
        </button>
    );
};

export default ButtonLoading;