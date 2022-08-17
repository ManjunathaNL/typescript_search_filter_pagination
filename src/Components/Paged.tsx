import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { useNavigate, useLocation } from "react-router-dom";
import {
  makeStyles,
  Theme,
  Container,
  Typography,
  Box,
  CircularProgress
} from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";

import { fetchData, ResponseData, DataQueryParams } from "./api";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  loading: {
    opacity: 0.5
  }
}));

const DEFAULT_PAGE = 1;
const DEFAULT_ROWS_PER_PAGE = 5;

const supportedParams = ["page", "limit"];

const getQueryParams = (urlParams: URLSearchParams): DataQueryParams => {
  const obj: any = Array.from(urlParams)
    .filter((param) => supportedParams.includes(param[0]))
    .map((param) => {
      return {
        [param[0]]: param[1]
      };
    })
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});

  const keys = Object.keys(obj);

  if (!keys.includes("page")) {
    obj.page = DEFAULT_PAGE;
  }

  if (!keys.includes("limit")) {
    obj.limit = DEFAULT_ROWS_PER_PAGE;
  }

  return obj as DataQueryParams;
};

export const Paged: React.FC<{}> = () => {
  const classes = useStyles();

  const navigate = useNavigate ();
  const location = useLocation();

  const urlParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const queryParams = useMemo(() => {
    return getQueryParams(urlParams);
  }, [urlParams]);

  const asyncData = useAsync<ResponseData>(fetchData, [queryParams], {
    // preserve previous state when loading new data to prevent an empty-data 'blip'
    setLoading: (state) => ({ ...state, loading: true })
  });

  const updateURL = () => {
    // remove explicit page (if default) for cleaner url (getQueryParams() will default to page DEFAULT_PAGE)
    if (urlParams.get("page") === `${DEFAULT_PAGE}`) {
      urlParams.delete("page");
    }
    // remove explicit limit (if default) for cleaner url (getQueryParams() will default to limit DEFAULT_ROWS_PER_PAGE)
    if (urlParams.get("limit") === `${DEFAULT_ROWS_PER_PAGE}`) {
      urlParams.delete("limit");
    }
    navigate.push({
      pathname: location.pathname,
      search: `?${urlParams}`
    });
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    const oneBasedNewPage = newPage + 1;

    urlParams.set("page", oneBasedNewPage.toString());
    updateURL();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const numRowPerPage = parseInt(event.target.value, 10);

    urlParams.set("limit", numRowPerPage.toString());

    // go to first page and upate url
    handleChangePage(null, 0);
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h5" align="center">
        Server-Side (API) Pagination with the JSONPlaceholder API and React
        Router Hooks
      </Typography>
      <Box mt={3}>
        {asyncData.loading && !asyncData.result && <CircularProgress />}
        {asyncData.error && (
          <Typography gutterBottom color="error">
            {asyncData.error}
          </Typography>
        )}
        {asyncData.result && (
          <>
            <Box
              mb={2}
              className={asyncData.loading ? classes.loading : undefined}
            >
              {asyncData.result.items?.map((item) => (
                <Box key={item.id}>
                  {item.id} &mdash; {item.title}
                </Box>
              ))}
            </Box>
            <Box display="flex" justifyContent="center">
              <TablePagination
                component="div"
                count={asyncData.result.count}
                page={+queryParams.page - 1} // 0-based paging
                rowsPerPage={+queryParams.limit}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};
