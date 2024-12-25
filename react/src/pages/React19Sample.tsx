import React, {
  Suspense,
  use,
  useActionState,
  useOptimistic,
  useState,
  useTransition,
} from 'react';
import { useFormStatus } from 'react-dom';

const postUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

const fetchJsonPlaceholderList = async ({ pageParam = 1 }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`,
  );
  return await res.json();
};

export default function React19() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <div>
        <p>useTransition</p>
        <UseTransition />
      </div>
      <div>
        <p>useActionState</p>
        <UseActionState />
      </div>
      <div>
        <p>useOptimistic</p>
        <UseOptimistic />
      </div>
      <div>
        <p>use: promise</p>
        {/* FIXME: 무한루프 수정 */}
        <Suspense fallback={'loading data...'}>
          <UseWithPromise />
        </Suspense>
      </div>
    </div>
  );
}

/**
 * Actions
 * useActionState: form 처리 관련 상태를 확인할 수 있음
 *
 */
const UseActionState = () => {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      console.log('###', previousState, formData);
      const error = await postUser();
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
 */
const UseOptimistic = () => {
  const [currentName, setCurrentName] = useState('');
  const [optimisticName, setOptimisticName] = useOptimistic(currentName);

  const submitAction = async (formData) => {
    const newName = formData.get('name');
    setOptimisticName(newName);
    await postUser();
    setCurrentName(Math.random().toString());
  };

  return (
    <form action={submitAction}>
      <p>Your current name: {optimisticName}</p>
      <p>Your name is: {currentName}</p>
      <p>
        <label>Change Name:</label>
        <input type="text" name="name" />
      </p>
    </form>
  );
};

const fetchPromise = fetchJsonPlaceholderList({ pageParam: 1 });
/**
 * use: promise 사용
 * @returns
 */
const UseWithPromise = () => {
  const res = use(fetchPromise);

  return (
    <div>{res.data?.map((post) => <div key={post.id}>{post.title}</div>)}</div>
  );
};

const UseWithContext = () => {};

/**
 * useTransition이 비동기 콜백을 지원, 비동기 호출 상태를 지원함 (isPending)
 */
function UseTransition({}) {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const error = await postUser();
      if (error) {
        setError(error);
        return;
      }
    });
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      {isPending && <p>sending....</p>}
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
