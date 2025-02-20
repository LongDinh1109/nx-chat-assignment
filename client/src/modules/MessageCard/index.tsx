type MessageCardProps = {
  message: string;
  isSender: boolean;
  time: string;
};
export default function MessageCard({
  message,
  isSender,
  time,
}: MessageCardProps) {
  console.log(time);

  return (
    <div >
      <div className={`mt-4  ${isSender ? 'text-end' : ''}`}>{time}</div>
      <div
        className={`w-fit max-w-[40%] py-2 px-4 rounded-b-lg break-words ${
          isSender
            ? 'bg-amber-400 rounded-tl-lg ml-auto'
            : 'bg-amber-200 rounded-tr-lg'
        }`}
      >
        {message}
      </div>
    </div>
  );
}
