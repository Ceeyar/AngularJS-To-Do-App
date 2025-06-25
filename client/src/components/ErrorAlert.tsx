
const ErrorAlert = ({ message }: { message: string }) => {
    return (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl animate-pulse">
            <div className="flex items-center justify-center">
                <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{message}</span>
            </div>
        </div>
    )
}

export default ErrorAlert