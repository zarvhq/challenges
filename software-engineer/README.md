# Software Engineer — Manhattan Distance in Go

## Objective

Implement a Go function that computes the distance between the two points marked with `1` in a two-dimensional matrix. The exercise assesses your ability to work with arrays, logic, and data structures in Go.

## Challenge description

The input matrix contains only `0`s and exactly two `1`s.
Find the two cells marked with `1` and return the [Manhattan distance](https://en.wikipedia.org/wiki/Taxicab_geometry) between them:

```
|x1 - x2| + |y1 - y2|
```

Expected function:

```go
func Distance(matrix [][]int) int
```

## Example

Input:

```go
matrix := [][]int{
    {0, 0, 0, 0},
    {0, 1, 0, 0},
    {0, 0, 0, 1},
    {0, 0, 0, 0},
}
```

Expected output: `3` — the points are at `(1,1)` and `(2,3)`; `|1-2| + |1-3| = 3`.

## Requirements

- The matrix always contains **exactly two cells with value `1`**.
- All other cells are `0`.
- Maximum dimensions: **100 × 100**.
- The function must return an integer.

## Instructions

1. Create a private repository on your GitHub account.
2. Implement the solution in a `manhattan` package and use it from `main.go`.
3. Add tests (`manhattan_test.go`) covering at least: the happy path, adjacent points, and points at opposite corners of the matrix.
4. Document how to run the program (`go run .`) and the tests (`go test ./...`).

## Starter snippet

```go
package main

import (
    "fmt"
    "<your-module>/manhattan"
)

func main() {
    matrix := [][]int{
        {0, 0, 0, 0},
        {0, 1, 0, 0},
        {0, 0, 0, 1},
        {0, 0, 0, 0},
    }
    fmt.Println(manhattan.Distance(matrix)) // 3
}
```

## Hint

A single pass through the matrix is enough to locate both `1`s — after that, it's just the formula.

Good luck!
