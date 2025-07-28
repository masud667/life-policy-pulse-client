import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaHome,
  FaUserFriends,
  FaHeartbeat,
  FaNotesMedical,
  FaFileSignature,
} from "react-icons/fa";
import Header from "../../Components/Header";

const ApplicationFormPage = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const applicationData = {
      ...data,
      userEmail: user?.email,
      status: "pending",
      appliedAt: new Date().toISOString(),
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/applications",
        applicationData
      );
      if (res.data.insertedId) {
        Swal.fire({
          title: "Application Submitted!",
          text: "Your application is pending review.",
          icon: "success",
          confirmButtonColor: "#4f46e5",
          confirmButtonText: "Continue",
          background: "#f9fafb",
        });
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Submission Error",
        text: "Failed to submit application. Please try again later.",
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "#f9fafb",
      });
    }
  };

  // Form sections with icons
  const formSections = [
    {
    title: "Policy Selection",
    icon: <FaNotesMedical className="text-indigo-600" />,
    fields: [
      {
        name: "policyName",
        label: "Policy Name",
        icon: <FaNotesMedical className="text-gray-400" />,
        isSelect: true,
        options: [
          { value: "", label: "Select a Policy" },
          { value: "basic", label: "Basic Life Insurance" },
          { value: "premium", label: "Premium Life Insurance" },
          { value: "family", label: "Family Protection Plan" },
        ],
        required: true,
      },
    ],
  },
    {
      title: "Personal Information",
      icon: <FaUser className="text-blue-600" />,
      fields: [
        {
          name: "fullName",
          label: "Full Name",
          icon: <FaUser className="text-gray-400" />,
          required: true,
        },
        {
          name: "email",
          label: "Email",
          icon: <FaEnvelope className="text-gray-400" />,
          readOnly: true,
        },
        {
          name: "phone",
          label: "Phone Number",
          icon: <FaPhone className="text-gray-400" />,
          required: true,
        },
        {
          name: "nid",
          label: "NID No / Birth Certificate",
          icon: <FaIdCard className="text-gray-400" />,
          required: true,
        },
      ],
    },
    {
      title: "Address Information",
      icon: <FaHome className="text-purple-600" />,
      fields: [
        {
          name: "address",
          label: "Full Address",
          icon: <FaHome className="text-gray-400" />,
          isTextarea: true,
          required: true,
        },
      ],
    },
    {
      title: "Nominee Information",
      icon: <FaUserFriends className="text-green-600" />,
      fields: [
        {
          name: "nomineeName",
          label: "Nominee's Full Name",
          icon: <FaUser className="text-gray-400" />,
          required: true,
        },
        {
          name: "nomineeRelation",
          label: "Relationship to Nominee",
          icon: <FaUserFriends className="text-gray-400" />,
          required: true,
        },
      ],
    },
    {
      title: "Health Disclosure",
      icon: <FaHeartbeat className="text-red-500" />,
      fields: [
        {
          name: "smoker",
          label: "Do you smoke?",
          isSelect: true,
          options: [
            { value: "", label: "Select Option" },
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ],
          required: true,
        },
        {
          name: "illnesses",
          label: "Existing Illnesses",
          isCheckboxGroup: true,
          options: [
            { value: "Diabetes", label: "Diabetes" },
            { value: "Heart Disease", label: "Heart Disease" },
            { value: "Asthma", label: "Asthma" },
            { value: "None", label: "None" },
          ],
        },
        {
          name: "surgery",
          label: "Surgery History (Optional)",
          isTextarea: true,
          placeholder: "Please provide details of any past surgeries...",
        },
      ],
    },
  ];

  return (
    <div>
      <Header></Header>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}>
              Life Insurance Application
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}>
              Complete this form to apply for life insurance coverage. All
              information is kept confidential.
            </motion.p>
          </div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <h2 className="text-xl font-bold">Application Progress</h2>
              <p className="text-blue-100">
                Step 1 of 1 - Complete your application
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
              {formSections.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + sectionIndex * 0.1 }}>
                  <div className="flex items-center mb-6 pb-2 border-b border-gray-200">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {section.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.fields.map((field, fieldIndex) => (
                      <div
                        key={fieldIndex}
                        className={`${
                          field.isTextarea || field.isCheckboxGroup
                            ? "md:col-span-2"
                            : ""
                        }`}>
                        <label className="block text-gray-700 font-medium mb-2">
                          {field.label}{" "}
                          {field.required && (
                            <span className="text-red-500">*</span>
                          )}
                        </label>

                        {field.isSelect ? (
                          <div className="relative">
                            <select
                              {...register(field.name, {
                                required: field.required,
                              })}
                              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                errors[field.name]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}>
                              {field.options.map((option, optIndex) => (
                                <option key={optIndex} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                              {field.icon}
                            </div>
                            {errors[field.name] && (
                              <p className="text-red-500 text-sm mt-1">
                                This field is required
                              </p>
                            )}
                          </div>
                        ) : field.isCheckboxGroup ? (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {field.options.map((option, optIndex) => (
                              <label
                                key={optIndex}
                                className="flex items-center bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-colors">
                                <input
                                  type="checkbox"
                                  value={option.value}
                                  {...register(field.name)}
                                  className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="ml-3 text-gray-700">
                                  {option.label}
                                </span>
                              </label>
                            ))}
                          </div>
                        ) : field.isTextarea ? (
                          <div className="relative">
                            <textarea
                              {...register(field.name, {
                                required: field.required,
                              })}
                              placeholder={field.placeholder || ""}
                              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                errors[field.name]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                              rows={4}
                            />
                            <div className="absolute top-4 left-3 text-gray-400">
                              {field.icon}
                            </div>
                            {errors[field.name] && (
                              <p className="text-red-500 text-sm mt-1">
                                This field is required
                              </p>
                            )}
                          </div>
                        ) : field.name === "email" ? (
                          <div className="relative">
                            <input
                              value={user?.email || ""}
                              readOnly
                              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                              {field.icon}
                            </div>
                          </div>
                        ) : (
                          <div className="relative">
                            <input
                              {...register(field.name, {
                                required: field.required,
                              })}
                              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                                errors[field.name]
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                              {field.icon}
                            </div>
                            {errors[field.name] && (
                              <p className="text-red-500 text-sm mt-1">
                                This field is required
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Terms & Conditions */}
              <motion.div
                className="mb-8 bg-blue-50 rounded-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("terms", { required: true })}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mt-1"
                  />
                  <label htmlFor="terms" className="ml-3 text-gray-700">
                    I hereby declare that all the information provided in this
                    application is true and accurate to the best of my
                    knowledge. I understand that any misrepresentation may
                    result in the denial of benefits or cancellation of the
                    policy.
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-red-500 text-sm mt-2">
                    You must agree to the terms
                  </p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center transition-all">
                  <FaFileSignature className="mr-2" />
                  Submit Application
                </button>
              </motion.div>
            </form>
          </motion.div>

          {/* Support Section */}
          <motion.div
            className="mt-8 bg-white rounded-2xl shadow-lg p-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Need Assistance?
            </h3>
            <p className="text-gray-600 mb-4">
              Our insurance specialists are ready to help you complete your
              application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90">
                Chat with an Agent
              </button>
              <button className="py-3 px-6 bg-white text-blue-600 border border-blue-300 rounded-lg font-medium hover:bg-blue-50">
                Schedule a Call
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationFormPage;
