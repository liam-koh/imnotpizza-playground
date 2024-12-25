import AppLayout from '@/components/AppLayout';
import Router from './router/router';
import '@o2pluss/o2pluss-design-system/ods-style';

function App() {
  return (
    <AppLayout>
      <Router />
    </AppLayout>
  );
}

export default App;
