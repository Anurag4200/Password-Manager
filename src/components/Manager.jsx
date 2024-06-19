import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast, Toaster } from "react-hot-toast";

const Manager = () => {
  const [passwordArray, setpasswordArray] = useState([]);
  const [form, setForm] = useState({
    site: "",
    name: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const savePassword = async () => {
    // console.log(form);
    
    if (form.site && form.name && form.password) {
      await fetch("http://localhost:5000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ ...form, id:form.id }),
    });
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      toast.success("Successfully Added!");
      storeInLS();
      setForm({
        site: "",
        name: "",
        password: "",
      });
    } else {
      toast.error("Enter The Data");
    }
  };

  const getPasssword = async () => {
    let req = await fetch("http://localhost:5000/");
    let res = await req.json();
    setpasswordArray(res);
  };
  const storeInLS = async () => {
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray,  {...form,id:uuidv4()}]));
    let res = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });
  };
  useEffect(() => {
    getPasssword();
    // const storedPasswords = localStorage.getItem("passwords");
    // if (storedPasswords) setpasswordArray(JSON.parse(storedPasswords));
    // setpasswordArray(storedPasswords)
  }, []);

  const handleDelete = async (id) => {
    const filteredArray = passwordArray.filter((item) => item.id !== id);
    let c = confirm("do you really wants to delete");
    if (c) {
      setpasswordArray(filteredArray);
      toast.error("Item Deleted");
      // localStorage.setItem("passwords", JSON.stringify(filteredArray));
      let res = await fetch("http://localhost:5000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({id}),
      });
    }
  };
  const handleEdit = (id) => {
    const editedItem = {...passwordArray.find((item) => item.id === id),id:id};
    setForm(editedItem);
    const filteredArray = passwordArray.filter((item) => item.id !== id);
    setpasswordArray(filteredArray)
  };
  return (
    <>
      <div className="md:container md:mx-auto w-full h-72  flex flex-col items-center py-3 space-y-2">
        <div className=" md:text-2xl font-bold">
          <span className="text-purple-700">&lt;</span>Password
          <span className="text-purple-700">OP /</span>
          <span className="text-purple-700">&gt;</span>
        </div>
        <h1 className="text-sm ">Your Own Password Manager</h1>
        <div className="w-full md:px-[200px] px-8 flex flex-col gap-2">
          <input
            type="text"
            className="px-3 py-1 rounded-full w-full outline-none bg-purple-200"
            placeholder="Enter the Link"
            name="site"
            onChange={handleChange}
            value={form.site}
          />
          <div className=" w-full flex md:flex-row flex-col md:gap-6 gap-2">
            <input
              type="text"
              className="px-3 py-1 rounded-full md:w-3/4 w-full outline-none bg-purple-200"
              placeholder="Enter The Username"
              name="name"
              onChange={handleChange}
              value={form.name}
            />
            <input
              type="password"
              className="px-3 py-1 rounded-full md:w-1/4 w-full outline-none bg-purple-200"
              placeholder="Enter The Password"
              name="password"
              onChange={handleChange}
              value={form.password}
            />
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={() => {
                savePassword();
              }}
              className="px-3 py-1 rounded-full bg-green-500 hover:bg-green-600"
            >
              Add Password
            </button>
          </div>
          <h1 className="font-bold text-xl my-2 ">Your Password</h1>
          {passwordArray.length > 0 ? (
            <table className="table-auto text-center rounded-md overflow-hidden">
              <thead className="w-32 bg-purple-400">
                <tr>
                  <th>Site</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody className="bg-purple-200">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.site}</td>
                      <td>{item.name}</td>
                      <td>{item.password}</td>
                      <td>
                        <button
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                          className="text-red-500 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            handleEdit(item.id);
                          }}
                          className="text-yellow-500 hover:text-yellow-600"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h1>No Password is Saved</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
