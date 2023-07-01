import {
  Card,
  CardBody,
  Text,
  WrapItem,
  Divider,
  Checkbox,
  IconButton,
  Box,
  Flex,
  Spacer,
  Input,
  Textarea,
  ButtonGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { CloseIcon, RepeatIcon, CheckCircleIcon } from "@chakra-ui/icons";

function Item({ id, text, body, onDelete, onUpdate }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [title, setTitle] = useState(text);
  const [textBody, setTextBody] = useState(body);

  const handleChecked = (e) => setIsChecked(e.target.checked);

  let updateAndUpgrade;

  if (isEdit) {
    updateAndUpgrade = (
      <>
        <Flex alignItems={"center"}>
          <Flex>
            <Box>
              <Input
                w={[290, 480, 430]}
                mb="4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
          </Flex>
        </Flex>
        <Divider />
        <Textarea
          mb="4"
          rows="5"
          cols="10"
          size="sm"
          value={textBody}
          onChange={(e) => setTextBody(e.target.value)}
        />
      </>
    );
  } else {
    updateAndUpgrade = (
      <>
        <Flex alignItems={"center"}>
          <Box>
            <Text fontSize={"2xl"}>{title}</Text>
          </Box>
        </Flex>
        <Divider />
        <Text style={{ lineBreak: "anywhere" }}>{textBody}</Text>
      </>
    );
  }

  return (
    <WrapItem>
      <Box>
        <Card
          bg={`${isChecked ? "blue.200" : ""}`}
          color={`${isChecked ? "white" : ""}`}
        >
          <CardBody>{updateAndUpgrade}</CardBody>
          <Box>
            <Flex justifyContent={"space-between"}>
              <Box>
                <IconButton
                  colorScheme={`${isChecked ? "teal" : "red"}`}
                  onClick={() => onDelete(id)}
                  icon={<CloseIcon />}
                />
              </Box>
              <ButtonGroup spacing="6" alignItems={"center"}>
                <Box>
                  <Checkbox value={isChecked} onChange={handleChecked} />
                </Box>
                <Box>
                  <IconButton
                    onClick={() => {
                      onUpdate(id, { text: title, body: textBody });
                      setIsEdit(!isEdit);
                    }}
                    colorScheme={`${isChecked ? "teal" : "red"}`}
                    icon={isEdit ? <CheckCircleIcon /> : <RepeatIcon />}
                  />
                </Box>
              </ButtonGroup>
            </Flex>
          </Box>
        </Card>
      </Box>
    </WrapItem>
  );
}

export default Item;
