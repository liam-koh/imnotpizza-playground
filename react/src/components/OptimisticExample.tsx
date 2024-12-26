import { useOptimistic, useState, useTransition } from 'react';

async function deliverMessage(message) {
  await new Promise((res) => setTimeout(res, 1000));
  return message;
}

export default function OptimisticExample() {
  // 메시지 상태 관리
  const [messages, setMessages] = useState([
    { text: 'Hello there!', sending: false, key: 1 },
  ]);

  // 입력 필드 값 상태 관리
  const [inputValue, setInputValue] = useState('');

  // 메시지 전송 함수
  async function sendMessage(inputValue) {
    const sentMessage = await deliverMessage(inputValue);
    setMessages((prevMessages) => [...prevMessages, { text: sentMessage }]);
  }

  // Optimistic UI 구현
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        text: newMessage,
        sending: true,
      },
    ],
  );

  const [pending, startTransition] = useTransition();

  /**
   * 폼 Submit 처리
   * form ref 가 아닌 일반 onClick 이벤트로 처리할 경우, transition 사용해야 함, 안하면 다음 에러발생(원인불명)
   * An optimistic state update occurred outside a transition or action. 
   * To fix, move the update to an action, or wrap with startTransition.
   *
   */
  async function formAction() {
    startTransition(async () => {
      setInputValue('');
      // Optimistic UI 상태 업데이트
      addOptimisticMessage(inputValue);
      // 인풋 초기화
      // 실제 메시지 전송
      await sendMessage(inputValue);
    });
  }

  return (
    <>
      <p>pending: {pending ? 'true' : 'false'}</p>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formAction();
        }}
      >
        <input
          type="text"
          name="message"
          placeholder="Hello!"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}
