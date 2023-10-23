import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'

function StartScreen({ theme, setTheme, options, setOptions, setStarted }) {
  const [selectedTheme, setSelectedTheme] = React.useState(
    localStorage.getItem('theme') || 'nokia'
  )

  useEffect(() => {
    if (selectedTheme === 'nokia') {
      setOptions({
        backgroundColor: 'black',
        gameBackgroundColor: '#b8be3e',
        snakeColor: '#6e611e',
        gridColor: '#6e611e',
        phoneBackgroundColor: '#4a5159',
        textColor: '#6e611e',
      })
    }
    if (selectedTheme === 'dark') {
      setOptions({
        backgroundColor: 'black',
        gameBackgroundColor: 'black',
        snakeColor: 'greenyellow',
        gridColor: 'brown',
        phoneBackgroundColor: 'brown',
        textColor: 'white',
      })
    }
    if (selectedTheme === 'light') {
      setOptions({
        backgroundColor: 'wheat',
        gameBackgroundColor: 'darkgreen',
        snakeColor: 'lightgreen',
        gridColor: 'lightgreen',
        phoneBackgroundColor: 'indigo',
        textColor: 'white',
      })
    }
    setTheme(selectedTheme)
    localStorage.setItem('theme', selectedTheme)
  }, [selectedTheme, setOptions, setTheme])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Enter' || e.code === 'Space') {
        setStarted(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [setStarted])

  const buttonTheme = {
    fontFamily: 'ArcadeClassic',
    fontSize: 18,
    color: theme === 'nokia' ? options.gameBackgroundColor : 'white',
    backgroundColor:
      theme === 'nokia' ? options.textColor : options.phoneBackgroundColor,
    ':hover': {
      backgroundColor:
        theme === 'nokia' ? options.textColor : options.phoneBackgroundColor,
      opacity: '80%',
    },
    height: 40,
    borderRadius: 2,
  }

  const radioTheme = {
    color: options.textColor,
    '&.Mui-checked': {
      color:
        theme === 'nokia' ? options.snakeColor : options.phoneBackgroundColor,
    },
  }

  return (
    <Grid
      container
      item
      alignItems="center"
      justifyContent="space-around"
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
          Snake
        </Typography>
        <Button
          variant="primary"
          onClick={() => setStarted(true)}
          sx={{
            ...buttonTheme,
          }}
        >
          Start Game
        </Button>
      </Grid>
      <Grid item sx={{ mt: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FormControl sx={{ color: options.textColor }}>
            <FormLabel
              id="radio-buttons-group-label"
              sx={{
                fontFamily: 'ArcadeClassic',
                fontSize: 24,
                color: options.textColor,
                '&.Mui-focused': { color: options.textColor },
              }}
            >
              Theme
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => setSelectedTheme(e.target.value)}
              value={selectedTheme}
              sx={{ span: { fontFamily: 'ArcadeClassic', fontSize: 20 } }}
            >
              <FormControlLabel
                value="nokia"
                control={<Radio sx={{ ...radioTheme }} />}
                label="Nokia"
              />
              <FormControlLabel
                value="dark"
                control={<Radio sx={{ ...radioTheme }} />}
                label="Dark"
              />
              <FormControlLabel
                value="light"
                control={<Radio sx={{ ...radioTheme }} />}
                label="Light"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  )
}

export default StartScreen
