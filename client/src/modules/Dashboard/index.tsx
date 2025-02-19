import Button from '../../components/Button';
import React, { useEffect } from 'react';
import SignoutIcon from '../../assets/signout.svg';
import SendIcon from '../../assets/send.svg';
import { useAppContext } from '../../context/AppContext';
import UserCard from '../../components/Card';
import Input from '../../components/Input';
import MessageCard from '../MessageCard';
import Form from '../../components/Form';

const Dashboard: React.FC = () => {
  const {
    handleLogout,
    handleSelectReceiver,
    handleSendMessage,
    user,
    onlineUsers,
    receiver,
    messages,
  } = useAppContext();

  const [message, setMessage] = React.useState('');
  const messagesRef = React.useRef<HTMLDivElement>(null);

  /* Handle scrolling to the latest message*/ 
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6 pt-10 relative">
        {/* Header */}
        <div className="w-fit text-center mb-8 mx-auto shadow-lg rounded-xl p-3">
          <h1 className="text-3xl font-bold text-gray-900 ">
            Real-time Chat app
          </h1>
          <p className="text-gray-600">
            Stay connected with instant, one-on-one messaging
          </p>
        </div>
        {/* Body */}
        <div className=" grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Online Users Bar*/}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="border-b border-gray-500 pb-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Total Online Users:
              </h2>
              <p className="text-3xl font-bold text-amber-700">
                {onlineUsers.length}
              </p>
            </div>
            <div>
              {onlineUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 mt-5 pb-2 cursor-pointer"
                  onClick={() => handleSelectReceiver(user)}
                >
                  <UserCard
                    user={user}
                    className="shadow-lg p-2 rounded-lg hover:scale-110 duration-300 ease-in"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Chat Box */}
          <div className="flex flex-col min-h-[70vh] justify-between bg-white rounded-lg shadow p-6 md:col-span-4">
            <div>
              {/* My user */}
              <div className="w-fit ml-auto">
                <p className="font-bold underline pl-2">Me</p>
                {user && (
                  <UserCard
                    user={user}
                    className="flex-row-reverse gap-3 p-2 bg-amber-200 rounded-lg"
                  />
                )}
              </div>
              {/* Messages */}
              {receiver ? (
                <div>
                  <UserCard
                    user={receiver}
                    className="border-b border-gray-200 pb-5"
                  />
                  {messages && messages.length > 0 ? (
                    <div className="my-10 h-[50vh] px-3 overflow-y-auto scrollbar">
                      {messages.map((message, index) => (
                        <MessageCard
                          key={index}
                          message={message.message}
                          isSender={message.isSender}
                          time={message.time}
                        />
                      ))}
                      <div ref={messagesRef} />
                    </div>
                  ) : (
                    <div className="h-[50vh] pt-7 font-semibold text-gray-400 text-center">
                      No messages yet
                    </div>
                  )}
                  <div className="">
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (message.trim().length > 0) {
                          handleSendMessage(message);
                          setMessage('');
                        }
                      }}
                      error=""
                      className="w-full flex justify-start gap-3 border-t border-gray-300 pt-5"
                    >
                      <div className="w-[75%] m-0">
                        <Input
                          value={message}
                          onChange={setMessage}
                          placeholder="Type your message here"
                        />
                      </div>
                      <Button className="bg-amber-500 " type="submit">
                        <div className="hidden text-black pr-2 md:block ">
                          Send
                        </div>
                        <img src={SendIcon} width={20} height={20} />
                      </Button>
                    </Form>
                  </div>
                </div>
              ) : (
                <div className="font-semibold text-center mt-14">
                  No conservation selected
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Sign Out btn*/}
        <Button className="absolute top-1 right-1" onClick={handleLogout}>
          <div className="hidden text-black pr-2 md:block">Sign out</div>
          <img src={SignoutIcon} width={20} height={20} />
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
