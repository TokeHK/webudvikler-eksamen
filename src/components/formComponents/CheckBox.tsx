import type { InputHTMLAttributes } from "react";

type CheckboxProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({ label, ...props }: CheckboxProps) => {
    return (
        <div className="mb-5">
            <span className="inline-flex items-center space-x-2">
                <input
                    className="h-4 w-4"
                    type="checkbox"
                    {...props}
                    id={label}
                />
                <label className="text-sm text-gray-700" htmlFor={label}>{label}</label>
            </span>

        </div>
    );
};

export default Checkbox;
