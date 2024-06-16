import PropTypes from "prop-types";
import { useState } from "react";
import UpdateUserModal from "../../Modal/UpdateUserModal";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
const UserDataRow = ({ user, refetch }) => {
  const { user: loggedInUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: async (userData) => {
      const { data } = await axiosSecure.patch(
        `/users/update/${user.email}`,
        userData
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.modifiedCount > 0) {
        toast.success("Updated successfully");
        refetch();
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const modalHandler = async (selected) => {
    console.log(selected);
    const userData = {
      role: selected,
      status: "Verified",
    };
    try {
      await mutateAsync(userData);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsOpen(false);
    }
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {user?.status ? (
          <p
            className={`${
              user.status === "Verified" ? "text-green-500" : "text-yellow-500"
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className="text-red-500 whitespace-no-wrap">Unavailable</p>
        )}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          disabled={user.email === loggedInUser?.email}
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className={`absolute inset-0 ${
              user.email === loggedInUser?.email ? "bg-red-400" : "bg-green-200"
            }  opacity-50 rounded-full`}
          ></span>
          <span className="relative">Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user}
        />
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
