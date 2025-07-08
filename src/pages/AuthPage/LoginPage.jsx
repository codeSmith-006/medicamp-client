import LoginForm from "../../Component/Auth/LoginForm";
import AuthLayout from "../../layout/AuthLayout";

const LoginPage = () => {
  return (
    <AuthLayout
      form={<LoginForm />}
      title="New here?"
      description="Create an account to join the MediCamp community."
      buttonText="Sign Up"
      onSwitch="/register"
    />
  );
};

export default LoginPage;
