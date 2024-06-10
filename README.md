### useParams

현재 활성인 라우트 파라미터에 액세스 할 수 있다.  
즉 URL에 인코딩된 값들에 액세스해서 동적 경로 세그먼트에 사용할 수 있다.  
이 경우에는 eventId에 사용된 값이 될 것이고, eventId 값을 이 페이지에 출력할 수 있다.

```js
// <App> 컴포넌트
<Route path="events/:eventId" element={<EventDetailPage />} />
```

```js
// <EventDetailPage> 컴포넌트

const params = useParams();
// 중간 생략
<p>Event ID: {params.eventId}</p>;
```

### loader

이 loader 함수가 완료되어야 해당 페이지가 렌더링 된다.  
함수를 값으로 취하는 속성이고, 일반 함수나 오류 함수를 모두 값으로 취할 수 있다.  
그래서 loader의 함수에서 데이터를 로딩하고 가져올 수 있다.

```js
// <EventsPage> 컴포넌트

useEffect(() => {
  async function fetchEvents() {
    setIsLoading(true);
    //여기서부터
    const response = await fetch("http://localhost:8080/events");

    if (!response.ok) {
      setError("Fetching events failed.");
    } else {
      const resData = await response.json();
      setFetchedEvents(resData.events);
    }
    //여기까지
    setIsLoading(false);
  }

  fetchEvents();
}, []);
```

이런 데이터를 가져오고 응답을 처리하는 과정을 옮길 수 있는 것이다.

```js
<Route
  path=""
  element={<EventsPage />}
  loader={async () => {
    const response = await fetch("http://localhost:8080/events");
    if (!response.ok) {
      // 오류 메세지
    } else {
      const resData = await response.json();
      return resData.events;
    }
  }}
/>
```

loader에서 데이터를 가져오게 하긴 했지만 컴포넌트에서 그 리턴된 데이터의 값은 어떻게 접근할까?

### uesLoaderData

가장 가까운 `loader 데이터에 액세스`하게 하는 훅이다.

```js
// <EventsPage> 컴포넌트

const events = useLoaderData();
return <EventsList events={events} />;
```

주의사항: 자신보다 상위 라우트에서는 접근이 불가능하다.

### loader 함수 분리하기

위에 방식처럼 함수를 쭉 써넣을 수 있지만, 양도 길어지고 함수의 위치가 어디인지 가독성을 위해 컴포넌트 안에서 함수를 정의하고 export한 후 그걸 import해서 호출하는 것이 좋다.

`loader` 는 어떤 값도 리턴이 가능하다. Promise 객체도!  
그리고 어떤 함수도 실행이 가능하다. 로컬스토리지 같은 접근도!  
하지만, 리액트 훅은 사용할 수 없다. 훅은 리액트 컴포넌트 내에서만 쓸 수 있기 때문이다.

```js
export async function loader() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // 오류 메세지
  } else {
    return response;
  }
}
```

### useNavigation

`loader`를 사용했으면 이게 완료될 때까지 화면이 안 그려지니까 `loader의 상황을 알고싶을 때` 쓰는 훅이다.

- idle : 처리 대기 중인 요청이 없다.
- submitting : `POST`, `PUT`, `PATCH`, `DELETE` 요청이 실행되는 중이다.
- loading : 요청 처리가 끝났고 이후 페이지를 그리는 중이다.

### useRouteError

`response` 에서 던지는 에러를 감지한다.

### useRouteLoaderData

상위 라우트에서 leader로 리턴한 데이터를 받을 수 있다.  
이때 상위 라우트에 id속성을 지정해줘야 하고, 훅의 파라미터로 id 값을 넣어줘야한다.

```js
const data = useRouteLoaderData("event-detail");
```

### action

loader랑 같은 방식으로 사용한다.  
`<form>`태그는 리액트 라우터에서 제공하는 `<Form>` 태그로 바꿔야 한다.  
이 `<Form>`의 method는 바로 서버로 가는게 아니라 action으로 보내진다.  
`useSubmit`훅으로 요청을 보내면 된다.

### useFetcher

다른 페이지에서 어떤 페이지의 action을 사용하고 매끄러운 UX를 적용할 수 있도록 해줌.

### defer

페이지 속도가 높아지고, 다른 콘텐츠를 기다리는 동안에 약간의 콘텐츠를 미리 보여줄 수 있게 된다.

그런데 이거 사용할 경우 `return response` 하면 안 되고, 수동으로 파싱해야한다.

```js
const resData = await response.json();
return resData.events;
```

이렇게.

### Await
defer 처리한거 이용한 컴포넌트를 감싼다.  
그리고 `resolve` 속성에 defer 통해서 받을 것을 적어준다.

### Suspense

다른 데이터 도착하길 기다리는 동안에 폴백을 보여주는 특정한 상황에서 사용한다.
