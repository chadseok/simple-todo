import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/lib/constants";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">잘못된 주소 입니다</h1>
      <button
        className="bg-slate-800 p-4 rounded-md text-white"
        onClick={() => navigate(ROUTE_PATH.HOME)}
      >
        메인 페이지로 돌아가기
      </button>
    </div>
  );
};

export default PageNotFound;
