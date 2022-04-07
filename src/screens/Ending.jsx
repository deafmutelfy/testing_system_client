import { Box, Center, Text } from "@chakra-ui/react";

export default function Ending() {
  localStorage.clear();

  return (
    <Box h={"100%"}>
      <Center h={"100%"}>
        <Text fontSize={"xl"}>Тестирование завершено</Text>
      </Center>
    </Box>
  );
}
