import { useAuth } from "../../Context/auth-context";
import { AddAccount, AddedAccount } from "../../Components";
const Subscriptions = () => {
  const { user } = useAuth();
  const { subscriptions } = user;

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="sm:mx-3 my-3 w-2/3 sm:w-full p-4 rounded border-dashed border-2 border-gray-300">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-black">Your Subscriptions</h1>
          <p className="text-gray-500">
            ({subscriptions.length} subscriptions)
          </p>
        </div>
        <div className="grid grid-cols-4 auto-cols-max gap-5 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <AddAccount length={subscriptions?.length} />
          {subscriptions.map((account) => (
            <AddedAccount key={account.email} {...account} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Subscriptions };
