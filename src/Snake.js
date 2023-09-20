import { Box, Button, Grid, Typography } from "@mui/material"
import React, { useEffect } from "react"
import _ from "lodash"
import ScoreBoard from "./ScoreBoard"

const buttonTheme = {
  backgroundColor: "green",
  color: "white",
  height: 40,
  borderRadius: 2,
}

const controllerButtonTheme = {
  backgroundColor: "grey",
  color: "black",
  height: 60,
  width: "100%",
  borderRadius: 2,
}

function Snake() {
  const magicNumber = 16
  const rows = Array.from(Array(magicNumber).keys())
  const columns = Array.from(Array(magicNumber).keys())
  const boxDimension = 32

  const prevDirection = React.useRef()
  const foodLocation = React.useRef()
  const score = React.useRef()
  const animateFrame = React.useRef()
  const gameLoop = React.useRef()

  const backgroundColor = "lightgreen"
  const snakeColor = "darkgreen"

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
    foodLocation.current = undefined
    score.current = 0
    setWinner(false)
    setGameOver(false)
    setStarted(true)
  }

  const getNewPosition = (original, increase) => {
    if (increase && original < magicNumber - 1) {
      return original + 1
    }
    if (!increase && original > 0) {
      return original - 1
    }
    if (!increase && original === 0) {
      return magicNumber - 1
    }
    return 0
  }

  const updateSnake = (thisSnake) => {
    const newSnake = _.cloneDeep(thisSnake)
    const dir = prevDirection.current || "right"

    switch (dir) {
      case "left":
        newSnake[0] = { x: getNewPosition(newSnake[0].x, false), y: newSnake[0].y }
        break
      case "up":
        newSnake[0] = { x: newSnake[0].x, y: getNewPosition(newSnake[0].y, false) }
        break
      case "down":
        newSnake[0] = { x: newSnake[0].x, y: getNewPosition(newSnake[0].y, true) }
        break
      default:
        newSnake[0] = { x: getNewPosition(newSnake[0].x, true), y: newSnake[0].y }
        break
    }

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
      const randomX = _.random(0, magicNumber - 1)
      const randomY = _.random(0, magicNumber - 1)
      return { x: randomX, y: randomY }
    }

    let results = null

    // eslint-disable-next-line no-loop-func
    while (!results || snake.find((s) => s.x === results.x && s.y === results.y)) {
      results = generateNumbers()
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
      if (
        others.find((s) => {
          return s.x === snake[0].x && s.y === snake[0].y
        })
      ) {
        setGameOver(true)
        setStarted(false)
      }
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

  const setDirection = (direction) => {
    const currentDirection = prevDirection.current

    if (direction === "up" && currentDirection !== "up" && currentDirection !== "down") {
      prevDirection.current = "up"
    }
    if (direction === "left" && currentDirection !== "left" && currentDirection !== "right") {
      prevDirection.current = "left"
    }
    if (direction === "down" && currentDirection !== "down" && currentDirection !== "up") {
      prevDirection.current = "down"
    }
    if (direction === "right" && currentDirection !== "right" && currentDirection !== "left") {
      prevDirection.current = "right"
    }
  }

  useEffect(() => {
    if (started) {
      prevDirection.current = "right"
      run()
    } else if (animateFrame.current) {
      cancelAnimationFrame(animateFrame.current)
      clearTimeout(gameLoop.current)
    }
  }, [started])

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "w" || e.key === "ArrowUp") {
        setDirection("up")
      }
      if (e.key === "a" || e.key === "ArrowLeft") {
        setDirection("left")
      }
      if (e.key === "s" || e.key === "ArrowDown") {
        setDirection("down")
      }
      if (e.key === "d" || e.key === "ArrowRight") {
        setDirection("right")
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const getHeadShape = (direction) => {
    switch (direction) {
      case "right":
        return "0% 80% 80% 0%"
      case "left":
        return "80% 0% 0% 80%"
      case "up":
        return "80% 80% 0% 0%"
      default:
        return "0% 0% 80% 80%"
    }
  }

  const getTailShape = (direction) => {
    switch (direction) {
      case "right":
        return "100% 0% 0% 100%"
      case "left":
        return "0% 100% 100% 0%"
      case "up":
        return "0% 0% 100% 100%"
      default:
        return "100% 100% 0% 0%"
    }
  }

  const getDirectionOfFormerSquare = (current, previous) => {
    if (
      (previous.x > current.x && current.x !== 0) ||
      (current.x === 0 && previous.x === 1) ||
      (current.x === rows.length - 1 && previous.x === 0)
    ) {
      return "right"
    } else if (previous.x < current.x || (current.x === 0 && previous.x === rows.length - 1)) {
      return "left"
    } else if (
      (previous.y < current.y && previous.y !== columns.length - 1 && previous.y !== 0) ||
      (previous.y === 0 && current.y === 1) ||
      (current.y === 0 && previous.y === columns.length - 1)
    ) {
      return "up"
    } else {
      return "down"
    }
  }

  const getPixel = (x, y) => {
    const snakeExists = snakeLocation?.find((s) => s.x === x && s.y === y)
    const foodExists = foodLocation?.current && foodLocation.current.x === x && foodLocation.current.y === y

    if (snakeExists) {
      const head = snakeLocation[0]
      const tail = snakeLocation[snakeLocation.length - 1]
      const isFirst = head.x === x && head.y === y
      const isLast = tail.x === x && tail.y === y

      const borderRadius =
        isFirst || isLast
          ? isFirst
            ? getHeadShape(prevDirection.current || "right")
            : getTailShape(getDirectionOfFormerSquare(tail, snakeLocation[snakeLocation.length - 2]))
          : ""
      return (
        <Box
          key={`box-${x}-${y}`}
          sx={{
            height: boxDimension,
            width: boxDimension,
            background: snakeColor,
            borderRadius: borderRadius,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      )
    }
    if (foodExists) {
      return (
        <Box
          key={`box-${x}-${y}`}
          sx={{
            height: boxDimension,
            width: boxDimension,
            background: backgroundColor,
            display: "grid",
            alignItems: "center",
            fontSize: "26px",
          }}
        >
          🍎
        </Box>
      )
    }

    return <Box key={`box-${x}-${y}`} sx={{ height: boxDimension, width: boxDimension, background: backgroundColor }} />
  }

  const getBody = () => {
    if (winner || gameOver) {
      return (
        <Grid item sx={{ height: "100%" }}>
          <Grid
            container
            item
            alignItems='center'
            justifyContent='center'
            direction='column'
            sx={{ height: "100%", borderRight: "1px solid black", borderBottom: "1px solid black" }}
          >
            <Grid item>
              <Typography sx={{ fontWeight: 600, fontSize: 32 }}>
                {gameOver ? "Game Over" : "A Winner is You"}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant='primary' onClick={reset} sx={{ ...buttonTheme }}>
                Play Again
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )
    }
    if (!started) {
      return (
        <Grid
          container
          item
          alignItems='center'
          justifyContent='center'
          direction='column'
          sx={{ height: "100%", borderRight: "1px solid black", borderBottom: "1px solid black" }}
        >
          <Grid item>
            <Typography sx={{ fontWeight: 600, fontSize: 32 }}>Snake</Typography>
          </Grid>
          <Grid item>
            <Button variant='primary' onClick={() => setStarted(true)} sx={{ ...buttonTheme }}>
              Start Game
            </Button>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <>
          {rows.map((row, rIndex) => {
            return (
              <Grid container item key={`row-${rIndex}`} sx={{ borderBottom: "1px solid black" }}>
                {columns.map((column, cIndex) => {
                  return (
                    <Grid item key={`row-${rIndex}-column-${cIndex}`} sx={{ borderRight: "1px solid black" }}>
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
    <Box sx={{ width: "100%", display: "grid", justifyContent: "center" }}>
      <ScoreBoard value={score.current} />
      <Grid
        container
        width={rows.length * boxDimension + rows.length + 1}
        height={columns.length * boxDimension + columns.length + 1}
        sx={{
          borderLeft: "1px solid black",
          borderTop: "1px solid black",
          display: "block",
          margin: "auto",
          background: backgroundColor,
        }}
      >
        {getBody()}
      </Grid>
      <Grid container justifyContent='space-evenly' alignItems='center' sx={{ width: 300, margin: "auto", mt: 2 }}>
        <Grid container item sx={{ height: 120, alignItems: "center" }} xs={4}>
          <Button
            sx={{ ...controllerButtonTheme }}
            onClick={() => {
              setDirection("left")
            }}
          >
            Left
          </Button>
        </Grid>
        <Grid
          container
          item
          direction='column'
          justifyContent='space-between'
          alignItems='center'
          sx={{ height: 200 }}
          xs={4}
        >
          <Button
            sx={{ ...controllerButtonTheme, width: 80, height: "45%" }}
            onClick={() => {
              setDirection("up")
            }}
          >
            Up
          </Button>
          <Button
            sx={{ ...controllerButtonTheme, width: 80, height: "45%" }}
            onClick={() => {
              setDirection("down")
            }}
          >
            Down
          </Button>
        </Grid>
        <Grid container item sx={{ height: 120, alignItems: "center" }} xs={4}>
          <Button
            sx={{ ...controllerButtonTheme }}
            onClick={() => {
              setDirection("right")
            }}
          >
            Right
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Snake
