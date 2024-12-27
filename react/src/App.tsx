import AppLayout from '@/components/AppLayout';
import Router from './router/router';
import { preinit } from 'react-dom';

function App() {
  return (
    <AppLayout>
      <Router />
    </AppLayout>
  );
}

export default App;
