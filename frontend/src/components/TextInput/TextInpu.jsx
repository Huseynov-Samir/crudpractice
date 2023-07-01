import { Input, Box, Textarea, Button } from "@chakra-ui/react";

function TextInput({ title, textBody, setTitle, setTextBody, onAddText }) {
  return (
    <>
      <Box mt="8">
        <form onSubmit={onAddText}>
          <Input
            mb="4"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add Todo Name"
          />
          <Textarea
            mb="4"
            value={textBody}
            onChange={(e) => setTextBody(e.target.value)}
            placeholder="Here is a sample placeholder"
          />
          <Button type="submit">ADD Todo</Button>
        </form>
      </Box>
    </>
  );
}

export default TextInput;
