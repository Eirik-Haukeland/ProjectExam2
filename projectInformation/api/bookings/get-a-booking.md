# get a booking object
the most up to date information is availabe here: https://docs.noroff.dev/holidaze/bookings#single-entry

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/bookings/{booking id}
http method: "GET"

## request users
request url query options:
- id (**required**): the id ot the booking you want to get
- _customer (optional): "true" or "false"(default) whether nor not to include customer data in the response
- _venues (optional): "true" or "false"(default) whether nor not to include venues in the response

example request url:
 https://api.noroff.dev/api/v1/holidaze/bookings/fffa32ea-af8d-4db3-a2be-a87bb3b5e0ba

example request object: 
{
  method: "GET,
  headers: {
    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
  }
}

## response on success

### https://api.noroff.dev/api/v1/holidaze/bookings/fffa32ea-af8d-4db3-a2be-a87bb3b5e0ba (on 8 jan. 2024)
```json
  {
    "id": "fffa32ea-af8d-4db3-a2be-a87bb3b5e0ba",
    "dateFrom": "2023-10-31T23:00:00.000Z",
    "dateTo": "2023-11-21T23:00:00.000Z",
    "guests": 1,
    "created": "2023-11-22T09:15:19.175Z",
    "updated": "2023-11-22T09:15:19.175Z",
    "venue": {
      "id": "987eb21d-0603-47f6-94d0-2e9bb57b4700",
      "name": "zzz",
      "description": "lololo",
      "media": [
        "https://hips.hearstapps.com/hmg-prod/images/best-winter-cabins-1638300737.jpg"
      ],
      "price": 2,
      "maxGuests": 2,
      "rating": 0,
      "created": "2023-09-23T00:17:44.422Z",
      "updated": "2023-09-23T00:17:44.422Z",
      "meta": {
        "wifi": true,
        "parking": true,
        "breakfast": true,
        "pets": false
      },
      "location": {
        "address": "Unknown",
        "city": "geneva",
        "zip": "Unknown",
        "country": "switzerland",
        "continent": "Unknown",
        "lat": 0,
        "lng": 0
      }
    }
  }
```

## response on bad url option

none-exsisting userName:
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