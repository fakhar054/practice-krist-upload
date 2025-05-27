// "use client";
// import React, { useEffect, useState, useContext } from "react";
// import { useRouter } from "next/navigation";
// import "./shipping_address.css";
// import "../../../public/assets/css/theme/main.css";
// import Header2 from "@/components/headers/Header2";
// import Footer2 from "@/components/footers/Footer2";
// import { MdOutlineRateReview } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
// import { RiDeleteBinFill } from "react-icons/ri";
// import { BsCreditCard2Back } from "react-icons/bs";
// import { CiHome } from "react-icons/ci";
// import { ResponseContext } from "@/app/login/ResponseContext";
// import SmallForm from "@/components/SmallForm/SmallForm";
// import toast, { Toaster } from "react-hot-toast";

// export default function ShippingAddress() {
//   const { response_Context, setFormDataCheckout, addresses, fetchAddresses } = useContext(ResponseContext);
//   console.log(addresses, "dlldldldldldlldld")
//   const router = useRouter();
//   const userId = response_Context?.user?.id || "No ID available";

//   const firstAddress = addresses && addresses.length > 0 ? addresses[0] : {};
//   useEffect(() => {
//     if (addresses && addresses.length > 0) {
//       const firstAddress = addresses[0];
//       setFormData((prev) => ({
//         ...prev,
//         billing_street: firstAddress.street_address || "",
//         billing_city: firstAddress.city || "",
//         billing_postal_code: firstAddress.zipcode || "",
//         billing_country: firstAddress.country || "",
//         billing_phone: firstAddress.phone || "",
//         shipping_street: firstAddress.street_address || "",
//         shipping_city: firstAddress.city || "",
//         shipping_postal_code: firstAddress.zipcode || "",
//         shipping_country: firstAddress.country || "",
//         shipping_phone: firstAddress.phone || "",
//       }));
//     }
//   }, [addresses]);

//   useEffect(() => {
//     if (userId) {
//       fetchAddresses(userId);
//     }
//   }, [userId]);

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [same_as, setSame_as] = useState(false);

//   const [formData, setFormData] = useState({
//     full_name: response_Context?.user?.full_name || "",
//     email: response_Context?.user?.email || "",
//     password: "",
//     customer_type: "",
//     tax_code: "",
//     company_name: "",
//     vat_number: "",
//     same_as,
//     billing_street: firstAddress?.street_address || "",
//     billing_city: firstAddress?.city || "",
//     billing_postal_code: firstAddress?.zipcode || "",
//     billing_country: firstAddress?.country || "",
//     billing_phone: firstAddress?.phone || "",
//     shipping_street: firstAddress?.street_address || "",
//     shipping_city: firstAddress?.city || "",
//     shipping_postal_code: firstAddress?.zipcode || "",
//     shipping_country: firstAddress?.country || "",
//     shipping_phone: firstAddress?.phone || "",
//   });

