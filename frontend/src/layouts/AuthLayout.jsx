function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-start bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white px-20">

        <div className="mb-8 text-6xl">
          🤖
        </div>

        <h1 className="text-6xl font-extrabold leading-tight">
          AI Interview Pilot
        </h1>

        <p className="mt-6 text-xl text-slate-200 max-w-lg leading-8">
          Practice realistic AI interviews, improve your ATS score, receive personalized feedback, and land your dream job.
        </p>

        <div className="mt-10 space-y-5">

          <div className="flex items-center gap-3">
            <span>✅</span>
            <span>AI Resume Analysis</span>
          </div>

          <div className="flex items-center gap-3">
            <span>✅</span>
            <span>AI Mock Interviews</span>
          </div>

          <div className="flex items-center gap-3">
            <span>✅</span>
            <span>ATS Score Improvement</span>
          </div>

          <div className="flex items-center gap-3">
            <span>✅</span>
            <span>Personalized Learning Roadmap</span>
          </div>

        </div>

      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        {children}
      </div>

    </div>
  );
}

export default AuthLayout;