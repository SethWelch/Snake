import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect } from 'react'

const buttonTheme = {
  color: 'white',
  height: 40,
  borderRadius: 2,
}

function StartScreen({ theme, setTheme, options, setOptions, setStarted }) {
  const [selectedTheme, setSelectedTheme] = React.useState('nokia')

  useEffect(() => {
    if (selectedTheme === 'nokia') {
      setOptions({
        backgroundColor: 'black',
        gameBackgroundColor: '#b8be3e',
        snakeColor: '#6e611e',
        snakeBorderColor: 'green',
        gridColor: 'black',
        phoneBackgroundColor: '#4a5159',
        textColor: '#6e611e'
      })
    }
    if (selectedTheme === 'dark') {
      setOptions({
        backgroundColor: 'black',
        gameBackgroundColor: 'black',
        snakeColor: 'green',
        snakeBorderColor: 'green',
        gridColor: 'black',
        phoneBackgroundColor: 'maroon',
        textColor: 'white'
      })
    }
    if (selectedTheme === 'light') {
      setOptions({
        backgroundColor: 'wheat',
        gameBackgroundColor: 'darkgreen',
        snakeColor: 'lightgreen',
        snakeBorderColor: 'black',
        gridColor: 'green',
        phoneBackgroundColor: 'indigo',
        textColor: 'white'
      })
    }
    setTheme(selectedTheme)
  }, [selectedTheme])

  const radioTheme = {
    color: options.textColor,
    '&.Mui-checked': { color: options.phoneBackgroundColor}
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
      borderRight: `1px solid ${options.gridColor}`,
      borderBottom: `1px solid ${options.gridColor}`,
    }}
  >
    <Grid item>
    <Typography sx={{ fontWeight: 600, fontSize: 32, color: options.textColor }}>
        Snake
      </Typography>
      <Button
        variant="primary"
        onClick={() => setStarted(true)}
        sx={{ background: options.phoneBackgroundColor, ...buttonTheme }}
      >
        Start Game
      </Button>
    </Grid>
    <Grid item sx={{ mt: 4}}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <FormControl sx={{ color: options.textColor }}>
          <FormLabel id="radio-buttons-group-label" sx={{ color: options.textColor, '&.Mui-focused': { color: options.textColor }}}>Theme</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => setSelectedTheme(e.target.value)}
            value={selectedTheme}
          >
            <FormControlLabel value="nokia" control={<Radio sx={{ ...radioTheme }}/>} label="Nokia" />
            <FormControlLabel value="dark" control={<Radio sx={{ ...radioTheme }}/>} label="Dark" />
            <FormControlLabel value="light" control={<Radio sx={{ ...radioTheme }}/>} label="Light" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Grid>
  </Grid>
  )
}

export default StartScreen