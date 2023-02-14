import LoginView from '../pages/auth/login';
import { useAuth } from '../firebase/apis/auth';
import HomeView from './home';

function Navigator() {
  const user = useAuth();
  if (user) {
    return <HomeView></HomeView>;
  } else {
    return <LoginView></LoginView>;
  }
}

export default Navigator;
