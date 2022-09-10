import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/auth";
import Loader from "./Loader";
import { ErrorMessage, Input } from "./styledComponent/form/input";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState({});

  const dispatch = useDispatch();

  const { message } = useSelector((state) => state.message);

  const validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!email.includes("@")) {
      emailError = "email is invalid";
    }
    if (!email) {
      emailError = "email is required";
    }
    if (!password) {
      passwordError = "passsword is required";
    }

    if (emailError || passwordError) {
      setInputError((currError) => {
        return { ...currError, email: emailError };
      });
      setInputError((currError) => {
        return { ...currError, password: passwordError };
      });

      return false;
    }
    return true;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const checkValidate = validate();

    if (checkValidate) {
      setLoading(true);
      dispatch(login({ email, password }))
        .unwrap()
        .then(() => {
          setLoading(false);
          toast.success("Successfully Login", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        .catch(() => {
          toast.error(message?.[0].messages[0].message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setLoading(false);
        });
    }
  };

  const handleEmailOnchnage = (e) => {
    const emailOnChange = e.target.value;
    setEmail(emailOnChange);
    if (inputError?.email) {
      setInputError((currError) => {
        return { ...currError, email: "" };
      });
    }
  };

  const handlePasswordOnchnage = (e) => {
    const passwordOnChange = e.target.value;
    setPassword(passwordOnChange);
    if (inputError?.password) {
      setInputError((currError) => {
        return { ...currError, password: "" };
      });
    }
  };

  return (
    <div className="login">
      <h2 className="login__title">Login</h2>

      <form className="login__form" onSubmit={handleFormSubmit}>
        <div className="login__form__input">
          <label htmlFor="email">Email</label>
          <Input
            error={inputError.email}
            type="text"
            id="email"
            onChange={handleEmailOnchnage}
          />
          <ErrorMessage show={inputError?.email}>
            {inputError.email}
          </ErrorMessage>
        </div>
        <div className="login__form__input">
          <label htmlFor="password">Password</label>
          <Input
            error={inputError.password}
            type="password"
            id="password"
            onChange={handlePasswordOnchnage}
          />
          <ErrorMessage show={inputError?.password}>
            {inputError.password}
          </ErrorMessage>
        </div>

        <button
          style={{ width: "100%", height: "4rem" }}
          type="submit"
          className="btn"
        >
          {loading ? <Loader /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
