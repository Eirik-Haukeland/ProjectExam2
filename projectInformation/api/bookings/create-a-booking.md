# create a booking
the most up to date information is availabe here: https://docs.noroff.dev/holidaze/bookings#create-entry

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/bookings
http method: "POST"

## request
request url query options:
- _customer (optional): "true" or "false"(default) whether nor not to include customer data in the response
- _venues (optional): "true" or "false"(default) whether nor not to include venues in the response

example request url:
 https://api.noroff.dev/api/v1/holidaze/bookings

example request object: 
{
  method: "POST",
  body: {
    dateFrom: "2024-01-10T05:55:09.475Z",
    dateTo: "2024-01-10T05:55:09.475Z",
    guests: 1,
    venueId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  },
  headers: {
    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
  }
}

## response on success

### https://api.noroff.dev/api/v1/holidaze/bookings (on 10 jan. 2024)
```json
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "dateFrom": "2024-01-10T05:49:38.084Z",
    "dateTo": "2024-01-10T05:49:38.084Z",
    "guests": 1,
    "created": "2024-01-10T05:49:38.084Z",
    "updated": "2024-01-10T05:49:38.084Z",
  }
```

## examples of response on bad body option

bad id:
```json
  {
    "errors": [
      {
        "message": "No venue with this id"
      }
    ],
    "status": "Not Found",
    "statusCode": 404
}
```
missing id:
```json
  {
    "errors": [
      {
        "code": "invalid_type",
        "message": "venueId is required",
        "path": [
          "venueId"
        ]
      }
    ],
    "status": "Bad Request",
    "statusCode": 400
  }
```