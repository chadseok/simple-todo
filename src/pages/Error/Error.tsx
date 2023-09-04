import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-8">
          서버 연결에 문제가 생겼습니다!
        </h1>
        <h2>{error.status}</h2>
        <p>{error.data?.message}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-8">
          예상치 못한 에러가 발생했습니다!
        </h1>
        <p>{error.message}</p>
      </div>
    );
  }
};

export default ErrorPage;
