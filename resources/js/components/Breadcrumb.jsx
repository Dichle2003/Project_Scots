import { Link } from "react-router-dom";

const Breadcrumb = ({ title, items = [] }) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            {/* Page title */}
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
                {title}
            </h2>

            {/* Breadcrumb */}
            <nav>
                <ol className="flex items-center gap-1.5">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;

                        return (
                            <li key={index} className="flex items-center gap-1.5">
                                {!isLast ? (
                                    <Link
                                        to={item.href}
                                        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                                    >
                                        {item.label}
                                        <svg
                                            className="stroke-current"
                                            width="17"
                                            height="16"
                                            viewBox="0 0 17 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                                                strokeWidth="1.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </Link>
                                ) : (
                                    <span className="text-sm text-gray-800 dark:text-white/90">
                    {item.label}
                  </span>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
