// "use client";
// import React, { useState, useContext, useEffect } from "react";
// import "./personal-info.css";
// import MyProfile from "../../components/MyProfile/profile";
// import "../../public/assets/css/theme/main.css";
// import { FaRegEdit } from "react-icons/fa";
// import Footer2 from "@/components/footers/Footer2";
// import Header2 from "@/components/headers/Header2";
// import { ResponseContext } from "../login/ResponseContext";
// import useAuth from "../login/useAuth";
// import { useRouter } from "next/navigation";

// export default function Page() {
//   const { response_Context, setResponse_Context } = useContext(ResponseContext);
//   // const [loading2, setLoading2] = useState(true);

//   const { email, full_name, address, propic } = response_Context?.user || {};
//   const [loadingUserData, setLoadingUserData] = useState(true);

//   // console.log("Responseeee Context ", response_Context);
//   console.log("Responseeee Context user", email, full_name, address, propic);

//   const { updateProfile, loading } = useAuth();
//   const router = useRouter();

//   const [data, setData] = useState();
//   // console.log(data?.user, "order wala")
//   // var userId = response_Context?.user_id || "No ID available";
//   // var userId = localStorage.getItem("userId") || "No ID available";
//   const [userId, setUserId] = useState(null);
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const id = localStorage.getItem("userId");
//       setUserId(id || "No ID available");
//     }
//   }, []);
//   // console.log(userId, "id aa prof")

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const result = await fetchDataOrder(userId); // Wait for the API response
//   //     setData(result.data); // Update state with fetched data
//   //   };

//   //   fetchData();
//   // }, [userId]);

//   useEffect(() => {
//     if (response_Context && response_Context.user) {
//       setLoadingUserData(false);
//     }
//   }, [response_Context]);

//   // Initialize state with user data from context
//   const [formData, setFormData] = useState({
//     first_name: data?.user?.first_name || "",
//     last_name: data?.user?.last_name || "",
//     // phone: data?.user?.phone || "",
//     email: email || "",
//     address: address || "",
//     photo: propic,
//     user_id: userId,
//   });

//   useEffect(() => {
//     if (!loadingUserData) {
//       setFormData({
//         first_name: data?.user?.first_name || "",
//         last_name: data?.user?.last_name || "",
//         email: email || "",
//         address: address || "",
//         photo: propic || "",
//         user_id: userId,
//       });
//     }
//   }, [loadingUserData, data, email, address, propic, userId]);

//   // console.log(formData.first_name, "formdata")

//   const [previewphoto, setPreviewphoto] = useState(
//     propic || "/assets/images/common/persona_img.png"
//   );

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle photo selection
//   const handlephotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, photo: file });

