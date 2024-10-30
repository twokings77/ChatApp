import React from "react";
import "./useradd.css";

const Useradd = () => {
  return (
    <div className="userAdd p-4">
      <form className="card-body gap-6">
        <div className="form-control flex flex-row items-center justify-center gap-3">
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered"
            required
          />
          <button className="btn btn-primary ">Search</button>
        </div>

        <div className="user flex items-center justify-between ">
          <div className="details flex items-center gap-4">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <span>John Doe</span>
          </div>
          <button className="btn btn-sm btn-primary ">Add User</button>
        </div>
      </form>
    </div>
  );
};

export default Useradd;
