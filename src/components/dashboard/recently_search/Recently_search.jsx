import React, { useEffect, useState } from "react";
import { useDeleteContactMutation } from "../../../redux/api/contactApi";
import { BsFillPersonPlusFill, BsThreeDotsVertical } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Checkbox, Menu, Table } from "@mantine/core";
import { FaEye, FaTrash } from "react-icons/fa";
import { MdModeEditOutline, MdOutlineFavorite } from "react-icons/md";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@material-tailwind/react";
import "../../contacts/contactTable.css";
import {
  addContacts,
  removeAllContacts,
  removeFavorite,
  removeRecentFile,
  setFavorite,
  setSearchTerm,
} from "../../../redux/feature/contactSlice";
import Cookies from "js-cookie";
import { notifications } from "@mantine/notifications";

const Recently_search = () => {
  const token = Cookies.get("token");
  // const { data, isLoading, isError, isSuccess } = useGetAllContactsQuery(token);
  const nav = useNavigate();
  const [deleteContact] = useDeleteContactMutation();

  const deleteHandler = (contact, id) => {
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
        dispatch(removeFavorite(contact));
        dispatch(removeRecentFile(contact));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        notifications.show({
          title: "Contact Notification",
          message: `${contact?.name} is successfully deleted from the Contact List !`,
        });
      }
    });
  };
  const contactsData = useSelector((state) => state.contactSlice.contacts);
  let visit = useSelector((state) => state.contactSlice.recentlyVisit);
  const searchTerm = useSelector((state) => state.contactSlice.searchTerm);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  visit = contactsData?.filter((item) =>
    visit?.some((includeItem) => includeItem.id === item.id)
  );
  const removeAll = () => {
    if (isChecked) {
      dispatch(removeAllContacts());
    }
  };

  // useEffect(() => {
  //   dispatch(addContacts(data?.contacts.data));
  // }, [data]);

  // if (isLoading) {
  //   return <Loading />;
  // }

  if (visit?.length > 0) {
    const displayContactsData =
      searchTerm.trim() === ""
        ? visit
        : visit.filter((contact) =>
            contact.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

    const rows =
      displayContactsData.length === 0 ? (
        <tr>
          <td className=" text-center" colSpan={4}>
            No contacts found{" "}
          </td>
        </tr>
      ) : (
        displayContactsData?.map((contact) => (
          <tr key={contact?.id} className={`parent ${isChecked && "selected"}`}>
            <td>
              <p>{contact?.name}</p>
              <span className=" text-gray-600">{contact?.email}</span>
            </td>

            <td className="hide-on-mobile ">{contact?.phone}</td>
            <td className="hide-on-mobile">{contact?.address}</td>
            <td className=" ">
              <div className="child flex items-center gap-3">
                <MdOutlineFavorite
                  onClick={() => {
                    if (contact?.isFavourite) {
                      dispatch(removeFavorite(contact));
                    } else {
                      dispatch(setFavorite(contact));
                    }
                  }}
                  size={"1.5rem"}
                  className={`cursor-pointer ${
                    contact?.isFavourite ? "text-orange-500" : "text-gray-500"
                  }`}
                />
                <Menu width={200} shadow="md">
                  <Menu.Target>
                    <button className=" p-2 border bg-white shadow-sm">
                      <BsThreeDotsVertical />
                    </button>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      icon={<FaEye />}
                      component="a"
                      onClick={() => nav(`/contacts/${contact.id}`)}
                    >
                      View
                    </Menu.Item>

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
                      onClick={() => {
                        dispatch(removeRecentFile(contact));
                      }}
                    >
                      Remove
                    </Menu.Item>
                    <Menu.Item
                      icon={<FaTrash />}
                      component="a"
                      onClick={() => deleteHandler(contact, contact.id)}
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </td>
          </tr>
        ))
      );
    return (
      <div className=" md:w-[80%] w-[90%] mx-auto  lg:m-0">
        <div className="my-2">
          <div className="relative flex w-full gap-2 md:w-max ">
            <Input
              type="search"
              label="Search here..."
              className="pr-20"
              icon={<BiSearchAlt />}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2 justify-end">
          <Checkbox
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            size={"md"}
            radius={"md"}
          />
          <button
            onClick={() => removeAll()}
            className=" border py-1 px-2 rounded-lg text-sm hover:bg-orange-300 hover:text-white transition duration-200"
          >
            Clear all
          </button>
        </div>
        <Table highlightOnHover className="select-none">
          <colgroup>
            <col style={{ width: "30%" }} />
            <col style={{ width: "30%" }} className="hide-on-mobile" />
            <col style={{ width: "30%" }} className="hide-on-mobile" />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>Name</th>
              <th className="hide-on-mobile">Phone Number</th>
              <th className="hide-on-mobile">Address</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    );
  } else if (visit?.length == 0) {
    return (
      <div className=" w-full min-h-[80vh] flex justify-center items-center">
        <div className="">
          <img
            className="w-[150px] mx-auto"
            src="public\empty-box.png"
            alt="empty-contact=img"
          />
          <div className=" mt-5 flex items-center flex-col gap-3">
            <p className=" text-color">There is no contacts yet.</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Recently_search;
