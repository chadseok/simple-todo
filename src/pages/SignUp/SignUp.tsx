import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ROUTE_PATH, ERROR_MSG } from "@/lib/constants";
import { validator } from "@/lib/helpers/validator";
import { signUpApi } from "@/api/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [userAccount, setUserAccount] = React.useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = React.useState({
    emailError: "",
    passwordError: "",
    signUpError: "",
  });

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAccount({ ...userAccount, email: event.target.value });
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAccount({ ...userAccount, password: event.target.value });
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const notValidEmail = !validator.checkEmail(userAccount.email);
    const notValidPassword = !validator.checkPassword(userAccount.password);

    const newErrorMsg = {
      emailError: notValidEmail ? ERROR_MSG.NOT_VALID_EMAIL : "",
      passwordError: notValidPassword ? ERROR_MSG.NOT_VALID_PWD : "",
      signUpError: "",
    };
    setErrorMsg(newErrorMsg);

    if (notValidEmail || notValidPassword) return;

    try {
      await signUpApi(userAccount);
      navigate(ROUTE_PATH.SIGN_IN);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMsg({
          ...newErrorMsg,
          signUpError: error.response ? error.response.data.message : "",
        });
      }
    }
  };

  return (
    <div className="bg-white w-96 rounded-md shadow-md">
      <h1 className="text-xl text-white p-4 bg-gray-900">회원가입</h1>
      {errorMsg.signUpError && (
        <div className="text-xs text-white font-bold bg-orange-600 py-3 px-4 ">
          {errorMsg.signUpError}
        </div>
      )}
      <form className="flex flex-col gap-2 p-4" onSubmit={handleSignUp}>
        <div>
          <label className="text-sm" htmlFor="email">
            아이디
          </label>
          <input
            className={`w-full py-4 px-2 h-12 rounded-md border-2 ${
              errorMsg.emailError ? "border-orange-600" : "border-slate-200"
            }`}
            type="text"
            id="email"
            value={userAccount.email}
            onChange={changeEmail}
          />
          <div className="mt-2 font-medium text-xs text-orange-600">
            {errorMsg.emailError}
          </div>
        </div>
        <div>
          <label className="text-sm" htmlFor="password">
            비밀번호
          </label>
          <input
            className={`w-full py-4 px-2 h-12 rounded-md border-2 ${
              errorMsg.passwordError ? "border-orange-600" : "border-slate-200"
            }`}
            type="password"
            id="password"
            value={userAccount.password}
            onChange={changePassword}
          />
          <div className="mt-2 font-medium text-xs text-orange-600">
            {errorMsg.passwordError}
          </div>
        </div>
        <button
          className="bg-gray-900 h-10 rounded-lg text-white"
          type="submit"
        >
          회원가입
        </button>
      </form>
      <div className="text-center py-4 text-xs">
        <span>이미 계정이 있나요? </span>
        <Link to={ROUTE_PATH.SIGN_IN} className="text-blue-500 font-semibold">
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
