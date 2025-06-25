import Icon from './Icon'

const Button = ({ type, isLoading, text, actionText, icon, onClick, classname }: { type: 'submit' | 'reset' | 'button', isLoading?: boolean, text: string, actionText?: string, icon?: string, onClick?: () => void, classname?: string }) => {
    return (
        <button
            type={type}
            disabled={isLoading}
            className={`w-full py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 ${classname}`}
            onClick={onClick}
        >
            {isLoading ? (
                <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>{actionText}</span>
                </div>
            ) : (
                <div className="flex items-center justify-center space-x-3">
                    {
                        icon && <Icon icon={icon} />
                    }
                    <span>{text}</span>
                </div>
            )}
        </button>
    )
}

export default Button