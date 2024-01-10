# login to user

the most up to date information is availabe here: https://docs.noroff.dev/holidaze/authentication#login

complete url: https://api.noroff.dev/api/v1/holidaze/auth/login
http method: "POST"

## recuest for user login

request body options:
- email (**required**): must be a stud.noroff.no or noroff.no email address
- password (**required**): must be longer than 8 characters

example request object: 
{
  method: "POST,
  body: {
    "email": "test_ebh@stud.noroff.no",
    "password": "12345678"
  }
}


## response on success full login requset:
```json
  {
    "name": "test_ebh",
    "email": "test_ebh@stud.noroff.no",
    "avatar": null,
    "venueManager": false,
    "accessToken": "a long string"
  }
```

## response on bad login requset:

```json
  {
    "errors": [
      {
        "message": "Invalid email or password"
      }
    ],
    "status": "Unauthorized",
    "statusCode": 401
  }
```