# holidaze api basic info:
baseUrl: https://api.noroff.dev/api/v1/holidaze
possible paths:
- [/auth/register (POST method): create user](./authentication/register-user.md)
- [/auth/login (POST method): login to user](./authentication/login-user.md)
- [/profiles (GET method): query for users](./profiles/get-all-profiles.md)
- [/profiles/{userName} (GET method): a specific user](./profiles/get-a-profile.md)
- [/profiles/{userName} (PUT method): change venueMangaer property on user](./profiles/update-venue-manager.md)
- [/profiles/{userName}/media (PUT method): chenge porofile picture](./profiles/update-profile-picture.md)
- [/profiles/{userName}/venues (GET method): get all venues for this profile](./profiles/list-venues-on-profile.md)
- [/profiles/{userName}/bookings (GET method) get all bookings for this profile](./profiles/list-bookings-on-profile.md)
- [/bookings (GET method) get all bookings](./bookings/get-all-bookings.md)
- [/bookings/{id} (GET method) get one booking](./bookings/get-a-booking.md)
- [/bookings (POST method) create a booking](./bookings/create-a-booking.md)
- [/bookings/{id} (PUT method) change a booking](./bookings/change-exsisting-booking.md)
- [/bookings/{id} (DELETE method) delete a booking](./bookings/delete-exsisting-booking.md)

## test user

username: test_ebh
password: 12345678
email: test_ebh@stud.noroff.no

**note:** if this user is deleted you can receate it by usign this termianl command:
```sh
  curl -X 'POST' \
    'https://api.noroff.dev/api/v1/holidaze/auth/register' \
    -H 'accept: application/json' \
    -H 'Content-Type: application/json' \
    -d '{
    "name": "test_ebh",
    "email": "test_ebh@stud.noroff.no",
    "venueManager": false,
    "password": "12345678"
  }'
```

to get an accessToken for this user execute this command in your terminal:
```sh
  curl -X 'POST' \
  'https://api.noroff.dev/api/v1/holidaze/auth/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "test_ebh@stud.noroff.no",
    "password": "12345678"
  }'
```

## sending authentication token

the most up to date information is availabe here: https://docs.noroff.dev/holidaze/authentication#example-of-sending-authorization-header

**note:** to get a accessToken you need to [register an user](./api/authentication/register-user.md) and [login to the user](./api/authentication/login-user.md)

when making a requset to all endpoints that are outside `https://api.noroff.dev/api/v1/holidaze/auth` you need to pass a authentication token.
you do this by adding a headers object to the request options like so:

```js
  const accessToken = localStorage.getItem("accessToken") // get accsess token from where ever you store it

  const res = await fetch(urlString, {
    method: "..."
    body: {...}
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }) // add headers with Authorization and string to the options
```