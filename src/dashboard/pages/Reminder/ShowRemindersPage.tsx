import { useEffect, useState } from "react";
import ReminderList from "./ReminderList"
import { useReduxDispatch, useReduxSelector } from "../../../store/store";
import { getReminders } from "../../../store/slices/reminderSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReminderModal from "./ReminderModal";

interface Reminder {
  id: string;
  email: string;
  name: string;
  phone: string;
}

const ShowRemindersPage = () => {
  const { reminders, loading, error } = useReduxSelector(
    (state) => state.reminder
  );
  const [showModal, setshowModal] = useState<boolean>(false);
  const dispatch = useReduxDispatch();
  const onClose = () => {
    setshowModal(false);
  };
  useEffect(()=>{
    dispatch(getReminders()).then(result => {
      if(result.meta.requestStatus === "fulfilled"){
        console.log(reminders);
      }
    });
  },[])
  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex justify-end">
            <button
            onClick={() => setshowModal(true)}
            className="bg-primary rounded p-4 font-bold mb-6">
              Send Reminder
            </button>
          </div>
          <ReminderList reminders={reminders} />
        </>
      )}
      {showModal && (
        <ReminderModal
          onClose={onClose}
        />
      )}
    </div>
  );
}

export default ShowRemindersPage