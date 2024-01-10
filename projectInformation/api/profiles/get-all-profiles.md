# get a listing of all profiles matching query

the most up to date information is availabe here: https://docs.noroff.dev/holidaze/profiles#all-entries

**note:** you must autherice your self to use this endpoint. [for more information on authentication see here](../api-guide.md#sending-authentication-token)

complete url: https://api.noroff.dev/api/v1/holidaze/profiles
http method: "GET"

## request users

request url query options:
- sort (optinal): name of the feeld you want the resault sorted in posible options are: "name", "email", "avatar", "venueManager", "_count"
- sortOrder (optinal): "asc"(asending) or desc(descending) sort order
- limit (optinal): number representing the maximum amount of resaults for this request (used for pagination)
- offset (optinal): number representing how many posible resaults to skip for this request (used for pagination)
- _bookings (optional): "true" or "false"(default) whether nor not to include bookings in the responsees
- _venues (optional): "true" or "false"(default) whether nor not to include venues in the responsees

example request url:
 https://api.noroff.dev/api/v1/holidaze/profiles?sort=email&limit=10&offset=30
 
example request object: 
{
  method: "GET,
  headers: {
    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
  }
}

the above examples shuld resault in a list of profile objects that are sorted 
by email addess starting at 31th resault and going to 40th resaults if there are any available.

## response on success

### https://api.noroff.dev/api/v1/holidaze/profiles?sort=email&limit=10&offset=30 (on 8 jan. 2024)
```json
  [
    {
      "name": "thisismyname",
      "email": "woidajwidw@stud.noroff.no",
      "avatar": "",
      "venueManager": false,
      "_count": {
        "venues": 0,
        "bookings": 0
      }
    },
    {
      "name": "wise",
      "email": "wise@noroff.no",
      "avatar": "",
      "venueManager": true,
      "_count": {
        "venues": 1,
        "bookings": 0
      }
    },

  ... scipping six resaults for brevity
    
    {
      "name": "vvv",
      "email": "vvv@stud.noroff.no",
      "avatar": "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTyya-iJrdM6II6svo4re02CEfbPDw6FAlLY_hMTAOMNe6XfV2av0nXOplFHCq4U6aWcrPr4_cIGk47T_Y",
      "venueManager": true,
      "_count": {
        "venues": 0,
        "bookings": 0
      }
    },
    {
      "name": "venuemanager",
      "email": "vt123@stud.noroff.no",
      "avatar": "",
      "venueManager": true,
      "_count": {
        "venues": 1,
        "bookings": 0
      }
    }
  ]
```

### https://api.noroff.dev/api/v1/holidaze/profiles?limit=5&_venues=true (on 8 jan. 2024)
```json
  [
    {
      "name": "zzz",
      "email": "zzz@stud.noroff.no",
      "avatar": "https://images.unsplash.com/photo-1530092285049-1c42085fd395?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2hpdGUlMjBmbG93ZXJ8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
      "venueManager": true,
      "venues": [
        {
          "id": "b1a681c7-412b-4ae6-b2ce-72e9507f8cd6",
          "name": "cccc",
          "description": "glam camping",
          "media": [
            "https://campingcortijo.com/wp-content/uploads/2022/05/glam-4-pro-amarillo-06.jpg"
          ],
          "price": 1,
          "maxGuests": 1,
          "rating": 0,
          "created": "2023-09-26T13:28:28.363Z",
          "updated": "2023-09-26T13:28:28.363Z",
          "meta": {
            "wifi": true,
            "parking": false,
            "breakfast": true,
            "pets": true
          },
          "location": {
            "address": "Unknown",
            "city": "Ontario",
            "zip": "Unknown",
            "country": "Canada",
            "continent": "Unknown",
            "lat": 0,
            "lng": 0
          }
        }
      ],
        "_count": {
          "venues": 1,
          "bookings": 1
        }
      },
      {
        "name": "zxzxczxcxc",
        "email": "sadasdasd@stud.noroff.no",
        "avatar": "",
        "venueManager": false,
        "venues": [],
        "_count": {
          "venues": 0,
          "bookings": 0
        }
      },
      {
        "name": "zxzx",
        "email": "zxzx@stud.noroff.no",
        "avatar": "https://i.pinimg.com/originals/e0/e3/d0/e0e3d08f2f6bdafc73351569c6647a34.png",
        "venueManager": false,
        "venues": [],
        "_count": {
          "venues": 0,
          "bookings": 0
        }
      },
      {
        "name": "Ziya",
        "email": "ziya@stud.noroff.no",
        "avatar": "",
        "venueManager": true,
        "venues": [
          {
            "id": "74a6c2f7-72ff-4905-91de-6bc3cf5e9273",
            "name": "Sea side villa",
            "description": "Sea facing villa",
            "media": [
              "https://images.unsplash.com/photo-1584738766473-61c083514bf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            ],
            "price": 1890,
            "maxGuests": 10,
            "rating": 0,
            "created": "2023-09-30T16:19:37.967Z",
            "updated": "2023-10-01T18:44:59.292Z",
            "meta": {
              "wifi": true,
              "parking": true,
              "breakfast": true,
              "pets": true
            },
            "location": {
              "address": "Sea road",
              "city": "Italy",
              "zip": "679023",
              "country": "Italy",
              "continent": "Europe ",
              "lat": 0,
              "lng": 0
            }
          }
        ],
        "_count": {
          "venues": 1,
          "bookings": 0
        }
      },
      {
        "name": "zerozero",
        "email": "zerozero@stud.noroff.no",
        "avatar": "",
        "venueManager": false,
        "venues": [],
        "_count": {
          "venues": 0,
          "bookings": 0
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