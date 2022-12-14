import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableContainer,
  Tbody,
  Tr,
  Th,
  Td,
  Thead,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useContext, useEffect, useState } from "react";
import backend from "../api/backend";
import Navbar from "../components/navbar";
import { AuthContext } from "../utils/AuthContext";
import Image from "next/image";


export default function Home() {
  const [mahasiswas, setMahasiswas] = useState([]);
  const [user, setUser] = useState(null);
  const { token, setToken } = useContext(AuthContext);
  const router = useRouter();

  const getAllMahasiswa = async () => {
    try {
      const res = await backend.get(`/mahasiswa`);

      console.log(res.data.mahasiswa);
      setMahasiswas(res.data.mahasiswa);
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

  const handleLogout = () => {
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    hasUserLogedIn();
    getAllMahasiswa();
  }, [token]);

  return (
    
    <Box
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      bg={useColorModeValue("gray.50", "gray.800")}
      pt={5}
      pb={10}
      px={10}
    >
      <Navbar
        user={user}
        handleLogout={handleLogout}
        handleLogin={() => router.push("/login")}
      />

      <Box
        rounded="lg"
        bg={useColorModeValue("white", "gray.700")}
        p={8}
        boxShadow="lg"
      >
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>NIM</Th>
                <Th>nama</Th>
                <Th>angkatan</Th>
                <Th>Peminjaman</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mahasiswas &&
                mahasiswas.map((mahasiswa, index) => (
                  <Tr key={mahasiswa.nim}>
                    <Td>{index + 1}</Td>
                    <Td>{mahasiswa.nim}</Td>
                    <Td>{mahasiswa.nama}</Td>
                    <Td>{mahasiswa.angkatan}</Td>
                    <Td>
                      <Button
                        size="sm"
                        colorScheme="green"
                        onClick={() => router.push(`/users/${mahasiswa.nim}`)}
                      >
                        Add
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>          
        </TableContainer>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image src="/assets/library (2).png" width="720" height="1000" />
      </div>
    </Box>
  );
}
