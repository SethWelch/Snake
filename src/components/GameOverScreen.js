import { Button, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'

function GameOverScreen({ options, theme, gameOver, reset }) {
  const buttonTheme = {
    fontFamily: 'ArcadeClassic',
    fontSize: 18,
    color: theme === 'nokia' ? options.gameBackgroundColor : 'white',
    backgroundColor:
      theme === 'nokia' ? options.textColor : options.phoneBackgroundColor,
    height: 40,
    borderRadius: 2,
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Enter' || e.code === 'Space') {
        reset()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [reset])

  return (
    <Grid item sx={{ height: '100%' }}>
      <Grid
        container
        item
        alignItems="center"
        justifyContent="center"
        direction="column"
        sx={{
          height: '100%',
        }}
      >
        <Grid item>
          <Typography
            sx={{
              fontFamily: 'ArcadeClassic',
              fontWeight: 600,
              fontSize: 32,
              color: options.textColor,
            }}
          >
            {gameOver ? 'Game Over' : 'A Winner is You'}
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="primary" onClick={reset} sx={{ ...buttonTheme }}>
            Play Again
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default GameOverScreen
