import { UserProvider } from './src/UserContext';

import Routes from './src/routes';

export default function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}
