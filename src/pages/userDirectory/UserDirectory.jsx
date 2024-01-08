import React, { useEffect, useState } from "react";
import { POST_API, USERS_API } from "../../constants/urls";
import { useNavigate } from "react-router-dom";

const UserDirectory = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState([]);

  const fetchPostData = async () => {
    setLoading(true);
    const res = await fetch(POST_API);
    const data = await res.json();
    if (res?.status === 200) {
      setPostData(data);
      setLoading(false);
    } else {
      alert("Something went wrong! Please try again later.");
    }
  };

  const fetchUsersData = async () => {
    setLoading(true);
    const res = await fetch(USERS_API);
    const data = await res.json();

    if (res?.status === 200) {
      setUserData(data);
      setLoading(false);
    } else {
      alert("Something went wrong! Please try again later.");
    }
  };

  const getPostCount = (postData, userId) => {
    let _filteredPostData;
    if (userId !== undefined) {
      _filteredPostData = postData.filter((obj) => obj.userId === userId);
    }

    return _filteredPostData.length;
  };

  useEffect(() => {
    getPostCount(postData, 9);
  }, [postData]);

  useEffect(() => {
    fetchUsersData();
    fetchPostData();
  }, []);
  return (
    <>
      {!loading ? (
        <div className="user-directory-home">
          <p className="user-directory-header">Directory</p>

          <div>
            {userData.map((user, i) => {
              return (
                <div
                  key={i}
                  className="user-directory-card"
                  onClick={() => {
                    navigate("/user-profile/" + user?.id);
                  }}
                >
                  <p>Name: {user?.name}</p>
                  <p>Posts: {getPostCount(postData, user?.id)}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="loader">Loading...</p>
      )}
    </>
  );
};

export default UserDirectory;
