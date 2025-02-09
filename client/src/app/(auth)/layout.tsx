import WithoutAuthContext from "@/contexts/WithoutAuthContext";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <WithoutAuthContext>{children}</WithoutAuthContext>
    </div>
  );
};

export default AuthLayout;
