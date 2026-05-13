# Data Scientist — Segmentação RFM de Clientes

## Objetivo

Implementar uma função em Python que classifica clientes em segmentos baseados em três dimensões: **Recência**, **Frequência** e **Monetário** (RFM). O exercício avalia raciocínio sobre quantis, regras de classificação e tratamento de dados tabulares.

## O que é RFM

RFM é uma técnica clássica de segmentação de clientes que combina:

- **Recência (R):** quão recente foi a última compra do cliente.
- **Frequência (F):** quantas compras o cliente fez no período.
- **Monetário (M):** quanto o cliente gastou no total.

Cada dimensão recebe uma nota de **1 a 4** baseada em **quartis** sobre toda a base:

- **R:** 4 = compra mais recente; 1 = compra mais antiga.
- **F:** 4 = mais frequente; 1 = menos frequente.
- **M:** 4 = maior gasto; 1 = menor gasto.

## Função esperada

```python
def segment_customers(customers: list[dict], reference_date: str) -> list[dict]:
    """
    customers: lista de dicts com as chaves:
        - customer_id: str
        - last_purchase_date: str (ISO-8601)
        - order_count: int
        - total_spend: float
    reference_date: data de referência para calcular recência (ISO-8601).
    Retorna: lista de dicts com:
        - customer_id: str
        - r_score: int (1..4)
        - f_score: int (1..4)
        - m_score: int (1..4)
        - segment: str
    """
```

## Regras de segmento

A partir dos scores `(r, f, m)`, atribua o segmento:

| Segmento | Condição |
|---|---|
| `Champion` | r ≥ 4 e f ≥ 4 e m ≥ 4 |
| `Loyal` | r ≥ 3 e f ≥ 3 e não Champion |
| `At Risk` | r ≤ 2 e f ≥ 3 |
| `Lost` | r ≤ 1 e f ≤ 2 |
| `Regular` | qualquer outro caso |

## Exemplo

Entrada:

```python
customers = [
    {"customer_id": "c1", "last_purchase_date": "2026-05-10", "order_count": 25, "total_spend": 5000.0},
    {"customer_id": "c2", "last_purchase_date": "2026-04-01", "order_count": 3,  "total_spend": 150.0},
    # ... mais clientes
]
reference_date = "2026-05-13"
```

Saída esperada (formato):

```python
[
    {"customer_id": "c1", "r_score": 4, "f_score": 4, "m_score": 4, "segment": "Champion"},
    {"customer_id": "c2", "r_score": 2, "f_score": 1, "m_score": 1, "segment": "Regular"},
]
```

## Requisitos

- Os quartis devem ser calculados **sobre a base recebida** — não há valores fixos.
- Em caso de empate, mantenha **ordem estável** (mesma entrada → mesma saída).
- Use apenas a standard library do Python + `statistics` (sem `pandas`, `numpy`, etc.).
- Deve funcionar para até **100 mil clientes** em tempo razoável.

## Instruções

1. Crie um repositório privado no seu GitHub.
2. Implemente em `rfm.py` com a função `segment_customers`.
3. Escreva testes em `test_rfm.py` cobrindo:
   - Caminho feliz com diferentes segmentos representados.
   - Base com clientes com mesmos valores (empates nos quartis).
   - Base pequena (menos de 4 clientes) — como você lida?
4. Documente as decisões de design no README (especialmente como você tratou empates e bases pequenas).

## Dica

Calcule os pontos de corte (quartis) uma única vez ordenando cada dimensão. Depois, classificar cada cliente é só uma comparação — não há necessidade de algoritmos complexos.

Boa sorte!
