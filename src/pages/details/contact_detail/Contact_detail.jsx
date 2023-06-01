import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteContactMutation,
  useGetSingleContactQuery,
} from "../../../redux/api/contactApi";
import Loading from "../../../components/contacts/Loading";
import { FaHome, FaTrash } from "react-icons/fa";
import { MdEmail, MdModeEditOutline } from "react-icons/md";
import { BsTelephoneFill, BsThreeDotsVertical } from "react-icons/bs";
import ContactAvatar from "../../../components/contacts/ContactAvatar";
import { Menu } from "@mantine/core";
import Swal from "sweetalert2";

const Contact_detail = () => {
  const token = "20|fiVlk0nYuEA3Jzt8HULJHucBHNzW4hvWzMopuWSF";
  const { id } = useParams();
  const nav = useNavigate();
  const { data, isSuccess, isLoading } = useGetSingleContactQuery({
    id,
    token,
  });
  const [deleteContact] = useDeleteContactMutation();
  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await deleteContact({ id, token });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        nav("/");
      }
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    const contact = data?.contact;
    return (
      <div className="my-3">
        <div className="flex md:flex-row flex-col md:gap-3 gap-5  items-center mb-5">
          <ContactAvatar firstName={contact.name} />
          <p className="text-2xl font-semibold text-color ">{contact.name}</p>
        </div>
        <hr />
        <div className="my-3 rounded-md p-4 border md:max-w-[400px] relative  w-[90%] md:mx-0 mx-auto text-color flex flex-col gap-3">
          <p className=" text-2xl font-semibold">Contact Details</p>
          <div className="flex gap-3 items-center">
            <MdEmail className="text-xl mr-3" />
            {contact.email}
          </div>
          <div className="flex gap-3 items-center">
            <BsTelephoneFill className="text-xl mr-3" />
            {contact.phone}
          </div>

          <div className="flex gap-3 items-center">
            <FaHome className="text-xl mr-3" />
            {contact.address}
          </div>
          <div className="absolute top-[5%] right-[5%]">
          <Menu width={200} shadow="md">
                <Menu.Target>
                  <button className=" p-2 border bg-white shadow-sm">
                    <BsThreeDotsVertical />
                  </button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    icon={<MdModeEditOutline />}
                    component="a"
                    onClick={() => nav(`/contacts/edit/${contact.id}`)}
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    icon={<FaTrash />}
                    component="a"
                    onClick={() => deleteHandler(contact.id)}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
          </div>
        </div>
      </div>
    );
  }
};

export default Contact_detail;
