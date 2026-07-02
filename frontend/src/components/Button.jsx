function Button({ children, ...props }) {
    return (
        <button
            {...props}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
        >
            {children}
        </button>
    );
}

export default Button;