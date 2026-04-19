import { getLoginError, loginActions, LoginForm } from '@/features/AuthByApiKey';
import { AppAlert } from '@/shared/ui/AppAlert/AppAlert';
import { useAppDispatch } from '@/shared/utils/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/utils/hooks/useAppSelector';

import styles from './AuthPage.module.css';

export const AuthPage = () => {
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(getLoginError);

  return (
    <div className={styles.container}>
      <LoginForm />
      {loginError && (
        <AppAlert
          content={loginError}
          onClose={() => {
            dispatch(loginActions.setError(null));
          }}
        />
      )}
    </div>
  );
};
