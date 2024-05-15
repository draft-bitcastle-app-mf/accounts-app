import Button from "@mui/material/Button";
import Cookie from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "store/store";

const Login = () => {
  const searchParams = useSearchParams();
  const { setToken } = useAuthStore((state) => state);

  const handleSubmit = () => {
    try {
      loginAction();
      if (searchParams.get("redirect")) {
        window.location.href = window.decodeURIComponent(
          searchParams.get("redirect") as string
        );
      }
    } catch (error) {}
  };

  const loginAction = () => {
    Cookie.set("TOKEN", "123abc", {
      domain: "localhost",
      expires: new Date().setFullYear(new Date().getFullYear() + 1),
    });
    setToken("123abc");
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default Login;
