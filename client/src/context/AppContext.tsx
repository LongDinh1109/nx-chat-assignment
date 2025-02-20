import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatMessage, User } from 'shared-models/dist';
import { socket } from '../services/socket';

const api = import.meta.env.VITE_API_URL;

/*Represents the structure of a chat message*/
type Message = {
  isSender: boolean;
  message: string;
  time: string;
};

/* Defines the shape of the context data and available methods */
interface AppContextType {
  user: User | null;
  onlineUsers: User[];
  receiver: User | null;
  messages: Message[];
  isLoading: boolean;
  handleLogin: (username: string) => void;
  handleLogout: () => void;
  handleSelectReceiver: (user: User) => void;
  handleSendMessage: (messaage: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user:detail') || 'null')
  );
  const [receiver, setReceiver] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  /* Format chat message with proper time and sender information */
  const formatedMessage = (message: ChatMessage) => {
    const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });

    return {
      isSender: message.sender.id === user?.id,
      message: message.message,
      time,
    };
  };

  /* Initialize socket connection and handle user authentication*/
  useEffect(() => {
    const token = localStorage.getItem('user:token');
    const userDetail = localStorage.getItem('user:detail');

    socket.connect();

    if (token && userDetail && !user) {
      setUser(JSON.parse(userDetail));
    }

    // get socket error
    socket.on('error', (error) => {
      console.log(error);
    });

    //  Handle login when reloading page through socket
    if (token && userDetail) {
      socket.emit('user:login', {
        userId: JSON.parse(userDetail).id,
        username: JSON.parse(userDetail).username,
      });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  /* Handle incoming messages through socket*/
  useEffect(() => {
    socket.on('message:receive', (res) => {
      const message = res.data;

      if (
        message.sender.id === user?.id ||
        message.sender.id === receiver?.id
      ) {
        setMessages((prevMessages) => [
          ...prevMessages,
          formatedMessage(message),
        ]);
      }
    });
    return () => {
      socket.off('message:receive');
    };
  }, [receiver, user]);

  /* Fetch online users and handle navigation based on authentication */
  useEffect(() => {
    const getOnlineUsers = async () => {
      try {
        const res = await fetch(`${api}/api/users/online`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (!data) throw new Error(data || 'Failed to get online users');
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    getOnlineUsers().then((data) => {
      const onlineUsers = data.filter(
        (onlineUser: User) => onlineUser.id !== user?.id
      );
      setOnlineUsers(onlineUsers);
    });
    if (!user) {
      navigate('/login');
    } else {
      navigate('/');
    }

    // Handle get online user through socket
    socket.on('usersOnline', (res) => {
      const onlineUsers = res.data.filter(
        (onlineUser: User) => onlineUser.id !== user?.id
      );
      setOnlineUsers([...onlineUsers]);
    });

    return () => {
      socket.off('usersOnline');
    };
  }, [user]);

  /* Fetch message history when a receiver is selected */
  useEffect(() => {
    const currentUser = localStorage.getItem('user:detail');
    if (currentUser && receiver) {
      const userId = JSON.parse(currentUser).id;
      const getMessages = async () => {
        try {
          const res = await fetch(
            `${api}/api/messages/history/${userId}/${receiver.id}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          const data = await res.json();
          const formatedData = data.map((message: ChatMessage) =>
            formatedMessage(message)
          );

          setMessages(formatedData);
        } catch (error) {
          console.log(error);
        }
      };
      getMessages();
    }
  }, [receiver]);

  const handleLogin = async (username: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${api}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await res.json();

      if (res.status === 400) {
        alert(data.error);
      } else {
        localStorage.setItem('user:token', data.id);
        localStorage.setItem('user:detail', JSON.stringify(data));
        socket.emit('user:login', {
          userId: data.id,
          username: data.username,
        });
        setUser(data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    const userId = localStorage.getItem('user:token');
    try {
      const res = await fetch(`${api}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }),
      });
      const data = await res.json();
      if (!data || res.status === 400) {
        alert(data.error);
      } else {
        alert('Logout Successfully');
        socket.emit('user:logout', userId);
        localStorage.removeItem('user:token');
        localStorage.removeItem('user:detail');
        setUser(null);
        setMessages([]);
        setReceiver(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectReceiver = (user: User) => {
    setReceiver(user);
  };

  /*Send message through socket*/
  const handleSendMessage = (message: string) => {
    if (receiver && user) {
      socket.emit('message:send', {
        receiver: receiver,
        message: message,
      });
    }
  };

  const value = {
    user,
    onlineUsers,
    receiver,
    messages,
    isLoading,
    handleLogin,
    handleLogout,
    handleSelectReceiver,
    handleSendMessage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
