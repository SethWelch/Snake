import { Button, Grid } from '@mui/material'
import React, { useEffect } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

function Controller({ setDirection, theme }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'w' || e.key === 'ArrowUp') {
        setDirection('up')
      }
      if (e.key === 'a' || e.key === 'ArrowLeft') {
        setDirection('left')
      }
      if (e.key === 's' || e.key === 'ArrowDown') {
        setDirection('down')
      }
      if (e.key === 'd' || e.key === 'ArrowRight') {
        setDirection('right')
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const controllerButtonTheme = {
    backgroundColor: 'darkgray',
    color: 'black',
    height: theme === 'nokia' ? 50 : 60,
    width: theme === 'nokia' ? 80 : 60,
    borderRadius: theme === 'nokia' ? '30px' : 2,
    ':hover': {
      backgroundColor: 'grey',
    },
  }

  return (
    <Grid
      container
      justifyContent="space-evenly"
      alignItems="center"
      sx={{ width: 300, margin: 'auto', mt: 2 }}
    >
      <Grid container item justifyContent="end" alignItems="center" sx={{ height: 80 }} xs={4}>
        <Button
          sx={{ ...controllerButtonTheme }}
          onClick={() => {
            setDirection('left')
          }}
        >
          <KeyboardArrowLeftIcon />
        </Button>
      </Grid>
      <Grid
        container
        item
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: 200 }}
        xs={4}
      >
        <Button
          sx={{ ...controllerButtonTheme }}
          onClick={() => {
            setDirection('up')
          }}
        >
          <KeyboardArrowUpIcon />
        </Button>
        <Button
          sx={{ ...controllerButtonTheme }}
          onClick={() => {
            setDirection('down')
          }}
        >
          <KeyboardArrowDownIcon />
        </Button>
      </Grid>
      <Grid container item sx={{ height: 80, alignItems: 'center' }} xs={4}>
        <Button
          sx={{ ...controllerButtonTheme }}
          onClick={() => {
            setDirection('right')
          }}
        >
          <KeyboardArrowRightIcon />
        </Button>
      </Grid>
    </Grid>
  )
}

export default Controller
