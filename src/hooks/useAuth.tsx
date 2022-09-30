import { resetStateAction } from "../store/actions/resetState";
import { authApi } from "../store/apis/auth";
import { useAppDispatch } from "../store/hooks";
import { setCurrentAuth } from "../store/slices/auth";
import { deleteAuth, storeAuth } from "../util/handleAuthStorage";

const useAuth = () => {
  const [login, { error, isLoading }] = authApi.useLoginMutation({});
  const dispatch = useAppDispatch();
  const Logout = () => {
    dispatch(resetStateAction());
    deleteAuth();
  };
  const Login = async (email: string, password: string) => {
    await login({ email, password })
      .unwrap()
      .then((res) => {
        storeAuth(res);
        dispatch(setCurrentAuth(res));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return { Logout, Login, loading: isLoading, error };
};

export default useAuth;
