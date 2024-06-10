import { useState } from "react";
import AddRoomForm from "../../../components/Form/AddRoomForm";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRoom = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [imgPreview, setImgPreview] = useState();
  const [imgText, setImgText] = useState("Upload Image");
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (roomData) => {
      const { data } = await axiosSecure.post("/room", roomData);
      return data;
    },
    onSuccess: (data) => {
      setLoading(false);
      toast.success("Room Added Successfully!");
      console.log("Data saved successfully");
      navigate("/dashboard/my-listings");
    },
  });

  //   date range
  const handleDateRange = (range) => {
    setDates(range.selection);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
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
      // post request to server
      await mutateAsync(roomData);
    } catch (e) {
      setLoading(false);
      console.log(e);
      toast.error(e.massage);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet>
      {/* form */}
      <AddRoomForm
        dates={dates}
        loading={loading}
        setImgPreview={setImgPreview}
        imgPreview={imgPreview}
        handleSubmit={handleSubmit}
        handleDateRange={handleDateRange}
        setImgText={setImgText}
        imgText={imgText}
      />
    </div>
  );
};

export default AddRoom;
