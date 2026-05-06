import React from "react";

    interface FormFieldProps {
        label: string;
        name: string;
        type?: string;
        value: any;
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
        options?: string[];
    }

    const FormField: React.FC<FormFieldProps> = ({ 
        label, 
        name, 
        type = "text", 
        value, 
        onChange, 
        options = [] 
    }) => {
        return (
            <div className='field-group'>
                <label>{label}</label>
                {type === "select" ? (
                    <select name={name} value={value} onChange={onChange}>
                        <option value=''>Select...</option>
                        {options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                ) : (
                    <input 
                        name={name} 
                        type={type} 
                        checked={type === 'checkbox' ? !!value : undefined} 
                        value={type !== 'checkbox' ? value : undefined} 
                        onChange={onChange} 
                    />
                )}
            </div>
        );
    };

    export default FormField;