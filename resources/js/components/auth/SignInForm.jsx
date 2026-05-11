import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {EyeCloseIcon, EyeIcon} from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {loginAsync} from "@/store/modules/storeAuth";
import {notification} from "antd";
function SignInForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState("thoanv@scotsenglish.com");
    const [password, setPassword] = useState("Scots@9999");
    const [error, setError] = useState(false);
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const {isAuthenticated} = useSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated === true) {
            navigate("/", {replace: true});
        }
    }, [isAuthenticated, navigate]);

    const validate = () => {
        const newErrors = {
            email: "",
            password: "",
        };

        if (!email.trim()) {
            newErrors.email = "Tên đăng nhập không được để trống";
        }
        if (!password.trim()) {
            newErrors.password = "Mật khẩu không được để trống";
        }

        setErrors(newErrors);

        return !newErrors.email && !newErrors.password;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await dispatch(
                loginAsync({ email, password })
            ).unwrap();

            notification.success({
                message: "Thành công",
                description: res.message || "Đăng nhập thành công",
                placement: "topRight",
            });
        } catch (err) {
            notification.error({
                message: "Thất bại",
                description: err,
                placement: "topRight",
            });
            setError(true);
        }
    };

    const handleMicrosoftLogin = () => {
        window.location.href = "/login/microsoft";
    };

    return (
        <div className="flex flex-col flex-1">
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Đăng nhập
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Nhập email và mật khẩu của bạn
                        </p>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5"></div>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                {error && (
                                    <div>
                                        <div className="rounded-xl border p-4 border-error-500 bg-error-50 dark:border-error-500/30 dark:bg-error-500/15">
                                            <div className="flex items-start gap-3">
                                                <div className="-mt-0.5 text-error-500">
                                                    <svg
                                                        className="fill-current"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M20.3499 12.0004C20.3499 16.612 16.6115 20.3504 11.9999 20.3504C7.38832 20.3504 3.6499 16.612 3.6499 12.0004C3.6499 7.38881 7.38833 3.65039 11.9999 3.65039C16.6115 3.65039 20.3499 7.38881 20.3499 12.0004ZM11.9999 22.1504C17.6056 22.1504 22.1499 17.6061 22.1499 12.0004C22.1499 6.3947 17.6056 1.85039 11.9999 1.85039C6.39421 1.85039 1.8499 6.3947 1.8499 12.0004C1.8499 17.6061 6.39421 22.1504 11.9999 22.1504ZM13.0008 16.4753C13.0008 15.923 12.5531 15.4753 12.0008 15.4753L11.9998 15.4753C11.4475 15.4753 10.9998 15.923 10.9998 16.4753C10.9998 17.0276 11.4475 17.4753 11.9998 17.4753L12.0008 17.4753C12.5531 17.4753 13.0008 17.0276 13.0008 16.4753ZM11.9998 6.62898C12.414 6.62898 12.7498 6.96476 12.7498 7.37898L12.7498 13.0555C12.7498 13.4697 12.414 13.8055 11.9998 13.8055C11.5856 13.8055 11.2498 13.4697 11.2498 13.0555L11.2498 7.37898C11.2498 6.96476 11.5856 6.62898 11.9998 6.62898Z"
                                                            fill="#F04438"
                                                        />
                                                    </svg>
                                                </div>

                                                <div>
                                                    <h4 className="mb-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                                                        Tên đăng nhập hoặc mật khẩu không đúng
                                                    </h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <Label htmlFor="email">
                                        Địa chỉ Email <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="info@scotsenglish.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        error={!!errors.email}
                                        hint={errors.email}
                                        autoComplete="email"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="password">
                                        Mật khẩu <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Nhập mật khẩu"
                                            error={!!errors.password}
                                            hint={errors.password}
                                            autoComplete="current-password"
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                            ) : (
                                                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Checkbox checked={isChecked} onChange={setIsChecked} />
                                        <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                                            Keep me logged in
                                        </span>
                                    </div>
                                    <Link
                                        to="/reset-password"
                                        className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div>
                                    <Button className="!text-white w-full" size="sm">
                                        Đăng nhập
                                    </Button>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={handleMicrosoftLogin}
                                        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                                    >
                                        <span className="grid h-5 w-5 grid-cols-2 grid-rows-2 gap-[2px] overflow-hidden rounded-sm">
                                            <span className="bg-[#f25022]"></span>
                                            <span className="bg-[#7fba00]"></span>
                                            <span className="bg-[#00a4ef]"></span>
                                            <span className="bg-[#ffb900]"></span>
                                        </span>
                                        <span>Đăng nhập với Microsoft</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInForm;
