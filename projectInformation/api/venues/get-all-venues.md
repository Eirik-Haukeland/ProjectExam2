# get all venues

the most up to date information is availabe here: https://docs.noroff.dev/holidaze/venues#all-entries

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/venues
http method: "GET"

## request venues

request url query options:
- sort (optinal): name of the feeld you want the resault sorted in posible options are: "id", "name", "description", "media", "media", "price", "maxGuests", "rating", "created", "updated", "meta", "location" if _customer or _venue is true you can also use "customer" or "venue" respectivly
- sortOrder (optinal): "asc"(asending) or desc(descending) sort order
- limit (optinal): number representing the maximum amount of resaults for this request (used for pagination)
- offset (optinal): number representing how many posible resaults to skip for this request (used for pagination)
- _bookings (optional): "true" or "false"(default) whether nor not to include bookings in the responsees
- _owner (optional): "true" or "false"(default) whether nor not to include information about the owner

example request url:
 https://api.noroff.dev/api/v1/holidaze/venues?sort=id&limit=10&offset=30
 
example request object: 
{
  method: "GET,
  headers: {
    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
  }
}

the above examples shuld resault in a list of venues objects, that are sorted by id, starting at 31th resault and going to 40th resaults if there are any available.

## response on success

###  https://api.noroff.dev/api/v1/holidaze/venues?sort=id&limit=10&offset=30 (on 10 jan. 2024)
```json
  [
    {
      "id": "e40b77d9-c52a-491f-9949-6cafa728eecb",
      "name": "my venue",
      "description": "kjnn",
      "media": [
        "https://tinyjpg.com/images/social/website.jpg"
      ],
      "price": 2,
      "maxGuests": 1,
      "rating": 0,
      "created": "2023-12-05T21:42:43.429Z",
      "updated": "2023-12-05T21:42:43.429Z",
      "meta": {
        "wifi": true,
        "parking": false,
        "breakfast": true,
        "pets": false
      },
      "location": {
        "address": "Unknown",
        "city": "Unknown",
        "zip": "Unknown",
        "country": "Unknown",
        "continent": "Unknown",
        "lat": 0,
        "lng": 0
      }
    },
    {
      "id": "e2d114f9-2119-4213-a549-b673ebbeef14",
      "name": "Nerja Pier",
      "description": "assadfjasfasdf",
      "media": [
        "https://images.pexels.com/photos/297984/pexels-photo-297984.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/297984/pexels-photo-297984.jpeg?auto=compress&cs=tinysrgb&w=1200"
      ],
      "price": 1,
      "maxGuests": 1,
      "rating": 0,
      "created": "2023-10-22T13:48:06.041Z",
      "updated": "2023-10-22T13:48:06.041Z",
      "meta": {
        "wifi": false,
        "parking": true,
        "breakfast": true,
        "pets": false
      },
      "location": {
        "address": "lkjsdlkadf",
        "city": "lkadjfladf",
        "zip": "lkjdfsdf",
        "country": "laksjdfalsdf",
        "continent": "kasjdflkajdf",
        "lat": 0,
        "lng": 0
      }
    },
    
    ...

    {
      "id": "dd0c1a62-b405-495e-86a3-5f816528a355",
      "name": "test111",
      "description": "sdaasdasd",
      "media": [],
      "price": 299,
      "maxGuests": 1,
      "rating": 0,
      "created": "2023-12-03T11:38:39.178Z",
      "updated": "2023-12-03T11:38:39.178Z",
      "meta": {
        "wifi": true,
        "parking": true,
        "breakfast": true,
        "pets": true
      },
      "location": {
        "address": "asdasdasd",
        "city": "asdasd",
        "zip": "Unknown",
        "country": "asdasd",
        "continent": "Unknown",
        "lat": 0,
        "lng": 0
      }
    },
    {
      "id": "db6fac1c-47b9-451e-a36f-cf503cf50686",
      "name": "Cabin in the woods",
      "description": "Beautiful simple cabin in the woods, fired up with firewood and has a great view",
      "media": [
        "https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA"
      ],
      "price": 500,
      "maxGuests": 5,
      "rating": 4,
      "created": "2023-10-07T15:21:50.108Z",
      "updated": "2023-10-07T15:21:50.108Z",
      "meta": {
        "wifi": false,
        "parking": false,
        "breakfast": false,
        "pets": false
      },
      "location": {
        "address": "",
        "city": "",
        "zip": "",
        "country": "",
        "continent": "",
        "lat": 0,
        "lng": 0
      }
    }
]
```