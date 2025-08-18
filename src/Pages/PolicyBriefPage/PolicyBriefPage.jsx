import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  FaUserCircle,
  FaEye,
  FaCalendarAlt,
  FaTag,
  FaArrowLeft,
  FaShareAlt,
  FaBookmark,
  FaPrint,
} from "react-icons/fa";
import axios from "axios";
import Logo from "../../Components/Logo";
import AuthSecureAxios from "../../Hooks/AuthSecureAxios";
import Loading from "../../Components/Loading";
import Header from "../../Components/Header";

const PolicyBriefPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await AuthSecureAxios.get(`/blogs/${id}`);
        setBlog(response.data);

        // Simulate related content fetch
        const allBlogs = await AuthSecureAxios.get("/blogs");
        setRelatedBlogs(allBlogs.data.filter((b) => b._id !== id).slice(0, 3));

        // Update visit count
        await axios.patch(
          `https://life-policy-pulse-server.vercel.app/blogs/${id}`,
          {
            visits: response.data.visits + 1,
          }
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!blog) {
    return (
      <div className="min-h-screen  bg-base-100 flex flex-col items-center justify-center py-12 w-11/12 mx-auto">
        <div className="text-center">
          <div className="text-6xl text-indigo-300 mb-4">404</div>
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            Policy Brief Not Found
          </h2>
          <p className="text-indigo-700 max-w-md mb-8">
            The policy brief you're looking for doesn't exist or has been
            removed.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500  text-base-content font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all">
            <FaArrowLeft /> Back to Insights
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <Header />
      {/* Main Content */}
      <div className="w-11/12 mx-auto py-28">
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-purple-700 font-medium mb-6">
            <FaArrowLeft /> Back to Insights
          </a>

          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-3 py-1 bg-base-300 text-indigo-700 text-sm font-semibold rounded-full flex items-center gap-2">
              <FaTag className="text-xs" /> {blog.category || "Policy Analysis"}
            </span>
            <span className="px-3 py-1  bg-base-200 text-purple-700 text-sm font-semibold rounded-full flex items-center gap-2">
              <FaCalendarAlt className="text-xs" />{" "}
              {new Date(blog.date).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-indigo-600 mb-6">
            {blog.title}
          </h1>

          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-indigo-500 text-xl" />
              <span className="font-medium text-indigo-700">{blog.author}</span>
              <span className=" bg-base-300 text-blue-700 text-xs px-2 py-1 rounded-full">
                Verified
              </span>
            </div>
            <div className="h-1 w-1 rounded-full bg-indigo-300"></div>
            <div className="flex items-center gap-1 text-indigo-500">
              <FaEye />
              <span>{blog.visits} views</span>
            </div>
          </div>
        </div>

        <div className=" bg-base-100 rounded-2xl shadow-lg p-6 md:p-8 mb-12">
          <div className="aspect-w-16 aspect-h-9 mb-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>

          <div className="prose max-w-none prose-indigo prose-lg">
            <p className="text-lg font-semibold text-indigo-800 mb-6">
              {blog.details}
            </p>

            <div className="border-l-4 border-indigo-500 pl-4 my-6 italic  text-base-content">
              "Policy decisions must balance economic growth with social equity
              to ensure sustainable development for all communities."
            </div>

            <h2 className="text-2xl font-bold text-indigo-800 mt-10 mb-4">
              Executive Summary
            </h2>
            <p>
              This policy brief examines the critical intersection of economic
              development and social equity. Our analysis reveals that
              communities implementing balanced approaches see 23% higher
              long-term growth sustainability compared to those focusing solely
              on economic metrics.
            </p>

            <h2 className="text-2xl font-bold text-indigo-800 mt-10 mb-4">
              Key Findings
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-base-300 text-indigo-700 rounded-full p-1 mt-1 mr-3">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                </div>
                <span>
                  Equity-focused policies lead to more resilient local economies
                  during downturns
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-base-300 text-indigo-700 rounded-full p-1 mt-1 mr-3">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                </div>
                <span>
                  Workforce development programs yield 3:1 ROI when aligned with
                  community needs
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-base-300 text-indigo-700 rounded-full p-1 mt-1 mr-3">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                </div>
                <span>
                  Inclusive zoning regulations reduce economic segregation by
                  38% over 10 years
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-base-300 text-indigo-700 rounded-full p-1 mt-1 mr-3">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                </div>
                <span>
                  Public-private partnerships increase program effectiveness by
                  45%
                </span>
              </li>
            </ul>

            <div className="bg-base-100 rounded-xl p-6 my-10 border border-indigo-100">
              <h3 className="font-bold text-indigo-800 text-lg mb-3">
                Methodology
              </h3>
              <p>
                Our research analyzed 127 municipalities over a 15-year period
                using longitudinal economic data, policy implementation records,
                and community wellbeing surveys. Regression analysis controlled
                for population size, regional economic factors, and baseline
                socioeconomic conditions.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-indigo-800 mt-10 mb-4">
              Policy Recommendations
            </h2>
            <ol className="space-y-4">
              <li className="flex items-start">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500  text-base-content font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-indigo-800">
                    Implement Progressive Workforce Development
                  </h3>
                  <p className="mt-1">
                    Create industry-aligned training programs with sliding-scale
                    subsidies to ensure access across income levels. Prioritize
                    sectors with high growth potential and living wages.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500  text-base-content font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-indigo-800">
                    Reform Zoning Policies
                  </h3>
                  <p className="mt-1">
                    Mandate mixed-income housing in all new developments and
                    provide density bonuses for affordable units. Eliminate
                    exclusionary zoning practices that perpetuate segregation.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500  text-base-content font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-4">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-indigo-800">
                    Create Equity Impact Assessments
                  </h3>
                  <p className="mt-1">
                    Require all economic development initiatives to undergo
                    racial and socioeconomic equity analysis before
                    implementation, with community input mechanisms.
                  </p>
                </div>
              </li>
            </ol>

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 my-10  text-base-content">
              <h3 className="font-bold text-xl mb-3">
                Implementation Timeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center">
                  <div className="font-bold text-lg">Phase 1</div>
                  <div className="text-xs">(0-6 months)</div>
                  <div className="mt-2 text-sm">
                    Stakeholder engagement & baseline analysis
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">Phase 2</div>
                  <div className="text-xs">(6-18 months)</div>
                  <div className="mt-2 text-sm">
                    Policy design & pilot programs
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">Phase 3</div>
                  <div className="text-xs">(18-36 months)</div>
                  <div className="mt-2 text-sm">
                    Full implementation & monitoring
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">Phase 4</div>
                  <div className="text-xs">(36+ months)</div>
                  <div className="mt-2 text-sm">Evaluation & refinement</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-10 pt-6 border-t border-indigo-100">
            <button className="flex items-center gap-2 px-5 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-base-300 transition-colors">
              <FaShareAlt /> Share Analysis
            </button>
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg transition-colors ${
                isBookmarked
                  ? " bg-base-200 text-purple-700"
                  : "bg-indigo-50 text-indigo-700 hover:bg-base-300"
              }`}>
              <FaBookmark /> {isBookmarked ? "Saved" : "Save for Later"}
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-base-300 transition-colors">
              <FaPrint /> Print Brief
            </button>
          </div>
        </div>

        {/* Related Content */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">
            Related Policy Briefs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs.map((related) => (
              <a
                key={related._id}
                href={`/blog/${related._id}`}
                className=" bg-base-100 rounded-xl shadow-md overflow-hidden border border-indigo-100 transition-all hover:shadow-lg hover:border-indigo-200">
                <img
                  src={related.image}
                  alt={related.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs mb-2">
                    <span className="px-2 py-1 bg-base-300 text-indigo-700 rounded-full">
                      {related.category || "Policy"}
                    </span>
                    <span className=" text-base-content">
                      {new Date(related.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-indigo-600 mb-2">
                    {related.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-indigo-600">
                    <FaUserCircle className="text-indigo-500" />
                    <span>{related.author}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyBriefPage;
