import { LoginForm } from '@/features/AuthByApiKey';

import styles from './AuthPage.module.css';

export const AuthPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};
