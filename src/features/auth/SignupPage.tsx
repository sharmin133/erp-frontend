import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useRegister } from "./useAuth";
import { Form, type FormField } from "../../components/common/Form";

const fields: FormField[] = [
  {
    name: "name",
    label: "User Name",
    type: "text",
    required: true,
    placeholder: "Your name",
  },
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
    placeholder: "At least 6 characters",
  },
];

export default function SignupPage() {
  const [values, setValues] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const register = useRegister();

  const handleSubmit = () => {
    setError(null);

    register.mutate(
      {
        name: values.name,
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully!");
          navigate("/");
        },
        onError: (err: any) =>
          setError(err?.response?.data?.message || "Signup failed"),
      }
    );
  };

  return (
    <div className="flex min-h-[calc(100vh-57px)] items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-xl shadow-gray-900/5">
        <span className="mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          Create account
        </span>

        <h1 className="mb-1 text-2xl font-semibold text-gray-900">
          Create an account
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          New accounts are created with the Employee role
        </p>

        <Form
          fields={fields}
          values={values}
          onChange={(name, val) =>
            setValues((v) => ({ ...v, [name]: val }))
          }
          onSubmit={handleSubmit}
          submitLabel="Sign Up"
          isLoading={register.isPending}
          error={error}
          footer={
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                Sign in
              </Link>
            </p>
          }
        />
      </div>
    </div>
  );
}