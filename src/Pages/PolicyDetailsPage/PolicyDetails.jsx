import { useParams, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const PolicyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/policies/${id}`).then((res) => {
      setPolicy(res.data);
    });
  }, [id]);

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  const handleGetQuote = () => {
    navigate(`/quote/${policy.id}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border">
        <img
          src={policy.image}
          alt={policy.title}
          className="w-full h-72 object-cover"
        />

        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">{policy.title}</h2>

          <div className="flex flex-wrap gap-4 text-gray-600">
            <span className="badge badge-info">{policy.category}</span>
            <span className="badge badge-outline">
              Premium: {policy.premium}
            </span>
            <span className="badge badge-success badge-outline">
              Term Length: {policy.term || "15 years"}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed">{policy.shortDetails}</p>

          <div>
            <h3 className="text-xl font-semibold mb-2">Eligibility</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {policy.eligibility?.map((item, idx) => (
                <li key={idx}>
                  <FaCheckCircle className="inline text-green-500 mr-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Benefits</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {policy.benefits?.map((item, idx) => (
                <li key={idx}>
                  <FaCheckCircle className="inline text-green-500 mr-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Premium Calculation</h3>
            <p className="text-gray-600">
              {policy.premiumLogic ||
                "Calculated based on age, term length, and health status."}
            </p>
          </div>
        <Link
  onClick={handleGetQuote}
  className="bg-gradient-to-r from-blue-600 to-purple-600 btn rounded p-2 text-white hover:bg-gradient-to-l flex items-center justify-center gap-1"
>
  Get Quote <FiArrowRight />
</Link>

        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
