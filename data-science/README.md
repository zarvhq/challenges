# Data Scientist — Customer RFM Segmentation

## Objective

Implement a Python function that classifies customers into segments based on three dimensions: **Recency**, **Frequency**, and **Monetary** value (RFM). The exercise assesses reasoning about quantiles, classification rules, and tabular data handling.

## What RFM is

RFM is a classic customer-segmentation technique that combines:

- **Recency (R):** how recently the customer made their last purchase.
- **Frequency (F):** how many purchases the customer has made.
- **Monetary (M):** how much the customer has spent in total.

Each dimension receives a score from **1 to 4** based on **quartiles** computed over the whole base:

- **R:** 4 = most recent purchase; 1 = oldest purchase.
- **F:** 4 = most frequent; 1 = least frequent.
- **M:** 4 = highest spend; 1 = lowest spend.

## Expected function

```python
def segment_customers(customers: list[dict], reference_date: str) -> list[dict]:
    """
    customers: list of dicts with the keys:
        - customer_id: str
        - last_purchase_date: str (ISO-8601)
        - order_count: int
        - total_spend: float
    reference_date: ISO-8601 date used to compute recency.
    Returns: list of dicts with:
        - customer_id: str
        - r_score: int (1..4)
        - f_score: int (1..4)
        - m_score: int (1..4)
        - segment: str
    """
```

## Segment rules

Given the scores `(r, f, m)`, assign the segment:

| Segment | Condition |
|---|---|
| `Champion` | r ≥ 4 and f ≥ 4 and m ≥ 4 |
| `Loyal` | r ≥ 3 and f ≥ 3 and not Champion |
| `At Risk` | r ≤ 2 and f ≥ 3 |
| `Lost` | r ≤ 1 and f ≤ 2 |
| `Regular` | any other case |

## Example

Input:

```python
customers = [
    {"customer_id": "c1", "last_purchase_date": "2026-05-10", "order_count": 25, "total_spend": 5000.0},
    {"customer_id": "c2", "last_purchase_date": "2026-04-01", "order_count": 3,  "total_spend": 150.0},
    # ... more customers
]
reference_date = "2026-05-13"
```

Expected output (shape):

```python
[
    {"customer_id": "c1", "r_score": 4, "f_score": 4, "m_score": 4, "segment": "Champion"},
    {"customer_id": "c2", "r_score": 2, "f_score": 1, "m_score": 1, "segment": "Regular"},
]
```

## Requirements

- Quartiles must be computed **over the provided base** — no fixed thresholds.
- In case of ties, keep **stable ordering** (same input → same output).
- Use only the Python standard library plus `statistics` (no `pandas`, `numpy`, etc.).
- Must handle up to **100,000 customers** in reasonable time.

## Instructions

1. Create a private repository on your GitHub account.
2. Implement the solution in `rfm.py` with the function `segment_customers`.
3. Add tests in `test_rfm.py` covering:
   - Happy path with several segments represented.
   - Base with customers sharing equal values (ties in quartiles).
   - Small base (fewer than 4 customers) — how do you handle it?
4. Document your design decisions in the README (especially how you handle ties and small bases).

## Hint

Compute the cut points (quartiles) once by sorting each dimension. Classifying each customer is then a simple comparison — no need for complex algorithms.

Good luck!
