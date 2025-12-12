import React from 'react';
import { User } from '../types';
import { Users } from 'lucide-react';

interface UserListProps {
  users: User[];
  currentUser: User | null;
}

const UserList: React.FC<UserListProps> = ({ users, currentUser }) => {
  return (
    <div className="bg-slate-900 border-b lg:border-b-0 lg:border-l border-slate-800 p-4 lg:w-64 flex-shrink-0 lg:h-[calc(100vh-73px)] overflow-y-auto">
      <h3 className="text-slate-400 text-xs font-bold uppercase mb-4 flex items-center gap-2">
        <Users className="w-4 h-4" />
        Time Online ({users.length})
      </h3>
      
      <div className="space-y-3">
        {users.map(user => (
          <div key={user.id} className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm"
                style={{ backgroundColor: user.avatarColor }}
              >
                {user.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-200 truncate">
                {user.name} {currentUser?.id === user.id && <span className="text-slate-500 text-xs">(Você)</span>}
              </p>
              <p className="text-xs text-slate-500 truncate">Online agora</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;