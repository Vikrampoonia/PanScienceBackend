export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {children}
      </div>
    </div>
  );
}
