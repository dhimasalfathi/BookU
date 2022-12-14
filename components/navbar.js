import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";

const Navbar = ({ user, handleLogout, handleLogin, homepage }) => {
  return (
    <Box px={5}>
      <Flex my={5} h={16} alignItems="center" justifyContent="space-between">
      <Image onClick={homepage} cursor="pointer" src="/assets/library (1).png" width={128} height={77}></Image>
        <Stack spacing={8} alignItems="center">
          <Heading as="h3" size="lg">
          BookU : Aplikasi Peminjaman Buku
          </Heading>
        </Stack>

        <Flex gridColumnGap={4} alignItems="center">
          {user ? (
            <>
              <Text fontSize="lg">{user.nama}</Text>
              <Menu m={0}>
              <MenuButton minW={0} rounded="full" onClick={homepage} cursor="pointer">
                  <MenuItem>Dashboard</MenuItem>
                </MenuButton>
              </Menu>

              <Menu m={0}>
                <MenuButton minW={0} rounded="full">
                  <Avatar size="sm" />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <Link onClick={handleLogin}>
              <Button>Login</Button>
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
