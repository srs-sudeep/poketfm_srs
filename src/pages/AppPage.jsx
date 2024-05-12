import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const AppPage = () => {
  const navigate = useNavigate();
  const handleVideoClick = () => {
    navigate('/video');
  };

  return (
    <div className="flex flex-col w-[100vw] h-[70vh] justify-center align-middle ">
      <Box className="flex flex-col w-[100vw] justify-center align-middle ">
        <Typography
          variant="h1"
          gutterBottom
          className="text-center text-6xl md:text-9xl font-black bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient"
        >
          Welcome to SonicFlix
        </Typography>

        <Stack spacing={2} direction="row" className="justify-center align-middle">
          <Button
            onClick={handleVideoClick}
            variant="contained"
            color="primary"
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Play Video
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default AppPage;
