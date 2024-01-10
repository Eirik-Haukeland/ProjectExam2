# get a booking object
the most up to date information is availabe here: https://docs.noroff.dev/holidaze/bookings#single-entry

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/profiles/{userName}
http method: "GET"

## request users
request url query options:
- id (**required**): the id ot the booking you want to get
- _customer (optional): "true" or "false"(default) whether nor not to include customer data in the response
- _venues (optional): "true" or "false"(default) whether nor not to include venues in the response

example request url:
 https://api.noroff.dev/api/v1/holidaze/profiles/3fa85f64-5717-4562-b3fc-2c963f66afa6

example request object: 
{
  method: "GET,
  headers: {
    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
  }
}

## response on success

### https://api.noroff.dev/api/v1/holidaze/profiles/3fa85f64-5717-4562-b3fc-2c963f66afa6 (on 8 jan. 2024)
```json
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "dateFrom": "2024-01-10T05:49:38.084Z",
    "dateTo": "2024-01-10T05:49:38.084Z",
    "guests": 0,
    "created": "2024-01-10T05:49:38.084Z",
    "updated": "2024-01-10T05:49:38.084Z",
  }
```

## response on bad url option

none-exsisting id:
```json
  {
    "errors": [
      {
        "message": "No booking with this id"
      }
    ],
    "status": "Not Found",
    "statusCode": 404
}
```