//       // Preview the selected photo
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewphoto(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Ensure user_id is available
//     // const userId = response_Context?.user_id;// Adjust this if user_id is stored differently
//     if (!userId) {
//       toast.error("User ID is missing");
//       return;
//     }

//     // Create FormData
//     const formDataToSend = new FormData();
//     formDataToSend.append("first_name", String(formData.first_name || ""));
//     formDataToSend.append("last_name", String(formData.last_name || ""));
//     formDataToSend.append("email", String(formData.email || ""));
//     formDataToSend.append("address", String(formData.address || ""));
//     formDataToSend.append("user_id", String(userId)); // Convert to string

//     // Append photo only if user selected a new one
//     if (formData.photo instanceof File) {
//       formDataToSend.append("photo", formData.photo);
//     }

//     // Debugging: Log FormData contents
//     for (let pair of formDataToSend.entries()) {
//       console.log(pair[0], pair[1]);
//     }

//     // Call updateProfile API function
//     const updatedUser = await updateProfile(formDataToSend);

//     // console.log(updatedUser, "updated profile data.");

//     if (updatedUser) {
//       // Update context with new user data
//       setResponse_Context((prev) => ({
//         ...prev,
//         user: { ...prev.user, ...updatedUser },
//       }));
//     }
//   };

//   useEffect(() => {
//     if (!localStorage.getItem("token")) {
//       router.push("/login");
//     }
//   }, []);

//   //handle image loadingg
//   useEffect(() => {
//     if (propic) {
//       setPreviewphoto(propic);
//     }
//   }, [propic]);

//   if (loadingUserData) {
//     return <p>Loading user data...</p>;
//   }

//   return (
//     <section className="persoal_info">
//       <div className="heading_div">
//         <Header2 />
//       </div>
//       <div className="container mar_top">
//         <div className="row">
//           <div className="col-lg-4 mb-3 my_profile">
//             <div className="position_fixed">
//               <MyProfile />
//             </div>
//           </div>
//           <div className="col-lg-8 mt-5">
//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="first_flex_div mt-5">
//                   <div className="img_div">
//                     <img src={previewphoto} alt="Profile Preview" />
//                     <label className="edit_icon">
//                       <FaRegEdit />
//                       <input
//                         type="file"
//                         accept="photo/*"
//                         onChange={handlephotoChange}
//                         style={{ display: "none" }}
//                       />
//                     </label>
//                   </div>
//                   {/* <div className="edit_btn">
//                 <FaRegEdit />
//                 <p>Edit Profile</p>
//               </div> */}
//                 </div>

//                 {/* Form for updating user profile */}
//                 <form
//                   className="mt-3 perosnal_info_form"
//                   onSubmit={handleSubmit}
//                 >
//                   <div className="row margin_bottom">
//                     <div className="col-md-6">
//                       <label htmlFor="firstName">First Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="first_name"
//                         placeholder="First name"
//                         value={formData.first_name}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label htmlFor="lastName">Last Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="last_name"
//                         placeholder="Last name"
//                         value={formData.last_name}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="row margin_bottom">
//                     <div className="col-md-6">
//                       <label htmlFor="emailAddress">Email Address</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="email"
//                         placeholder="Email Address"
//                         value={formData.email}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label htmlFor="address">Address</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="address"
//                         placeholder="Address"
//                         value={formData.address}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                   <button className="submit_btn mb-3" type="submit">
//                     {loading ? (
//                       <>
//                         <span
//                           className="spinner-border spinner-border-sm me-2"
//                           role="status"
//                           aria-hidden="true"
//                         ></span>
//                         Update Profile...
//                       </>
//                     ) : (
//                       "Update Profile"
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer2 />
//     </section>
//   );
// }

"use client";
import React, { useState, useContext, useEffect } from "react";
import "./personal-info.css";
import MyProfile from "../../components/MyProfile/profile";
import "../../public/assets/css/theme/main.css";
import { FaRegEdit } from "react-icons/fa";
import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import { ResponseContext } from "../login/ResponseContext";
import useAuth from "../login/useAuth";
import { useRouter } from "next/navigation";

export default function Page() {
  const { response_Context, setResponse_Context } = useContext(ResponseContext);
  const [userId, setUserId] = useState(null);
  const [previewphoto, setPreviewphoto] = useState(
    "/assets/images/common/persona_img.png"
  );
  const [loadingUserData, setLoadingUserData] = useState(true);
  const router = useRouter();
  const { updateProfile, loading } = useAuth();

  // Extract safe user data from context
  const user = response_Context?.user || {};
  const { email = "", full_name = "", address = "", propic = "" } = user;

  console.log("full name is ::::", full_name);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      setUserId(id || "No ID available");
    }
  }, []);

  useEffect(() => {
    if (response_Context?.user) {
      setLoadingUserData(false);
    }
  }, [response_Context]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    photo: "",
    user_id: null,
  });

  useEffect(() => {
    if (!loadingUserData) {
      const [firstName, ...rest] = full_name.split(" ");
      const lastName = rest.join(" ");
      setFormData({
        first_name: firstName,
        last_name: lastName,
        email: email,
        address: address,
        photo: propic,
        user_id: userId,
      });
      setPreviewphoto(propic || "/assets/images/common/persona_img.png");
    }
  }, [loadingUserData, email, address, propic, userId]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlephotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewphoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("User ID is missing");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name || "");
    formDataToSend.append("last_name", formData.last_name || "");
    formDataToSend.append("email", formData.email || "");
    formDataToSend.append("address", formData.address || "");
    formDataToSend.append("user_id", userId);

    if (formData.photo instanceof File) {
      formDataToSend.append("photo", formData.photo);
    }

    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    const updatedUser = await updateProfile(formDataToSend);

    if (updatedUser) {
      setResponse_Context((prev) => ({
        ...prev,
        user: { ...prev.user, ...updatedUser },
      }));
    }
  };

  if (loadingUserData) {
    return <p>Loading user data...</p>;
  }

  return (
    <section className="persoal_info">
      <div className="heading_div">
        <Header2 />
      </div>
      <div className="container mar_top">
        <div className="row">
          <div className="col-lg-4 mb-3 my_profile">
            <div className="position_fixed">
              <MyProfile />
            </div>
          </div>
          <div className="col-lg-8 mt-5">
            <div className="row">
              <div className="col-lg-12">
                <div className="first_flex_div mt-5">
                  <div className="img_div">
                    <img src={previewphoto} alt="Profile Preview" />
                    <label className="edit_icon">
                      <FaRegEdit />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlephotoChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </div>

                <form
                  className="mt-3 perosnal_info_form"
                  onSubmit={handleSubmit}
                >
                  <div className="row margin_bottom">
                    <div className="col-md-6">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="first_name"
                        placeholder="First name"
                        value={formData.first_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="last_name"
                        placeholder="Last name"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row margin_bottom">
                    <div className="col-md-6">
                      <label htmlFor="emailAddress">Email Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button className="submit_btn mb-3" type="submit">
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Update Profile...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </section>
  );
}
