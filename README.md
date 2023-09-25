# simple-todo

![main-image](https://cdn.discordapp.com/attachments/1016940382061346880/1155425401221427350/screely-1695545270136.png)

## 🧤 프로젝트 소개

프론트에서 간단한 CRUD와 인증기능을 구현해보기 위해 todo-list를 만들어보았습니다. 전체 웹은 로그인, 회원가입, 투두 페이지로 구성되어있습니다. 미리 구현된 todo-list [백엔드 레포](https://github.com/walking-sunset/selection-task)와 엔드포인트를 활용하여 구현하였습니다

<br/>

- **링크**: [배포사이트](https://majestic-cactus-56ea54.netlify.app/todo)
- **사용스택**: `vite`, `react-router-dom`, `typescript`, `axios`, `tailwindcss`

<br/>

## 🔎 기능

### 회원가입 페이지

- 간단하게 아이디와 비밀번호만 입력하여 회원가입을 할 수 있습니다
- 아이디와 비밀번호는 유효성 검사`(아이디: 이메일 형식, 비밀번호: 8자 이상)`를 거칩니다
- 유효성 통과를 못할 시 각 input창 아래 에러메시지를 띄웁니다

![signup-1](https://cdn.discordapp.com/attachments/1016940382061346880/1155775587198181407/ezgif.com-gif-maker.gif)

<br>

- 중복된 이메일을 검사하여 사용자에게 알립니다

![signup-2](https://cdn.discordapp.com/attachments/1016940382061346880/1155776565146296350/ezgif.com-gif-maker-2.gif)

<br>

### 로그인 페이지

- 로그인 페이지는 회원가입과 같은 유효성 검사와 에러메시지를 기능을 가집니다
- 없는 회원이라면 사용자에게 알립니다

![signin](https://cdn.discordapp.com/attachments/1016940382061346880/1155777714347847721/ezgif.com-gif-maker-3.gif)

<br>

### Todo 페이지

- Todo페이지는 2개의 구역, todo를 입력하는 곳과 todo-list를 볼 수 있는 곳으로 구성되어있습니다.
- todo를 입력하는 곳에서 todo를 작성하고 옆의 연필 버튼을 클릭하면 todo-list에 등록이 됩니다

![todo-1](https://cdn.discordapp.com/attachments/1016940382061346880/1155778335318749234/ezgif.com-gif-maker-4.gif)

- 각 todo는 종이와 연필 아이콘을 클릭하여 수정모드로 들어가여 todo를 수정할 수 있습니다
- 체크 표시를 클릭하여 완료 상태로 바꿀수 있습니다

![todo-2](https://cdn.discordapp.com/attachments/1016940382061346880/1155779502291558410/ezgif.com-gif-maker-5.gif)

- 각 todo는 휴지통 아이콘을 클릭하여 todo를 삭제할 수 있습니다

![todo-3](https://cdn.discordapp.com/attachments/1016940382061346880/1155779875827892234/ezgif.com-video-to-gif-2.gif)

<br/>

## 🎯 기술적 구현사항

### 인증에 따른 리다이렉트 구현

- Todo페이지를 인증된 사용자만 접근하고 로그인,회원가입페이지는 인증된 사용자는 접근하지 못하도록 구현하였습니다
- 접근하지 못할 시 자연스럽게 리다이렉트 하도록 하였습니다
- 인증에 따른 리다이렉트를 구현하기 위해 총 3가지 부모 Route를 만들었습니다 (PublicRoute, AuthOnlyRoute, GuestOnlyRoute)
  - **PublicRoute**는 인증에 상관없이 모든 사용자가 자유롭게 접근할 수 있는 라우트
  - **AuthOnlyRoute**는 로그인하여 인증된 사용자만 접근할 수 있는 라우트
  - **GuestOnlyRoute**는 로그인한 사용자는 접근할 수 없고 인증되지 않은 사용자만 접근 할 수 있는 라우트

```ts
const routerObject = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: ROUTE_PATH.HOME, element: <Home />, errorElement: <Error /> },
      { path: ROUTE_PATH.NO_MATCH, element: <PageNotFound /> },
    ],
  },
  {
    element: <AuthOnlyRoute />,
    children: [
      {
        path: ROUTE_PATH.TODO,
        element: <Todo />,
        errorElement: <Error />,
        loader: todoLoader,
      },
    ],
  },
  {
    element: <GuestOnlyRoute />,
    children: [
      {
        path: ROUTE_PATH.SIGN_IN,
        element: <SignIn />,
        errorElement: <Error />,
      },
      {
        path: ROUTE_PATH.SIGN_UP,
        element: <SignUp />,
        errorElement: <Error />,
      },
    ],
  },
]);
```

<br>

```ts
export const PublicRoute = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const AuthOnlyRoute = () => {
  const token = localStorage.getItem(USER_AUTH_TOKEN);
  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to={ROUTE_PATH.SIGN_IN} />
  );
};

export const GuestOnlyRoute = () => {
  const token = localStorage.getItem(USER_AUTH_TOKEN);
  return token ? (
    <Navigate to={ROUTE_PATH.TODO} />
  ) : (
    <Layout>
      <Outlet />
    </Layout>
  );
};
```

<br/>

### 로그인,회원가입 유효성 검사와 에러메세지 구현

- 로그인, 회원가입 유효성 검사는 input에 입력할 때마다 하는 것은 **계속 에러메시지가 뜨고 사라지는 것이 레이아웃을 계속 변경시키기 때문에** 로그인 또는 회원가입 버튼을 눌렀을 때 작동하도록 구현하였습니다.
- 백엔드에서는 중복된 사용자 검사, 회원 유무 검사를 하여 버튼을 눌렀을 때 **유효성 검사 -> 백엔드 검사**를 하여 유효성 검사에서 통과하지 못했을 때는 input아래에 에러메시지를 남기고 백엔드 검사를 통과 못할 시 입력 섹션 위에 에러박스에 나타나도록 하였습니다
  <br/>

```ts
const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  // 유효성 검사 시작
  const notValidEmail = !validator.checkEmail(userAccount.email);
  const notValidPassword = !validator.checkPassword(userAccount.password);

  // 검사 후 에러메시지 생성, 에러가 없으면 빈 문자열로 생성
  const newErrorMsg = {
    emailError: notValidEmail ? ERROR_MSG.NOT_VALID_EMAIL : "",
    passwordError: notValidPassword ? ERROR_MSG.NOT_VALID_PWD : "",
    signInError: "",
  };
  setErrorMsg(newErrorMsg);

  // 유효성 검사 통과를 못할 시에 뒤의 백엔드 검사로 이어지지 않고 에러메시지를 보여주고 함수 반환
  if (notValidEmail || notValidPassword) return;

  // 유효성 검사 통과시 백엔드에서 인증을 하고 백엔드 검사에서 통과를 못한다면 catch에서 에러를 잡아 에러메시지에 나타냄
  try {
    const res = await signInApi(userAccount);
    localStorage.setItem(USER_AUTH_TOKEN, res.data.access_token);
    navigate(ROUTE_PATH.TODO);
  } catch (error) {
    if (error instanceof AxiosError) {
      setErrorMsg({
        ...newErrorMsg,
        signInError: error.response ? error.response.data.message : null,
      });
    }
  }
};
```

<br>

### Todo CRUD 구현

- todo CRUD는 백엔드 통신 후 받은 값을 상태값에 갱신 시키는 과정으로 구현하였습니다
- try-catch문을 사용하여 실패할 시 todo값에 변동이 생기지 않도록 하였습니다

```ts
const createTodo = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  try {
    const res = await createTodoApi(todoText);
    setTodoList([...todoList, res.data]);
    setTodoText("");
  } catch (error) {
    console.error(error);
  }
};
```

<br>

### 라우팅 에러 상황에 따른 다른 화면 구현

- 라우팅 상황에 따라서 에러 페이지를 구성하기 위해 3가지 경우로 나누었습니다

  - 주소가 잘못된 경우

  - react-router에서 생긴 에러
  - 그 외의 예기치 못한 에러

- 주소가 잘못된 경우에서는 react-router의 기능 중 _`path='*'`_ 형식으로 처리하는 것을 적용 하였고 `PageNotFound`페이지와 연결하였습니다
- react-router의 `isRouteErrorResponse`함수를 활용해 react-router에서 생긴 에러인지 감지하여 맞다면 라우팅 문제라는 것을 사용자에게 알리고 아니라면 예기치 못한 에러가 발생했다고 알리도록 하였습니다

```ts
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
```
