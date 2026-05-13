# Software Engineer — Distância de Manhattan em Go

## Objetivo

Implementar uma função em Go que calcula a distância entre dois pontos marcados com `1` em uma matriz bidimensional. O exercício avalia sua capacidade de trabalhar com arrays, lógica e manipulação de estruturas em Go.

## Descrição do desafio

A matriz de entrada é composta apenas por `0`s e dois `1`s.
Localize as duas posições marcadas com `1` e retorne a [distância de Manhattan](https://en.wikipedia.org/wiki/Taxicab_geometry) entre elas:

```
|x1 - x2| + |y1 - y2|
```

Função esperada:

```go
func Distance(matrix [][]int) int
```

## Exemplo

Entrada:

```go
matrix := [][]int{
    {0, 0, 0, 0},
    {0, 1, 0, 0},
    {0, 0, 0, 1},
    {0, 0, 0, 0},
}
```

Saída esperada: `3` — os pontos estão em `(1,1)` e `(2,3)`; `|1-2| + |1-3| = 3`.

## Requisitos

- A matriz sempre terá **exatamente dois elementos com valor `1`**.
- Os demais elementos serão `0`.
- Dimensões máximas: **100 × 100**.
- A função deve retornar um inteiro.

## Instruções

1. Crie um repositório privado no seu GitHub.
2. Implemente a solução em um pacote `manhattan` e use-o a partir de `main.go`.
3. Inclua testes (`manhattan_test.go`) cobrindo pelo menos: caminho feliz, pontos adjacentes, pontos nos extremos da matriz.
4. Documente como rodar (`go run .` e `go test ./...`).

## Teste inicial

```go
package main

import (
    "fmt"
    "<seu-modulo>/manhattan"
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

## Dica

Uma única passagem pela matriz é suficiente para encontrar as duas posições — depois disso, é só aplicar a fórmula.

Boa sorte!