//   // console.log(formData, "form data...,,a,,a,a,a,a,");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) setIsLoggedIn(true);
//   }, []);

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   const handleCheckboxChange = (e) => {
//     const isChecked = e.target.checked;
//     setSame_as(isChecked);
//     setFormData((prev) => ({
//       ...prev,
//       same_as: isChecked,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Define required fields
//     const requiredFields = [
//       'full_name',
//       'email',
//       'customer_type',
//       'billing_street',
//       'billing_city',
//       'billing_postal_code',
//       'billing_country',
//       'billing_phone',
//     ];

//     // Add conditional required fields based on customer_type
//     if (formData.customer_type === '0') {
//       requiredFields.push('tax_code');
//     } else if (formData.customer_type === '1') {
//       requiredFields.push('company_name', 'vat_number');
//     }

//     // Add shipping address fields if same_as is false
//     if (!same_as) {
//       requiredFields.push(
//         'shipping_street',
//         'shipping_city',
//         'shipping_postal_code',
//         'shipping_country',
//         'shipping_phone'
//       );
//     }

//     // Check for empty required fields
//     const emptyFields = requiredFields.filter(
//       (field) => !formData[field] || formData[field].trim() === ''
//     );

//     if (emptyFields.length > 0) {
//       toast.error('Please enter all required fields.');
//       return;
//     }

//     const finalData = {
//       ...formData,
//       same_as,
//       shipping_street: same_as ? formData.billing_street : formData.shipping_street,
//       shipping_city: same_as ? formData.billing_city : formData.shipping_city,
//       shipping_postal_code: same_as ? formData.billing_postal_code : formData.shipping_postal_code,
//       shipping_country: same_as ? formData.billing_country : formData.shipping_country,
//       shipping_phone: same_as ? formData.billing_phone : formData.shipping_phone,
//     };

//     setFormDataCheckout((prev) => ({
//       ...prev,
//       address: finalData,
//     }));

//     router.push('/review-order');
//   };

//   return (
//     <>
//       <Toaster
//         position="top-center"
//         reverseOrder={false}
//       />
//       <section className="page_address">
//         <div className="heading_div_2">
//           <Header2 />
//         </div>
//         <div className="container mb-3" style={{ paddingTop: "120px" }}>
//           <div className="row">
//             <h1>Shipping Address</h1>
//             <div className="col-lg-8">
//               <div className="icons_parent_div mb-3">
//                 <div className="icons_div mt-3 mb-5">
//                   <div className="icon active">
//                     <CiHome className="icon_size_shiping" />
//                   </div>
//                   <div className="icon">
//                     <MdOutlineRateReview className="icon_size_shiping" />
//                   </div>
//                   <div className="icon">
//                     <BsCreditCard2Back className="icon_size_shiping" />
//                   </div>
//                 </div>
//                 <hr />
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <h6>Personal Information</h6>
//                 <div className="row">
//                   <div className="col-lg-6 mb-3">
//                     <label htmlFor="full_name">Full Name</label>
//                     <input type="text" id="full_name" className="form-control" value={formData.full_name} onChange={handleChange} />
//                   </div>
//                   <div className="col-lg-6 mb-3">
//                     <label htmlFor="email">Email</label>
//                     <input type="email" id="email" className="form-control" value={formData.email} onChange={handleChange} />
//                   </div>
//                   {
//                     !isLoggedIn ? (
//                       <div className="col-lg-6 mb-3">
//                         <label htmlFor="password">Password</label>
//                         <input type="password" id="password" className="form-control" value={formData.password} onChange={handleChange} />
//                       </div>
//                     ) : ("")
//                   }
//                   <div className="col-lg-6 mb-3">
//                     <label htmlFor="customer_type">For Customers</label>
//                     <select id="customer_type" className="form-control" value={formData.customer_type} onChange={handleChange}>
//                       <option value="">Select for customers</option>
//                       <option value="0">Receipt</option>
//                       <option value="1">Invoice</option>
//                     </select>
//                   </div>

//                   {formData.customer_type === "0" && (
//                     <div className="col-lg-12 mb-3">
//                       <label htmlFor="taxCode">Tax Code</label>
//                       <input type="text" id="tax_code" className="form-control" value={formData.tax_code} onChange={handleChange} />
//                     </div>
//                   )}

//                   {formData.customer_type === "1" && (
//                     <>
//                       <div className="col-lg-6 mb-3">
//                         <label htmlFor="companyName">Company Name</label>
//                         <input type="text" id="company_name" className="form-control" value={formData.company_name} onChange={handleChange} />
//                       </div>
//                       <div className="col-lg-6 mb-3">
//                         <label htmlFor="vatNumber">VAT Number</label>
//                         <input type="text" id="vat_number" className="form-control" value={formData.vat_number} onChange={handleChange} />
//                       </div>
//                     </>
//                   )}

//                   <h6>Billing Address</h6>
//                   <div className="col-lg-6 mb-3">
//                     <label htmlFor="billing_street">Street Address</label>
//                     <input type="text" id="billing_street" className="form-control" value={formData.billing_street} onChange={handleChange} />
//                   </div>
//                   <div className="col-lg-6 mb-3">
//                     <label htmlFor="billing_city">City</label>
//                     <input type="text" id="billing_city" className="form-control" value={formData.billing_city} onChange={handleChange} />
//                   </div>
//                   <div className="col-lg-6 mb-3">
//                     <label htmlFor="billing_postal_code">Postal Code</label>
//                     <input type="text" id="billing_postal_code" className="form-control" value={formData.billing_postal_code} onChange={handleChange} />
//                   </div>
//                   <div className="col-lg-6 mb-3">
//                     <label htmlFor="billing_country">Country</label>
//                     <input type="text" id="billing_country" className="form-control" value={formData.billing_country} onChange={handleChange} />
//                   </div>
//                   <div className="col-lg-6 mb-3">
//                     <label htmlFor="billing_phone">Phone Number</label>
//                     <input type="text" id="billing_phone" className="form-control" value={formData.billing_phone} onChange={handleChange} />
//                   </div>

//                   <div className="checkbox_div mb-2">
//                     <input type="checkbox" id="sameAsBilling" checked={same_as} onChange={handleCheckboxChange} />
//                     <label htmlFor="sameAsBilling">Same as billing address</label>
//                   </div>

//                   {!same_as && (
//                     <>
//                       <h6 className="mt-3">Shipping Address</h6>
//                       <div className="col-lg-6 mb-3">
//                         <label htmlFor="shipping_street">Street Address</label>
//                         <input type="text" id="shipping_street" className="form-control" value={formData.shipping_street} onChange={handleChange} />
//                       </div>
//                       <div className="col-lg-6 mb-3">
//                         <label htmlFor="shipping_city">City</label>
//                         <input type="text" id="shipping_city" className="form-control" value={formData.shipping_city} onChange={handleChange} />
//                       </div>
//                       <div className="col-lg-6 mb-3">
//                         <label htmlFor="shipping_postal_code">Postal Code</label>
//                         <input type="text" id="shipping_postal_code" className="form-control" value={formData.shipping_postal_code} onChange={handleChange} />
//                       </div>
//                       <div className="col-lg-6 mb-3">
//                         <label htmlFor="shipping_country">Country</label>
//                         <input type="text" id="shipping_country" className="form-control" value={formData.shipping_country} onChange={handleChange} />
//                       </div>
//                       <div className="col-lg-6 mb-3">
//                         <label htmlFor="shipping_phone">Phone Number</label>
//                         <input type="text" id="shipping_phone" className="form-control" value={formData.shipping_phone} onChange={handleChange} />
//                       </div>
//                     </>
//                   )}

//                   <div className="col-12 mt-3">
//                     <button type="submit" className="btn btn-primary w-100">Continue</button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//             <div className="col-lg-4">
//               <SmallForm />
//             </div>
//           </div>
//         </div>
//         <Footer2 />
//       </section>
//     </>
//   );
// }

"use client";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import "./shipping_address.css";
import "../../../public/assets/css/theme/main.css";
import Header2 from "@/components/headers/Header2";
import Footer2 from "@/components/footers/Footer2";
import { MdOutlineRateReview } from "react-icons/md";
import { BsCreditCard2Back } from "react-icons/bs";
import { CiHome } from "react-icons/ci";
import { ResponseContext } from "@/app/login/ResponseContext";
import toast, { Toaster } from "react-hot-toast";
import SmallForm from "@/components/SmallForm/SmallForm";

export default function ShippingAddress() {
  const { response_Context, setFormDataCheckout, addresses, fetchAddresses } =
    useContext(ResponseContext);
  const router = useRouter();
  // const userId = response_Context?.user?.id || "No ID available";
  // const userId = localStorage.getItem("userId") || "No ID available";
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      setUserId(id || "No ID available");
    }
  }, []);
  // const firstAddress = addresses && addresses.length > 0 ? addresses[0] : {};
  const firstAddress =
    addresses?.find((addres) => addres.isdefault === 1) || {};
  // console.log("Address are :::", firstAddress);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [same_as, setSame_as] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    full_name: firstAddress?.name || "",
    email: response_Context?.user?.email || "",
    password: "",
    customer_type: "",
    tax_code: "",
    company_name: "",
    vat_number: "",
    same_as,
    billing_street: firstAddress?.street_address || "",
    billing_city: firstAddress?.city || "",
    billing_postal_code: firstAddress?.zipcode || "",
    billing_country: firstAddress?.country || "",
    billing_phone: firstAddress?.phone || "",
    shipping_street: firstAddress?.street_address || "",
    shipping_city: firstAddress?.city || "",
    shipping_postal_code: firstAddress?.zipcode || "",
    shipping_country: firstAddress?.country || "",
    shipping_phone: firstAddress?.phone || "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (userId) fetchAddresses(userId);
  }, [userId]);

  // useEffect(() => {
  //   if (addresses && addresses.length > 0) {
  //     const first = addresses[0];
  //     setFormData((prev) => ({
  //       ...prev,
  //       billing_street: first.street_address || "",
  //       billing_city: first.city || "",
  //       billing_postal_code: first.zipcode || "",
  //       billing_country: first.country || "",
  //       billing_phone: first.phone || "",
  //       shipping_street: first.street_address || "",
  //       shipping_city: first.city || "",
  //       shipping_postal_code: first.zipcode || "",
  //       shipping_country: first.country || "",
  //       shipping_phone: first.phone || "",
  //     }));
  //   }
  // }, [addresses]);

  useEffect(() => {
    if (response_Context?.user || addresses?.length > 0) {
      const user = response_Context?.user || {};
      // const first = addresses?.[0] || {};
      const first = addresses?.find((addres) => addres.isdefault === 1) || {};

      setFormData((prev) => ({
        ...prev,
        full_name: first.name || prev.full_name,
        email: user.email || prev.email,
        billing_street: first.street_address || prev.billing_street,
        billing_city: first.city || prev.billing_city,
        billing_postal_code: first.zipcode || prev.billing_postal_code,
        billing_country: first.country || prev.billing_country,
        billing_phone: first.phone || prev.billing_phone,
        shipping_street: same_as
          ? first.street_address || prev.shipping_street
          : prev.shipping_street,
        shipping_city: same_as
          ? first.city || prev.shipping_city
          : prev.shipping_city,
        shipping_postal_code: same_as
          ? first.zipcode || prev.shipping_postal_code
          : prev.shipping_postal_code,
        shipping_country: same_as
          ? first.country || prev.shipping_country
          : prev.shipping_country,
        shipping_phone: same_as
          ? first.phone || prev.shipping_phone
          : prev.shipping_phone,
      }));
    }
  }, [response_Context?.user, addresses, same_as]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFormErrors((prev) => ({ ...prev, [id]: "" })); // clear individual error
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setSame_as(isChecked);
    setFormData((prev) => ({ ...prev, same_as: isChecked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    const requiredFields = [
      "full_name",
      "email",
      "customer_type",
      "billing_street",
      "billing_city",
      "billing_postal_code",
      "billing_country",
      "billing_phone",
    ];

    if (formData.customer_type === "0") {
      requiredFields.push("tax_code");
    } else if (formData.customer_type === "1") {
      requiredFields.push("company_name", "vat_number");
    }

    if (!same_as) {
      requiredFields.push(
        "shipping_street",
        "shipping_city",
        "shipping_postal_code",
        "shipping_country",
        "shipping_phone"
      );
    }

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        errors[field] = "This field is required.";
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error("Please enter all required fields.");
      return;
    }

    const finalData = {
      ...formData,
      same_as,
      shipping_street: same_as
        ? formData.billing_street
        : formData.shipping_street,
      shipping_city: same_as ? formData.billing_city : formData.shipping_city,
      shipping_postal_code: same_as
        ? formData.billing_postal_code
        : formData.shipping_postal_code,
      shipping_country: same_as
        ? formData.billing_country
        : formData.shipping_country,
      shipping_phone: same_as
        ? formData.billing_phone
        : formData.shipping_phone,
    };

    setFormDataCheckout((prev) => ({ ...prev, address: finalData }));
    router.push("/review-order");
  };

  const renderInput = (id, label, type = "text") => (
    <div className="col-lg-6 mb-3">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        className="form-control"
        value={formData[id]}
        onChange={handleChange}
      />
      {formErrors[id] && (
        <small className="text-danger">{formErrors[id]}</small>
      )}
    </div>
  );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="page_address">
        <div className="heading_div_2">
          <Header2 />
        </div>
        <div className="container mb-3" style={{ paddingTop: "120px" }}>
          <div className="row">
            <h1>Shipping Address</h1>
            <div className="col-lg-8">
              <form onSubmit={handleSubmit}>
                <h6>Personal Information</h6>
                <div className="row">
                  {renderInput("full_name", "Full Name")}
                  {renderInput("email", "Email", "email")}
                  {!isLoggedIn &&
                    renderInput("password", "Password", "password")}
                  <div className="col-lg-6 mb-3">
                    <label htmlFor="customer_type">For Customers</label>
                    <select
                      id="customer_type"
                      className="form-control"
                      value={formData.customer_type}
                      onChange={handleChange}
                    >
                      <option value="">Select for customers</option>
                      <option value="0">Receipt</option>
                      <option value="1">Invoice</option>
                    </select>
                    {formErrors.customer_type && (
                      <small className="text-danger">
                        {formErrors.customer_type}
                      </small>
                    )}
                  </div>

                  {formData.customer_type === "0" &&
                    renderInput("tax_code", "Tax Code")}
                  {formData.customer_type === "1" && (
                    <>
                      {renderInput("company_name", "Company Name")}
                      {renderInput("vat_number", "VAT Number")}
                    </>
                  )}

                  <h6>Billing Address</h6>
                  {renderInput("billing_street", "Street Address")}
                  {renderInput("billing_city", "City")}
                  {renderInput("billing_postal_code", "Postal Code")}
                  {renderInput("billing_country", "Country")}
                  {renderInput("billing_phone", "Phone Number")}

                  <div className="checkbox_div mb-2">
                    <input
                      type="checkbox"
                      id="sameAsBilling"
                      checked={same_as}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="sameAsBilling">
                      Same as billing address
                    </label>
                  </div>

                  {!same_as && (
                    <>
                      <h6 className="mt-3">Shipping Address</h6>
                      {renderInput("shipping_street", "Street Address")}
                      {renderInput("shipping_city", "City")}
                      {renderInput("shipping_postal_code", "Postal Code")}
                      {renderInput("shipping_country", "Country")}
                      {renderInput("shipping_phone", "Phone Number")}
                    </>
                  )}
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Continue
                </button>
              </form>
            </div>
            <div className="col-lg-4">
              <SmallForm />
            </div>
          </div>
        </div>
        <Footer2 />
      </section>
    </>
  );
}