import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

// ANOTHER WAY TO RESOLVE MULTIPLE REQUESTS FOR A SINGLE USER
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    // console.log("Fetching...");
    await dispatch(fetchPosts());
    // console.log(getState());

    // const userIds = _.uniq(_.map(getState().posts, "userId"));
    // userIds.forEach((id) => dispatch(fetchUser(id)));

    // ANOTHER WAY
    _.chain(getState().posts)
        .map("userId")
        .uniq()
        .forEach((id) => dispatch(fetchUser(id)))
        .value();
};

// async-await doesn't return appropriate JS object what an action creator should return
// Hence it is returning a function that will be used be redux-thunk
export const fetchPosts = () => async (dispatch, getState) => {
    const res = await jsonPlaceholder.get("/posts");

    dispatch({ type: "FETCH_POSTS", payload: res.data });
};

export const fetchUser = (id) => async (dispatch, getState) => {
    const res = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({ type: "FETCH_USER", payload: res.data });
};

// TO RESOLVE MULTIPLE REQUESTS FOR A SINGLE USER WE CAN USE LODASH MEMOIZE FUNCTION
// export const fetchUser = (id) => (dispatch, getState) =>
//     _fetchUser(id, dispatch, getState);

// const _fetchUser = _.memoize(async (id, dispatch, getState) => {
//     const res = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: "FETCH_USER", payload: res.data });
// });
