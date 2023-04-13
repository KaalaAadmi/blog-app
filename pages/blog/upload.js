import { useState } from "react";
import {
  FaPlus,
  FaRegFileAlt,
  FaImage,
  FaLink,
  FaTimes,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { app } from "./../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadPage = () => {
  const [fields, setFields] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const storage = getStorage(app);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [description, setDescription] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [cover, setCover] = useState("");
  const addField = (type) => {
    const newField = {
      id: uuidv4(),
      sectionType: type,
      sectionText: "",
      sectionLink: "",
      sectionCaption: "",
    };
    setFields([...fields, newField]);
    setSelectedType(null);
    setInputValue("");
  };

  const removeField = (id) => {
    const filteredFields = fields.filter((field) => field.id !== id);
    setFields(filteredFields);
  };

  const moveField = (id, direction) => {
    const index = fields.findIndex((field) => field.id === id);
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < fields.length) {
      const updatedFields = [...fields];
      updatedFields.splice(index, 1);
      updatedFields.splice(newIndex, 0, fields[index]);
      setFields(updatedFields);
    }
  };

  const handleInputChange = (fieldId, file) => {
    const newFields = fields.map((field) => {
      if (field.id === fieldId) {
        return { ...field, sectionText: file };
      }
      return field;
    });
    setFields(newFields);
  };

  const handleFieldChange = (id, value) => {
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        return { ...field, sectionText: value };
      } else {
        return field;
      }
    });
    setFields(updatedFields);
  };

  const handleLinkChange = (id, value) => {
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        return { ...field, sectionLink: value };
      } else {
        return field;
      }
    });
    setFields(updatedFields);
  };

  const handleCaptionChange = (id, value) => {
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        return { ...field, sectionCaption: value };
      } else {
        return field;
      }
    });
    setFields(updatedFields);
  };

  const renderField = (field) => {
    switch (field.sectionType) {
      case "text":
        return (
          <textarea
            type="text"
            className="border rounded-md p-2 flex-1 mr-2"
            placeholder="Enter text..."
            value={field.sectionText}
            onChange={(event) =>
              handleFieldChange(field.id, event.target.value)
            }
          />
        );
      case "image":
        return (
          <div className="flex flex-col">
            {/* <div className="flex flex-col max-w-sm"> */}
            <input
              type="file"
              className="border rounded-md p-2 flex-1 mr-2"
              accept="image/*"
              onChange={(event) =>
                handleInputChange(field.id, event.target.files[0])
              }
            />
            <input
              type="text"
              className="border rounded-md p-2 flex-1 mr-2"
              placeholder="Enter caption..."
              value={field.sectionCaption}
              onChange={(event) =>
                handleCaptionChange(field.id, event.target.value)
              }
            />
            {/* </div> */}
            {field.sectionText && (
              <img
                src={URL.createObjectURL(field.sectionText)}
                alt="Selected image"
                className="w-15 h-15 object-cover rounded-md"
              />
            )}
          </div>
        );
      case "title":
        return (
          <input
            type="text"
            className="border rounded-md p-2 flex-1 mr-2"
            placeholder="Enter title..."
            value={field.sectionText}
            onChange={(event) =>
              handleFieldChange(field.id, event.target.value)
            }
          />
        );
      case "link":
        return (
          <div className="flex flex-col">
            <input
              type="text"
              className="border rounded-md p-2 flex-1 mr-2"
              placeholder="Enter text..."
              value={field.sectionText}
              onChange={(event) =>
                handleFieldChange(field.id, event.target.value)
              }
            />
            <input
              type="text"
              className="border rounded-md p-2 flex-1 mr-2"
              placeholder="Enter link..."
              value={field.sectionLink}
              onChange={(event) =>
                handleLinkChange(field.id, event.target.value)
              }
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].sectionType === "image") {
        const file = fields[i].sectionText;
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        fields[i].sectionText = downloadURL;
      }
    }
    const fieldsRepaired = fields.map((item) => {
      if (item.sectionType === "image") {
        return {
          sectionType:item.sectionType,
          sectionText: item.sectionText,
          sectionCaption: item.sectionCaption,
        };
      } else if (item.sectionType === "link") {
        return {
          sectionType:item.sectionType,
          sectionText: item.sectionText,
          sectionLink: item.sectionLink,
        };
      } else {
        return { sectionType:item.sectionType, sectionText: item.sectionText };
      }
    });
    let newPost = {
      title,
      category,
      subCategory,
      description,
      authorName,
      authorAvatar,
      cover,
      sections: fieldsRepaired,
    };
    const res=await axios.post('https://blog-newsletter-add.onrender.com/api/blog',newPost)
    if (res.status === 200) {
      toast.success("Post Added Successfully!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else{
      toast.error("Error Occurred, Please try again later!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",})
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-medium">Upload Page</h1>
      </div>
      <div className="flex flex-col justify-center mb-4">
        <input
          type="text"
          className="border rounded-md p-2 flex-1 mb-2"
          placeholder="Enter title..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          className="border rounded-md p-2 flex-1 mb-2"
          placeholder="Enter category..."
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <input
          type="text"
          className="border rounded-md p-2 flex-1 mb-2"
          placeholder="Enter sub category..."
          value={subCategory}
          onChange={(event) => setSubCategory(event.target.value.split(","))}
        />
        <textarea
          type="text"
          className="border rounded-md p-2 flex-1 mb-2"
          placeholder="Enter description... first paragraph"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input
          type="text"
          className="border rounded-md p-2 flex-1 mb-2"
          placeholder="Enter author name..."
          value={authorName}
          onChange={(event) => setAuthorName(event.target.value)}
        />
        <input
          type="text"
          className="border rounded-md p-2 flex-1 mb-2"
          placeholder="Enter author avatar..."
          value={authorAvatar}
          onChange={(event) => setAuthorAvatar(event.target.value)}
        />
        <input
          type="text"
          className="border rounded-md p-2 flex-1 mb-2"
          placeholder="Enter cover..."
          value={cover}
          onChange={(event) => setCover(event.target.value)}
        />
      </div>
      <div className="mb-14 sticky top-0 z-50 bg-white pt-4">
        <div className="flex items-center mb-4  top-12 justify-center">
          <select
            className="border p-2 mr-2 bg-white rounded-lg shadow-lg mt-2 py-2 w-48"
            value={selectedType || ""}
            onChange={(event) => setSelectedType(event.target.value)}
          >
            <option value="">Select a field type</option>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="title">Title</option>
            <option value="link">Link</option>
          </select>
          {selectedType && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:text-gray-700 mr-2"
              onClick={() => setSelectedType(null)}
            >
              <FaTimes />
            </button>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg z-10"
            onClick={() => addField(selectedType)}
            disabled={!selectedType}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      {fields.map((field, index) => (
        <div className="flex items-center mb-2" key={field.id}>
          <div className="w-15 h-15 bg-gray-200 flex items-center justify-center rounded-md mr-2">
            {field.sectionType === "text" && <FaRegFileAlt />}
            {field.sectionType === "image" && <FaImage />}
            {field.sectionType === "title" && <FaRegFileAlt />}
            {field.sectionType === "link" && <FaLink />}
          </div>
          {renderField(field)}
          <div className="flex items-center">
            <button
              className="text-gray-500 hover:text-gray-700 mr-2"
              onClick={() => moveField(field.id, -1)}
              disabled={index === 0}
            >
              <FaChevronUp />
            </button>
            <button
              className="text-gray-500 hover:text-gray-700 mr-2"
              onClick={() => moveField(field.id, 1)}
              disabled={index === fields.length - 1}
            >
              <FaChevronDown />
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removeField(field.id)}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      ))}
      <button
        className="bg-blue-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default UploadPage;
