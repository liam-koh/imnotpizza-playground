import OptimisticExample from '@/components/OptimisticExample';
import { random } from 'lodash';
import React, {
  forwardRef,
  Suspense,
  use,
  useActionState,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from 'react';
import { useFormStatus } from 'react-dom';
import { preconnect, preload, preinit } from 'react-dom';

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
        <CounterContextProvider>
          <UseWithContext />
        </CounterContextProvider>
      </div>
      <LinkPriorityExample />
      <MetadataExample/>
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
      <div>{res?.map((post) => <div key={post.id}>{post.title}</div>)}</div>
    </div>
  );
};

const CounterContext = React.createContext({ count: 0, setCount: () => {} });

const CounterContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
};

const UseWithContext = () => {
  const { count, setCount } = use(CounterContext);
  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  );
};

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

/**
 * 기존에는 ref를 props로 전달하려면 forwardRef로 감싸 처리해야했으나,
 * forwardRef 없이도 전달할수 있도록 변경되었다.
 * 그리하여 forwardRef는 더이상 필요하지 않게 되었는데 아직은 deprecated 되지는 않은 상태이다.
 */
// as is
const RefExampleAsis = forwardRef(({ placeholder }, ref) => {
  return <input placeholder={placeholder} ref={ref} />;
});

// to be (React 19)
function RefExampleTobe({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />;
}

// preinit('https://.../path/to/some/script.js', {as: 'script' }) // loads and executes this script eagerly
// preinit
// preload('https://.../path/to/font.woff', { as: 'font' }) // preloads this font
// preconnect('https://...') // when you will request something but aren't sure what
// 리소스 로드 순서 및 우선순위를 지정할 수 있음, 필요한 리소스를 먼저 로드하여 웹 성능 최적화에 이용됨
// 하지만 react기반 프레임워크 (Next.js, Remix 등)에서 이미 지원하고 있어 사용해야 하는 상황인지 먼저 체크 필요
const LinkPriorityExample = () => {
  // 컴포넌트 로드 시 가장 먼저 스크립트 로드
  // as; "script" | "style";
  preinit('https://cdn.datatables.net/plug-ins/1.10.20/sorting/enum.js', {
    as: 'script',
  });

  // 호스트에 미리 연결
  // preconnect('https://example.com/preconnect');
  // 리소스 중 우선순위 상위
  // as: 리소스의 유형, 다음 중에서 선택가능
  type PreloadAs =
    | 'audio'
    | 'document'
    | 'embed'
    | 'fetch'
    | 'font'
    | 'image'
    | 'object'
    | 'track'
    | 'script'
    | 'style'
    | 'video'
    | 'worker';
  preload('https://example.com/preload', { as: 'document' });

  useEffect(() => {
    // add <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    // to the document
    const script = document.createElement('script');
    script.src =
      'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return <div></div>;
};

/**
 * Metadata 관련 스크립트의 속성을 동적으로 지정가능한 기능
 * 기존 react(SPA기준)의 경우 useEffect에서 직접 조작하거나 react-helmet을 사용하여 변경하였으나, react 스타일로 수정할수 있도록 개선됨
 * 다음과 같이 사용할 경우, 자동으로 document head 쪽으로 호이스트되어 선언됨
 */


function MetadataExample() {
  const post = useMemo(() => {
    // random
    return {
      title: 'My Post' + random(1, 10),
      keywords: 'react, react19' + random(1, 10),
    };
  }, []);

  return (
    <article>
      <h1>{post.title}</h1>
      <title>{post.title}</title>
      <meta name="author" content="Josh" />
      <link rel="author" href="https://twitter.com/joshcstory/" />
      <meta name="keywords" content={post.keywords} />
      <p>Eee equals em-see-squared...</p>
    </article>
  );
}
