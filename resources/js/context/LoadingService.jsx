let setLoadingFn = null;

export const registerLoading = (fn) => {
    setLoadingFn = fn;
};

export const showLoading = () => {
    setLoadingFn?.(true);
};

export const hideLoading = () => {
    setLoadingFn?.(false);
};
