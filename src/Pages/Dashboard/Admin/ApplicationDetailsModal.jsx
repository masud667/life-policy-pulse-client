import { HiOutlineX } from "react-icons/hi";

const ApplicationDetailsModal = ({ application, onClose }) => {
  if (!application) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black bg-opacity-50">
      {/* Modal content */}
      <div className="relative  bg-base-100 rounded-lg shadow-xl w-full max-w-3xl mx-auto overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 flex justify-between items-center">
          <h3 className=" text-base-content text-lg font-semibold">
            Application Details
          </h3>
          <button
            onClick={onClose}
            className=" text-base-content hover:text-gray-200">
            <HiOutlineX className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Applicant Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className=" text-base-content font-medium mb-2">
                Applicant Information
              </h4>
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {application.fullName}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {application.userEmail}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {application.phone || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Applied On:</span>{" "}
                {new Date(application.appliedAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h4 className=" text-base-content font-medium mb-2">
                Policy Information
              </h4>
              <p>
                <span className="font-semibold">Policy:</span>{" "}
                {application.policyName}
              </p>
              <p>
                <span className="font-semibold">Coverage:</span> $
                {application.coverage || "500,000"}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    application.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : application.status === "Rejected"
                      ? "bg-red-100 text-red-800"
                      : application.status === "Assigned"
                      ? " bg-base-300 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {application.status}
                </span>
              </p>
              <p>
                <span className="font-semibold">Assigned Agent:</span>{" "}
                {application.agentEmail || "Not assigned"}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h4 className=" text-base-content font-medium mb-2">
              Application Notes
            </h4>
            <p className="bg-gray-100 p-3 rounded">
              {application.surgery || "No notes provided."}
            </p>
          </div>

          {/* Dummy Documents */}
          <div>
            <h4 className=" text-base-content font-medium mb-2">Documents</h4>
            <div className="flex flex-wrap gap-3">
              {[
                "ID_Document.pdf",
                "Medical_History.pdf",
                "Financial_Info.pdf",
              ].map((doc) => (
                <div key={doc} className="bg-gray-100 px-4 py-2 rounded border">
                  <p>{doc}</p>
                  <button className="text-xs text-indigo-600 hover:underline">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className=" bg-base-50 p-4 text-right">
          <button
            onClick={onClose}
            className="bg-indigo-600  text-base-content px-4 py-2 rounded hover:bg-indigo-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;
