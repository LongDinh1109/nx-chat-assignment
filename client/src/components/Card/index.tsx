import { User } from 'shared-models/dist';
type UserCardProps = {
  user: User;
  className?: string;
  isMyUser?: boolean;
};
export default function UserCard({ user, className, isMyUser = false}: UserCardProps) {
  return (
    <div className={`flex items-center space-x-2 ${className ?? ''}`}>
      <img
        src={`https://i.pravatar.cc/150?u=${user?.id}`}
        alt={user?.username}
        className="w-10 h-10 rounded-full"
      />
      <h2 className="text-xl font-semibold text-gray-800">
        {user?.username}
        {!isMyUser && <p className="text-xs font-light text-green-600">
          {user?.online ? 'online' : 'offline'}
        </p>}
      </h2>
    </div>
  );
}
