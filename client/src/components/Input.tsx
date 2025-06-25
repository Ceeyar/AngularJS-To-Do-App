import React, { type ChangeEvent } from 'react'

const Input = ({ icon, label, id, name, type, required, value, onChange, placeholder, classname }: { icon?: React.ReactNode, label?: string, id: string, name: string, type: string, required: boolean, value: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void, placeholder: string, classname?: string }) => {

    const renderIcon = () => {
        switch (icon) {
            case 'user':
                return <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            case 'password':
                return <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9 2.5 2.5 0 000-5z" />
                </svg>
        }
    }

    return (
        <div className="space-y-2">
            {
                label && (
                    <label htmlFor={id} className="block text-sm font-semibold text-gray-700">
                        {label}
                    </label>
                )
            }
            <div className="relative group">
                <input
                    id={id}
                    name={name}
                    type={type}
                    required={required}
                    value={value}
                    onChange={onChange}
                    className={`w-full px-5 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm ${classname} ${icon ? 'pl-12' : 'pl-4'}`}
                    placeholder={placeholder}
                />
                {
                    icon && (
                        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300">
                            {renderIcon()}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Input;