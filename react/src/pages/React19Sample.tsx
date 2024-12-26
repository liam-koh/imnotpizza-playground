import OptimisticExample from '@/components/OptimisticExample';
import React, {
  Suspense,
  use,
  useActionState,
  useOptimistic,
  useState,
  useTransition,
} from 'react';
import { useFormStatus } from 'react-dom';

const updateDb = (data: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

const fetchJsonPlaceholderList = async ({ pageParam = 1 }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`,
  );
  return await res.json();
};

export default function React19Sample() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <div className="border border-black">
        <p className="font-bold text-xl">useTransition</p>
        <UseTransition />
      </div>
      <div className="border border-black">
        <p className="font-bold text-xl">useActionState</p>
        <UseActionState />
      </div>
      <div className="border border-black">
        <p className="font-bold text-xl">useOptimistic</p>
        <UseOptimistic />
      </div>
      <div className="border border-black">
        <p className="font-bold text-xl">use: promise</p>
        {/* FIXME: 무한루프 수정 */}
        <Suspense fallback={'loading data...'}>
          <UseWithPromise />
        </Suspense>
      </div>
      <div className="border border-black">
        <p className="font-bold text-xl">use: context</p>
        <Suspense fallback={'loading data...'}>
          <UseWithContext />
        </Suspense>
      </div>
    </div>
  );
}

/**
 * useActionState: 비동기 작업을 수행하고, 상태를 관리하는 훅
 * params
 * fn: form이 submit될 시 실행될 비동기 작업, 에러 혹은
 *  - previousState: 이전 상태
 *  - formData: form 데이터
 *  - permalink?: 이 form이 적용할 페이지의 url
 * initialState: 초기 상태
 *
 * return
 * error: 에러 메시지
 * submitAction: form action
 * isPending: 작업이 진행중인지 여부
 *
 * TODO: 예제 만들기
 */
const UseActionState = () => {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      console.log('###', previousState, formData);
      const error = await updateDb('result');
      if (error) {
        return error;
      }
      return null;
    },
    null,
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
      <PendingText />
    </form>
  );
};

function PendingText() {
  const { pending } = useFormStatus();
  if (pending) {
    return <p>pending by useFormStatus</p>;
  } else {
    return null;
  }
}

/**
 * useOptimistic
 * - optimistic update 기능 hook (응답을 받기 전에 예상되는 결과값을 표시)
 * - 기존의 react에서 optimistic update는 주로 react-query를 사용하여 구현하였으나, 자체적으로 API를 제공하여 사용할수 있을듯
 * - 즉각적인 업데이트를 통해 사용자 경험을 향상시킬 수 있음
 * - TODO: 사용법 정리
 */
const UseOptimistic = () => {
  return <OptimisticExample />;
};

const fetchPromise = fetchJsonPlaceholderList({ pageParam: 1 });
/**
 * use: promise 사용
 * @returns
 */
const UseWithPromise = () => {
  const res = use(fetchPromise);
  return (
    <div>
      <div>
        {res?.map((post) => <div key={post.id}>{post.title}</div>)}
      </div>
    </div>
  );
};

const UseWithContext = () => {};

/**
 * useTransition이 비동기 콜백을 지원, 비동기 호출 상태를 지원함 (isPending)
 * - 원래 useTransition는 비용이 많이 들어가는 작업을 처리할 때 동시성 모드를 사용하여 성능을 향상시키는데 사용됨
 * - 기존에는 비동기작업은 지원하지 않았으나, 19버전에서 비동기 작업을 지원하게 됨
 * - api 상태 변경에 매우 유용할 것으로 생각됨
 */
function UseTransition({}) {
  const [result, setResult] = useState('');
  const [name, setName] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    // useTransition을 사용한 비동기 pending state 처리
    startTransition(async () => {
      const res = await updateDb(name);
      setResult(res);
    });
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      {isPending && <p>sending....</p>}
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      <p>result:{result}</p>
    </div>
  );
}
