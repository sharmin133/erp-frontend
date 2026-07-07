import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useLogin } from "./useAuth";
import { Form, type FormField } from "../../components/common/Form";

const fields: FormField[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "you@example.com",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    placeholder: "••••••••",
  },
];

export default function LoginPage() {
  const [values, setValues] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const login = useLogin();

  const handleSubmit = () => {
    setError(null);

    login.mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          toast.success("Logged in successfully!");
          navigate("/");
        },
        onError: (err: any) =>
          setError(err?.response?.data?.message || "Login failed"),
      }
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-57px)] items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-xl shadow-gray-900/5">
        <span className="mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          Sign in
        </span>

        <h1 className="mb-1 text-2xl font-semibold text-gray-900">
          Welcome back
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Sign in to your ERP account
        </p>

        <Form
          fields={fields}
          values={values}
          onChange={(name, val) =>
            setValues((v) => ({ ...v, [name]: val }))
          }
          onSubmit={handleSubmit}
          submitLabel="Sign In"
          isLoading={login.isPending}
          error={error}
          footer={
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                Sign up
              </Link>
            </p>
          }
        />
      </div>
    </div>
  );
}