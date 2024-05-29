import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";

const AddRoom = () => {
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });
  //   date range
  const handleDateRange = (range) => {
    setDates(range.selection);
  };
  console.log(dates);
  return (
    <div>
      {/* form */}
      <AddRoomForm dates={dates} handleDateRange={handleDateRange} />
    </div>
  );
};

export default AddRoom;
