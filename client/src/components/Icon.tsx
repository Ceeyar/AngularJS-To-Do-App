const Icon = ({ icon, color = 'currentColor', size = '4' }: { icon: string, color?: string, size?: string }) => {
    const renderIcon = () => {
        switch (icon) {
            case 'user':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            case 'password':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9 2.5 2.5 0 000-5z" />
                </svg>
            case 'email':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9 2.5 2.5 0 000-5z" />
                </svg>
            case 'phone':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9 2.5 2.5 0 000-5z" />
                </svg>
            case 'date':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9 2.5 2.5 0 000-5z" />
                </svg>
            case 'time':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9 2.5 2.5 0 000-5z" />
                </svg>
            case 'number':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9 2.5 2.5 0 000-5z" />
                </svg>
            case 'search':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9 2.5 2.5 0 000-5z" />
                </svg>
            case 'location':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9 2.5 2.5 0 000-5z" />
                </svg>
            case 'calendar':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9 2.5 2.5 0 000-5z" />
                </svg>
            case 'clock':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9 2.5 2.5 0 000-5z" />
                </svg>
            case 'login':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
            case 'register':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
            case 'save':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
            case 'delete':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            case 'forgot-password':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            case 'lock':
                return <svg className={`h-${size} w-${size}`} fill="none" stroke={color} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            default:
                return null;
        }
    }
    return (
        <div>
            {renderIcon()}
        </div>
    )
}

export default Icon