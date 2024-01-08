import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COUNTRY_API, POST_API, USERS_API } from "../../constants/urls";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState([]);
  const [filteredPostData, setFilteredPostData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [country, setCountry] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (postData) => {
    setVisible(true);
    setModalContent(postData);
  };

  const fetchCountryData = async () => {
    // setLoading(true);
    const res = await fetch(COUNTRY_API);
    const data = await res.json();
    if (res?.status === 200) {
      setCountryData(data);
      // setLoading(false);
    } else {
      alert("Something went wrong! Please try again later.");
    }
  };

  const getUserData = (id, userData) => {
    const findObjectById = (array, id) => {
      return array.find((obj) => obj.id == id);
    };
    let filteredUserData;
    if (id) {
      filteredUserData = findObjectById(userData, id);
    }
    return filteredUserData;
  };

  const getPostCount = (postData, userId) => {
    let _filteredPostData;
    if (userId !== undefined) {
      _filteredPostData = postData.filter((obj) => obj.userId == userId);
      setFilteredPostData(_filteredPostData);
    }

    // return _filteredPostData;
  };

  useEffect(() => {
    if (id) {
      getUserData(id, userData);
      getPostCount(postData, id);
    }
  }, [id, userData, postData]);

  //   const fetchCountryTime = async (countryName) => {
  //     setLoading(true);
  //     const res = await fetch(COUNTRY_API / `${countryName}`);
  //     const data = await res.json();
  //     if (res?.status === 200) {
  //       //   setCountryData(data);
  //       setLoading(false);
  //     } else {
  //       alert("Something went wrong! Please try again later.");
  //     }
  //   };

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
    // setLoading(true);
    const res = await fetch(USERS_API);
    const data = await res.json();

    if (res?.status === 200) {
      setUserData(data);
      // setLoading(false);
    } else {
      alert("Something went wrong! Please try again later.");
    }
  };

  useEffect(() => {
    fetchUsersData();
    fetchPostData();
    fetchCountryData();
  }, []);

  useEffect(() => {
    const fetchCountryTime = async (countryName) => {
      // setLoading(true);
      //   const res = await fetch(`${COUNTRY_API}``${countryName}`);
      const res = await fetch(
        `http://worldtimeapi.org/api/timezone/${countryName}`
      );
      const data = await res.json();
      if (res?.status === 200) {
        //   setCountryData(data);
        // setLoading(false);
      } else {
        alert("Something went wrong! Please try again later.");
      }
    };

    fetchCountryTime(country);
  }, [country]);

  const handleCountryChange = (e) => {
    setCountry(e.target.value); // Update the selected country when the dropdown changes
  };

  return (
    <>
      {!loading ? (
        <div className="profile-container">
          <button onClick={() => navigate(-1)} className="back-button">
            Back
          </button>

          {/* <div>
          <select 
            id="countryDropdown"
            value={country}
            onChange={handleCountryChange}
          >
            <option value="">Select a country</option>
            {countryData.map((coun, index) => (
              <option key={index} value={coun}>
                {coun}
              </option>
            ))}
          </select>
        </div> */}

          <div className="user-container">
            <p className="profile-page-header">Profile Page</p>
            <div className="user-info">
              <div className="user-info-1">
                <p>{getUserData(id, userData)?.name}</p>
                <p>
                  {getUserData(id, userData)?.username} |{" "}
                  {getUserData(id, userData)?.company?.catchPhrase}
                </p>
              </div>
              <div className="user-info-2">
                <p>
                  {getUserData(id, userData)?.address?.suite},{" "}
                  {getUserData(id, userData)?.address?.street},{" "}
                  {getUserData(id, userData)?.address?.city},{" "}
                  {getUserData(id, userData)?.address?.zipcode}
                </p>
                <p>
                  {getUserData(id, userData)?.email} |{" "}
                  {getUserData(id, userData)?.phone}
                </p>
              </div>
            </div>
          </div>
          <div className="post-card">
            {filteredPostData.map((post, i) => {
              return (
                <div
                  key={i}
                  className="post-card-container"
                  onClick={() => openModal(post)}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    {post?.title}
                  </p>
                  <p>{post?.body}</p>
                </div>
              );
            })}
          </div>

          {visible ? (
            <div className="modal-container">
              <div className="modal" onClick={() => setVisible(false)}></div>
              <div className="modal-1">
                <div className="modal-2">
                  <div
                    style={{
                      marginTop: "5px",
                    }}
                  >
                    <div className="post-content">
                      <p
                        style={{
                          fontWeight: "bold",
                          marginBottom: "5px",
                        }}
                      >
                        {modalContent?.title}
                      </p>
                      <p>{modalContent?.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="loader">Loading...</p>
      )}
    </>
  );
};

export default UserProfile;
