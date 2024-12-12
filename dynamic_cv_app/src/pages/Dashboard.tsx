import React from "react";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../services/api";
import { RootState } from "../store/store";
import { Link } from "react-router-dom";

const Dashboard = () => {
  //are you authenticated? id? role?:
  const { isAuthenticated, userId, role } = useSelector(
    (state: RootState) => state.auth
  );
  //fetching:
  const { data: users, isLoading, error } = useGetUsersQuery();

  const user = users?.find((u) => u._id === userId);
  //if not logged in, tell person to log in by following link, if logged in get a greeting/info based on your role:
  return (
    <div className="container">
      <h2>Welcome to the Dynamic CV Maker!</h2>
      {!isAuthenticated && (
        <p>
          To be able to use our services, you must be{" "}
          <Link to="/">logged in</Link>
        </p>
      )}
      {isAuthenticated && user && (
        <div>
          <p>
            Hello, <strong>{user.name}</strong>!{" "}
            {role && (
              <span>
                Role: <strong>{role}</strong>.
              </span>
            )}
          </p>
          {role === "admin" ? (
            <p>
              This app enables you to manage the platform and oversee user
              activities. Please note that we are still refining the app, so if
              you encounter any issues, we encourage you to report them to the
              developer. We at the Dynamic CV Portal appreciate your feedback on
              this project!
            </p>
          ) : (
            <p>
              Lorem ipsum odor amet, consectetuer adipiscing elit. Porta non
              ullamcorper odio pretium consequat. Luctus lacinia proin faucibus
              adipiscing curabitur, turpis adipiscing euismod. Cursus libero
              senectus pharetra mus etiam habitant; phasellus justo. Feugiat
              litora cursus hendrerit torquent, erat facilisis ex. Est massa
              vitae auctor porttitor et magnis imperdiet. Est metus potenti
              ultricies nam at orci nibh sed dapibus. Congue finibus sed
              curabitur hac rhoncus ac aliquam sem.
            </p>
          )}
        </div>
      )}
      {isAuthenticated && !user && !isLoading && (
        <p>Error: Unable to find user details.</p>
      )}
      {isLoading && <p>Loading user information...</p>}
      {error && (
        <p>An error occurred while loading users. Please try again later.</p>
      )}
    </div>
  );
};

export default Dashboard;
