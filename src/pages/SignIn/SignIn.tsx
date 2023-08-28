import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { ROUTE_PATH, USER_AUTH_TOKEN } from "@/lib/constants";
import { validator } from "@/lib/helpers/validator";
import { signInApi } from "@/api/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const [userAccount, setUserAccount] = React.useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = React.useState({
    emailError: "",
    passwordError: "",
    signInError: "",
  });

  const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAccount({ ...userAccount, email: event.target.value });
  };

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAccount({ ...userAccount, password: event.target.value });
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const notValidEmail = !validator.checkEmail(userAccount.email);
    const notValidPassword = !validator.checkEmail(userAccount.password);

    if (notValidEmail) {
      setErrorMsg({ ...errorMsg, emailError: "이메일 틀림" });
    }

    if (notValidPassword) {
      setErrorMsg({ ...errorMsg, passwordError: "비밀번호 틀림" });
    }

    if (notValidEmail || notValidPassword) return;

    try {
      const res = await signInApi(userAccount);
      localStorage.setItem(USER_AUTH_TOKEN, res.data.access_token);
      navigate(ROUTE_PATH.TODO);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMsg({
          ...errorMsg,
          signInError: error.response ? error.response.data.message : null,
        });
      }
    }
  };

  return (
    <div className="bg-white w-96 rounded-md shadow-md">
      <h1 className="text-xl text-white p-4 bg-gray-900">로그인</h1>
      {errorMsg.signInError && (
        <div className="text-xs text-white font-bold bg-orange-600 py-3 px-4 ">
          {errorMsg.signInError}
        </div>
      )}
      <form className="flex flex-col gap-2 p-4" onSubmit={handleSignIn}>
        <div>
          <label className="text-sm" htmlFor="email">
            아이디
          </label>
          <input
            className={`w-full py-4 px-2 h-12 rounded-md border-2 ${
              errorMsg.emailError ? "border-orange-600" : "border-slate-200"
            }`}
            type="email"
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
          className="bg-gray-900 h-10 rounded-lg text-white disabled:opacity-30"
          type="submit"
        >
          로그인
        </button>
      </form>
      <div className="text-center py-4 text-xs">
        <span>아직 계정이 없나요? </span>
        <Link to={ROUTE_PATH.SIGN_UP} className="text-blue-500 font-semibold">
          회원가입하기
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
