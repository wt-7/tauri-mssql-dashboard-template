-- This simulates a query using FOR JSON PATH 
SELECT '{
	"product_id": "PROD001",
	"description": "Example Product",
	"components": [{
			"component_id": "COMP001",
			"description": "Component 1",
			"quantity_per": 2,
			"material_cost": 20.0,
			"labour_cost": 10.0,
			"supplier": "Supplier A",
			"date_created": "2023-07-29",
			"unallocated": 5
		},
		{
			"component_id": "COMP002",
			"description": "Component 2",
			"quantity_per": 1,
			"material_cost": 30.0,
			"labour_cost": 15.0,
			"supplier": "Supplier B",
			"date_created": "2023-07-28",
			"unallocated": 8
		},
		{
			"component_id": "COMP003",
			"description": "Component 3",
			"quantity_per": 3,
			"material_cost": 20.0,
			"labour_cost": 10.0,
			"supplier": "Supplier A",
			"date_created": "2023-07-29",
			"unallocated": 1
		},
		{
			"component_id": "COMP004",
			"description": "Component 4",
			"quantity_per": 1,
			"material_cost": 30.0,
			"labour_cost": 15.0,
			"supplier": "Supplier B",
			"date_created": "2023-07-28",
			"unallocated": 0
		},
		{
			"component_id": "COMP005",
			"description": "Component 5",
			"quantity_per": 2,
			"material_cost": 20.5,
			"labour_cost": 10.0,
			"supplier": "Supplier A",
			"date_created": "2023-07-29",
			"unallocated": 5
		},
		{
			"component_id": "COMP006",
			"description": "Component 6",
			"quantity_per": 1,
			"material_cost": 35.0,
			"labour_cost": 15.0,
			"supplier": "Supplier B",
			"date_created": "2023-07-28",
			"unallocated": 8
		}
	],
	"sales_orders": [{
			"sales_order_id": "SO12345",
			"location": "Site X",
			"customer": "Customer A",
			"order_date": "2023-07-15",
			"order_quantity": 100,
			"build_cost": 2500.0,
			"sale_price": 3500.0,
			"percent_complete": 60
		},
		{
			"sales_order_id": "SO67890",
			"location": "Site Y",
			"customer": "Customer B",
			"order_date": "2023-07-20",
			"order_quantity": 50,
			"build_cost": 1300.0,
			"sale_price": 2000.0,
			"percent_complete": 0
		},
		{
			"sales_order_id": "SO12345",
			"location": "Site Z",
			"customer": "Customer A",
			"order_date": "2023-07-15",
			"completion_date": "2023-08-15",
			"order_quantity": 100,
			"build_cost": 2500.0,
			"sale_price": 3500.0,
			"percent_complete": 100
		},
		{
			"sales_order_id": "SO67890",
			"location": "Site B",
			"customer": "Customer B",
			"order_date": "2023-07-20",
			"order_quantity": 50,
			"build_cost": 1300.0,
			"sale_price": 2000.0,
			"percent_complete": 90
		}
	]
}' AS product_json;