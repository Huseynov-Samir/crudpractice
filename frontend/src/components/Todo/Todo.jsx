import { Box, Container, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Item from "../Item/Item";
import TextInput from "../TextInput/TextInpu";

import axios from "axios";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (title == "" && textBody == "") return;
    const objData = {
      id: todos.length + 1,
      text: title,
      body: textBody,
    };

    try {
      const res = await axios.post("http://localhost:3000/todos", objData);
      setTodos(res.data);
    } catch (e) {
      console.log(e);
    }

    setTodos([...todos, objData]);
    setTitle("");
    setTextBody("");
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/todos/${id}`,
        updatedData
      );
      setTodos((todos) =>
        todos.map((todo) => {
          if (todo.id === id) {
            return res.data; // Use the updated todo from the response
          }
          return todo;
        })
      );
      console.log("Todo updated successfully!");
    } catch (error) {
      console.error("Error updating todo:", error);
      // Handle error
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      const data = await axios.get("http://localhost:3000/todos");
      setTodos(data.data);
    };
    fetchApi();
  }, []);

  return (
    <>
      <Container>
        <Box>
          <TextInput
            title={title}
            textBody={textBody}
            setTitle={setTitle}
            setTextBody={setTextBody}
            onAddText={handleAdd}
          />
        </Box>
        <Wrap mt="30px">
          {todos.length ? (
            todos.map((todo) => (
              <Item
                key={todo.id}
                {...todo}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <Box>no any todos</Box>
          )}
        </Wrap>
      </Container>
    </>
  );
}

export default Todo;
