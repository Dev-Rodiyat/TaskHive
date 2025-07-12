import { IoClose } from "react-icons/io5";
import { MdNotificationsOff } from "react-icons/md";

const notifications = []

const Notification = ({onClose}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-end z-50 font-inter">
      <div className="w-[95%] max-w-[360px] my-6 mr-6 flex flex-col rounded-2xl bg-white shadow-2xl border border-zinc-200 overflow-hidden transition-all">
        <div className="flex justify-between items-center px-5 py-4 border-b border-zinc-200 bg-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-zinc-900">
            Notifications
          </h2>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 transition"
            onClick={onClose}
          >
            <IoClose size={22} className="text-zinc-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-3 space-y-3 max-h-[70vh]">
          {Array.isArray(notifications) && notifications.length > 0 ? (
            notifications.map((note, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-zinc-50 rounded-xl cursor-pointer shadow-sm hover:bg-zinc-100 transition"
              >
                <div className="flex-1">
                  <p className="text-sm text-zinc-800">
                    {note?.message}
                  </p>
                  <span className="text-xs text-zinc-500 ml-2">
                    {new Date(note.createdAt).toLocaleString()}
                  </span>
                </div>
                <button onClick={() => handleDelete(note?._id)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-200 active:bg-indigo-100 transition">
                  <IoClose
                    size={18}
                    className="text-zinc-600"
                  />
                </button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-zinc-600 py-12">
              <MdNotificationsOff
                size={64}
                className="text-zinc-300 mb-4"
              />
              <p className="font-medium">No notifications</p>
              <p className="text-sm mt-1">You're all caught up!</p>
            </div>
          )}
        </div>

        {Array.isArray(notifications) && notifications.length > 0 && (
          <div className="sticky bottom-0 px-5 py-4 bg-white border-t border-zinc-200 flex justify-center">
            <button onClick={handleDeleteAll} className="py-2 px-6 bg-slate-600 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition">
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
