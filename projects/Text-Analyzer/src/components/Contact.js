import React from 'react'
import './ContactForm.css';

export default function Contact() {
  return (
 
   
              <div className="container mt-5">
              <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h3>Contact Us</h3>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="form-group mb-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="subject">Subject</label>
                        <input type="text" className="form-control" id="subject" placeholder="Enter subject" />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="message">Message</label>
                        <textarea className="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          
        );
      };


