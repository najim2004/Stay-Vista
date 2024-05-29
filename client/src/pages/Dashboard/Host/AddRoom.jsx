import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";

const AddRoom = () => {
  const { user } = useAuth();
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: null,
    key: "selection",
  });
  //   date range
  const handleDateRange = (range) => {
    setDates(range.selection);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const category = form.category.value;
    const title = form.title.value;
    const description = form.description.value;
    const to = dates.endDate;
    const from = dates.startDate;
    const price = form.price.value;
    const guests = form.guests.value;
    const bathrooms = form.bathrooms.value;
    const bedrooms = form.bedrooms.value;
    const image = form.image.files[0];
    const host = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    };
    try {
      const image_url = await imageUpload(image);
      const roomData = {
        location,
        category,
        title,
        description,
        to,
        from,
        price,
        guests,
        bathrooms,
        bedrooms,
        host,
        image: image_url,
      };
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      {/* form */}
      <AddRoomForm
        dates={dates}
        handleSubmit={handleSubmit}
        handleDateRange={handleDateRange}
      />
    </div>
  );
};

export default AddRoom;
