import Todo from "./components/Todo/Todo";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Todo />
    </ChakraProvider>
  );
}

export default App;
