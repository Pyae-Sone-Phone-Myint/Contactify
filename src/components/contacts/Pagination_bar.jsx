import { Pagination } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Pagination_bar = ({ total_pages, checkParam }) => {
  const [page, setPage] = useState(1);
  const [refresh,setRefresh]=useState(true);
  const nav = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const getParam = queryParams.get("page");

  if (checkParam && page === 1 && refresh) {
    setRefresh(false);
    setPage(Number(getParam));
    queryParams.set("page", page);
    nav({
      pathname: location.pathname,
      search: queryParams.toString(),
    });
  }

  useEffect(() => {
      if (page!==1 || !refresh) {
        queryParams.set("page", page);
      }
      nav({
        pathname: location.pathname,
        search: queryParams.toString(),
      });
  }, [page]);

  return (
    <>
      <Pagination
        total={total_pages}
        value={page}
        onChange={setPage}
        position="center"
        styles={(theme) => ({
          control: {
            "&[data-active]": {
              backgroundImage: theme.fn.gradient({
                from: "red",
                to: "yellow",
              }),
            },
          },
        })}
      />
    </>
  );
};

export default Pagination_bar;
