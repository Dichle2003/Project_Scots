import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import routes from "../../router";

const DEFAULT_TITLE = "Scots English";

export default function AutoTitle() {
    const location = useLocation();

    useEffect(() => {
        const currentRoute = routes.find(
            (r) => r.path === location.pathname
        );

        document.title = currentRoute?.title
            ? `${currentRoute.title} | Admin`
            : DEFAULT_TITLE;
    }, [location.pathname]);

    return null;
}
