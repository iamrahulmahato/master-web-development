import React from 'react';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "f4728cc8-6af2-443b-bbab-1d84209a7c0b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Form submitted successfully!");
        event.target.reset();
      } else {
        toast.error("Error: Unable to submit the form. Please try again.");
        console.log("Error", data);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Submission Error:", error);
    }
  };

  return (
    <div className="contact">
      <Helmet>
        <title>Contact | Toshan Bakery</title>
      </Helmet>
      <div className="landing_page">
        <div className="responsive-container-block big-container">
          <img
            className="bg-img"
            id="iq5bf"
            src={
              'https://img.freepik.com/free-photo/sweet-treats-ornate-table-celebration-party-generated-by-ai_188544-15706.jpg?t=st=1723099321~exp=1723102921~hmac=8c156b8181d2c89650feb50eb7a6e9f33963e1348f77917bc447866c3c0095b5&w=1060'
            }
            alt="clot"
          />
          <div className="responsive-container-block container">
            <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12 left-one">
              <div className="content-box">
                <p className="text-blk section-head">Get In Touch</p>
                <p className="text-blk section-subhead">
                  Are you ready to take a taste of your favorite delicious foodie?
                </p>
              </div>
            </div>
            <div
              className="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6 right-one"
              id="i1zj"
            >
              <form className="form-box" onSubmit={onSubmit}>
                <div className="container-block form-wrapper">
                  <p className="text-blk contactus-head">
                   Want to Connect
                  </p>
                  <p className="text-blk contactus-subhead">
                    We will get back to you in 24 hours
                  </p>
                  <div className="responsive-container-block">
                    <div
                      className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                      id="i10mt-7"
                    >
                      <input
                        className="input"
                        id="ijowk-7"
                        name="firstName"
                        placeholder="First Name"
                     required />
                    </div>
                    <div
                      className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                      id="i1ro7"
                    >
                      <input
                        className="input"
                        id="indfi-5"
                        name="lastName"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                    <div
                      className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-6 wk-ipadp-6 emial"
                      id="ityct"
                    >
                      <input
                        className="input"
                        id="ipmgh-7"
                        name="email"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                      <input
                        className="input"
                        id="imgis-6"
                        name="number"
                        placeholder="Phone Number"
                        required
                      />
                    </div>
                    <div
                      className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                      id="i634i-7"
                    >
                      <textarea
                        aria-placeholder="Type message here"
                        className="textinput"
                        id="i5vyy-7"
                        placeholder="Type message here"
                        name="message"
                      ></textarea>
                    </div>
                  </div>
                  <button className="submit-btn" type="submit">
                    Get Connect
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
