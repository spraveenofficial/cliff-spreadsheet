import { useAuth } from "../../Context/auth-context";
const DashBoard = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      {JSON.stringify(user)}
    </div>
  );
};

export { DashBoard };
