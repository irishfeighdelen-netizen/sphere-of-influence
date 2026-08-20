import { Link } from "react-router-dom";

const Home = () => {
  
  return (
  <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">

    <section className="text-center space-y-6">

      <h1 className="heading text-6xl text-blue-900">
        Sphere of Influence
      </h1>

      <h2 className="text-2xl text-gray-700">
        Your Next Giant Leap Starts Here.
      </h2>

      <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Every meaningful journey begins with a single connection.
      </p>
      <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Sphere of Influence is a mentoring platform designed to bring people together through shared experiences, knowledge, and genuine conversations. Whether you're looking for guidance from someone who has walked the path before you or you're ready to invest in someone else's growth, this is a place where meaningful relationships take shape.
      </p>
      <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Explore a diverse community of mentors across industries, discover new perspectives, schedule one-on-one conversations, and build connections that extend beyond a single meeting. Here, mentoring is more than exchanging advice. It's about expanding your perspective, strengthening your confidence, and growing alongside others who believe in your potential.
      </p>

    </section>

    <section className="space-y-8">

      <h2 className="heading text-4xl text-blue-900 text-center">
        How does it work?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
          <h3 className="text-xl font-medium text-blue-900 mb-2">
            Launch your Journey
          </h3>
          <p className="text-gray-600">
            Create your account and build your profile to begin your mentoring adventure.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
          <h3 className="text-xl font-medium text-blue-900 mb-2">
            Make Meaningful Connections
          </h3>
          <p className="text-gray-600">
            Connect with mentors and mentees who share your goals, interests, and passion for growth.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
          <h3 className="text-xl font-medium text-blue-900 mb-2">
            Build Your Orbit
          </h3>
          <p className="text-gray-600">
            Schedule sessions, exchange insights, and celebrate progress together, one conversation at a time.
          </p>
        </div>

      </div>

    </section>

    <section className="text-center space-y-6 max-w-4xl mx-auto">

      <h2 className="heading text-4xl text-blue-900">
        What is Mentoring?
      </h2>

      <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
        Mentoring is about creating a space where people can learn from one another through honest conversations, thoughtful questions, and shared experiences. A mentor doesn't have all the answers. Instead, they offer perspective, encouragement, and guidance that helps someone discover their own path with greater confidence.
        </p>
      <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
        At its heart, mentoring is a relationship built on trust, curiosity, and the belief that we all grow stronger when we invest in each other's journeys.
      </p>

      <ul className="flex flex-col md:flex-row justify-center gap-4 text-blue-900 font-medium">
        <li className="bg-blue-50 px-4 py-2 rounded-lg">Register as a MENTOR</li>
        <li className="bg-blue-50 px-4 py-2 rounded-lg">Register as a MENTEE</li>
      </ul>

    </section>

  </main>
);
};

export default Home;