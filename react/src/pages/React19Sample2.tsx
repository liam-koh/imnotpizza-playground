import {
  useActionState,
  useDeferredValue,
  useOptimistic,
  useState,
  useTransition,
} from 'react';

const updateName = (name: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, 1000);
  });
};

export default function React19Sample() {
  return (
    <div className="flex flex-col gap-3">
      <UseActionStateExample />
      <UseOptimisticExample />
    </div>
  );
}

const UseActionStateExample = () => {
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
  const [formData, setFormData] = useState({ name: '' });
  const [state, submitForm, isPending] = useActionState(async (data) => {
    await updateName(data.name);
    console.log('### res', formData, data);
    return formData;
  }, formData);

  return (
    <form action={submitForm}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <button type="submit" disabled={isPending}>
        Submit
      </button>
      {isPending && <p>Submitting...</p>}
      {state && <p>Form submitted with name: {state.name}</p>}
    </form>
  );
};

/**
 * useOptimistic
 * - optimistic update 기능 hook (응답을 받기 전에 예상되는 결과값을 표시)
 * - 즉각적인 업데이트를 통해 사용자 경험을 향상시킬 수 있음
 * - TODO: 사용법 정리
 */
const UseOptimisticExample = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState('');
  const [optimisticState, addOptimistic] = useOptimistic(
    name,
    async (cur, optimisticValue) => {
      const res = await updateName(cur);
      console.log('#### res', cur, optimisticValue);
      return res || optimisticValue;
    },
  );

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button
        onClick={async () => {
          addOptimistic(name);
          setResult(name);
        }}
      >
        Update
      </button>
      {optimisticState && <p>Optimistic value: {optimisticState}</p>}
      {result && <p>Optimistic value: {result}</p>}
    </div>
  );
};

const UsePromiseExample = () => {};

const UseContextExample = () => {};

/**
 * useTransition이 비동기를 지원함
 */
const UseTransition = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    // transition에서 비동기를 사용하여, 로딩 상태를 갱신가능
    startTransition(async () => {
      const error = await updateName(name);
      if (error) {
        setError(error);
        return;
      }
    });
  };

  return (
    <div>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {isPending && <p>Updating...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

/**
 * deferredValue 예제
 */
const UseDeferredValueExample = () => {
  const [name, setName] = useState('');
  // ㅇㅇㅇ
  const [isPending, startTransition] = useTransition();
  // useDeferredValue: 업데이트 우선순위 지연된 값이 리턴됨
  const deferredName = useDeferredValue(name);

  const onChange = (e) => {
    setName(e.target.value);
    startTransition(() => {});
  };

  return (
    <div>
      <input value={name} onChange={(event) => onChange(event)} />
      {isPending && <p>Updating...</p>}
      {Array.from({ length: 10000 }).map((_, index) => (
        <div key={index}>{deferredName}</div>
      ))}
    </div>
  );
};
