import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import _ from 'lodash'
import ScoreBoard from './components/ScoreBoard'
import Controller from './components/Controller'
import StartScreen from './components/StartScreen'
import GameOverScreen from './components/GameOverScreen'

function Snake() {
  const rowNumber = 16
  const largeBoxDimension = 32
  const mediumBoxDimension = 28
  const smallBoxDimension = 19

  const rows = Array.from(Array(rowNumber).keys())
  const columns = Array.from(Array(rowNumber).keys())

  const prevDirection = React.useRef()
  const nextDirection = React.useRef()

  const foodLocation = React.useRef()
  const score = React.useRef()
  const animateFrame = React.useRef()
  const gameLoop = React.useRef()

  const [options, setOptions] = React.useState({
    backgroundColor: 'black',
    gameBackgroundColor: 'black',
    snakeColor: 'green',
    gridColor: 'black',
    phoneBackgroundColor: 'maroon',
    textColor: 'white',
  })
  const [theme, setTheme] = React.useState('dark')
  const [controllerLayout, setControllerLayout] = React.useState(
    localStorage.getItem('layout') || 'middle'
  )

  const [snakeLocation, setSnakeLocation] = React.useState([
    { x: 4, y: 3 },
    { x: 3, y: 3 },
    { x: 2, y: 3 },
    { x: 1, y: 3 },
  ])
  const [gameOver, setGameOver] = React.useState(false)
  const [winner, setWinner] = React.useState(false)
  const [started, setStarted] = React.useState(false)

  const reset = () => {
    setSnakeLocation([
      { x: 4, y: 3 },
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
    ])
    prevDirection.current = undefined
    nextDirection.current = undefined
    foodLocation.current = undefined
    score.current = 0
    setWinner(false)
    setGameOver(false)
    setStarted(true)
  }

  const getNewPosition = (original, increase) => {
    if (increase && original < rowNumber - 1) {
      return original + 1
    }
    if (!increase && original > 0) {
      return original - 1
    }
    if (!increase && original === 0) {
      return rowNumber - 1
    }
    return 0
  }

  const updateSnake = (thisSnake) => {
    const newSnake = _.cloneDeep(thisSnake)
    const dir = nextDirection.current || 'right'

    switch (dir) {
      case 'left':
        newSnake[0] = {
          x: getNewPosition(newSnake[0].x, false),
          y: newSnake[0].y,
        }
        break
      case 'up':
        newSnake[0] = {
          x: newSnake[0].x,
          y: getNewPosition(newSnake[0].y, false),
        }
        break
      case 'down':
        newSnake[0] = {
          x: newSnake[0].x,
          y: getNewPosition(newSnake[0].y, true),
        }
        break
      default:
        newSnake[0] = {
          x: getNewPosition(newSnake[0].x, true),
          y: newSnake[0].y,
        }
        break
    }

    prevDirection.current = nextDirection.current

    const addExtra = ateFood(newSnake)

    const updated = newSnake.map((n, i) => {
      if (i === 0) {
        return n
      }
      return thisSnake[i - 1]
    })

    if (addExtra) {
      updated.push(newSnake[newSnake.length - 1])
    }

    return updated
  }

  const createFood = (snake) => {
    const generateNumbers = () => {
      const randomX = _.random(0, rowNumber - 1)
      const randomY = _.random(0, rowNumber - 1)
      return { x: randomX, y: randomY }
    }

    let results = null

    while (!results) {
      const newResults = generateNumbers()

      if (!snake.some((s) => s.x === newResults.x && s.y === newResults.y)) {
        results = newResults
      }
    }

    foodLocation.current = results
  }

  const ateFood = (snake) => {
    if (
      snake &&
      foodLocation?.current &&
      snake[0].x === foodLocation.current.x &&
      snake[0].y === foodLocation.current.y
    ) {
      createFood(snake)
      const currentScore = score.current || 0
      score.current = currentScore + 1
      return true
    }
    return false
  }

  const ateSelf = (snake) => {
    const others = [...snake].filter((s) => s !== snake[0])

    if (snake) {
      if (others.some((s) => s.x === snake[0].x && s.y === snake[0].y)) {
        setGameOver(true)
        setStarted(false)
      }
    }
  }

  const setDirection = (direction) => {
    const currentDirection = prevDirection.current || 'right'

    if (
      direction === 'up' &&
      currentDirection !== 'up' &&
      currentDirection !== 'down'
    ) {
      nextDirection.current = 'up'
    }
    if (
      direction === 'left' &&
      currentDirection !== 'left' &&
      currentDirection !== 'right'
    ) {
      nextDirection.current = 'left'
    }
    if (
      direction === 'down' &&
      currentDirection !== 'down' &&
      currentDirection !== 'up'
    ) {
      nextDirection.current = 'down'
    }
    if (
      direction === 'right' &&
      currentDirection !== 'right' &&
      currentDirection !== 'left'
    ) {
      nextDirection.current = 'right'
    }
  }

  function run(snake) {
    const thisSnake = snake || snakeLocation
    const newSnake = updateSnake(thisSnake)
    setSnakeLocation(newSnake)
    ateSelf(newSnake)

    if (newSnake.length === rows.length * columns.length) {
      setWinner(true)
    }

    if (!foodLocation.current) {
      createFood(thisSnake)
    }

    gameLoop.current = setTimeout(() => {
      animateFrame.current = requestAnimationFrame(() => run(newSnake))
    }, 100)
  }

  useEffect(() => {
    if (started) {
      prevDirection.current = 'right'
      run()
    } else if (animateFrame.current) {
      cancelAnimationFrame(animateFrame.current)
      clearTimeout(gameLoop.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started])

  const getHeadShape = (direction) => {
    switch (direction) {
      case 'right':
        return '0% 80% 80% 0%'
      case 'left':
        return '80% 0% 0% 80%'
      case 'up':
        return '80% 80% 0% 0%'
      default:
        return '0% 0% 80% 80%'
    }
  }

  const getTailShape = (direction) => {
    switch (direction) {
      case 'right':
        return '100% 0% 0% 100%'
      case 'left':
        return '0% 100% 100% 0%'
      case 'up':
        return '0% 0% 100% 100%'
      default:
        return '100% 100% 0% 0%'
    }
  }

  const getDirectionOfFormerSquare = (current, previous) => {
    if (
      (previous.x > current.x && current.x !== 0) ||
      (current.x === 0 && previous.x === 1) ||
      (current.x === rows.length - 1 && previous.x === 0)
    ) {
      return 'right'
    } else if (
      previous.x < current.x ||
      (current.x === 0 && previous.x === rows.length - 1)
    ) {
      return 'left'
    } else if (
      (previous.y < current.y &&
        previous.y !== columns.length - 1 &&
        previous.y !== 0) ||
      (previous.y === 0 && current.y === 1) ||
      (current.y === 0 && previous.y === columns.length - 1)
    ) {
      return 'up'
    } else {
      return 'down'
    }
  }

  const getPixel = (x, y) => {
    const snakeExists = snakeLocation?.find((s) => s.x === x && s.y === y)
    const foodExists =
      foodLocation?.current &&
      foodLocation.current.x === x &&
      foodLocation.current.y === y

    if (snakeExists) {
      const head = snakeLocation[0]
      const tail = snakeLocation[snakeLocation.length - 1]
      const isFirst = head.x === x && head.y === y
      const isLast = tail.x === x && tail.y === y

      const borderRadius =
        theme !== 'nokia' && (isFirst || isLast)
          ? isFirst
            ? getHeadShape(prevDirection.current || 'right')
            : getTailShape(
                getDirectionOfFormerSquare(
                  tail,
                  snakeLocation[snakeLocation.length - 2]
                )
              )
          : ''
      return (
        <Box
          key={`box-${x}-${y}`}
          sx={{
            height: {
              xs: smallBoxDimension,
              sm: mediumBoxDimension,
              md: mediumBoxDimension,
              lg: largeBoxDimension,
              xl: largeBoxDimension,
            },
            width: {
              xs: smallBoxDimension,
              sm: mediumBoxDimension,
              md: mediumBoxDimension,
              lg: largeBoxDimension,
              xl: largeBoxDimension,
            },
            background: options.snakeColor,
            borderRadius: borderRadius,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )
    }
    if (foodExists) {
      return (
        <Box
          key={`box-${x}-${y}`}
          sx={{
            height: {
              xs: smallBoxDimension,
              sm: mediumBoxDimension,
              md: mediumBoxDimension,
              lg: largeBoxDimension,
              xl: largeBoxDimension,
            },
            width: {
              xs: smallBoxDimension,
              sm: mediumBoxDimension,
              md: mediumBoxDimension,
              lg: largeBoxDimension,
              xl: largeBoxDimension,
            },
            background: options.gameBackgroundColor,
            display: 'grid',
            alignItems: 'center',
            fontSize: '26px',
          }}
        >
          {theme === 'nokia' ? (
            <Typography
              sx={{
                textAlign: 'center',
                fontFamily: 'ArcadeClassic',
                fontSize: {
                  xs: '24px',
                  sm: '24px',
                  md: '30px',
                  lg: '30px',
                  xl: '30px',
                },
                height: { xs: 24, sm: 24, md: 30, lg: 30, xl: 30 },
                lineHeight: {
                  xs: '24px',
                  sm: '24px',
                  md: '30px',
                  lg: '30px',
                  xl: '30px',
                },
                color: options.textColor,
              }}
            >
              O
            </Typography>
          ) : (
            <Typography
              sx={{
                fontSize: {
                  xs: '14px',
                  sm: '14px',
                  lg: '20px',
                  lg: '20px',
                  xl: '20px',
                },
              }}
            >
              🍎
            </Typography>
          )}
        </Box>
      )
    }

    return (
      <Box
        key={`box-${x}-${y}`}
        sx={{
          height: {
            xs: smallBoxDimension,
            sm: mediumBoxDimension,
            md: mediumBoxDimension,
            lg: largeBoxDimension,
            xl: largeBoxDimension,
          },
          width: {
            xs: smallBoxDimension,
            sm: mediumBoxDimension,
            md: mediumBoxDimension,
            lg: largeBoxDimension,
            xl: largeBoxDimension,
          },
          background: options.gameBackgroundColor,
        }}
      />
    )
  }

  const getBody = () => {
    if (winner || gameOver) {
      return (
        <GameOverScreen
          options={options}
          theme={theme}
          gameOver={gameOver}
          reset={reset}
        />
      )
    }
    if (!started) {
      return (
        <StartScreen
          theme={theme}
          setTheme={setTheme}
          options={options}
          setOptions={setOptions}
          setStarted={setStarted}
          controllerLayout={controllerLayout}
          setControllerLayout={setControllerLayout}
        />
      )
    } else {
      return (
        <>
          {rows.map((row, rIndex) => {
            return (
              <Grid container item key={`row-${rIndex}`}>
                {columns.map((column, cIndex) => {
                  return (
                    <Grid item key={`row-${rIndex}-column-${cIndex}`}>
                      {getPixel(cIndex, rIndex)}
                    </Grid>
                  )
                })}
              </Grid>
            )
          })}
        </>
      )
    }
  }

  return (
    <Box
      sx={{
        width: '100vw',
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        background: options.backgroundColor,
        height: '100vh',
      }}
    >
      <Box
        sx={{
          background: options.phoneBackgroundColor || 'maroon',
          padding: '8px 16px 32px',
          borderRadius: '8px',
          height: 'fit-content',
        }}
      >
        <Box sx={{ border: `2px dotted ${options.gridColor}`, mt: 2 }}>
          <ScoreBoard value={score.current} theme={theme} options={options} />
          <Grid
            container
            width={{
              xs: rows.length * smallBoxDimension,
              sm: rows.length * mediumBoxDimension,
              md: rows.length * mediumBoxDimension,
              lg: rows.length * largeBoxDimension,
              xl: rows.length * largeBoxDimension,
            }}
            height={{
              xs: columns.length * smallBoxDimension,
              sm: columns.length * mediumBoxDimension,
              md: columns.length * mediumBoxDimension,
              lg: columns.length * largeBoxDimension,
              xl: columns.length * largeBoxDimension,
            }}
            sx={{
              display: 'block',
              margin: 'auto',
              background: options.gameBackgroundColor,
            }}
          >
            {getBody()}
          </Grid>
        </Box>

        <Controller
          started={started}
          setDirection={setDirection}
          theme={theme}
          controllerLayout={controllerLayout}
          setControllerLayout={setControllerLayout}
        />
      </Box>
    </Box>
  )
}

export default Snake
