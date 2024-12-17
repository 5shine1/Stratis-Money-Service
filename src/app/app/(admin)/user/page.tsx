"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Pagination from "rc-pagination";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";

import AppInput from "@/components/global/AppInput";
import CustomSelect from "@/components/global/CustomSelect";
import { apiActivateUser, apiAdminUsers } from "@/api/admin.api";
import { IUser } from "@/@types/data";
import { KYB_STATUS_IDS, ROLES } from "@/@types/common";
import { LoadingContext } from "@/components/providers/LoadingProvider";
import useAppSelector from "@/hooks/global/useAppSelector";

const UserPage = () => {
  const sortData = [
    { id: 0, key: "date", text: "Sort By Date" },
    { id: 1, key: "name", text: "Sort By Name" },
    { id: 2, key: "email", text: "Sort By Email" },
    { id: 3, key: "role", text: "Sort By Country" },
  ];

  const { setLoading } = useContext(LoadingContext);
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchIndex, setSearchIndex] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSort, setCurrentSort] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { role } = useAppSelector((state) => state.auth);

  const filteredData = useMemo(
    () =>
      users
        .filter((item) => {
          if (role === ROLES.COMPLIANCE && (item?.role === "Compliance" || item?.role === "Administrator"))
            return false;
          return true;
        })
        .filter((item) => {
          return (
            item.email.toUpperCase().includes(searchIndex.toUpperCase()) ||
            item.name.toUpperCase().includes(searchIndex.toUpperCase()) ||
            item.mobileNumber.toUpperCase().includes(searchIndex.toUpperCase())
          );
        })
        .sort((a, b) => {
          if (currentSort === 1) return a.name.localeCompare(b.name);
          if (currentSort === 2) return a.email.localeCompare(b.email);
          if (currentSort === 3) return a.country.localeCompare(b.country);
          return 0;
        }),
    [users, role, searchIndex, currentSort]
  );

  const handleGetOrders = async () => {
    setIsLoading(true);
    try {
      const result = await apiAdminUsers();
      setUsers(result);
    } catch (error) {
      toast.error("Server error.");
    }
    setIsLoading(false);
  };

  const handleActiveUser = async (userId: string, status: boolean) => {
    setLoading(true);
    try {
      await apiActivateUser(userId, status);
      setUsers(
        users.map((user) => {
          if (user.userId === userId)
            return {
              ...user,
              kybApplicationStatus: status ? KYB_STATUS_IDS.ApprovedByCompliance : KYB_STATUS_IDS.RejectedByCompliance,
            };
          return user;
        })
      );
    } catch (error) {
      toast.error("Server error.");
    }
    setLoading(false);
  };
  useEffect(() => {
    handleGetOrders();
    return () => {};
  }, []);

  return (
    <>
      <div className="flex flex-col gap-24 lg:gap-32 lg:px-48 lg:py-64 py-32 p-8 text-14">
        <h4 className="w-fit g-header-app">Companies</h4>
        <div className="flex flex-col gap-32">
          <div className="flex items-stretch md:items-center justify-between gap-12  md:flex-row flex-col ">
            <div className="w-full md:max-w-320">
              <AppInput
                value={searchIndex}
                onChange={setSearchIndex}
                icon="ic:outline-search"
                placeholder="Search by name, email and phone number"
              ></AppInput>
            </div>
            <div className="w-full md:max-w-280">
              <CustomSelect
                data={sortData}
                init={sortData[currentSort]}
                onChange={(selected) => {
                  setCurrentSort(selected.id);
                }}
                mainClass="text-white border border-primary-500 rounded-6 py-12 px-16 cursor-pointer u-text-overflow"
                padClass="absolute top-full left-0 w-full max-h-[240px] overflow-auto shadow-lg rounded-8 mt-6 bg-primary-900 text-white/70 flex flex-col gap-4 overflow-y-auto  z-10 p-8"
                listClass=" py-12 px-10 cursor-pointer u-text-overflow rounded-4"
              />
            </div>
          </div>
          {isLoading ? (
            <div className="text-white/70 p-12 text-center">
              <Icon icon="eos-icons:three-dots-loading" className="w-64 h-64 mx-auto" />
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full table-fixed min-w-800 text-white/70">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-8 py-16 text-left w-200">Email</th>
                    <th className="px-8 py-16 text-left w-140">Name</th>
                    <th className="px-8 py-16 text-left w-160">Phone</th>
                    <th className="px-8 py-16 text-left w-120">Location</th>
                    <th className="px-8 py-16 text-left w-120">Role</th>
                    <th className="px-8 py-16 text-center w-100">Email Status</th>
                    <th className="px-8 py-16 text-center w-100">KYB Status</th>
                    <th className="px-8 py-16 text-center w-100">Compliance Status</th>
                    <th className="px-8 py-16 text-right w-100">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!filteredData.length ? (
                    <tr>
                      <td colSpan={9} className="text-error p-24 lg:text-center text-left">
                        No Users
                      </td>
                    </tr>
                  ) : (
                    <>
                      {filteredData.slice(currentPage * 10 - 10, currentPage * 10).map((item, i) => {
                        return (
                          <tr key={i} className="even:bg-[#ffffff04]">
                            <td className="px-8 py-16">{item.email}</td>
                            <td className="px-8 py-16">{item.name}</td>
                            <td className="px-8 py-16">{item.mobileNumber}</td>
                            <td className="px-8 py-16">{item.country}</td>
                            <td className={`px-8 py-16 ${item.isAdmin ? "text-info" : ""}`}>
                              {item.role || "Business"}
                            </td>
                            <td className={`px-8`}>
                              {item.isVerifiedEmail ? (
                                <Icon icon="icon-park-outline:check-one" className="w-16 h-16 text-success mx-auto" />
                              ) : (
                                <Icon icon="icon-park-outline:close-one" className="w-16 h-16 text-error mx-auto" />
                              )}
                            </td>
                            <td className={`px-8`}>
                              {item.kybApplicationStatus >= KYB_STATUS_IDS.AcceptedByKybProvider ? (
                                <Icon icon="icon-park-outline:check-one" className="w-16 h-16 text-success mx-auto" />
                              ) : (
                                <Icon icon="icon-park-outline:close-one" className="w-16 h-16 text-error mx-auto" />
                              )}
                            </td>
                            <td className={`px-8`}>
                              {item.kybApplicationStatus === KYB_STATUS_IDS.ApprovedByCompliance ? (
                                <Icon icon="icon-park-outline:check-one" className="w-16 h-16 text-success mx-auto" />
                              ) : (
                                <Icon icon="icon-park-outline:close-one" className="w-16 h-16 text-error mx-auto" />
                              )}
                            </td>
                            <td className="px-8">
                              <div className="flex items-center gap-12 justify-end">
                                <Link
                                  href={`/app/user/${item.userId}`}
                                  className="text-white/40 u-transition-color hover:text-info"
                                >
                                  <Icon icon="ph:eye-fill" className="w-20 h-20"></Icon>
                                </Link>
                                {item.kybApplicationStatus === KYB_STATUS_IDS.ApprovedByCompliance ? (
                                  <button
                                    onClick={() => {
                                      handleActiveUser(item.userId, false);
                                    }}
                                    className="text-white/40 u-transition-color hover:text-error"
                                  >
                                    <Icon icon="heroicons-solid:ban" className="w-20 h-20"></Icon>
                                  </button>
                                ) : (
                                  <button
                                    disabled={item.kybApplicationStatus < KYB_STATUS_IDS.AcceptedByKybProvider}
                                    onClick={() => {
                                      handleActiveUser(item.userId, true);
                                    }}
                                    className={`text-white/40 u-transition-color ${item.kybApplicationStatus < KYB_STATUS_IDS.AcceptedByKybProvider ? "cursor-not-allowed " : "hover:text-success"}`}
                                  >
                                    <Icon icon="mdi:approve" className="w-20 h-20"></Icon>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <Pagination
            current={currentPage}
            onChange={setCurrentPage}
            showSizeChanger={false}
            total={filteredData.length}
            hideOnSinglePage={true}
            className="flex items-center gap-8 text-14"
            prevIcon={<Icon icon="icon-park-outline:left" />}
            nextIcon={<Icon icon="icon-park-outline:right" />}
            showLessItems
            showTitle={false}
          />
        </div>
      </div>
    </>
  );
};

export default UserPage;
