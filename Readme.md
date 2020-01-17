# Order API overview
This repo holds the code for the Order API.

## Purpose
The purpose of this application is to create order and manager inventory/.

## Setting up
Start by installing all the NodeJS dependencies & pakages by moving to this directory in your terminal `cd <location of the directory>` & run the `npm install` command.

## Application structure overview
The parent folders for this project are model, node_modules, reference, routes, test, and utility

 - *models* contains all project entities

 - *services* contains project services

 - *queries* contains services on entity level

 - *node_modules* contains all of our NodeJS dependencies & packages

 - *routes* contains the express routes for the API. They are referenced in app.js at startup.

 - *test* contains a mocks folder, which holds the mocks for unit testing, & the unit tests for each portion of the application.



## Running the application
Run `npm start` to start the application itself.
If you want to develop with live reloads, start the application with the `npm dev` command. After every file change, the application will stop and restart.

## Running tests
Run the entire test suite with the `npm run localtest` command.
To run a specific test, cd to this directory's test folder & run the `mocha <name of test>` command.

## End points 

1) POST http://localhost:3000/inventories  		- Read all inventory items

    1.1) Request Example: 

        ```json
        {
            "name": "Inventory7",
            "description":"Inventory Description 7" ,
            "price": 20,
            "quantity": 1
        }
        ```

        1.2) Response Example: 

        ```json
        {
            "message": "Inventory id 8 created"
        }
        ```

2) GET http://localhost:3000/inventories/3   		- Read single inventory item

    2.1) Response Example: 
```json
        {
            "id": 3,
            "name": "Inventory1",
            "description": "Inventory Description 1",
            "price": "5.00",
            "quantity": 10
        }
```



3) PUT http://localhost:3000/inventories/8 		- Update inventory item
    3.1) Request Example: 
```json
        {
        "price": 5000
        }    
```

    3.1) Response Example: 
  ```json
        {
            "message": "Inventory id 8 updated"
        }
  ```
4) DELETE http://localhost:3000/inventories/4 		- Delete inventory item
    4.1) Response Example: 
  ```json
        {
            "message": "Inventory id 8 deleted"
        }
  ```

5)  POST http://localhost:3000/orders 				-  Create order
    5.1) Request Example:
```json 

    {
        "email": "test@gmail.com", "inventories":[5,4,4]
    }
```
```json
    {
        "order": {
            "id": 72,
            "email": "test@gmail.com",
            "status": "A",
            "dateOrderPlaced": "2020-01-17T05:31:36.000Z",
            "Inventories": [
                {
                    "name": "Inventory3",
                    "description": "Inventory Description 3",
                    "id": 5,
                    "OrderInventory": {
                        "quantityOrdered": 1
                    }
                },
                {
                    "name": "Inventory2",
                    "description": "Inventory Description 2",
                    "id": 4,
                    "OrderInventory": {
                        "quantityOrdered": 2
                    }
                }
            ]
        },
        "warning": [],
        "message": "Order created sucessfull"
    }
```

6) DELETE http://localhost:3000/orders/1 		- Delete inventory item
    6.1) Response Example: 
  ```json
        {
            "message": "Order id 8 deleted"
        }
  ```
7) GET http://localhost:3000/orders 				- Read all orders
    7.1) Response Example: 
  ```json
    [
        {
            "id":63,
            "email":"test@gmail.com",
            "status":"A",
            "dateOrderPlaced":"2020-01-17T05:19:56.000Z",
            "Inventories":[
                {
                    "name":"Inventory2",
                    "description":"Inventory Description 2",
                    "id":4,
                    "quantity":50,
                    "OrderInventory":{
                    "quantityOrdered":2
                    }
                }
            ]
        },
        {
            "id":64,
            "email":"test@gmail.com",
            "status":"A",
            "dateOrderPlaced":"2020-01-17T05:23:51.000Z",
            "Inventories":[
                {
                    "name":"Inventory2",
                    "description":"Inventory Description 2",
                    "id":4,
                    "quantity":50,
                    "OrderInventory":{
                    "quantityOrdered":2
                    }
                }
            ]
        }
    ]
  ```
8) GET http://localhost:3000/orders/63				- Read an order
    7.1) Response Example: 
  ```json
{
   "id":63,
   "email":"test@gmail.com",
   "status":"A",
   "dateOrderPlaced":"2020-01-17T05:19:56.000Z",
   "Inventories":[
      {
         "name":"Inventory2",
         "description":"Inventory Description 2",
         "id":4,
         "quantity":50,
         "OrderInventory":{
            "quantityOrdered":2
         }
      }
   ]
}
}
  ```

9) PUT http://localhost:3000/orders/63				- Update order

    9.1) Request Example: 
```json
   {
        "email": "fsr.develope.r@gmail.com"
    }     
```

    9.2) Response Example: 
```json
        {
            "message": "Order id 63 updated"
        }
```

10) PUT http://localhost:3000/orders/63/cancelation 	- Cancel order

10.1) Response Example: 
```json
        {
            "message": "Order id 63 updated"
        }
```
