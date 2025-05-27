"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import "../../public/assets/css/theme/main.css";
import SmallForm from "@/components/SmallForm/SmallForm";
import { MdOutlineRateReview } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

import { CiHome } from "react-icons/ci";
import { BsCreditCard2Back } from "react-icons/bs";

import "./review.css";
import Header2 from "@/components/headers/Header2";
import Footer2 from "@/components/footers/Footer2";
import { ResponseContext } from "../login/ResponseContext";

export default function ReviewOrder() {
  const {
    cart,
    formDataCheckout,
    setFormDataCheckout,
    currency,
    setting,
    discountAmount,
    response_Context,
  } = useContext(ResponseContext);
  // console.log(formDataCheckout.address, "data checked....")
  // const [show, setShow] = useState(false);
  const router = useRouter();

  // const togglePopup = () => {
  //   setShow(!show);
  // };
  // useEffect(() => {
  //   if (show) {
  //     document.body.style.backgroundColor = "#C5C5C5";
  //   } else {
  //     document.body.style.backgroundColor = "";
  //   }

  //   return () => {
  //     document.body.style.backgroundColor = "";
  //   };
  // }, [show]);

  // const handlePopup = () => {
  //   if (show) {
  //     setShow(false);
  //   }
  // };

  // const { setting, discountAmount, response_Context } =
  //   useContext(ResponseContext);
  const user_id = response_Context?.user?.id;

  const [loading, setLoading] = useState(false);

  const getTotalAmount = () => {
    return (
      cart
        ?.reduce((total, item) => total + item.current_price * item.quantity, 0)
        .toFixed(2) || "0.00"
    );
  };

  const subtotal = parseFloat(getTotalAmount());
  const deliveryFee = Number(setting?.shipping_cost || 0);
  const grandTotal = subtotal - discountAmount + subtotal * 0.22 + deliveryFee;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const {
  //       full_name,
  //       email,
  //       password,
  //       billing_street,
  //       billing_city,
  //       billing_country,
  //       billing_phone,
  //       billing_postal_code,
  //       shipping_street,
  //       shipping_city,
  //       shipping_country,
  //       shipping_phone,
  //       shipping_postal_code,
  //       customer_type,
  //       tax_code,
  //       company_name,
  //       vat_number,
  //       same_as,
  //     } = formDataCheckout.address;

  //     const transformedItems = formDataCheckout.items.map((item) => {
  //       const {
  //         id,
  //         title,
  //         current_price,
  //         previous_price,
  //         quantity,
  //         category,
  //         category_name,
  //         color,
  //         size,
  //         rating,
  //         thumbnail,
  //         created_at,
  //         updated_at,
  //       } = item;

  //       const finalColor = Array.isArray(color) ? color.join(", ") : color;
  //       const finalSize = Array.isArray(size) ? size.join(", ") : size;
  //       const finalCategoryName = category_name || category || "";

  //       return {
  //         id,
  //         title,
  //         current_price,
  //         previous_price,
  //         quantity,
  //         color: finalColor,
  //         size: finalSize,
  //         rating,
  //         thumbnail,
  //         created_at,
  //         updated_at,
  //         category_name: finalCategoryName,
  //       };
  //     });

  //     const totalQuantity = transformedItems.reduce(
  //       (sum, item) => sum + item.quantity,
  //       0
  //     );
  //     console.log("Total Quantity:", totalQuantity);

  //     const item_o = {
  //       full_name,
  //       email,
  //       password,
  //       billing_street,
  //       billing_city,
  //       billing_country,
  //       billing_phone,
  //       billing_postal_code,
  //       shipping_street,
  //       shipping_city,
  //       shipping_country,
  //       shipping_phone,
  //       shipping_postal_code,
  //       customer_type,
  //       tax_code,
  //       company_name,
  //       vat_number,
  //       same_as,
  //       items: transformedItems,
  //       discount: discountAmount,
  //       grand_total: grandTotal,
  //       subtotal,
  //       total_quantity: totalQuantity,
  //       tax: subtotal * 0.22,
  //       user_id,
  //     };

  //     // console.log(item_o, "chk datatatata ");

  //     const response = await fetch(
  //       "https://foundation.alphalive.pro/api/front/checkout",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           full_name,
  //           email,
  //           password,
  //           billing_street,
  //           billing_city,
  //           billing_country,
  //           billing_phone,
  //           billing_postal_code,
  //           shipping_street,
  //           shipping_city,
  //           shipping_country,
  //           shipping_phone,
  //           shipping_postal_code,
  //           customer_type,
  //           tax_code,
  //           company_name,
  //           vat_number,
  //           same_as,
  //           items: transformedItems,
  //           discount: discountAmount,
  //           grand_total: grandTotal,
  //           subtotal,
  //           total_quantity: totalQuantity,
  //           tax: subtotal * 0.22,
  //           user_id,
  //         }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (response.ok && data?.data) {
  //       console.log("After the data fetched");
  //       console.log(data, "checouttt,,t,t,t,t");
  //       router.push(data.data);
  //     } else {
  //       console.log("Error while the data fetched");
  //       toast.error(data?.error?.message || "error");
  //     }
  //   } catch (err) {
  //     console.log("Something went wrong during checkout.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Synchronize formDataCheckout.items with the current cart
    setFormDataCheckout((prev) => ({
      ...prev,
      items: cart,
    }));

    try {
      const {
        full_name,
        email,
        password,
        billing_street,
        billing_city,
        billing_country,
        billing_phone,
        billing_postal_code,
        shipping_street,
        shipping_city,
        shipping_country,
        shipping_phone,
        shipping_postal_code,
        customer_type,
        tax_code,
        company_name,
        vat_number,
        same_as,
      } = formDataCheckout.address;

      // Use the updated formDataCheckout.items
      const transformedItems = cart.map((item) => {
        const {
          id,
          title,
          current_price,
          previous_price,
          quantity,
          category,
          category_name,
          color,
          size,
          rating,
          thumbnail,
          created_at,
          updated_at,
        } = item;

        const finalColor = Array.isArray(color) ? color.join(", ") : color;
        const finalSize = Array.isArray(size) ? size.join(", ") : size;
        const finalCategoryName = category_name || category || "";

        return {
          id,
          title,
          current_price,
          previous_price,
          quantity: Number(quantity), // Ensure quantity is a number
          color: finalColor,
          size: finalSize,
          rating,
          thumbnail,
          created_at,
          updated_at,
          category_name: finalCategoryName,
        };
      });

      const totalQuantity = transformedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      console.log("Total Quantity:", totalQuantity);

      const item_o = {
        full_name,
        email,
        password,
        billing_street,
        billing_city,
        billing_country,
        billing_phone,
        billing_postal_code,
        shipping_street,
        shipping_city,
        shipping_country,
        shipping_phone,
        shipping_postal_code,
        customer_type,
        tax_code,
        company_name,
        vat_number,
        same_as,
        items: transformedItems,
        discount: discountAmount,
        grand_total: grandTotal,
        subtotal,
        total_quantity: totalQuantity,
        tax: subtotal * 0.22,
        user_id,
      };

      const response = await fetch(
        "https://foundation.alphalive.pro/api/front/checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item_o),
        }
      );

      const data = await response.json();

      if (response.ok && data?.data) {
        console.log("After the data fetched");
        console.log(data, "checouttt,,t,t,t,t");
        router.push(data.data);
      } else {
        console.log("Error while the data fetched");
        toast.error(data?.error?.message || "error");
      }
    } catch (err) {
      console.log("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = () => {
    setFormDataCheckout((prev) => ({
      ...prev,
      items: cart,
    }));
    router.push("/payment-method");
  };

  const handleBack = () => {
    setFormDataCheckout((prev) => ({
      ...prev,
      items: cart,
    }));
    router.back();
  };

  return (
    <div>
      <section className="page_address mb-3 ">
        <div className="heading_div">
          <Header2 />
        </div>
        <div className="container mar_top">
          <div className="row mt-3">
            <h1>Review Your Order</h1>
            <p onClick={handleBack} style={{ cursor: "pointer" }}>
              <span>&lt;</span> Back
            </p>
            <div className="col-lg-8">
              <div className="icons_parent_div mb-3">
                <div className="icons_div mt-3 mb-5">
                  <div className="icon active">
                    <CiHome className="icon_size_shiping " />
                  </div>
                  <div className="icon active">
                    {/* <MdOutlineRateReview className="icon_size_shiping" /> */}
                    <BsCreditCard2Back className="icon_size_shiping " />
                  </div>
                  {/* <div className="icon">
                    <BsCreditCard2Back className="icon_size_shiping " />
                  </div> */}
                </div>
                <hr />
              </div>
              {/* <div className="item_products pb-2 mt-3">
                <div className="img_div_flex d-flex gap-3">
                  <img
                    src="/assets/images/products/review.png"
                    height={71}
                    width={69}
                    alt="slected product image"
                  />
                  <div className="item_details">
                    <p id="item_name">Girls Pink Moana Printed Dress</p>
                    <p id="item_price">$80.00</p>
                    <p id="item_size">Size: S</p>
                  </div>
                </div>
              </div> */}
              {cart.map((item) => (
                <div className="pop_up_parent_div d-flex p-2" key={item.id}>
                  <div className="img_div">
                    <img
                      height={90}
                      width={90}
                      src={
                        item?.thumbnail ||
                        "/assets/images/products/checkout_pic.png"
                      }
                      alt="Product"
                    />
                  </div>
                  <div className="content_div" style={{ width: "65%" }}>
                    <p className="prod_title">{item?.title}</p>
                    <p className="prod_title p-0 m-0">
                      Quantity: {item?.quantity || "N/A"}
                    </p>
                    <p className="prod_title p-0 m-0">
                      Price: {currency?.sign}
                      {Number(item?.current_price).toFixed(2)}
                    </p>
                    <div className="delete_div">
                      <div>
                        {item?.size && item?.size.length > 0 && (
                          <p className="sizes">
                            Size:{" "}
                            {Array.isArray(item.size)
                              ? item.size[0]
                              : item.size}
                          </p>
                        )}

                        {item?.color && item?.color.length > 0 && (
                          <p className="sizes">
                            Color:{" "}
                            {Array.isArray(item.color)
                              ? item.color[0]
                              : item.color}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="address_section mt-5">
                <h4>Shipping Address</h4>
                <div className="name_parent_div pb-2 mb-3">
                  <div className="name_edit ">
                    <h5>{formDataCheckout?.address?.full_name}</h5>
                    {/* <FaRegEdit /> */}
                  </div>
                  <p id="home_add">
                    {formDataCheckout?.address?.shipping_street}
                  </p>
                  <p>
                    {formDataCheckout?.address?.shipping_city},{" "}
                    {formDataCheckout?.address?.shipping_country}
                  </p>
                </div>
                {/* <div className="name_parent_div pb-2">
                  <div className="name_edit ">
                    <h5>Payment Method</h5>
                    <FaRegEdit />
                  </div>
                  <p id="home_add">Debit Card (************)</p>
                </div> */}
              </div>
              {/* <button
                type="button"
                onClick={handleNavigation}
                className="btn w-100 mt-3 mb-3"
              >
                Pay Now
              </button> */}

              <form onSubmit={handleSubmit} className="pb-2">
                <button type="submit" className="btn mt-4 " disabled={loading}>
                  {loading ? "Pay Now..." : "Pay Now"}
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
    </div>
  );
}
