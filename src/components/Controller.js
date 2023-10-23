import { Button, Grid } from '@mui/material'
import React, { useEffect } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'

function Controller({
  started,
  setDirection,
  theme,
  controllerLayout,
  setControllerLayout,
}) {
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
  }, [setDirection])

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

  const setNewDirection = (direction) => {
    if (started) {
      setDirection(direction)
    }
  }

  const leftButton = (
    <Button
      sx={{ ...controllerButtonTheme }}
      onClick={() => {
        setNewDirection('left')
      }}
    >
      <KeyboardArrowLeftIcon />
    </Button>
  )
  const rightButton = (
    <Button
      sx={{ ...controllerButtonTheme }}
      onClick={() => {
        setNewDirection('right')
      }}
    >
      <KeyboardArrowRightIcon />
    </Button>
  )
  const upButton = (
    <Button
      sx={{ ...controllerButtonTheme }}
      onClick={() => {
        setNewDirection('up')
      }}
    >
      <KeyboardArrowUpIcon />
    </Button>
  )
  const downButton = (
    <Button
      sx={{ ...controllerButtonTheme }}
      onClick={() => {
        setNewDirection('down')
      }}
    >
      <KeyboardArrowDownIcon />
    </Button>
  )

  return (
    <>
      {controllerLayout === 'middle' ? (
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="center"
          sx={{ width: 300, margin: 'auto', mt: 2 }}
        >
          <Grid
            container
            item
            justifyContent="end"
            alignItems="center"
            sx={{ height: 80 }}
            xs={4}
          >
            {leftButton}
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
            {upButton}
            {downButton}
          </Grid>
          <Grid container alignItems="center" item sx={{ height: 80 }} xs={4}>
            {rightButton}
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%', margin: 'auto', mt: 2 }}
        >
          <Grid
            container
            item
            direction="column"
            justifyContent="center"
            alignItems="start"
            sx={{ height: 200, gap: 2, pl: 4 }}
            xs={6}
          >
            {upButton}
            {downButton}
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            item
            sx={{ height: 200, gap: 2 }}
            xs={6}
          >
            {leftButton}
            {rightButton}
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Controller
