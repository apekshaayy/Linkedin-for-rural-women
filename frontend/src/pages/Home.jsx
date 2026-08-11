function Home() {
  return (
    <div className="home">

      <section className="hero">
        <div className="hero-content">
          <p className="tagline">CONNECT • LEARN • GROW</p>

          <h1>
            Empowering rural women
            <span> through opportunity.</span>
          </h1>

          <p className="hero-text">
            A platform where women can showcase their skills, discover
            employment opportunities, connect with communities and grow
            their businesses.
          </p>

          <div className="hero-buttons">
            <a href="/register" className="primary-btn">
              Join the community
            </a>

            <a href="/login" className="secondary-btn">
              Sign in
            </a>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Find opportunities</h3>
          <p>
            Discover jobs, training programs and opportunities suited
            to your skills.
          </p>
        </div>

        <div className="feature">
          <h3>Show your skills</h3>
          <p>
            Build your profile and let organizations discover your
            talents and experience.
          </p>
        </div>

        <div className="feature">
          <h3>Grow together</h3>
          <p>
            Connect with other women, organizations and community
            support networks.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Home;