import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-bootstrap-v5";
import * as EmailValidator from "email-validator";
import { loginAction } from "../../store/action/authAction";
import TabTitle from "../../shared/tab-title/TabTitle";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import { Tokens } from "../../constants";
import { createBrowserHistory } from "history";
import {
    getFormattedMessage,
    placeholderText,
} from "../../shared/sharedMethod";
import { invert } from "lodash";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const history = createBrowserHistory();
    const { frontSetting } = useSelector((state) => state);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem(Tokens.ADMIN);

    const [loginInputs, setLoginInputs] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        dispatch(fetchFrontSetting());
        if (token) {
            history.push(window.location.pathname);
        }
    }, []);

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!EmailValidator.validate(loginInputs["email"])) {
            if (!loginInputs["email"]) {
                errorss["email"] = getFormattedMessage(
                    "globally.input.email.validate.label"
                );
            } else {
                errorss["email"] = getFormattedMessage(
                    "globally.input.email.valid.validate.label"
                );
            }
        } else if (!loginInputs["password"]) {
            errorss["password"] = getFormattedMessage(
                "user.input.password.validate.label"
            );
        } else {
            isValid = true;
        }
        setErrors(errorss);
        setLoading(false);
        return isValid;
    };

    const prepareFormData = () => {
        const formData = new FormData();
        formData.append("email", loginInputs.email);
        formData.append("password", loginInputs.password);
        formData.append(
            "language_code",
            localStorage.getItem("updated_language")
        );
        return formData;
    };

    const onLogin = async (e) => {
        e.preventDefault();
        const valid = handleValidation();
        if (valid) {
            setLoading(true);
            dispatch(
                loginAction(prepareFormData(loginInputs), navigate, setLoading)
            );
            const dataBlank = {
                email: "",
                password: "",
            };
            setLoginInputs(dataBlank);
        }
    };

    const handleChange = (e) => {
        e.persist();
        setLoginInputs((inputs) => ({
            ...inputs,
            [e.target.name]: e.target.value,
        }));
        setErrors("");
    };

    return (
        <>
            <div className="content bg-white d-flex h-100" style={{ backgroundColor: 'transparent center no-repeat', backgroundSize: '100%' }}>
                <div className="" style={{ flexGrow: 1 }}>
                    <div className="h-100 text-center d-flex justify-content-center align-items-center">
                        <Image src="images/il-3.jpg" style={{ maxWidth: '700px' }} />
                    </div>
                </div>
                <div className="shadow-md width-540 px-5 px-sm-7 py-10 mx-auto bg-dark">
                    <div className="d-flex align-items-center flex-column h-100 justify-content-center align-items-stretch">
                        <a href="#" className="text-center d-block">
                            <Image
                                className="logo-height image"
                                src={frontSetting &&
                                    frontSetting.value &&
                                    frontSetting.value.logo} alt=" " />
                        </a>
                        <div style={{ height: '50px' }}></div>
                        <form className="my-2">
                            <div className="mb-sm-7 mb-4">
                                <label className="form-label text-white">
                                    {getFormattedMessage(
                                        "globally.input.email.label"
                                    )}
                                </label>
                                <input
                                    placeholder={placeholderText(
                                        "globally.input.email.placeholder.label"
                                    )}
                                    required
                                    value={loginInputs.email}
                                    className="form-control"
                                    type="text"
                                    name="email"
                                    autoComplete="off"
                                    onChange={(e) => handleChange(e)} />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors["email"] ? errors["email"] : null}
                                </span>
                            </div>

                            <div className="mb-sm-7 mb-4">
                                <div className="d-flex justify-content-between mt-n5">
                                    <div className="d-flex justify-content-between w-100">
                                        <label className="form-label text-white">
                                            {getFormattedMessage(
                                                "user.input.password.label"
                                            )}
                                        </label>
                                        <Link
                                            to="/forgot-password"
                                            className="link-info fs-6 text-decoration-none"
                                        >
                                            {getFormattedMessage(
                                                "login-form.forgot-password.label"
                                            )}
                                        </Link>
                                    </div>
                                </div>
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    placeholder={placeholderText(
                                        "user.input.password.placeholder.label"
                                    )}
                                    autoComplete="off"
                                    required
                                    value={loginInputs.password}
                                    onChange={(e) => handleChange(e)} />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors["password"]
                                        ? errors["password"]
                                        : null}
                                </span>
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    onClick={(e) => onLogin(e)}
                                >
                                    {loading ? (
                                        <span className="d-block">
                                            {getFormattedMessage(
                                                "globally.loading.label"
                                            )}
                                        </span>
                                    ) : (
                                        <span>
                                            {getFormattedMessage(
                                                "login-form.login-btn.label"
                                            )}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
