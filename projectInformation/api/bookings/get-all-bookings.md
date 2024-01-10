# get all bookings

the most up to date information is availabe here: https://docs.noroff.dev/holidaze/bookings#all-entries

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/bookings
http method: "GET"

## request bookings

request url query options:
- sort (optinal): name of the feeld you want the resault sorted in posible options are: "id", "dateFrom", "dateTo", "guests", "created", "updated", if _customer or _venue is true you can also use "customer" or venue respectivly
- sortOrder (optinal): "asc"(asending) or desc(descending) sort order
- limit (optinal): number representing the maximum amount of resaults for this request (used for pagination)
- offset (optinal): number representing how many posible resaults to skip for this request (used for pagination)
- _customer (optional): "true" or "false"(default) whether nor not to include customer data in the responsees
- _venues (optional): "true" or "false"(default) whether nor not to include venues in the responsees

example request url:
 https://api.noroff.dev/api/v1/holidaze/bookings?sort=dateFrom&limit=10&offset=30
 
example request object: 
{
  method: "GET,
  headers: {
    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
  }
}

the above examples shuld resault in a list of bookings objects, that are sorted by date the booking begins, starting at 31th resault and going to 40th resaults if there are any available.

## response on success

###  https://api.noroff.dev/api/v1/holidaze/bookings?sort=dateFrom&limit=10&offset=30 (on 10 jan. 2024)
```json
  [
    {
      "id": "41315a12-8e80-424b-b019-d7eeacff6b4b",
      "dateFrom": "2024-03-28T21:32:30.000Z",
      "dateTo": "2024-07-31T20:32:30.000Z",
      "guests": 1,
      "created": "2023-12-08T21:33:35.619Z",
      "updated": "2023-12-08T21:33:35.619Z",
      "customer": {
        "name": "smeckel",
        "email": "smeckel@stud.noroff.no",
        "avatar": "https://images.pexels.com/photos/6833461/pexels-photo-6833461.jpeg?auto=compress&cs=tinysrgb&w=1600"
      }
    },
    {
      "id": "74b5c696-1a3a-415f-a445-7d92c1f97ce7",
      "dateFrom": "2024-03-28T00:00:00.000Z",
      "dateTo": "2024-03-31T00:00:00.000Z",
      "guests": 1,
      "created": "2023-12-02T22:00:04.161Z",
      "updated": "2023-12-02T22:00:04.161Z",
      "customer": {
        "name": "eye",
        "email": "eye@noroff.no",
        "avatar": "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
      }
    },

    ...

    {
      "id": "07439bb5-9f2e-405a-87bd-e44088471d84",
      "dateFrom": "2024-03-10T17:06:33.000Z",
      "dateTo": "2024-03-11T17:06:33.000Z",
      "guests": 1,
      "created": "2023-11-20T17:07:25.822Z",
      "updated": "2023-11-20T17:07:25.822Z",
      "customer": {
        "name": "yololko1",
        "email": "yololko1@stud.noroff.no",
        "avatar": "https://picsum.photos/200/200"
      }
    },
    {
      "id": "932938fb-8e36-48ec-bd43-977b96a7bbaa",
      "dateFrom": "2024-03-06T23:00:00.000Z",
      "dateTo": "2024-03-08T22:59:59.999Z",
      "guests": 1,
      "created": "2023-11-30T01:36:29.662Z",
      "updated": "2023-11-30T01:36:29.662Z",
      "customer": {
        "name": "robert1234",
        "email": "robert1234@stud.noroff.no",
        "avatar": "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
      }
    }
  ]
```

## response on bad url option:
```json
  {
    "errors": [
      {
        "name": "PrismaClientValidationError",
        "clientVersion": "5.4.1"
      }
    ],
    "status": "Internal Server Error",
    "statusCode": 500
  }
```