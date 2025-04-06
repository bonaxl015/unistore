import { FC } from 'react';

const HomeFeatureSection: FC = () => {
  return (
    <section className="m-16" aria-label="home-feature-section">
      <h2 className="text-3xl font-semibold mb-8 text-center">
        Explore the Universe of Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 mx-auto mb-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 10.725 10.725M12 12a3 3 0 100-6 3 3 0 000 6z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Stellar Profiles</h3>
          <p>Customize your profile with cosmic backgrounds and avatars.</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 mx-auto mb-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Cosmic Communities</h3>
          <p>Join groups dedicated to planets, stars, and galaxies.</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-600 mx-auto mb-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15.172a4 4 0 01-5.656 0L4.228 12.572a4 4 0 010-5.656l7.596-7.596z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Orbital Posts</h3>
          <p>Share your cosmic thoughts and discoveries.</p>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatureSection;
