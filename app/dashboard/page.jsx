"use client"
import Footer2 from "@/components/footers/Footer2";
import Header2 from "@/components/headers/Header2";
import React from "react";
import MyProfile from "../../components/MyProfile/profile";
import "./dashboard.css"
import { FaFileAlt } from "react-icons/fa";
import { IoLocationOutline, IoPersonOutline } from "react-icons/io5";
import { CiHeart, CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();
    
      const handlePersonalNavigation = () => {
        router.push("/personal-info");
      };
      const handleWishlist = () => {
        router.push("/my-wishlist");
      };
      const handleAddress = () => {
        router.push("/my-address");
      };
    
      const handleSetting = () => {
        router.push("/settings");
      };
    
      const handleOrders = () => {
        router.push("/orders");
      };

    return (
        <section className="persoal_info">
            <div className="heading_div">
                <Header2 />
            </div>
            <div className="container mar_top mb-5">
                <div className="row">
                    <div className="col-lg-4 mb-3 my_profile">
                        <div className="position_fixed">
                            <MyProfile />
                        </div>
                    </div>
                    <div className="col-lg-8 mt-5">
                        <p>Hello </p>
                        <p>From your account dashboard you can view your order, manage your billing and shipping addresses, and edit your password and account details.</p>
                        <div className="first_flex_div mt-5">
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="card card_dash" onClick={handleOrders}>
                                        <FaFileAlt style={{ color: "#767676", fontSize: "32px" }} />
                                        <p>Orders</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card card_dash" onClick={handlePersonalNavigation}>
                                        <IoPersonOutline style={{ color: "#767676", fontSize: "32px" }} />
                                        <p>Personal Information</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card card_dash" onClick={handleWishlist}>
                                        <CiHeart style={{ color: "#767676", fontSize: "32px" }} />
                                        <p>Wishlist</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card card_dash" onClick={handleAddress}>
                                        <IoLocationOutline style={{ color: "#767676", fontSize: "32px" }} />
                                        <p>Addresses</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card card_dash" onClick={handleSetting}>
                                        <CiSettings style={{ color: "#767676", fontSize: "32px" }} />
                                        <p>Settings</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card card_dash">
                                        <IoIosLogOut style={{ color: "#767676", fontSize: "32px" }} />
                                        <p>Logout</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer2 />
        </section>
    );
}
