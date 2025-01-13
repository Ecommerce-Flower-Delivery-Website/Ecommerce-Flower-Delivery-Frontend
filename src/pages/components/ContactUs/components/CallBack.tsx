import React, { useState, FormEvent } from "react";
import axios from "axios";

interface ApiResponse {
  message?: string;
}

const CallBack: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage("");

    try {

      const token = localStorage.getItem("token");


      if (!token) {
        setResponseMessage("Authentication token not found. Please log in.");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post<ApiResponse>(
        "http://localhost:3000/api/v1/contact",
        { phone: phoneNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setResponseMessage(response.data.message || "Your request has been submitted successfully!");
      } else {
        setResponseMessage("Failed to submit your request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setResponseMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="aj-callback px-[80px] pt-[80px] pb-[99px] border border-[#121212] border-b-0">
      <h2 className="text-[50px] leading-[60px] mb-6 font-bold">To Contact Us</h2>
      <p className="mb-4 leading-[25.2px] text-lg">We will call you back</p>
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <input
          type="tel"
          placeholder="+380 XX XXX XX XX"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)} // تحديث قيمة الحقل
          className="border border-[#D2D2D7] px-7 py-2 w-[272px] h-[56px]"
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-7 py-2 w-[272px] h-[56px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "BOOK A CALL"}
        </button>
      </form>
      {responseMessage && (
        <p className="mt-4 text-lg text-[#121212]">{responseMessage}</p>
      )}
    </div>
  );
};

export default CallBack;