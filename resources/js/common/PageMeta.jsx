import { Helmet } from "react-helmet-async";
import { Outlet, useMatches } from "react-router-dom";

const DEFAULT_TITLE = "Laravel React Admin";

export function AppWrapper() {
    const matches = useMatches();

    // Route hiện tại (route cuối)
    const currentRoute = matches[matches.length - 1];

    const title = currentRoute?.handle?.title;
    const description = currentRoute?.handle?.description;

    return (
        <>
            <Helmet>
                <title>
                    {title ? `${title} | Admin` : DEFAULT_TITLE}
                </title>

                {description && (
                    <meta name="description" content={description} />
                )}
            </Helmet>

            <Outlet />
        </>
    );
}

export default AppWrapper;
