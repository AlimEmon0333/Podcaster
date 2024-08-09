import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const InputPodcast = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [FrontImage, setFrontImage] = useState(null);
  const [AudioFile, setAudioFile] = useState(null);
  const [Dragging, setDragging] = useState(false);
  const [InputValues, setInputValues] = useState({
    title: "",
    description: "",
    category: "",
  });
  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFrontImage(file);
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDropImage = (e) => {
    setDragging(false);
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFrontImage(file);
  };
  const handleaudioFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAudioFile(file);
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...InputValues, [name]: value });
  };
  const handleSubmitPodcast = async () => {
    const data = new FormData();
    data.append("title", InputValues.title);
    data.append("description", InputValues.description);
    data.append("category", InputValues.category);
    data.append("frontImage", FrontImage);
    data.append("audioFile", AudioFile);
    try {
      setloading(true);
      const res = await axios.post(
        "http://localhost:2000/api/v1/add-podcast",
        data,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      navigate("/profile");
      setloading(false);
    } catch (error) {
      setloading(false);
      toast.error(error.response.data.message);
    } finally {
      setInputValues({
        title: "",
        description: "",
        category: "",
      });
      setFrontImage(null);
      setAudioFile(null);
    }
  };
  return (
    <div className="px-4 mt-1 lg:px-12 border-t border-zinc-600 ">
      <ToastContainer position="bottom-right" />
      <div className="flex flex-col items-center lg:items-start ">
        {loading ? (
          <h1 className="text-zinc-200 bg-zinc-900 font-semibold text-xl px-20 py-3 rounded w-fit my-3 hover:shadow transition-all duration-300 cursor-pointer">
            <CircularProgress />
          </h1>
        ) : (
          <h1
            onClick={handleSubmitPodcast}
            className="text-zinc-200 bg-zinc-900 font-semibold text-xl px-10 py-3 rounded w-fit my-3 hover:shadow transition-all duration-300 cursor-pointer"
          >
            Save Podcast
          </h1>
        )}
      </div>
      <div className="mt-5 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="w-full lg:w-2/6  flex items-center justify-center lg:justify-start">
          <div
            className="size-[20-vh] lg:size-[60vh] flex items-center text-center justify-center  hover:bg-slate-200 transition-all duration-300 "
            style={{ border: "1px dashed" }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDropImage}
          >
            <input
              type="file"
              accept="image/*"
              id="file"
              name="frontImage"
              className="hidden"
              onChange={handleImageChange}
            />
            {FrontImage ? (
              <img
                src={URL.createObjectURL(FrontImage)}
                alt="thumbnail"
                className="h-[100%] w-[100%]"
              />
            ) : (
              <label
                htmlFor="file"
                className={`text-xl font-thin h-[100%] w-[100%] flex flex-col justify-center items-center cursor-pointer ${
                  Dragging ? "bg-blue-800 transition-all duration-300" : ""
                }`}
              >
                Drag and Drop your Thumbnail or <br />{" "}
                <b className="text-blue-900 font-bold cursor-pointer">
                  Click To Browse
                </b>
              </label>
            )}
          </div>
        </div>
        <div className="w-full lg:w-4/6">
          <div className="flex flex-col ">
            <label className="font-serif text-lg" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter Title of Podcast"
              className="mt-2 px-4 py-3 outline-none border-gray-200 rounded-xl text-lg lg:text-xl font-serif"
              style={{ border: "1px solid gray" }}
              value={InputValues.title}
              onChange={onInputChange}
            />
          </div>
          <div className="flex flex-col my-4">
            <label className="font-serif text-lg" htmlFor="description">
              Description
            </label>
            <textarea
              value={InputValues.description}
              onChange={onInputChange}
              name="description"
              id="description"
              placeholder="Enter description of Podcast"
              rows={2}
              className="mt-2 px-4 py-3 outline-none border-gray-200 rounded-xl text-lg lg:text-xl font-serif"
              style={{ border: "1px solid gray" }}
            />
          </div>
          <div className="flex my-10">
            <div className="flex flex-col w-2/6">
              {" "}
              <label className="font-serif text-lg" htmlFor="audioFile">
                Select Audio
              </label>
              <input
                type="file"
                accept=".mp3, .wav, .m4a, .flac, .wma, .aac, .ogg"
                name="audioFile"
                id="audioFile"
                className="p-4"
                onChange={handleaudioFile}
              />
            </div>
            <div className="flex flex-col w-4/6">
              {" "}
              <label className="font-serif text-lg" htmlFor="category">
                Select Category
              </label>
              <select
                value={InputValues.category}
                onChange={onInputChange}
                name="category"
                id="category"
                className="border border-zinc-300 rounded outline-none p-4"
              >
                <option value="">Select creategory</option>
                <option value="Comedy">Comedy</option>
                <option value="Education">Education</option>
                <option value="Hobbies">Hobbies</option>
                <option value="Business">Business</option>
                <option value="Government">Government</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPodcast;
