# Tauri MSSQL Dashboard Template

A fast and modern desktop application template designed to interface with MSSQL databases. Built with [Tauri](https://tauri.app/), [Next.js 13](https://nextjs.org/), [Tailwind](https://tailwindcss.com), and [shadcn/ui](https://ui.shadcn.com/).

## Why?

Many enterprise applications rely on Microsoft SQL Server (MSSQL) databases. Enterprise software is often poorly regarded, and support for MSSQL outside of the .NET ecosystem is not very strong. This template provides useful patterns and implementations for creating Tauri applications that interact with MSSQL databases, and is an ideal starting point for  building internal tools, data visualization applications, or business intelligence dashboards.

## Requirements
- See [Tauri prequisites](https://tauri.app/v1/guides/getting-started/prerequisites)

## Installation
1. Clone the repo `git clone https://github.com/wt-7/tauri-mssql-dashboard`
2. Install dependencies `pnpm i` 
3. `pnpm tauri dev` 
   

For the example to work, input your server connection string into `CONNECTION_STRING` in `main.rs` in Tiberius' [format](https://docs.rs/tiberius/latest/tiberius/struct.Config.html#method.from_ado_string) (or use a [Config](https://docs.rs/tiberius/latest/tiberius/struct.Config.html) object).  

An easy way to get a SQL server running in development is through Docker.  




## Stack
- Core
  - Tauri
  - Next.js / React
  - Tiberius
- State management
  - Tanstack Query
  - Jotai
- Styling
  - Tailwind
  - shadcn/ui
- Data
  - Tanstack Table
  - Recharts
## Features
- Example data fetching
- Example components
- Next.js app router
- [bb8](https://docs.rs/bb8/latest/bb8/) managed connection pool

## Tips
- Use `FOR JSON PATH` SQL queries to return a JSON string directly from the server. This can simplify your data models, and make serde do a lot of the heavy lifting.
- Dynamic routes [don't work](https://github.com/vercel/next.js/issues/48022) with Tauri and the Next.js app router.



## Screenshots
### Example page 1: Products
![Example page 1](/docs/products.png?raw=true)



### Example page 2: Purchase Orders
![Example page 2](/docs/purchase-orders.png?raw=true)




## License

[MIT license](https://opensource.org/licenses/MIT)