--This simulates a query using FOR JSON PATH
SELECT '{
  "monthly_orders": [
    {
      "month": "Jan",
      "orders": 1229
    },
    {
      "month": "Feb",
      "orders": 3987
    },
    {
      "month": "Mar",
      "orders": 4002
    },
    {
      "month": "Apr",
      "orders": 1670
    },
    {
      "month": "May",
      "orders": 991
    },
    {
      "month": "Jun",
      "orders": 1002
    },
    {
      "month": "Jul",
      "orders": 3232
    },
    {
      "month": "Aug",
      "orders": 1209
    },
    {
      "month": "Sep",
      "orders": 1442
    },
    {
      "month": "Oct",
      "orders": 1550
    },
    {
      "month": "Nov",
      "orders": 2120
    },
    {
      "month": "Dec",
      "orders": 1010
    }
  ],

  "purchase_orders": [
    {
      "purchase_order_id": "PO12345",
      "order_status": "Open",
      "supplier": "Supplier A",
      "order_date": "2023-07-29",
      "lines": [
        {
          "stock_code": "ABC123",
          "description": "Product 1",
          "order_quantity": 100,
          "material_cost": 50.0,
          "product_class": "Class A",
          "due_date": "2023-08-15",
          "arrived": false
        },
        {
          "stock_code": "DEF456",
          "description": "Product 2",
          "order_quantity": 50,
          "material_cost": 70.0,
          "product_class": "Class A",
          "due_date": "2023-08-10",
          "arrived": true
        }
      ]
    },
    {
      "purchase_order_id": "PO67890",
      "order_status": "Delayed",
      "supplier": "Supplier B",
      "order_date": "2023-08-01",
      "lines": [
        {
          "stock_code": "GHI789",
          "description": "Product 3",
          "order_quantity": 200,
          "material_cost": 30.0,
          "product_class": "Class B",
          "due_date": "2023-09-05",
          "arrived": false
        }
      ]
    },
    {
      "purchase_order_id": "PO24680",
      "order_status": "Arrived",
      "supplier": "Supplier C",
      "order_date": "2023-08-05",
      "lines": [
        {
          "stock_code": "JKL101",
          "description": "Product 4",
          "order_quantity": 75,
          "material_cost": 20.0,
          "product_class": "Class C",
          "due_date": "2023-08-25",
          "arrived": true
        },
        {
          "stock_code": "MNO123",
          "description": "Product 5",
          "order_quantity": 150,
          "material_cost": 25.0,
          "product_class": "Class B",
          "due_date": "2023-09-01",
          "arrived": true
        }
      ]
    },

    {
      "purchase_order_id": "PO13579",
      "order_status": "Open",
      "supplier": "Supplier A",
      "order_date": "2023-08-10",
      "lines": [
        {
          "stock_code": "PQR246",
          "description": "Product 6",
          "order_quantity": 120,
          "material_cost": 40.0,
          "product_class": "Class A",
          "due_date": "2023-09-20",
          "arrived": false
        },
        {
          "stock_code": "STU357",
          "description": "Product 7",
          "order_quantity": 80,
          "material_cost": 60.0,
          "product_class": "Class A",
          "due_date": "2023-09-15",
          "arrived": true
        }
      ]
    },
    {
      "purchase_order_id": "PO24688",
      "order_status": "Delayed",
      "supplier": "Supplier A",
      "order_date": "2023-08-15",
      "lines": [
        {
          "stock_code": "VWX468",
          "description": "Product 8",
          "order_quantity": 50,
          "material_cost": 25.0,
          "product_class": "Class B",
          "due_date": "2023-09-05",
          "arrived": false
        },
        {
          "stock_code": "YZA579",
          "description": "Product 9",
          "order_quantity": 30,
          "material_cost": 35.0,
          "product_class": "Class C",
          "due_date": "2023-09-10",
          "arrived": true
        },
        {
          "stock_code": "BCD680",
          "description": "Product 10",
          "order_quantity": 70,
          "material_cost": 30.0,
          "product_class": "Class A",
          "due_date": "2023-09-25",
          "arrived": true
        }
      ]
    },
    {
      "purchase_order_id": "PO12348",
      "order_status": "Open",
      "supplier": "Supplier A",
      "order_date": "2023-07-29",
      "lines": [
        {
          "stock_code": "ABC123",
          "description": "Product 1",
          "order_quantity": 100,
          "material_cost": 50.0,
          "product_class": "Class A",
          "due_date": "2023-08-15",
          "arrived": false
        },
        {
          "stock_code": "DEF456",
          "description": "Product 2",
          "order_quantity": 50,
          "material_cost": 70.0,
          "product_class": "Class A",
          "due_date": "2023-08-10",
          "arrived": true
        }
      ]
    },
    {
      "purchase_order_id": "PO6721",
      "order_status": "Delayed",
      "supplier": "Supplier B",
      "order_date": "2023-08-01",
      "lines": [
        {
          "stock_code": "GHI789",
          "description": "Product 3",
          "order_quantity": 200,
          "material_cost": 30.0,
          "product_class": "Class B",
          "due_date": "2023-09-05",
          "arrived": false
        }
      ]
    },
    {
      "purchase_order_id": "PO24622",
      "order_status": "Arrived",
      "supplier": "Supplier C",
      "order_date": "2023-08-05",
      "lines": [
        {
          "stock_code": "JKL101",
          "description": "Product 4",
          "order_quantity": 75,
          "material_cost": 20.0,
          "product_class": "Class C",
          "due_date": "2023-08-25",
          "arrived": true
        },
        {
          "stock_code": "MNO123",
          "description": "Product 5",
          "order_quantity": 150,
          "material_cost": 25.0,
          "product_class": "Class B",
          "due_date": "2023-09-01",
          "arrived": true
        }
      ]
    },

    {
      "purchase_order_id": "PO13521",
      "order_status": "Open",
      "supplier": "Supplier A",
      "order_date": "2023-08-10",
      "lines": [
        {
          "stock_code": "PQR246",
          "description": "Product 6",
          "order_quantity": 120,
          "material_cost": 40.0,
          "product_class": "Class A",
          "due_date": "2023-09-20",
          "arrived": false
        },
        {
          "stock_code": "STU357",
          "description": "Product 7",
          "order_quantity": 80,
          "material_cost": 60.0,
          "product_class": "Class A",
          "due_date": "2023-09-15",
          "arrived": true
        }
      ]
    },
    {
      "purchase_order_id": "PO24622",
      "order_status": "Delayed",
      "supplier": "Supplier A",
      "order_date": "2023-08-15",
      "lines": [
        {
          "stock_code": "VWX468",
          "description": "Product 8",
          "order_quantity": 50,
          "material_cost": 25.0,
          "product_class": "Class B",
          "due_date": "2023-09-05",
          "arrived": false
        },
        {
          "stock_code": "YZA579",
          "description": "Product 9",
          "order_quantity": 30,
          "material_cost": 35.0,
          "product_class": "Class C",
          "due_date": "2023-09-10",
          "arrived": true
        },
        {
          "stock_code": "BCD680",
          "description": "Product 10",
          "order_quantity": 70,
          "material_cost": 30.0,
          "product_class": "Class A",
          "due_date": "2023-09-25",
          "arrived": true
        }
      ]
    }
  ]
}
' as purchase_order_json;