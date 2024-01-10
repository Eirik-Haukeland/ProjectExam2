# change a booking
the most up to date information is availabe here: https://docs.noroff.dev/holidaze/bookings#single-entry

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/bookings/{booking id}
http method: "PUT"

## request
request url query options:
- id (**required**): the id ot the booking you want to get
- _customer (optional): "true" or "false"(default) whether nor not to include customer data in the response
- _venues (optional): "true" or "false"(default) whether nor not to include venues in the response

example request url:
 https://api.noroff.dev/api/v1/holidaze/bookings/{booking id}

**note:** while all body optins are optinal at leest one of them must be included
example request object: 
{
  method: "PUT",
  body: {
    dateFrom: "2024-01-10T05:55:09.475Z", //optional new date string
    dateTo: "2024-01-10T05:55:09.475Z", // optional new date string
    guests: 1 // optional new amount of guest
  },
  headers: {
    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
  }
}

## response on success

### https://api.noroff.dev/api/v1/holidaze/bookings/7edd5561-96d5-4784-84d9-f4d8a3e5d30b (on 10 jan. 2024)
```json
  {
  "id": "7edd5561-96d5-4784-84d9-f4d8a3e5d30b",
  "dateFrom": "2024-01-10T06:11:54.288Z",
  "dateTo": "2024-01-10T06:11:54.288Z",
  "guests": 1,
  "created": "2024-01-10T06:06:56.928Z",
  "updated": "2024-01-10T06:08:54.510Z"
}
```

## examples of response on bad url

bad id:
```json
  {
    "errors": [
      {
        "message": "No booking with such ID"
      }
    ],
    "status": "Not Found",
    "statusCode": 404
  }
```


## examples of response on bad body option

bad guest option:
```json
  {
    "errors": [
      {
        "code": "invalid_type",
        "message": "Guests must be a number",
        "path": [
          "guests"
        ]
      }
    ],
    "status": "Bad Request",
    "statusCode": 400
  }
```

missing all body options:
```json
  {
    "errors": [
      {
        "code": "custom",
        "message": "You must provide either dateFrom, dateTo, or guests",
        "path": []
      }
    ],
    "status": "Bad Request",
    "statusCode": 400
  }
```