import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../library/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../library/uploads"; // Make sure this path is correct

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData); // Assign the result to a variable
    const { username, email, password } = data; // Destructure from that variable

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Check if a file is selected
      let imgUrl = "";
      if (avatar.file) {
        imgUrl = await upload(avatar.file); // Call the upload function if a file is selected
      } else {
        // Handle the case when no file is selected
        throw new Error("Please upload an avatar image.");
      }

      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Registration successful!");
      console.log("User registered:", res.user);
    } catch (err) {
      console.log("Error registering user:", err); // Improved error logging
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData); // Assign the result to a variable
    const { email, password } = data; // Destructure from that variable

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="logIn flex items-center justify-between w-full h-full">
      <div className="item flex-1 flex flex-col justify-center items-center">
        <h2 className="text-2xl">Welcome back</h2>
        <h2 className="text-sm mt-3">Login to your Account</h2>
        <div className="hero-content flex-col ">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body flex gap-6">
              <div className="form-control">
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button disabled={loading} className="btn btn-primary">
                  {loading ? "Loading" : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="seperator h-4/5	"></div>
      <div className="item flex-1 flex flex-col justify-center items-center">
        <h2 className="text-2xl">Create New Account</h2>
        <div className="hero-content flex-col ">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form
              onSubmit={handleRegister}
              className="card-body flex flex-col gap-6"
            >
              <div className="form-control flex flex-col items-center justify-center">
                <label
                  htmlFor="file"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {avatar.url ? (
                    <img
                      src={avatar.url}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className=" placeholder flex items-center justify-center">
                      <div className="bg-neutral text-neutral-content w-24 h-24 rounded-full flex items-center justify-center"></div>
                    </div>
                  )}
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={handleAvatar}
                  />
                </label>
                {!avatar.url && (
                  <span className="label-text mt-2">Upload Image</span>
                )}
              </div>

              <div className="form-control">
                <input
                  type="text"
                  placeholder="user name"
                  className="input input-bordered"
                  name="username"
                />
              </div>
              <div className="form-control">
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button disabled={loading} className="btn btn-primary">
                  {loading ? "Loading" : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
