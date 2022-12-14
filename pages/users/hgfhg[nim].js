import {
  Avatar,
  Heading,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Center,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  FormControl,
  InputGroup,
  Select,
} from "@chakra-ui/react";

import { useContext, useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

import Navbar from "../../components/navbar";
import backend from "../../api/backend";
import { AuthContext } from "../../utils/AuthContext";
import { useRouter } from "next/router";

const Detail = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [user, setUser] = useState(null);
  const [mk, setMk] = useState("");
  const [mkList, setMkList] = useState([]);
  const { token, setToken } = useContext(AuthContext);
  const router = useRouter();

  const getMahasiswa = async (nim) => {
    try {
      const res = await backend.get(`/mahasiswa/${nim}`);

      console.log(res.data.mahasiswa.matakuliah);
      setMahasiswa(res.data.mahasiswa);
    } catch (error) {
      console.log(error);
    }
  };

  const getMk = async () => {
    try {
      const res = await backend.get(`/matakuliah`);

      console.log(res.data.matakuliah);
      setMkList(res.data.matakuliah);
    } catch (error) {
      console.log(error);
    }
  };

  const hasUserLogedIn = async () => {
    try {
      const res = await backend.get("/mahasiswa/profile", {
        headers: {
          token,
          validateStatus: false,
        },
      });

      if (res.status !== 200) {
        alert(res.data.message);
        return;
      }

      return setUser(res.data.mahasiswa);
    } catch (error) {
      console.log(error);
    }
  };

  const addMk = async (e) => {
    e.preventDefault();
    try {
      const res = await backend.post(
        `/mahasiswa/${mahasiswa.nim}/matakuliah/${mk}`,
        {
          matakuliah: mk,
        },
        {
          headers: {
            token,
            validateStatus: false,
          },
        },
      );

      if (res.status !== 200) {
        alert(res.data.message);
        return;
      }

      alert(res.data.message);
      getMahasiswa(router.query.nim);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMk = async (mkId, nim) => {
    console.log(token);
    try {
      const res = await backend.put(
        `/mahasiswa/${nim}/matakuliah/${mkId}`,
        {},
        {
          headers: {
            token,
            validateStatus: false,
          },
        },
      );

      if (res.status !== 200) {
        alert(res.data.message);
        return;
      }

      alert(res.data.message);
      getMahasiswa(router.query.nim);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    getMahasiswa(router.query.nim);
    getMk();
    hasUserLogedIn();
  }, [token]);

  return (
    <Box
      justify="center"
      align="center"
      minH="100vh"
      bg={useColorModeValue("`gray.50", "gray.800")}
      pt={5}
      pb={10}
      px={10}
    >
      <Navbar
        user={user}
        handleLogout={handleLogout}
        handleLogin={() => router.push("/login")}
        homepage={() => router.push("/")}
      />
      <Center py={6}>
        <Box
          maxW="5xl"
          w="full"
          bg={useColorModeValue("white", "gray.900")}
          boxShadow="2xl"
          rounded="lg"
          p={6}
          textAlign="center"
        >
          <Avatar
            size="2xl"
            name="Username"
            alt="Avatar Alt"
            mb={4}
            pos="relative"
          />
          <Heading fontSize="2xl" fontFamily="body">
            {mahasiswa.nama}
          </Heading>
          <Text fontWeight={600} color="gray.500" mb={4}>
            {mahasiswa.nim}
          </Text>

          <form onSubmit={addMk}>
            <FormControl p={8}>
              <InputGroup>
                <Select
                  placeholder="Pilih Mata Kuliah"
                  icon={<MdArrowDropDown />}
                  value={mk}
                  onChange={(e) => setMk(e.target.value)}
                >
                  {mkList &&
                    mkList.map((mkList) => (
                      <option value={mkList.id} key={mkList.id}>
                        {mkList.id + " " + mkList.nama}
                      </option>
                    ))}
                </Select>
                <Button type="submit" size="md" colorScheme="green" mx={4}>
                  Add
                </Button>
              </InputGroup>
            </FormControl>
          </form>
          <Box
            justifyContent="center"
            alignItems="center"
            rounded="lg"
            bg={useColorModeValue("white", "gray.700")}
            p={8}
            boxShadow="lg"
          >
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th>Kode Buku</Th>
                    <Th>Judul</Th>
                    <Th>Action</Th>
                    <Th>Testos</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {mahasiswa.matakuliah?.map((mk) => (
                    <Tr key={mk.id}>
                      <Td>{mk.id}</Td>
                      <Td>{mk.nama}</Td>
                      <Td>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => deleteMk(mk.id, router.query.nim)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};

export default Detail;
