import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/lib/constants";

const SignIn = () => {
  return (
    <div className="bg-white w-96 rounded-md shadow-md">
      <h1 className="text-xl text-white p-4 bg-gray-900">로그인</h1>
      <form className="flex flex-col gap-2 p-4">
        <div>
          <label className="text-sm" htmlFor="email">
            아이디
          </label>
          <input
            className="w-full py-4 px-2 border border-slate-200 h-12"
            type="email"
            id="email"
          />
          <div className="mt-4 font-medium text-xs"></div>
        </div>
        <div>
          <label className="text-sm" htmlFor="password">
            비밀번호
          </label>
          <input
            className="w-full py-4 px-2 border border-slate-200 h-12"
            type="password"
            id="password"
          />
          <div className="mt-4 font-medium text-xs"></div>
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
