import RegisterForm from "../../Component/Auth/RegisterForm";
import AuthLayout from "../../layout/AuthLayout";



const RegisterPage = () => {
  return (
    <AuthLayout
      form={<RegisterForm />}
      title="Already have an account?"
      description="Sign in to access your dashboard and medical camps."
      buttonText="Log In"
      onSwitch="/join-us"
    />
  );
};

export default RegisterPage;
